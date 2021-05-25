import axios from "axios";
import { API_ROOT } from "../components/urls";
import {
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORIES_ERROR,
  LOAD_FIELDS,
  LOAD_FIELDS_ERROR,
  LOAD_FIELDS_SUCCESS,
} from "./types";

// Load all categories
export const loadCategories = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_CATEGORIES,
    });

    axios.defaults.headers.common["Accept"] = "application/json";

    let res = await axios.get(API_ROOT + "/All/categories");

    dispatch({
      type: LOAD_CATEGORIES_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_CATEGORIES_ERROR,
    });
  }
};

export const loadFields = (categoryId) => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_FIELDS,
    });

    axios.defaults.headers.common["Accept"] = "application/json";
    let res = await axios.get(API_ROOT + "/All/fields");
    dispatch({
      type: LOAD_FIELDS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_FIELDS_ERROR,
    });
  }
};
