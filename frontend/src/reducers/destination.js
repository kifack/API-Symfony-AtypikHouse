import {
  LOAD_DESTINATIONS,
  LOAD_DESTINATIONS_SUCCESS,
  LOAD_DESTINATIONS_ERROR,
  GET_ALL_DESTINATIONS,
} from "../actions/types";

const initialState = {
  destinations: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_DESTINATIONS_SUCCESS:
      return {
        ...state,
        destinations: action.destinations,
        loading: true,
      };
      case LOAD_DESTINATIONS:
        return {
          ...state,
          loading: false,
        };
    default:
      return state;
  }
}
