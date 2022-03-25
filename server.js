import express from "express";

const app = express();

//respond to a get request
app.get("/login", (req, res) => {
    res.send({
        username: "admin"
    });
});

app.post("/login", (req, res) => {
    //set something so that GET /login returns user name
    res.end();
})

//For å lytte til en port (template literals)
const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`server started at http://localhost:${server.address().port}`);
})