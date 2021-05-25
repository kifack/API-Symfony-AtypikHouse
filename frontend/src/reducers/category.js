import {
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORIES_ERROR,
  LOAD_FIELDS,
  LOAD_FIELDS_ERROR,
  LOAD_FIELDS_SUCCESS,
} from "./../actions/types";

const initialState = {
  categories: [],
  category: null,
  loading: false,
  // location fields
  fields: [],
  isLoadingFields: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_CATEGORIES:
      return {
        ...state,
        loading: true,
      };
    case LOAD_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: payload,
        loading: false,
      };

    case LOAD_FIELDS:
      return {
        isLoadingFields: true,
      };

    case LOAD_FIELDS_SUCCESS:
      return {
        ...state,
        fields: payload,
        isLoadingFields: false,
      };

    default:
      return state;
  }
}
