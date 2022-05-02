import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

function FrontPage() {
  return (
    <div>
      <h1>FrontPage</h1>
      <div>
        <Link to={"/login"}>Login</Link>
      </div>
      <div>
        <Link to={"/profile"}>Profile</Link>
      </div>
    </div>
  );
}

/* Bruker denne vente funksjonen til å fetche det som er i google doc, for å unngå hardkode endpoints */
async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed ${res.status}`);
  }

  return await res.json();
}

function Login() {
  const [redirectUrl, setRedirectUrl] = useState();

  /* Redirecte til en ny side ved trykk på "do login", og ikke automatisk inne på /login */
  useEffect(async () => {
    /* "authorization_endpoint" på google JSON. Ønsker å fetche istedenfor å hardkode. Destruction syntax for å hente ut det vi ønsker med JSON */
    const { authorization_endpoint } = await fetchJSON(
      "https://accounts.google.com/.well-known/openid-configuration"
    );

    const parameters = {
      /* response_type: ønsker å få en token tilbake */
      /* client_id: hentes fra google developer console */
      /* scope: hva slags informasjon ønsker jeg å få tilbake om brukeren */
      /* redirect_uri: send brukeren tilbake til denne application, men denne url'n */
      response_type: "token",
      client_id:
        "775167009240-u1lscab9fno21qd3e1pd0ihf194aq6hn.apps.googleusercontent.com",
      scope: "email profile",
      redirect_uri: window.location.origin + "/login/callback",
    };

    /* URLSearchParams = gjør om fra object til JSON*/
    setRedirectUrl(
      authorization_endpoint + "?" + new URLSearchParams(parameters)
    );
  }, []);

  return (
    <div>
      <h1>Login updated!</h1>
      <a href={redirectUrl}>Do login</a>
      <div>{redirectUrl}</div>
    </div>
  );
}

function Application() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/login/callback"} element={<h1>Login Callback</h1>} />
        <Route path={"/profile"} element={<h1>Profile</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
