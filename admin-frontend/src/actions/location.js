import api from "../utils/api";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import {
  LOAD_LOCATIONS,
  LOAD_LOCATIONS_ERROR,
  LOAD_LOCATIONS_SUCCESS,
  VALIDATE_LOCATION,
  VALIDATE_LOCATION_ERROR,
  DEACTIVATE_LOCATION,
  DEACTIVATE_LOCATION_ERROR,
  LOAD_LOCATION,
  LOAD_LOCATION_SUCCESS,
  LOAD_LOCATION_ERROR,
} from "./types";

// Load User
export const loadLocations = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_LOCATIONS,
    });
    let res = await api.get("/admin/locations");
    dispatch({
      type: LOAD_LOCATIONS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: LOAD_LOCATIONS_ERROR,
    });
  }
};

export const validateLocation = (id) => async (dispatch) => {
  try {
    let res = await api.patch("/locations/" + id, { status: 1 });
    dispatch({
      type: VALIDATE_LOCATION,
      payload: id,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: VALIDATE_LOCATION_ERROR,
    });
  }
};

export const deactivateLocation = (id) => async (dispatch) => {
  try {
    let res = await api.patch("/locations/" + id, { status: 2 });
    dispatch({
      type: DEACTIVATE_LOCATION,
      payload: id,
    });
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: DEACTIVATE_LOCATION_ERROR,
    });
  }
};

// Load location
export const loadLocation = (locationId) => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_LOCATION,
    });

    let res = await api.get("All/locations/" + locationId);
    dispatch({
      type: LOAD_LOCATION_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_LOCATION_ERROR,
    });
  }
};
