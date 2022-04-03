import express from "express";
import { isCorrectAnswer, Questions, randomQuestion } from "./question.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// printing the random questions with alternatives
app.get("/quiz/random", (req, res) => {
  const { id, question, answers } = randomQuestion();
  res.json({ id, question, answers });
});

// answering question with results
app.post("/quiz/answer", (req, res) => {
  // fetching from client
  const { id, answer } = req.body;

  // find the question object
  const question = Questions.find((q) => q.id === id);

  // validating the answer
  if (isCorrectAnswer(question, answer)) {
    res.json("Result: Correct answer!");
  } else {
    res.json("Result: Wrong answer!");
  }

  res.end();
});

// printing score
app.get("/quiz/score", (req, res) => {});

app.use(express.static("../client/dist"));
app.use((req, res, next) => {
  if (!req.path.startsWith("/quiz")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`server started at http://localhost:${server.address().port}`);
});
