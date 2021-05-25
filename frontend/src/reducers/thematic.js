import {
  LOAD_THEMATICS,
  LOAD_THEMATICS_SUCCESS,
  LOAD_THEMATICS_ERROR,
} from "../actions/types";

const initialState = {
  thematics: [],
  loading: false,
};

export default function (state = initialState, action) {

  switch (action.type) {
    //
    case LOAD_THEMATICS_SUCCESS:
      
      return {
        ...state,
        thematics: action.payload,
        loading:true, 
      };
      case LOAD_THEMATICS:
      
      return {
        ...state,
        loading: false, 
      };

    default:
      return state;
  }
}
