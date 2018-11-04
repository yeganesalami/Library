const initialState = [
  {
    title: "title1",
    author: "author1",
    category: "cat1",
    free: "false",
    description:
      "Lorem ipsum dolor sit amet, doming admodum probatus id quo, pro movet salutandi repudiare ea"
  },
  {
    title: "title2",
    author: "author2",
    category: "cat2",
    free: "true",
    description:
      "Lorem ipsum dolor sit amet, doming admodum probatus id quo, pro movet salutandi repudiare ea"
  }
];

export default function books(state = initialState, action) {
  let bookList = state.slice();

  switch (action.type) {
    case "ADD_BOOK":
      return [
        ...state,
        {
          title: action.title,
          author: action.author,
          description: action.description,
          free: action.free,
          category:action.category,
        }
      ];

    case "UPDATE_BOOK":
      let updateBook = bookList(action.id);

      updateBook.title = action.title;
      updateBook.author = action.author;
      updateBook.description = action.default;
      updateBook.free = action.free;
      updateBook.category = action.category;

      updateBook.splice(action.id, 1, updateBook);

      return updateBook;

    case "DELETE_BOOK":
      bookList.splice(action.id, 1);

      return bookList;

    default:
      return state;
  }
}
