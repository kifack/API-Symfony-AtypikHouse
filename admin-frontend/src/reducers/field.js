import {
  LOAD_FIELDS,
  LOAD_FIELDS_ERROR,
  ADD_FIELD,
  ADD_FIELD_ERROR,
} from "../actions/types";

const initialState = {
  fields: [],
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_FIELDS:
      return {
        ...state,
        fields: [...payload],
        loading: false,
      };
    case ADD_FIELD:
      return {
        ...state,
        fields: [...state.fields, payload],
        loading: false,
      };

    default:
      return state;
  }
}
