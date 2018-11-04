export const addAuthor = (name,gender,birthday,born,kind,description) => {
  return{
    type:'ADD_AUTHOR',
    name,
    gender,
    birthday,
    born,
    kind,
    description
  };
};

export const deleteAuthor = id => {
  return {
    type: "DELETE_AUTHOR",
    id
  };
};
