import {Link, Route, Routes, useNavigate} from "react-router-dom";
import {useState} from "react";
import {isCorrectAnswer, randomQuestion} from "./question";


function ShowAnswer() {
    return <div>
        <Routes>
            <Route path={"correct"} element={<h>Correct!</h>}/>
            <Route path={"wrong"} element={<h>Wrong!</h>}/>
        </Routes>

        <div><Link to={"/"}>Show score</Link></div>
        <div><Link to={"/question"}>New question</Link></div>
    </div>;
}

function NewQuiz({setQuestionAnswered, setCorrectAnswers}) {

    function handlerAnswer(answer) {
        setQuestionAnswered(q => q + 1);
        if (isCorrectAnswer(question, answer)) {
            setCorrectAnswers(q => q + 1);
            navigate("/answer/correct");
        } else {
            navigate("/answer/wrong")
        }
    }

    const navigate = useNavigate();
    const [question] = useState(randomQuestion());

    return <div>
        <h1>{question.question}</h1>
        {Object.keys(question.answers)
            .filter(a => question.answers[a])
            .map(a => <div key={a}>
                <button onClick={() => handlerAnswer(a)} style={{fontSize: "1.5rem"}}>{question.answers[a]}</button>
            </div>)
        }
    </div>
}

function FrontPage({questionAnswered, correctAnswers}) {
    return <div>
        <h1>Quiz</h1>
        <h2>You have answered {correctAnswers} of {questionAnswered} correctly!</h2>
        <div>
            <Link to={"/question"}>
                <button type="button" style={{fontSize: "1.5rem"}}>New quiz</button>
            </Link>
        </div>
    </div>
}

export function App() {
    const [questionAnswered, setQuestionAnswered] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);

    return (
        <Routes>
            <Route path="/"
                   element={<FrontPage questionAnswered={questionAnswered} correctAnswers={correctAnswers}/>} />
            <Route path="/question"
                   element={<NewQuiz setQuestionAnswered={setQuestionAnswered} setCorrectAnswers={setCorrectAnswers} />} />
            <Route path="/answer/*" element={<ShowAnswer />} />
        </Routes>
    );
}
