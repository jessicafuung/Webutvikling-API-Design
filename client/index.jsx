import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

{
  /*
        Vet ikke hvem brukeren er:
        - Lurt å ha <div> rundt linkene at de skal være hver for seg på web
   */
}
function LoginLinks() {
  return (
    <div>
      <div>
        <Link to={"/login"}>Login</Link>
      </div>
      <div>
        <Link to={"/register"}>Register now</Link>
      </div>
    </div>
  );
}

{
  /*
        Forside:
        - Viser kun <LoginLinks/> hvis vi ikke vet hvem brukeren er
        - UseEffect hook kaller fetch-kallet - som da gjør en HTTP request. *fetch er asynkront *await lar koden gjør andre ting i mellomtiden
        - useState for å lagre user-objektet (denne må importeres fra react)
        - i return: hvis user er satt, returner navnet til brukeren. Hvis ikke, vis <LoginLinks/>
  */
}
function FrontPage() {
  const [user, setUser] = useState();
  useEffect(async () => {
    const res = await fetch("api/login");
    setUser(await res.json());
  }, []);

  return (
    <div>
      <h1>Movie Application</h1>
      {user ? <div>{user.fullName}</div> : <LoginLinks />}
    </div>
  );
}

{
  /*
  Logg inn:
  */
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
