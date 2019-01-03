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

export const add = data => {
    return {
        type: "ADD_MEMBER",
        payload: {
            id: data.id,
            memberId: data.memberId,
            firstName: data.firstName,
            lastName: data.lastName,
            melliCode: data.melliCode,
            fatherName: data.fatherName,
            memberDate: data.memberDate,
            expirationDate: data.expirationDate
        }
    };
};

export const addMember = (
    id,
    memberId,
    firstName,
    lastName,
    melliCode,
    fatherName,
    memberDate,
    expirationDate,
    month
) => {
    return dispatch => {
        if (month === "3") {
            expirationDate = moment()
                .add(3, "months")
                .format("YYYY-MM-DD");
        }
        if (month === "6") {
            expirationDate = moment()
                .add(6, "months")
                .format("YYYY-MM-DD");
        }
        if (month === "12") {
            expirationDate = moment()
                .add(1, "year")
                .format("YYYY-MM-DD");
        }
        return axios
            .post("/api/members/", {
                id,
                memberId,
                firstName,
                lastName,
                melliCode,
                fatherName,
                memberDate,
                expirationDate
            })
            .then(res => {
                dispatch(add(res.data));
            })
            .catch(err => {
                throw err;
            });
    };
};

export const deactiveMember = (member) => {
    return dispatch => {
        member.expirationDate = moment().format("YYYY-MM-DD");
        return axios
            .put(`/api/members/${member.id}/`, member)
            .then(res => {
                dispatch(deactive(member));
            })
            .catch(err => {
                throw err;
            });
    };
};

export const deactive = data => {
    return {
        type: "DEACTIVE_MEMBER",
        data
    };
};

export const renewMember = (member, month) => {
    return dispatch => {
        if (month === "3") {
            member.expirationDate = moment()
                .add(3, "months")
                .format("YYYY-MM-DD");
        }
        if (month === "6") {
            member.expirationDate = moment()
                .add(6, "months")
                .format("YYYY-MM-DD");
        }
        if (month === "12") {
            member.expirationDate = moment()
                .add(1, "year")
                .format("YYYY-MM-DD");
        }
        return axios
            .put(`/api/members/${member.id}/`, member)
            .then(res => {
                dispatch(renew(member));
            })
            .catch(err => {
                throw err;
            });
    };
};

export const renew = member => {
    return {
        type: "RENEW_MEMBER",
        member
    };
};