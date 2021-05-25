import { REG_OWN, REG_OWN_ERROR } from "../actions/types";

const dataOutsider = {
  outSider: {
    id: "Anonymous",
    denomination: "Anonymous",
  },
  error: null,
  load: false,
};

const owner = (state = dataOutsider, action) => {
  switch (action.type) {
    case "REG_OWN":
      
      return {
        ...state,
        outSider: action.payload,
      };
    case "REG_OWN_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default owner;
