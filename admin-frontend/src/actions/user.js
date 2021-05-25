import api from "../utils/api";
import { v4 as uuidv4 } from "uuid";
import {
  LOAD_USERS,
  LOAD_USERS_ERROR,
  LOAD_USERS_SUCCESS,
  LOAD_USER,
  LOAD_USER_SUCCESS,
  LOAD_USER_ERROR,
  TOGGLE_SIDEBAR,
  ACTIVATE_USER,
  ACTIVATE_USER_ERROR,
  DEACTIVATE_USER,
  DEACTIVATE_USER_ERROR,
} from "./types";

// Load Users
export const loadUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_USERS,
    });

    let res = await api.get("/admin/users");

    dispatch({
      type: LOAD_USERS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_USERS_ERROR,
    });
  }
};

// Toggle sidebar
export const toggleSidebar = () => async (dispatch) => {
  dispatch({
    type: TOGGLE_SIDEBAR,
  });
};

// Load Users
export const loadUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_USER,
    });

    let res = await api.get("/All/users/" + id);
    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_USER_ERROR,
    });
  }
};

export const activateUser = (id) => async (dispatch) => {
  try {
    let res = await api.patch("/users/" + id, { status: true });
    dispatch({
      type: ACTIVATE_USER,
      payload: id,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: ACTIVATE_USER_ERROR,
    });
  }
};

export const deactivateUser = (id) => async (dispatch) => {
  try {
    let res = await api.patch("/users/" + id, { status: false });
    dispatch({
      type: DEACTIVATE_USER,
      payload: id,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: DEACTIVATE_USER_ERROR,
    });
  }
};
