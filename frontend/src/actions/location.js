import axios from "axios";
import { API_ROOT } from "../components/urls";

import {
  LOAD_LOCATIONS,
  LOAD_LOCATIONS_ERROR,
  LOAD_LOCATIONS_SUCCESS,
  LOAD_LOCATION,
  LOAD_LOCATION_SUCCESS,
  LOAD_LOCATION_ERROR,
  ADD_LOCATION,
  ADD_LOCATION_SUCCESS,
  ADD_LOCATION_ERROR,
  LOAD_ALL_LOCATIONS,
} from "./types";

export const loadLocations = (query) => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_LOCATIONS,
    });

    axios.defaults.headers.common["Accept"] = "application/json";
    let res = await axios.get(
      API_ROOT + "/All/locations?" + query + (query ? "&status=1" : "status=1")
    );
    dispatch({
      type: LOAD_LOCATIONS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_LOCATIONS_ERROR,
    });
  }
};

// Add location
export const addLocation = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_LOCATION,
    });

    axios.defaults.headers.common["Accept"] = "application/json";
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.jwtToken}`;
    let res = await axios.post(API_ROOT + "/locations", formData);
    console.log(res);
    dispatch({
      type: ADD_LOCATION_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ADD_LOCATION_ERROR,
    });
  }
};

// Load location
export const loadLocation = (locationId) => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_LOCATION,
    });

    axios.defaults.headers.common["Accept"] = "application/json";
    let res = await axios.get(API_ROOT + "/All/locations/" + locationId);
    console.log(res.data);
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

export const loadAllLocations = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_LOCATIONS,
    });

    axios.defaults.headers.common["Accept"] = "application/json";
    let res = await axios.get(API_ROOT + "/All/locations");

    dispatch({
      type: LOAD_ALL_LOCATIONS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_LOCATIONS_ERROR,
    });
  }
};
