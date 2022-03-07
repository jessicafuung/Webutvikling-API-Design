import ReactDOM from "react-dom";
import React from "react";

import { ListMovies, NewMovieForm } from "../application";
import { Simulate } from "react-dom/test-utils";

describe("movies application", () => {
  it("shows movie list", () => {
    const element = document.createElement("div");
    ReactDOM.render(<ListMovies />, element);

    expect(element.querySelector("h1").innerHTML).toEqual("List movies");
    expect(element.innerHTML).toMatchSnapshot();
  });

  it("show new movie form", () => {
    const element = document.createElement("div");
    ReactDOM.render(<NewMovieForm />, element);
    expect(element.innerHTML).toMatchSnapshot();
  });

  it("submit new movie", () => {
    const onAddMovie = jest.fn(); // mock-funksjon
    //Denne tar opp kallet i onSubmit og tar vare på det slik at vi senere kan spørre hvordan onAddMovie ble brukt

    const element = document.createElement("div");
    ReactDOM.render(<NewMovieForm onAddMovie={onAddMovie} />, element);

    Simulate.change(
      // finn elementet med date-testid=title og send en input event til det
      element.querySelector("[data-testid=title]"),
      { target: { value: "Movie 1" } }
    );

    Simulate.change(element.querySelector("[data-testid=year]"), {
      target: { value: "2022" },
    });

    Simulate.submit(
      // finn elementet av type form, og send en submit event til det
      element.querySelector("form")
    );

    expect(onAddMovie).toHaveBeenCalledWith({
      title: "Movie 1",
      year: "2022",
      plot: "",
    });
  });
});
