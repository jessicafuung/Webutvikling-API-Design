import * as ReactDOM from "react-dom";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";

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
        </div>
    </div>
}

function App() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<FrontPage />}></Route>
            <Route path="/question" element={<NewQuiz />}></Route>
        </Routes>
    </BrowserRouter>;
}

ReactDOM.render(<App/>, document.getElementById("app"));