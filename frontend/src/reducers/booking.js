import {
  ADD_BOOKING,
  ADD_BOOKING_SUCCESS,
  ADD_BOOKING_ERROR,
  LOAD_USER_BOOKINGS,
  LOAD_USER_BOOKING_SUCCESS,
  LOAD_USER_BOOKINGS_ERROR,
  LOAD_OWNER_BOOKINGS,
  LOAD_OWNER_BOOKING_SUCCESS,
  LOAD_OWNER_BOOKINGS_ERROR,
  LOAD_DATE_SLOTS,
  LOAD_DATE_SLOTS_SUCCESS,
  LOAD_DATE_SLOTS_ERROR,
  UPDATE_BOOKING_STATUS,
  UPDATE_BOOKING_STATUS_SUCCESS,
  UPDATE_BOOKING_STATUS_ERROR,
} from "../actions/types";

const initialState = {
  userBookings: [],
  loadingUserBookings: false,

  // owner's bookings
  ownerBookings: [],
  isLoadingBookings: false,
  isAddingBooking: false,
  loadingSlots: false,
  slots: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_BOOKING:
      return {
        ...state,
        isAddingBooking: true,
      };

    case ADD_BOOKING_SUCCESS:
      return {
        ...state,
        isAddingBooking: false,
      };

    case ADD_BOOKING_ERROR:
      return {
        ...state,
        isAddingBooking: false,
      };

    //Load user's bookings
    case LOAD_USER_BOOKINGS:
      return {
        ...state,
        loadingUserBookings: true,
      };

    case LOAD_USER_BOOKING_SUCCESS:
      return {
        ...state,
        userBookings: payload,
        loadingUserBookings: false,
      };

    case LOAD_USER_BOOKINGS_ERROR:
      return {
        ...state,
        loadingUserBookings: false,
      };

    // Load owner's Bookings
    case LOAD_OWNER_BOOKINGS:
      return {
        ...state,
        isLoadingBookings: true,
      };

    case LOAD_OWNER_BOOKING_SUCCESS:
      return {
        ...state,
        ownerBookings: payload,
        isLoadingBookings: false,
      };

    case LOAD_OWNER_BOOKINGS_ERROR:
      return {
        ...state,
        isLoadingBookings: false,
      };

    //Load date slots
    case LOAD_DATE_SLOTS:
      return {
        ...state,
        loadingSlots: true,
      };

    case LOAD_DATE_SLOTS_SUCCESS:
      return {
        ...state,
        slots: payload,
        loadingSlots: false,
      };

    case LOAD_DATE_SLOTS_ERROR:
      return {
        ...state,
        loadingSlots: false,
      };

    //Update booking status
    case UPDATE_BOOKING_STATUS:
      return {
        ...state,
      };

    case UPDATE_BOOKING_STATUS_SUCCESS:
      return {
        ...state,
      };

    case UPDATE_BOOKING_STATUS_ERROR:
      return {
        ...state,
      };

    default:
      return state;
  }
}
