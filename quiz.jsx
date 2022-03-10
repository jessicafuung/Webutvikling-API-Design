import {Link, Route, Routes} from "react-router-dom";
import {useState} from "react";
import {randomQuestion} from "./question";

function ShowAnswer() {
    return <h1>Answer</h1>;
}

function NewQuiz() {

    const [question] = useState(randomQuestion());

    return <div>
        <h1>{question.question}</h1>
        {Object.keys(question.answers)
            .filter(a => question.answers[a])
            .map(a => <div key={a}>
               <h2>{question.answers[a]}</h2>
            </div>)
        }
    </div>
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