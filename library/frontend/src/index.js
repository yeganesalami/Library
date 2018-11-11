import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.js";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import library from "./reducers";

let store = createStore(library, applyMiddleware(thunk));


ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById("root"));
