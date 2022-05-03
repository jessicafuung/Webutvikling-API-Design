import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

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
  /* henter ut disse fra LoginContext */
  const { discovery_endpoint, client_id, response_type } =
    useContext(LoginContext);

  /* Redirecte til en ny side inne på /login */
  useEffect(async () => {
    /* Ønsker å fetche istedenfor å hardkode "authorization_endpoint" på google doc */
    const { authorization_endpoint } = await fetchJSON(discovery_endpoint);

    const parameters = {
      /* response_type: ønsker å få en token tilbake */
      /* client_id: hentes fra google developer console / LoginContext */
      /* scope: hva slags informasjon ønsker jeg å få tilbake om brukeren */
      /* redirect_uri: send brukeren tilbake til denne application, men denne url'n */
      response_type,
      client_id,
      scope: "email profile",
      redirect_uri: window.location.origin + "/login/callback",
    };

    /* redirecte brukeren til login google */
    /* URLSearchParams = gjør om fra object til JSON*/
    window.location.href =
      authorization_endpoint + "?" + new URLSearchParams(parameters);
  }, []);

  return (
    <div>
      <h1>Please wait...</h1>
    </div>
  );
}

/* denne callback er mest for å vente på useEffect skal bli ferdig. Bruk useNavigate til å navigere seg vekk når ferdig */
function LoginCallback() {
  const [error, setError] = useState();
  const navigate = useNavigate();

  /* henter ut token etter login med en useEffect og destruction syntax */
  useEffect(async () => {
    /* viktig å hoppe over første tegnet '#', hvis ikke blir det undefined */
    const { access_token } = Object.fromEntries(
      new URLSearchParams(window.location.hash.substring(1))
    );
    console.log(access_token);

    /* deretter bruke en fetch for å sende/ poste access token til serveren */
    const result = await fetch("/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ access_token }),
    });

    if (result.ok) {
      /* naviger tilbake til forsiden når ferdig og det er OK */
      navigate("/");
    } else {
      // da setter vi erroren og henter den ut igjen under
      setError(`Failed POST /api/login: ${result.status} ${result.statusText}`);
    }

    if (error) {
      return (
        <div>
          <h1>Error</h1>
          <div>{error}</div>
        </div>
      );
    }
  });

  return <h1>Please wait...</h1>;
}

/* custom hook */
function useLoader(loadingFn) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();

  /* denne funksjonen kunne man ha satt direkte inn i useeffect. Men grunner til å ikke gjøre det:
   * 1. sette den inn i return statement, for å kalle på den uten ifra
   * 2. på typescript kan man ikke kalle på async fra useEffect, derfor egen funksjon.
   * */
  async function load() {
    try {
      /* i ferd med å laste */
      setLoading(true);
      /* setData er resultatet av loadingFunction, venter på den */
      setData(await loadingFn());
    } catch (error) {
      /* men hvis det skjer en feil, send den inn i setError */
      setError(error);
    } finally {
      /* til slutt ikke load mer */
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return { loading, error, data };
}

function Profile() {
  const { loading, data, error } = useLoader(async () => {
    return await fetchJSON("/api/login");
  });

  if (loading) {
    return <div>Please wait...</div>;
  }

  if (error) {
    return <div>Error! {error.toString()}</div>;
  }

  return (
    <div>
      <h1>
        Profile for {data.name} ({data.email})
      </h1>
      <div>
        <img src={data.picture} alt={"Profile picture"} />
      </div>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
}

/* ved bruk av context kan man gi alt i samme kode tilgang til disse parameterne */
const LoginContext = React.createContext();

function Application() {
  // bruke useLoader til å laste inn siden og fetchJSON til å koble til serveren
  const { loading, error, data } = useLoader(() => {
    fetchJSON("/api/config");
  });

  if (loading) {
    return <div>Please wait...</div>;
  }

  if (error) {
    return <div>Error! {error.toString()}</div>;
  }

  /* bruke dataen fra server som konfigurasjon */
  return (
    <LoginContext.Provider value={data}>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<FrontPage />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/login/callback"} element={<LoginCallback />} />
          <Route path={"/profile"} element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
