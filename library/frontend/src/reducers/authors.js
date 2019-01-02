const initialState = [];

export default function authors(state = initialState, action) {
    // let authorList = state.slice();

    switch (action.type) {
        case "FETCH_AUTHORS":
            return [...state, ...action.authors];

        case "ADD_AUTHOR":
            return [...state, action.payload];

        case "DELETE_AUTHOR":
            return state.filter(author => author.id !== action.id)

        default:
            return state;
    }
}