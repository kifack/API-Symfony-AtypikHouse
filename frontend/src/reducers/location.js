import {
  LOAD_LOCATIONS,
  LOAD_LOCATIONS_SUCCESS,
  LOAD_LOCATION,
  LOAD_LOCATION_SUCCESS,
  LOAD_LOCATION_ERROR,
  ADD_LOCATION,
  ADD_LOCATION_SUCCESS,
  ADD_LOCATION_ERROR,
  LOAD_ALL_LOCATIONS,
} from "../actions/types";

const initialState = {
  locations: [],
  location: null,
  loading: false,
  isAddingLocation: false,
  isLoadingLocation: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

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

    case ADD_LOCATION:
      return {
        ...state,
        isAddingLocation: true,
      };

    case ADD_LOCATION_SUCCESS:
      return {
        ...state,
        isAddingLocation: false,
      };

    case ADD_LOCATION_ERROR:
      return {
        ...state,
        isAddingLocation: false,
      };

    case LOAD_LOCATION:
      return {
        ...state,
        isLoadingLocation: true,
        location: null,
      };
    case LOAD_LOCATION_SUCCESS:
      return {
        ...state,
        location: payload,
        isLoadingLocation: false,
      };

    case LOAD_ALL_LOCATIONS:
      return {
        ...state,
        locations: action.payload,
      };

    default:
      return state;
  }
}
