import api from "../utils/api";
import { v4 as uuidv4 } from "uuid";
import {
  LOAD_DESTINATIONS,
  LOAD_DESTINATIONS_SUCCESS,
  LOAD_DESTINATIONS_ERROR,
  ADD_DESTINATION,
  ADD_DESTINATION_ERROR,
} from "./types";

// Add an experience
export const addDestination = (formData) => async (dispatch) => {
  try {
    let res = await api.post("/destinations", formData);
    dispatch({
      type: ADD_DESTINATION,
      payload: res.data,
    });
    console.log(res.data);
  } catch (err) {
    dispatch({
      type: ADD_DESTINATION_ERROR,
    });
  }
};

// Load all destinations
export const loadDestinations = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_DESTINATIONS,
    });
    let res = await api.get("/admin/destinations");
    dispatch({
      type: LOAD_DESTINATIONS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ADD_DESTINATION_ERROR,
    });
  }
};
