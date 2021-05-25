import api from "../utils/api";
import axios from "axios";
import {
  LOAD_USER_REQUEST,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./types";

// Load User
export const loadUser = () => async (dispatch) => {
  dispatch({
    type: LOAD_USER_REQUEST,
  });

  try {
    let token = localStorage.getItem("token");

    let email = JSON.parse(atob(token.split(".")[1])).username;
    const res = await api.get("/users?email=" + email);

    dispatch({
      type: USER_LOADED,
      payload: res.data[0],
    });
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: AUTH_ERROR,
      payload: "Votre session a expiré",
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const body = { email, password };

  dispatch({
    type: LOGIN_REQUEST,
  });

  try {
    const res = await axios.post("http://localhost:8000/login", body);

    let data = {
      token: res.data.token,
      user: res.data.data,
    };
    console.log(data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });

    // dispatch(loadUser());/
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: LOGIN_FAIL,
    //   payload: err.response.data,
    // });
  }
};

// Logout
export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
