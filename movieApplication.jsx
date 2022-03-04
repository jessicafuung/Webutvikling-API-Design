import {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import * as React from "react";

const MOVIES = [
    {
        title: "Dont look up",
        plot: "I dont know",
        year: 2021
    },
    {
        title: "Jessica koder",
        plot: "Husker jeg dette senere?",
        year: 2022
    },
    {
        title: "Notat",
        plot: "En av to måter å bruke state/ tilstand på",
        year: 2022
    }
]

function MovieCard(props) {
    const {title, plot, year} = props.movie;
    return <div>
        <h2>{title} ({year})</h2>
        <p>{plot}</p>
    </div>;
}

export function ListMovies() {
    return <div>
        <h1>Movies</h1>
        {MOVIES.map(movie => <MovieCard key={movie.title} movie={movie}/>)}
    </div>
}

function CreateMovies() {
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [plot, setPlot] = useState("");

    const [newMovie, setNewMovie] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        setNewMovie({title, year, plot})
    }, [title, year, plot]);

    console.log("Render");

    function handleSubmit(event) {
        event.preventDefault();
        MOVIES.push(newMovie);
        navigate("..");
    }

    return <form onSubmit={handleSubmit}>
        <h1>Create new movie</h1>
        <div>
            Title:
            <input value={title} onChange={ e => setTitle(e.target.value)}/>
        </div>
        <div>
            Year:
            <input value={year} onChange={ e => setYear(e.target.value)}/>
        </div>
        <div>
            <div>Plot:</div>
            <textarea value={plot} onChange={ e => setPlot(e.target.value)}/>
        </div>

        <button>Save</button>

        <pre>
            {JSON.stringify(newMovie)}
        </pre>
    </form>
}

export function MovieApplication() {
    return <Routes>
        <Route path={"/"} element={<ListMovies />} />
        <Route path={"/new"} element={<CreateMovies/>} />
        <Route path={"*"} element={<h1>Not found</h1>} />
    </Routes>
}