import axios from "axios";
import { setAlert } from "./alert";

// Get current user profile
export const getProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: "GET_PROFILE",
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: "CLEAR_PROFILE" });
    dispatch({
      type: "PROFILE_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all profiles
export const getAllProfiles = () => async (dispatch) => {
  dispatch({ type: "CLEAR_PROFILE" });
  try {
    const res = await axios.get("/api/profile/");
    dispatch({
      type: "GET_PROFILES",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "PROFILE_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);
    dispatch({
      type: "GET_PROFILE",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "PROFILE_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update profile
export const createProfile = (formData, edit = false) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/profile", formData, config);

    dispatch({
      type: "GET_PROFILE",
      payload: res.data,
    });

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));
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

// Delete book
export const deleteBook = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/books/${id}`);

    dispatch({
      type: "UPDATE_PROFILE",
      payload: res.data,
    });

    dispatch(setAlert("Book Removed", "success"));
  } catch (err) {
    dispatch({
      type: "PROFILE_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete account & profile
// export const deleteAccount = () => async dispatch => {
// 	if (window.confirm('Are you sure? This can NOT be undone!')) {
// 		try {
// 			await api.delete('/profile');

// 			dispatch({ type: 'CLEAR_PROFILE' });
// 			dispatch({ type: 'ACCOUNT_DELETED' });

// 			dispatch(setAlert('Your account has been permanently deleted'));
// 		} catch (err) {
// 			dispatch({
// 				type: 'PROFILE_ERROR',
// 				payload: { msg: err.response.statusText, status: err.response.status },
// 			});
// 		}
// 	}
// };
