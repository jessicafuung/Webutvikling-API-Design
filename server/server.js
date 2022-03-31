import express from "express";
import {
  isCorrectAnswer,
  Questions,
  randomQuestion,
} from "../client/question.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
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

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`server started at http://localhost:${server.address().port}`);
});
