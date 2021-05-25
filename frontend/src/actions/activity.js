import axios from "axios";
import { API_ROOT } from "../components/urls";

import {
  LOAD_ACTIVITIES,
  LOAD_ACTIVITIES_SUCCESS,
  LOAD_ACTIVITIES_ERROR,
  ADD_ACTIVITY,
  ADD_ACTIVITY_SUCCESS,
  ADD_ACTIVITY_ERROR,
} from "./types";

// Add an activity
export const addActivity = (data) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_ACTIVITY,
    });

    axios.defaults.headers.common["Accept"] = "application/json";
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.jwtToken}`;
    let res = await axios.post(API_ROOT + "/activities", data);
    dispatch({
      type: ADD_ACTIVITY_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ADD_ACTIVITY_ERROR,
    });
  }
};

//Load activities
export const loadActivities = (locationId) => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_ACTIVITIES,
    });

    axios.defaults.headers.common["Accept"] = "application/json";

    let res = await axios.get(
      API_ROOT + "/All/activities?location=" + locationId
    );
    dispatch({
      type: LOAD_ACTIVITIES_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_ACTIVITIES_ERROR,
    });
  }
};
