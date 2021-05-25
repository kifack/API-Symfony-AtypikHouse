import axios from "axios";
import { API_ROOT } from "../components/urls";
import {
  LOAD_REVIEWS,
  LOAD_REVIEWS_SUCCESS,
  LOAD_REVIEWS_ERROR,
  ADD_REVIEW,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_ERROR,
  LOAD_COMMENTS,
  LOAD_COMMENTS_SUCCESS,
  LOAD_COMMENTS_ERROR,
  ADD_COMMENT,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_ERROR,
} from "./types";

// Load User
export const addReview = (data) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_REVIEW,
    });

    axios.defaults.headers.common["Accept"] = "application/json";
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.jwtToken}`;

    let res = await axios.post(API_ROOT + "/reviews", data);
    console.log(res.data);
    dispatch({
      type: ADD_REVIEW_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ADD_REVIEW_ERROR,
    });
  }
};

// Add a comment
export const addComment = (data) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_COMMENT,
    });

    axios.defaults.headers.common["Accept"] = "application/json";
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.jwtToken}`;

    let res = await axios.post(API_ROOT + "/comments", data);
    dispatch({
      type: ADD_COMMENT_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ADD_COMMENT_ERROR,
    });
  }
};

export const loadComments = (locationId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LOAD_COMMENTS,
    });

    axios.defaults.headers.common["Accept"] = "application/json";

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.jwtToken}`;

    let res = await axios.get(
      API_ROOT + "/All/comments?status=true&locations=" + locationId
    );
    dispatch({
      type: LOAD_COMMENTS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: LOAD_COMMENTS_ERROR,
    });
  }
};
