import express from "express";

const app = express();

app.get("/login", (req, res) => {
    res.json({username: "Noen andre"})
})

app.post("/login", (req, res) => {
    res.sendStatus(401);
})

app.listen(3000);