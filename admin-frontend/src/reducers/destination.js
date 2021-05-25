import {
  LOAD_DESTINATIONS,
  LOAD_DESTINATIONS_SUCCESS,
  LOAD_DESTINATIONS_ERROR,
  ADD_DESTINATION,
  ADD_DESTINATION_ERROR,
} from "../actions/types";

const initialState = {
  destinations: [],
  loading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_DESTINATION:
      return {
        ...state,
        destinations: [...state.destinations, payload],
        loading: false,
      };
    case LOAD_DESTINATIONS:
      return {
        ...state,
        loading: true,
      };
    case LOAD_DESTINATIONS_SUCCESS:
      return {
        ...state,
        destinations: payload,
        loading: false,
      };

    default:
      return state;
  }
}
