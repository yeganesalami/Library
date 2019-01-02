const initialState = [];

export default function books(state = initialState, action) {
    let bookList = state.slice();

    switch (action.type) {
        case "FETCH_BOOKS":
            return [...state, ...action.books];

        case "ADD_BOOK":
            return [...state, action.payload];

        case "DELETE_BOOK":
            return state.filter(book => book.id !== action.id)

        case "BORROW_BOOK":
            return (bookList);

        default:
            return state;
    }
}