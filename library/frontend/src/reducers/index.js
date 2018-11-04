import { combineReducers } from 'redux';
import books from "./books";
import authors from "./authors";


const library = combineReducers({
  books,
  authors,
})

export default library;