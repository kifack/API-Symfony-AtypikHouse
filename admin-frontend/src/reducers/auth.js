import {
  LOAD_USER_REQUEST,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../actions/types";
import setAuthToken from "../utils/setAuthToken";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: false,
  user: null,
  isLogining: false,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_LOADED:
      if (payload.roles.indexOf("ROLE_ADMIN") >= 0) {
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: payload,
        };
      } else {
        return {
          ...state,
          isAuthenticated: false,
          loading: false,
          error: "Vous n'avez pas des droits d'accés",
        };
      }
    case LOGIN_REQUEST:
      return {
        ...state,
        isLogining: true,
      };
    case LOGIN_SUCCESS:
      if (payload.user.roles.indexOf("ROLE_ADMIN") >= 0) {
        localStorage.setItem("token", payload.token);
        setAuthToken(payload.token);
        return {
          ...state,
          isAuthenticated: true,
          isLogining: false,
          user: payload.user,
        };
      } else {
        return {
          ...state,
          isAuthenticated: false,
          isLogining: false,
          error: "Vous n'avez pas des droits d'accéss",
        };
      }

    case AUTH_ERROR:
    case LOGOUT:
      console.log("logout");
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: payload,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        isLogining: false,
        error: payload.message,
      };

    default:
      return state;
  }
}
