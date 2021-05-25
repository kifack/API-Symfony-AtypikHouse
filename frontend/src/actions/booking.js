import axios from "axios";
import { API_ROOT } from "../components/urls";
import {
  ADD_BOOKING,
  ADD_BOOKING_SUCCESS,
  ADD_BOOKING_ERROR,
  LOAD_USER_BOOKINGS,
  LOAD_USER_BOOKING_SUCCESS,
  LOAD_USER_BOOKINGS_ERROR,
  LOAD_OWNER_BOOKINGS,
  LOAD_OWNER_BOOKING_SUCCESS,
  LOAD_OWNER_BOOKINGS_ERROR,
  LOAD_DATE_SLOTS,
  LOAD_DATE_SLOTS_SUCCESS,
  LOAD_DATE_SLOTS_ERROR,
  UPDATE_BOOKING_STATUS,
  UPDATE_BOOKING_STATUS_SUCCESS,
  UPDATE_BOOKING_STATUS_ERROR,
} from "./types";

// Load User
export const addBooking = (data) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_BOOKING,
    });

    axios.defaults.headers.common["Accept"] = "application/json";
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.jwtToken}`;
    let res = await axios.post(API_ROOT + "/bookings", data);
    dispatch({
      type: ADD_BOOKING_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ADD_BOOKING_ERROR,
    });
  }
};

export const loadUserBookings = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: LOAD_USER_BOOKINGS,
    });

    let id = getState().profil.profil.id;
    console.log(id);

    axios.defaults.headers.common["Accept"] = "application/json";

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.jwtToken}`;

    let res = await axios.get(API_ROOT + "/bookings?customer=" + id);
    dispatch({
      type: LOAD_USER_BOOKING_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: LOAD_USER_BOOKINGS_ERROR,
    });
  }
};

export const loadDateSlots = (locationId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LOAD_DATE_SLOTS,
    });

    axios.defaults.headers.common["Accept"] = "application/json";

    let res = await axios.get(API_ROOT + "/All/slots?location=" + locationId);
    dispatch({
      type: LOAD_DATE_SLOTS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: LOAD_DATE_SLOTS_ERROR,
    });
  }
};

export const loadOwnerBookings = (locationId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LOAD_OWNER_BOOKINGS,
    });

    axios.defaults.headers.common["Accept"] = "application/json";

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.jwtToken}`;

    let res = await axios.get(
      API_ROOT + "/owner/bookings?location=" + locationId
    );
    console.log(res.data);
    dispatch({
      type: LOAD_OWNER_BOOKING_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: LOAD_OWNER_BOOKINGS_ERROR,
    });
  }
};

// Update booking status
export const updateBookingStatus = (id, data) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_BOOKING_STATUS,
    });

    axios.defaults.headers.common["Accept"] = "application/json";
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.jwtToken}`;
    let res = await axios.patch(API_ROOT + "/bookings/" + id, data);
    dispatch({
      type: UPDATE_BOOKING_STATUS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_BOOKING_STATUS_ERROR,
    });
  }
};
