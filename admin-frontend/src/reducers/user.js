import {
  LOAD_USERS,
  LOAD_USERS_ERROR,
  LOAD_USERS_SUCCESS,
  LOAD_USER,
  LOAD_USER_SUCCESS,
  LOAD_USER_ERROR,
  TOGGLE_SIDEBAR,
  ACTIVATE_USER,
  ACTIVATE_USER_ERROR,
  DEACTIVATE_USER,
  DEACTIVATE_USER_ERROR,
} from "../actions/types";

const initialState = {
  users: [],
  user: null,
  loading: false,
  loadingUser: true,
  showSidebar: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  let index, users;

  switch (type) {
    case LOAD_USERS:
      return {
        ...state,
        loading: true,
      };
    case LOAD_USERS_SUCCESS:
      return {
        ...state,
        users: payload,
        loading: false,
      };

    case LOAD_USER:
      return {
        ...state,
        user: null,
        loadingUser: true,
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        loadingUser: false,
      };
    case ACTIVATE_USER:
      index = state.users.findIndex((item) => item.id === payload);
      users = state.users;
      users[index].status = 1;

      return {
        ...state,
        users: [...users],
        loading: false,
      };
    case DEACTIVATE_USER:
      index = state.users.findIndex((item) => item.id === payload);
      users = state.users;
      users[index].status = 0;

      return {
        ...state,
        users: [...users],
        loading: false,
      };

    case TOGGLE_SIDEBAR:
      return {
        ...state,
        showSidebar: !state.showSidebar,
      };

    default:
      return state;
  }
}
