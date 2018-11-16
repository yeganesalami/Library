const initialState = [];

export default function books(state = initialState, action) {
  let bookList = state.slice();

  switch (action.type) {
    case 'FETCH_BOOKS':
      return [...state, ...action.books];

    case "ADD_BOOK":
      return [
        ...state, action.payload];

    default:
      return state;
  }
}
