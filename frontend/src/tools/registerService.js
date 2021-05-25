import axios from "axios";
import setAuthorizationToken from "./../tools/setAuthorizationToken";
import jwt from "jsonwebtoken";
import { API_ROOT } from "../components/urls";

export const registerApi = (data) => {
  let profil = axios
    .post(API_ROOT + "/users/register", data)
    .then((res) => {
      const message = res.data;
      return message;
    })
    .catch((error) => {
      return (error = {
        error: error,
      });
    });
  return profil;
};
