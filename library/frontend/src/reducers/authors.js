const initialState = [
  {
    name: "name1",
    gender: "male",
    birthDay: "02-09-1998",
    born: "born1",
    kind: "kind1",
    description:
      "Lorem ipsum dolor sit amet, doming admodum probatus id quo, pro movet salutandi repudiare ea"
  }
];

export default function authors(state = initialState, action) {
  let authorList = state.slice();

  switch (action.type) {
    case "DELETE_AUTHOR":
      authorList.splice(action.id, 1);

      return authorList;

    case "ADD_AUTHOR":
      return [
        ...state,
        {
          name: action.name,
          gender: action.gender,
          birthDay: action.birthDay,
          born: action.born,
          kind: action.kind,
          description: action.description
        }
      ];

    default:
      return state;
  }
}
