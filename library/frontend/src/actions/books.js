import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

export const fetch = books => {
  return {
    type: "FETCH_BOOKS",
    books
  };
};

export const fetchBooks =  () => {
  return dispatch => {
    return axios
      .get("/api/books/")
      .then(res => {
        dispatch(fetch(res.data));
      })
      .catch(err => {
        throw err;
      });
  };
};

export const addBook = (id, title, author, description, free, category) => {
  return dispatch => {
    return axios
      .post("/api/books/", { id, title, author, description, free, category })
      .then(res => {
        dispatch(add(res.data));
      })
      .catch(err => {
        throw err;
      });
  };
};

export const add = data => {
  return {
    type: "ADD_BOOK",
    payload: {
      id: data.id,
      title: data.title,
      author: data.author,
      description: data.description,
      free: data.free,
      category: data.category
    }
  };
};

export const del = id => {
  return {
    type: "DELETE_BOOK",
    params: {
      id
    }
  };
};

export const deleteBook = id => {
  return (dispatch, getState) => {
    // let bookId = getState().books[index].id;
    return axios
      .delete(`/api/books/${id}/`)
      .then(res => {
        dispatch(del(res.data));
      })
      .catch(err => {
        throw err;
      });
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

export const borrow = data => {
  return {
    type: "BORROW_BOOK",
    payload: {
      id: data.id,
      title: data.title,
      author: data.author,
      description: data.description,
      free: data.free,
      category: data.category
    }
  };
};

export const borrowBook = (id, title, author, description, free, category) => {
  // console.log(id, title, author, description, free, category);
  free = "false";
  return dispatch => {
    return axios
      .put(`/api/books/${id}/`, {
        id,
        title,
        author,
        description,
        free,
        category
      })
      .then(res => {
        dispatch(borrow(res.data));
      })
      .catch(err => {
        throw err;
      });
  };
};
