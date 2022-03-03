import * as React from "react";
import {useState} from "react";
import * as ReactDOM from "react-dom";

import {randomQuestion, isCorrectAnswer} from "./questions";

// Tar inn question-funksjonen som parameter
function ShowQuestion({question, onAnswer}) {
    return <>
        <h1>{question.question}</h1>
        {Object.keys(question.answers)   /**henter ut med key (som er svarene)**/
            .filter(a => question.answers[a])   /** filtrere ut hvert answer i question **/
            .map(a => <p key={a}>
                <button onClick={() => onAnswer(a)}>{question.answers[a]}</button>
            </p>)}

    </>;
}

function ShowAnswerStatus({answer, onRestart, question}) {
    return<>
        <h1>{isCorrectAnswer(question, answer) ? "Right" : "Wrong"}</h1>
        <p>
            <button onClick={onRestart}>Another question</button>
        </p>
    </>;
}

function Application() {
    /** Henter funksjonene, og setter verdier **/
    const [question, setQuestion] = useState(randomQuestion());
    const [answer, setAnswer] = useState();

    /** Når applikasjonen starter får vi et random spørsmål og ingen svar **/
    function handleRestart() {
        setQuestion(randomQuestion());
        setAnswer(undefined);
    }

    if(answer) {
        return <ShowAnswerStatus question={question} answer={answer} onRestart={handleRestart}/>;
    }

    return <ShowQuestion question={question} onAnswer={setAnswer}/>;
}

/** Kobler denne opp mot index.html fil  **/
ReactDOM.render(
    <Application/>,
    document.getElementById("app")
);

