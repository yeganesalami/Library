const initialState = [];

export default function members(state = initialState, action) {
  let memberList = state.slice();

  switch (action.type) {
    case "FETCH_MEMBERS":
      return [...state, ...action.members];

    case "DEACTIVE_USER":
      return memberList

    default:
      return state;
  }
}
