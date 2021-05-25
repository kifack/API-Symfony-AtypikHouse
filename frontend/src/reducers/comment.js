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
} from "../actions/types";

const initialState = {
  reviews: [],
  loadingReviews: false,
  isAddingReview: false,
  // Comments
  locationComments: [],
  loadingLocationComments: false,
  isAddingComment: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_REVIEW:
      return {
        ...state,
        isAddingReview: true,
      };

    case ADD_REVIEW_SUCCESS:
      return {
        ...state,
        isAddingReview: false,
        reviews: [...state.reviews, payload],
      };

    case ADD_REVIEW_ERROR:
      return {
        ...state,
        isAddingReview: false,
      };

    //Load all reviews
    case LOAD_REVIEWS:
      return {
        ...state,
      };

    case LOAD_REVIEWS_SUCCESS:
      return {
        ...state,
      };

    case LOAD_REVIEWS_ERROR:
      return {
        ...state,
      };

    // Add Comments
    case ADD_COMMENT:
      return {
        ...state,
        isAddingComment: true,
      };

    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        isAddingComment: false,
        comments: [...state.comments, payload],
      };

    case ADD_COMMENT_ERROR:
      return {
        ...state,
        isAddingComment: false,
      };

    //Load comments
    case LOAD_COMMENTS:
      return {
        ...state,
        loadingLocationComments: true,
      };

    case LOAD_COMMENTS_SUCCESS:
      return {
        ...state,
        locationComments: [...payload],
        loadingLocationComments: false,
      };

    case LOAD_COMMENTS_ERROR:
      return {
        ...state,
        loadingLocationComments: false,
      };

    default:
      return state;
  }
}
