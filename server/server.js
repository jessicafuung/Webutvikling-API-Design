import express from "express";
import * as path from "path";

const app = express();

app.get("/api/login", (req, res) => {
  function respond() {
    if (req.user) {
      // hvis vi finner brukeren fra request, returner
      const { username, fullName } = req.user;
      return res.json;
    } else {
      //hvis vi ikke vet hvem brukeren er, returneer "204 no content"
      res.sendStatus(204);
    }
  }

  setTimeout(respond, 400);
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
