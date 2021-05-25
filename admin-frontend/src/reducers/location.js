import {
  LOAD_LOCATIONS,
  LOAD_LOCATIONS_SUCCESS,
  LOAD_LOCATIONS_ERROR,
  VALIDATE_LOCATION,
  VALIDATE_LOCATION_ERROR,
  DEACTIVATE_LOCATION,
  DEACTIVATE_LOCATION_ERROR,
  LOAD_LOCATION,
  LOAD_LOCATION_SUCCESS,
  LOAD_LOCATION_ERROR,
} from "../actions/types";

const initialState = {
  locations: [],
  location: null,
  loading: false,
  loadingLocation: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  let index, locations;

  switch (type) {
    case LOAD_LOCATIONS:
      return {
        ...state,
        loading: true,
      };
    case LOAD_LOCATIONS_SUCCESS:
      return {
        ...state,
        locations: payload,
        loading: false,
      };

    case LOAD_LOCATION:
      return {
        ...state,
        loadingLocation: true,
        location: null,
      };
    case LOAD_LOCATION_SUCCESS:
      return {
        ...state,
        location: payload,
        loadingLocation: false,
      };
    case VALIDATE_LOCATION:
      index = state.locations.findIndex((item) => item.id === payload);
      locations = state.locations;
      locations[index].status = 1;

      return {
        ...state,
        locations: [...locations],
        loading: false,
      };
    case DEACTIVATE_LOCATION:
      index = state.locations.findIndex((item) => item.id === payload);
      locations = state.locations;
      locations[index].status = 2;

      return {
        ...state,
        locations: [...locations],
        loading: false,
      };

    default:
      return state;
  }
}
