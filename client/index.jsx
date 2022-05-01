import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { fetchJSON } from "./http";
import { useLoader } from "./useLoader";

{
  /* Vis denne dersom vi ikke kjenner til brukeren*/
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
        - loading: fordi det tar litt tid å vise det som er inni useEffect. Den laster ikke lenger når useEffect er lastet inn.
           Får å unngå at den havner i en situasjon hvor den loader for alltid, så kan  man sette en try catch finally rundt.

        Refactored:
        - const {loading, error, data} henter ut tre objekter fra useLoader. foo.loading, foo.error, foo.data f.eks
  */
}
function FrontPage() {
  const { loading, error, data } = useLoader(
    async () => await fetchJSON("/api/login")
  );
  const user = data;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ border: "1px solid red", background: "pink" }}>
        An error occurred: {error.toString()}
      </div>
    );
  }

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
