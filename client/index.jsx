import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

function FrontPage() {
  return (
    <div>
      <h1>Movie Database</h1>
      <ul>
        <li>
          <Link to={"/movies"}>List Movies</Link>
        </li>
        <li>
          <Link to={"/movies/new"}>Add new movie</Link>
        </li>
      </ul>
    </div>
  );
}

/* Custom hook */
function useLoading(loadingFunction) {
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
      setData(await loadingFunction());
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

async function fetchJSON(url) {
  /* vente på å få fetche API fra server siden */
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to load ${res.status}: ${res.statusText}`);
  }
  /* vente på å parse til json */
  return await res.json();
}

function ListMovies() {
  /* Er den i ferd med å laste? Fått noe feil? Eller data? Husk å send inn en loadingFunction som fetcher api */
  const { loading, error, data } = useLoading(async () =>
    fetchJSON("/api/movies")
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <div>{error.toString()}</div>
      </div>
    );
  }

  return (
    <div>
      <h1>Movies in the database</h1>
      <ul>
        {data.map((movie) => (
          <li>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

function AddNewMovie() {
  return (
    <form>
      <h1>Add new movie</h1>
    </form>
  );
}

function Application() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route path={"/movies"} element={<ListMovies />} />
        <Route path={"/movies/new"} element={<AddNewMovie />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
