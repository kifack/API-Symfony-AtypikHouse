import {
  LOAD_COMMENTS,
  LOAD_COMMENTS_SUCCESS,
  LOAD_COMMENTS_ERROR,
  DELETE_COMMENT,
  DELETE_COMMENT_ERROR,
} from "../actions/types";

const initialState = {
  comments: [],
  loading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_COMMENTS:
      return {
        ...state,
        loading: true,
      };

    case LOAD_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: payload,
        loading: false,
      };
    case DELETE_COMMENT:
      let filteredComments = state.comments.filter(
        (item) => item.id !== payload
      );
      return {
        ...state,
        comments: [...filteredComments],
        loading: false,
      };

    default:
      return state;
  }
}
