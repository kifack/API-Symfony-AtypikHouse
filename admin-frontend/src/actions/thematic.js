import api from "../utils/api";
import { v4 as uuidv4 } from "uuid";
import {
  LOAD_THEMATICS,
  LOAD_THEMATICS_SUCCESS,
  LOAD_THEMATICS_ERROR,
  ADD_THEMATIC,
  ADD_THEMATIC_ERROR,
} from "./types";

// Add an experience
export const addThematic = (formData) => async (dispatch) => {
  try {
    let res = await api.post("/thematics", formData);
    dispatch({
      type: ADD_THEMATIC,
      payload: res.data,
    });
    console.log(res.data);
  } catch (err) {
    dispatch({
      type: ADD_THEMATIC_ERROR,
    });
  }
};

// Load all thematics
export const loadThematics = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_THEMATICS,
    });
    let res = await api.get("/All/thematics");
    dispatch({
      type: LOAD_THEMATICS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_THEMATICS_ERROR,
    });
  }
};
