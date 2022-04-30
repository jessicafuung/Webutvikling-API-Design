import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
{
  /*
  Forside
  - <div> må være i samme linje som return
  - Lurt å ha <div> rundt linkene at de skal være hver for seg på web
  */
}
function FrontPage() {
  return (
    <div>
      <h1>Movie Application</h1>
      <div>
        <div>
          <Link to={"/login"}>Login</Link>
        </div>
        <div>
          <Link to={"/register"}>Register now</Link>
        </div>
      </div>
    </div>
  );
}

{
  /* Logg inn */
}
function Login() {
  return <h1>Welcome to login page</h1>;
}

{
  /* URL som linker til gjeldende function components */
}
function Application() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route path={"/login"} element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
