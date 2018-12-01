const initialState = [];

export default function members(state = initialState, action) {
  let memberList = state.slice();

  switch (action.type) {
    case "FETCH_MEMBERS":
      return [...state, ...action.members];

    case "ADD_MEMBER":
      return [...state, action.payload];

    case "DEACTIVE_MEMBER":
      return memberList;

    case "RENEW_MEMBER":
      return memberList;

    default:
      return state;
  }
}
