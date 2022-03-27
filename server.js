import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


//respond to a get request
app.get("/login", (req, res) => {
    const user = users.find(u => u.username === req.cookies.username);  //oops! we don't want to show users password
    const { fullName, username } = user;

    res.json({ username, fullName });
});


// user database
const users = [
    {
        username: "administrator", password: "secret123", fullName: "Test Person"
    },
    {
        username: "dummyuser", password: "dummy", fullName: "Noen André"
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

    //Among the users, find a matching username.
    const user = users.find(u => u.username === username);

    //It's password should also match.
    if (user && user.password === password) {
        res.cookie("username", username) // username as cookie (username=administrator) in HTTP msg
        res.sendStatus(200)
    } else {
        //else return
        res.send(401)
    }

    res.end();
});

// app using static files under directory public
app.use(express.static("public"));

// listening to port (template literals)
const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`server started at http://localhost:${server.address().port}`);
});