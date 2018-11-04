export const addBook = (title, author, description, free, category) => {
  return {
    type: "ADD_BOOK",
    title,
    author,
    description,
    free,
    category
  };
};

export const deleteBook = id => {
  return {
    type: "DELETE_BOOK",
    id
  };
};

export const updateBook = (id, title, author, description, free, category) => {
  return {
    type: "UPDATE_BOOK",
    id,
    title,
    author,
    description,
    free,
    category
  };
};
