import { connexionApi } from "./../tools/connexionService";
import { allDestinApi } from "./../tools/getDestinationsLocations";
import { dataUser } from "./../tools/connexionService";
import { registerApi } from "./../tools/registerService";
import { AUTH_ERRO, AUTH_USER, REG_USER, REG_ERRO, GET_USER } from "./types";
export const userData = (data) => async (dispatch, getState) => {
  const userdataConnect = await dataUser(data);
  let userInfo = userdataConnect.data["hydra:member"][0];
  if (userInfo === undefined) {
    userInfo = userdataConnect.data[0]; 
  }
  dispatch({
    type: "GET_USER",
    user: userInfo,
  });
};

export const authentification = (data) => async (dispatch, getState) => {
  const userConnexion = await connexionApi(data);

  if (userConnexion.error) {
    dispatch({
      type: "AUTH_ERRO",
      user: userConnexion,
    });
  } else {
    dispatch({
      type: "AUTH_USER",
      user: userConnexion,
    });
  }
};

export const registration = (data) => async (dispatch, getState) => {
  const userRegisteration = await registerApi(data);
  let userRegDetails = userRegisteration["hydra:member"];
  if (userRegDetails === undefined) {
    userRegDetails = userRegisteration;
  }

  if (userRegisteration.error) {
    dispatch({
      type: "REG_ERRO",
      payload: userRegisteration.error.response.data["hydra:description"],
    });
  } else {
    dispatch({
      type: "REG_USER",
      payload: userRegDetails,
    });
  }
};

export const loadingData = () => {
  return {
    type: "LOAD_END",
  };
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: "LOGOUT",
  });
};
