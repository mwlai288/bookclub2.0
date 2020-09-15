import axios from "axios";
import { setAlert } from "./alert";

export const searchedBooks = (search) => async (dispatch) => {
  const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
  const url = `https://www.googleapis.com/books/v1/volumes?q=${search}&orderBy=relevance&maxResults=25&printType=books&key=${apiKey}`;
  try {
    const res = await axios.get(url, {
      transformRequest: [
        (data, headers) => {
          delete headers["access-token"];
          delete headers["uid"];
          delete headers["client"];
          delete headers["expiry"];
          delete headers["token-type"];
          delete headers.common;
          return data;
        },
      ],
    });
    dispatch({
      type: "SEARCH_BOOKS",
      payload: res.data.items,
    });
  } catch (err) {
    dispatch({
      type: "CLEAR_BOOKS",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getBook = (id) => async (dispatch) => {
  const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
  const url = `https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`;
  try {
    const res = await axios.get(url, {
      transformRequest: [
        (data, headers) => {
          delete headers["access-token"];
          delete headers["uid"];
          delete headers["client"];
          delete headers["expiry"];
          delete headers["token-type"];
          delete headers.common;
          return data;
        },
      ],
    });
    dispatch({
      type: "GET_BOOK",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "CLEAR_BOOKS",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add book to profile
export const addBook = (bookData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/books", bookData, config);

    dispatch({
      type: "UPDATE_PROFILE",
      payload: res.data,
    });

    dispatch(setAlert("Book added", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: "PROFILE_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
