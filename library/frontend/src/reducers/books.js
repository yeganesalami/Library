const initialState = [];

export default function books(state = initialState, action) {
    let bookList = state.slice();

    switch (action.type) {
        case "FETCH_BOOKS":
            return [...state, ...action.books];

        case "ADD_BOOK":
            return [...state, action.payload];

        case "DELETE_BOOK":
            console.log(action.id);
            console.log(bookList);
            // console.log(action, ' | ', action.params.id)
            // bookList.splice(action.params.id, 1)
            return state.filter(book => book.id !== action.id)
                // return bookList;

        case "BOOROW_BOOK":
            bookList.splice(2, 0);
            return bookList;


        default:
            return state;
    }
}