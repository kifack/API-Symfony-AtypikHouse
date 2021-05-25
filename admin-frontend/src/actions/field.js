import api from "../utils/api";
import { v4 as uuidv4 } from "uuid";
import {
  LOAD_FIELDS,
  LOAD_FIELDS_ERROR,
  ADD_FIELD,
  ADD_FIELD_ERROR,
} from "./types";

// Ajouter un paramétre
export const addField = (formData) => async (dispatch) => {
  try {
    let res = await api.post("/fields", formData);
    dispatch({
      type: ADD_FIELD,
      payload: formData,
    });
  } catch (err) {
    dispatch({
      type: ADD_FIELD_ERROR,
    });
  }
};

// Charger les parametres
export const loadFields = (categoryId) => async (dispatch) => {
  try {
    // let data = [
    //   {
    //     id: uuidv4(),
    //     name: "firstName",
    //     label: "First Name:",
    //     typeName: "text",
    //   },
    //   {
    //     id: "4rferge5",
    //     name: "sex",
    //     label: "Sexe:",
    //     typeName: "select",
    //     choices: [
    //       {
    //         label: "Homme",
    //         value: "homme",
    //         id: "52fff",
    //       },
    //       {
    //         label: "Femme",
    //         value: "femme",
    //         id: "52fff",
    //       },
    //     ],
    //   },
    // ];
    let res = await api.get("/All/fields?category=" + categoryId);
    dispatch({
      type: LOAD_FIELDS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ADD_FIELD_ERROR,
    });
  }
};
