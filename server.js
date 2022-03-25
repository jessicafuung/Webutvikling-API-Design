import express from "express";

const app = express();

//Svar på en get request
app.get("/login", (req, res) => {
    res.send({
        username: "admin"
    });
});

//For å lytte til en port (template literals)
const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`server started at http://localhost:${server.address().port}`);
})