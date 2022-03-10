import {Link, Route, Routes} from "react-router-dom";

function ShowAnswer() {
    return <h1>Answer</h1>;
}

function NewQuiz() {
    return <h1>New Quiz</h1>
}

function FrontPage() {
    return <div>
        <h1>Quiz</h1>
        <div>
            <Link to={"/question"}>
                <button type="button" style={{fontSize: "1.5rem"}}>New quiz</button>
            </Link>
            <Link to={"/answer"}>
                <button type="button" style={{fontSize: "1.5rem"}}>Answer</button>
            </Link>
        </div>
    </div>
}

export function App() {
    return (
        <Routes>
            <Route path="/" element={<FrontPage />}></Route>
            <Route path="/question" element={<NewQuiz />}></Route>
            <Route path="/answer" element={<ShowAnswer />}></Route>
        </Routes>
    );
}