import axios from "axios";
import { allDestinApi } from "./../tools/getDestinationsLocations";
import { API_ROOT } from "../components/urls";

import {
  LOAD_DESTINATIONS,
  LOAD_DESTINATIONS_SUCCESS,
  LOAD_DESTINATIONS_ERROR,
} from "./types";

// Load all DESTINATIONS
export const loadDestinations = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_DESTINATIONS,
    });

    axios.defaults.headers.common["Accept"] = "application/json";
    let res = await axios.get(API_ROOT + "/All/destinations");

    dispatch({
      type: LOAD_DESTINATIONS_SUCCESS,
      destinations: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_DESTINATIONS_ERROR,
    });
  }
};

export const dataDestinations = () => async (dispatch, getState) => {
  const allDestinations = await allDestinApi();
  let destinationDetails = allDestinations.data["hydra:member"];
  if (destinationDetails === undefined) {
    destinationDetails = allDestinations.data;
  }
  dispatch({
    type: "GET_ALL_DESTINATIONS",
    destinations: destinationDetails,
  });
};
