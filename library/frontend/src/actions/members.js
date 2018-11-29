import axios from "axios";
import moment from "moment";

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

export const deactiveMember = (
  id,
  memberId,
  firstName,
  lastName,
  memberDate,
  expirationDate
) => {
  return dispatch => {
    expirationDate = moment().format("YYYY-MM-DD");
    return axios
      .put(`/api/members/${id}/`, {
        id,
        memberId,
        firstName,
        lastName,
        memberDate,
        expirationDate
      })
      .then(res => {
        dispatch(deactive(res.data));
      })
      .catch(err => {
        throw err;
      });
  };
};

export const deactive = data => {
  return {
    type: "DEACTIVE_MEMBER",
    payload: {
      id: data.id,
      memberId: data.memberId,
      firstName: data.firstName,
      lastName: data.lastName,
      memberDate: data.memberDate,
      expirationDate: data.expirationDate
    }
  };
};

export const renewMember = (
  id,
  memberId,
  firstName,
  lastName,
  memberDate,
  expirationDate
) => {
  return dispatch => {
    expirationDate = '2020-10-10';
    return axios
      .put(`/api/members/${id}/`, {
        id,
        memberId,
        firstName,
        lastName,
        memberDate,
        expirationDate
      })
      .then(res => {
        dispatch(renew(res.data));
      })
      .catch(err => {
        throw err;
      });
  };
};

export const renew = data => {
  return {
    type: "RENEW_MEMBER",
    payload: {
      id: data.id,
      memberId: data.memberId,
      firstName: data.firstName,
      lastName: data.lastName,
      memberDate: data.memberDate,
      expirationDate: data.expirationDate
    }
  };
};
