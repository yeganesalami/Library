import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

export const fetch = authors => {
  return {
    type: "FETCH_AUTHORS",
    authors
  };
};

export const fetchAuthors = () => {
  return dispatch => {
    return axios
      .get("/api/authors/")
      .then(res => {
        dispatch(fetch(res.data));
      })
      .catch(err => {
        throw err;
      });
  };
};

export const addAuthor = (
  id,
  name,
  gender,
  birthday,
  born,
  kind,
  description
) => {
  return dispatch => {
    return axios
      .post("/api/authors/", {
        id,
        name,
        gender,
        birthday,
        born,
        kind,
        description
      })
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
    type: "ADD_AUTHOR",
    payload: {
      id: data.id,
      name: data.name,
      gender: data.gender,
      birthday: data.birthday,
      born: data.born,
      kind: data.kind,
      description: data.description
    }
  };
};

export const del = id => {
  return {
    type: "DELETE_AUTHOR",
    params: {
      id
    }
  };
};

export const deleteAuthor = id => {
  return dispatch => {
    return axios
      .delete(`/api/authors/${id}/`)
      .then(res => {
        dispatch(del(res.data));
      })
      .catch(err => {
        throw err;
      });
  };
};
