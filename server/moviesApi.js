import { Router } from "express";

// flyttet fra server.js til egen fil

/*
// extracted denne ut fra MoviesApi() siden det er en konstant
const movies = [
  {
    title: "Movie 1",
  },
  {
    title: "Movie 2",
  },
];
 */

export function MoviesApi(mongoDatabase) {
  const router = new Router();

  router.get("/", async (req, res) => {
    // via mongoDB connect, sendt inn fra server.js
    // hente ut movies collection, søk og gjør om til array
    // den er async fordi vi må vente å få den tilbake
    const movies = await mongoDatabase.collection("movies").find().toArray();
    res.json(movies);
  });

  router.post("/new", (req, res) => {
    res.sendStatus(500);
  });

  return router;
}
