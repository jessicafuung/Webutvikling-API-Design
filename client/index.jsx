import React, { useState } from "react";
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
      * Konvensjonen sier hvis vi har noe som heter onFoo, så skal vi lage noe som heter
      handleFoo.

      * e.preventDefault() = når vi trykker på knappen i browseren, blir det gjort en GET req og url'en får en ? bak. Det ønsker vi å unngå.

      * Vi ønsker å ta vare på verdiene i formen i en useState() hook.

      * Bruk "value", "onChange". Hvor "value" tar verdien til staten(slik den er nå),
      og "onChange" setter den nye verdien til setUsername ved å hente via target til eventen.

      * Ved trykk av onSubmit ønsker vi å POST req. Fetch kan brukes både til POST og GET. Dette
      kan spesifiseres ved 'method: "post"'. Husk async og await. 'JSON.stringify' oversetter input til
      json, og 'content-type' må igjen spesifisere det. 
  */
}
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch("/api/login", {
      method: "post",
      body: JSON.stringify({ username, password }),
      headers: {
        "content-type": "application/json",
      },
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Please log in</h1>
      <div>
        Username:{" "}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        Password:{" "}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button>Log in</button>
      </div>
      <pre>{JSON.stringify({ username, password }, undefined, " ")}</pre>
    </form>
  );
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
