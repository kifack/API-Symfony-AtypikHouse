import {
  LOAD_THEMATICS,
  LOAD_THEMATICS_SUCCESS,
  LOAD_THEMATICS_ERROR,
  ADD_THEMATIC,
  ADD_THEMATIC_ERROR,
} from "../actions/types";

const initialState = {
  thematics: [],
  loading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_THEMATIC:
      return {
        ...state,
        thematics: [...state.thematics, payload],
        loading: false,
      };

    case LOAD_THEMATICS:
      return {
        ...state,
        loading: true,
      };

    case LOAD_THEMATICS_SUCCESS:
      return {
        ...state,
        thematics: payload,
        loading: false,
      };

    default:
      return state;
  }
}
