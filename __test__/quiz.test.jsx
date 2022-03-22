import {App, FrontPage, NewQuiz, QuestionContext} from "../quiz";
import * as ReactDOM from "react-dom";
import {MemoryRouter} from "react-router-dom";
import React from "react";
import pretty from "pretty";
import {Simulate} from "react-dom/test-utils";

//Lage egne questions
const question = {
    question: "Are you happy?",
    answers: {
        answer_a: "Yes",
        answer_b: "No",
        answer_c: "Maybe",
    },
    correct_answers: {
        answer_a_correct: "true",
        answer_b_correct: "false",
        answer_c_correct: "false",
    }
};

describe("Quiz application",() => {

    it("shows answer status", () => {
        const element = document.createElement("div");
        ReactDOM.render(
            <MemoryRouter><FrontPage correctAnswers={3} questionAnswered={10} /></MemoryRouter>,
            element
        );
        expect(element.querySelector("[data-testid=status]").textContent)
            .toEqual("You have answered 3 of 10 correctly!")
        expect(pretty(element.innerHTML)).toMatchSnapshot();
    })

    it("shows question", () => {
        const element = document.createElement("div");

        //Komme direkte inn i /question og sende med selvlagde spørsmål
        ReactDOM.render(
            <MemoryRouter initialEntries={["/question"]}>
                <QuestionContext.Provider value={{randomQuestion: () => question}}>
                    <App />
                </QuestionContext.Provider>
            </MemoryRouter>,
            element
        );

        expect(pretty(element.innerHTML)).toMatchSnapshot();
    })

    it("records correct answer", () => {
        const setQuestionsAnswered = jest.fn();
        const setCorrectAnswers = jest.fn();

        const element = document.createElement("div");
        ReactDOM.render(
            <MemoryRouter initialEntries={["/question"]}>
                <QuestionContext.Provider value={{randomQuestion: () => question}}>
                    <NewQuiz setCorrectAnswers={setCorrectAnswers} setQuestionAnswered={setQuestionsAnswered} />
                </QuestionContext.Provider>
            </MemoryRouter>,
            element
        );

        Simulate.click(element.querySelector("[data-testid=answer_a] button"));
        expect(setQuestionsAnswered).toBeCalled();
        expect(setCorrectAnswers).toBeCalled();
        expect(pretty(element.innerHTML)).toMatchSnapshot();
    })
})