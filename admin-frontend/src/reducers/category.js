import {
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORIES_ERROR,
  ADD_CATEGORY,
  ADD_CATEGORY_ERROR,
} from "../actions/types";

const initialState = {
  categories: [],
  loading: false,
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
        categories: [...payload],
        loading: false,
      };
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, payload],
        loading: false,
      };

    default:
      return state;
  }
}
