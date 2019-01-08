import axios from "axios";
import moment from "moment";

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

export const fetch = books => {
    return {
        type: "FETCH_BOOKS",
        books
    };
};

export const fetchBooks = () => {
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
        id
    };
};

export const deleteBook = id => {
    return (dispatch, getState) => {
        let bookId = id;
        return axios
            .delete(`/api/books/${id}/`)
            .then(res => {
                dispatch(del(bookId));
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

export const borrow = (book) => {
    return {
        type: "BORROW_BOOK",
        book
    };
};

export const addBorrow = (book, member) => {
    return {
        type: "ADD_BORROW",
        book,
        member
    }
}

export const borrowBook = (book, member) => {
    book.free = 'borrowed'
    let bookId = book.id
    let memberId = member
    let borrowedDate = moment().format("YYYY-MM-DD");


    return dispatch => {
        return axios
            .put(`/api/books/${book.id}/`, book)
            .then(res => {
                dispatch(borrow(book));
            })
            .catch(err => {
                throw err;
            }),
            axios
            .post("/api/borrow/", { bookId, memberId, borrowedDate })
            .then(res => {
                dispatch(addBorrow(res.data));
            })
            .catch(err => {
                throw err;
            });
    };
};