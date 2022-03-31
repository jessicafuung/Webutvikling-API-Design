import express from "express";
import path from "path";

const app = express();

app.get("/api/login", (req, res) => {
  res.json({ username: "Noen andre" });
});

app.post("/api/login", (req, res) => {
  res.sendStatus(401);
});

app.use(express.static("../client/dist"));
app.use((req, res, next) => {
  res.sendFile(path.resolve("../client/dist/index.html"));
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`started on http://localhost:${server.address().port}`);
});
