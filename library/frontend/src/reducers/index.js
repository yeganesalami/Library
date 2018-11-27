import { combineReducers } from "redux";
import books from "./books";
import authors from "./authors";
import members from "./members";

const library = combineReducers({
  books,
  authors,
  members,
});

export default library;
