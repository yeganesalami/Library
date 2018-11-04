import { combineReducers } from 'redux';
import books from "./books";


const library = combineReducers({
  books,
})

export default library;