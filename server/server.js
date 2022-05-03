import express from "express";
import * as path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import fetch from "node-fetch";

const app = express();

app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

/* Bruker denne vente funksjonen til å fetche det som er i google doc, for å unngå hardkode endpoints */
// viktig å importere fetch fra node-fetch
// legg til options (autorisasjon med token)
async function fetchJSON(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Failed ${res.status}`);
  }

  return await res.json();
}

const discovery_endpoint =
  "https://accounts.google.com/.well-known/openid-configuration";
const client_id = process.env.CLIENT_ID;

//Disse elementene tilhører konfigurasjonen
app.get("/api/config", (req, res) => {
  res.json({
    response_type: "token",
    client_id,
    discovery_endpoint,
    scope: "email profile",
  });
});

// async pga await inni fetchen
app.get("/api/login", async (req, res) => {
  // henter access token fra cookies, som ble hentet ifra #object
  // da må serveren finne ut hvem er dette
  const { access_token } = req.signedCookies;

  // bruke funksjonen som vi lagde i index.jsx, til å lete gjennom google docen
  const { userinfo_endpoint } = await fetchJSON(discovery_endpoint);

  // hente userinfo via endpoint fra google doc
  // må sende inn token for å få hentet riktig info
  const userinfo = await fetch(userinfo_endpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  //response with error handling
  if (userinfo.ok) {
    res.json(await userinfo.json());
  } else {
    console.log(`Failed to fetch ${userinfo.status} ${userinfo.statusText}`);
    res.sendStatus(500);
  }
});

// tar imot access token fra <LoginCallback/> og bruker den til å sette cookien.
// denne trenger egentlig ikke å være signed fordi den er autorisert fra Google allerede
// dersom feilkode 500 = mangler bodyparser!
app.post("/api/login", (req, res) => {
  const { access_token } = req.body;
  res.cookie("access_token", access_token, { signed: true });
  res.sendStatus(200);
});

app.use(express.static("../client/dist"));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Started on http://localhost:${server.address().port}`);
});
