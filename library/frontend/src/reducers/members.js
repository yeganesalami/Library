const initialState = [];

export default function members(state = initialState, action) {
  switch (action.type) {
    case "FETCH_MEMBERS":
      return [...state, ...action.members];

    default:
      return state;
  }
}
