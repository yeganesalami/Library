import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

export const fetch = members => {
  return {
    type: "FETCH_MEMBERS",
    members
  };
};

export const fetchMembers = () => {
  return dispatch => {
    return axios
      .get("/api/members/")
      .then(res => {
        dispatch(fetch(res.data));
        // console.log(fetch(res.data));
      })
      .catch(err => {
        throw err;
      });
  };
};
