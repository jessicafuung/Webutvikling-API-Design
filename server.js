import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

//respond to a get request
app.get("/login", (req, res) => {
    res.send({
        username: "admin"
    });
});

const users = [
    {
        username: "admin",
        password: "secret123"
    }
]

//set something so that GET /login returns user name
app.post("/login", (req, res) => {
    // 1. read body as json
    // 2. check if username and password is correct
    // 3. set a cookie
    // 4. read the cookie in /login

    const body = req.body;
    const username = body.username;
    const password = body.password;

    //Among the users, find a matching username. It's password should also match.
    if (users.find(u => username === username).password === password) {
        res.sendStatus(200)
    } else {
        //else return
        res.send(401)
    }

    res.end();
})

//For å lytte til en port (template literals)
const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`server started at http://localhost:${server.address().port}`);
})