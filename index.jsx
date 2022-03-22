import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { App } from "./quiz";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
