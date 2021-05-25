import api from "../utils/api";
import { v4 as uuidv4 } from "uuid";
import {
  LOAD_COMMENTS,
  LOAD_COMMENTS_SUCCESS,
  LOAD_COMMENTS_ERROR,
  DELETE_COMMENT,
  DELETE_COMMENT_ERROR,
} from "./types";

// Load User
export const loadComments = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_COMMENTS,
    });

    let res = await api.get("/All/comments?status=true");
    dispatch({
      type: LOAD_COMMENTS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_COMMENTS_ERROR,
    });
  }
};

export const deleteComment = (id) => async (dispatch) => {
  try {
    let res = await api.delete("/comments/" + id);
    dispatch({
      type: DELETE_COMMENT,
      payload: id,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: DELETE_COMMENT_ERROR,
    });
  }
};
