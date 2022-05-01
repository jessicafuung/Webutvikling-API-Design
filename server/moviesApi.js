import { Router } from "express";

// flyttet fra server.js til egen fil

// extracted denne ut fra MoviesApi() siden det er en konstant
const movies = [
  {
    title: "Movie 1",
  },
  {
    title: "Movie 2",
  },
];

export function MoviesApi() {
  const router = new Router();

  router.get("/", (req, res) => {
    res.json(movies);
  });

  router.post("/new", (req, res) => {
    res.sendStatus(500);
  });

  return router;
}
