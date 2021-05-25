import { registerOwnerApi } from "../tools/registerOwner";
import { REG_OWN, REG_OWN_ERROR } from "./types";
import { userData } from "./index";
import setAuthorizationToken from "./../tools/setAuthorizationToken";
import jwt from "jsonwebtoken";

export const registration = (data) => async (dispatch, getState) => {
  const ownerRegisteration = await registerOwnerApi(data);
  let ownerRegDetails = ownerRegisteration["hydra:member"];
  if (ownerRegDetails === undefined) {
    ownerRegDetails = ownerRegisteration;
  }

  if (ownerRegisteration.error) {
    console.error("Error owner");
    dispatch({
      type: "REG_OWN_ERROR",
      payload: ownerRegisteration.error.response.data["hydra:description"],
    });
  } else {
    console.log("Success");
    dispatch({ type: "ADD_ROLE_OWNER" });
    dispatch({
      type: "REG_OWN",
      payload: ownerRegDetails,
    });
  }
};
