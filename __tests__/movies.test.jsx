import {render} from "react-dom";
import {ListMovies} from "../index";

describe("movie pages", () => {

    it("shows movie list", () => {
        const element = document.createElement("div");
        render(<ListMovies />, element)
        expect("movie").toBe("movie");
    });

    it("lets the user adda new movie", () => {

    });
});