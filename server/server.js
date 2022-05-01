import express from "express";
import * as path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(bodyParser.json()); //hvis ikke returnerer body-en blank!
app.use(cookieParser(process.env.COOKIE_SECRET)); // cookie og cookie secret

// dummy database over brukere
const users = [
  {
    username: "admin",
    fullName: "Noen Andre Persson",
    password: "passord123",
  },
];

// custom middleware
app.use((req, res, next) => {
  const { username } = req.signedCookies;
  req.user = users.find((u) => u.username === username);
  next();
});

app.get("/api/login", (req, res) => {
  function respond() {
    if (req.user) {
      // hvis vi finner brukeren fra request, returner
      const { username, fullName } = req.user;
      return res.json({ username, fullName });
    } else {
      //hvis vi ikke vet hvem brukeren er, returneer "204 no content"
      res.sendStatus(204);
    }
  }

  setTimeout(respond, 400);
});

app.delete("/api/login", (req, res) => {
  res.clearCookie("username");
  res.sendStatus(200);
});

app.post("/api/login", (req, res) => {
  //1. Leser av username og password fra request body
  const { username, password } = req.body;

  //2. Finne brukeren som har samme brukernavn og passord!
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  //3. Brukeren er innlogget riktig -> vi setter signert cookie (unngå brukeren sette cookien selv via browseren)
  if (user) {
    res.cookie("username", user.username, { signed: true });
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

// de to app.use under brukes til å serve React kode via Express!
// statiske filer (html, css, etc)
app.use(express.static("../client/dist"));

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api/")) {
    // hvis ikke den getter /api/.., returner index.html fil
    return res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    //404 handler
    next();
  }
});

// Lytte til port
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`server started on http://localhost:${server.address().port}`);
});
