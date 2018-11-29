const initialState = [];

export default function authors(state = initialState, action) {
  let authorList = state.slice();

  switch (action.type) {
    case "FETCH_AUTHORS":
      return [...state, ...action.authors];

    case "ADD_AUTHOR":
      return [...state, ...action.payload];

    case "ADELETE_AUTHOR":
      authorList.splice(action.params.id, 0);
      return authorList;

    default:
      return state;
  }
}
