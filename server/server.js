import express from "express";
import * as path from "path";
import { MoviesApi } from "./moviesApi.js"; //la til .js
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const mongoClient = new MongoClient(process.env.MONGODB_URL);

// .then gir en callback når denne er ferdig.
// på denne måten kan vi liste ut alle databasene på MongoDB
mongoClient.connect().then(async () => {
  console.log("Connected to MongoDB");
  const databases = await mongoClient.db().admin().listDatabases(); //asynkron funksjon
  console.log(databases);

  // root url blir da /api/movies. Slik at '/api/movies/new' blir nå '/new'
  // sender inn databasen til MoviesApi
  // velge hvilken database å connecte till = MoviesApi(mongoClient.db(process.env.MONGODB_DATABASE || "pg6301-07"))
  // og legg inn MONGODB_DATABASE=databasenavn i .env fil
  app.use("/api/movies", MoviesApi(mongoClient.db("pg6301-07")));
});

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
