import axios from "axios";
import { UPDATE_USER, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR } from "./types";
import { API_ROOT } from "../components/urls";
// Update user profile
export const updateUser = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_USER,
    });

    let id = getState().profil.profil.id;

    axios.defaults.headers.common["Accept"] = "application/json";
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.jwtToken}`;
    let res = await axios.put(API_ROOT + "/users/" + id, data);
    console.log(res.data);
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_USER_ERROR,
    });
  }
};
