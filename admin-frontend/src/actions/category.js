import api from "../utils/api";
import { v4 as uuidv4 } from "uuid";
import {
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORIES_ERROR,
  ADD_CATEGORY,
  ADD_CATEGORY_ERROR,
} from "./types";

// Ajouter un type d'hébergement
export const addCategory = (formData) => async (dispatch) => {
  try {
    let res = await api.post("/categories", formData);
    dispatch({
      type: ADD_CATEGORY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ADD_CATEGORY_ERROR,
    });
  }
};

// Load User
export const loadCategories = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_CATEGORIES,
    });

    let res = await api.get("/admin/categories");

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
