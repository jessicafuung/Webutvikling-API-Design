import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());


//respond to a get request
app.get("/login", (req, res) => {
    const { username } = req.cookies;

    const user = users.find(u => u.username === username);  //oops! we don't want to show users password
    const { fullName } = user;

    res.json({ username, fullName });
});


// user database
const users = [
    {
        username: "administrator",
        password: "secret123",
        fullName: "Test Person"
    }
]


//set something so that GET /login returns user name
app.post("/login", (req, res) => {
    // 1. read body as json
    // 2. check if username and password is correct
    // 3. set a cookie
    // 4. read the cookie in /login

    /*
    const body = req.body;
    const username = body.username;
    const password = body.password;
     */

    // equal to those three lines over!
    const { password, username } = req.body;

    //Among the users, find a matching username. It's password should also match.
    if (users.find(u => u.username === username).password === password) {
        res.cookie("username", username) //
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