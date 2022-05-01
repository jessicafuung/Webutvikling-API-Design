import express from "express";
import * as path from "path";

const app = express();

app.use(express.static("../client/dist/"));

// Custom middleware.
// når browseren oppdaterer /api/foo så skjønner ikke express hva det er dersom det ikke er laget et api for det.
// Men fra forsiden og trykke videre på en knapp går fint fordi siden er servet via klient-siden.
// Med ved søk via url vil ikke serveren forstå hva den skal serve.
app.use((req, res, next) => {
  // hvis det er en GET, og path ikke starter med "api" (api ønsker vi å håndtere annerledes), serve fra klient-siden (react router)
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    return res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Started on http://localhost:${server.address().port}`);
});
