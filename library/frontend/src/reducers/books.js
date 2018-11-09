const initialState = [];

export default function books(state = initialState, action) {
  let bookList = state.slice();

  switch (action.type) {
    case 'FETCH_BOOKS':
      return[...state,...action.books];

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
