import {
  LOAD_ACTIVITIES,
  LOAD_ACTIVITIES_SUCCESS,
  LOAD_ACTIVITIES_ERROR,
  ADD_ACTIVITY,
  ADD_ACTIVITY_SUCCESS,
  ADD_ACTIVITY_ERROR,
} from "../actions/types";

const initialState = {
  activities: [],
  loading: false,
  isAddingActivity: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_ACTIVITY:
      return {
        ...state,
        isAddingActivity: true,
      };

    case ADD_ACTIVITY_SUCCESS:
      return {
        ...state,
        isAddingActivity: false,
      };

    case ADD_ACTIVITY_ERROR:
      return {
        ...state,
        isAddingActivity: false,
      };

    //Load user's bookings
    case LOAD_ACTIVITIES:
      return {
        ...state,
        loading: true,
      };

    case LOAD_ACTIVITIES_SUCCESS:
      return {
        ...state,
        activities: [...payload],
        loading: false,
      };

    case LOAD_ACTIVITIES_ERROR:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
