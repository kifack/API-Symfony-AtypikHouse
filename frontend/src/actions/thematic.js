import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import {allThemaApi} from './../tools/getThematics';
import {
  LOAD_THEMATICS,
  LOAD_THEMATICS_SUCCESS
  
} from "./types";

export const dataThematics = () => async(
  dispatch,
  getState
) => {
  dispatch({
    type: LOAD_THEMATICS,
  });
  const allthematics = await allThemaApi();
  let thematicsDetails = allthematics.data["hydra:member"];
  
  if(thematicsDetails === undefined){
    thematicsDetails = allthematics.data;
  }
  dispatch({
      type : LOAD_THEMATICS_SUCCESS,
      payload :  thematicsDetails
  })

}

