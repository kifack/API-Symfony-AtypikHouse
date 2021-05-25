import axios from "axios";
import setAuthorizationToken from "./../tools/setAuthorizationToken";
import jwt from "jsonwebtoken";
import { API_ROOT } from "../components/urls";

export const registerOwnerApi = (data) => {
  let owner = axios
    .post(API_ROOT + "/owner/register", data)
    .then((res) => {
      const message = res.data;
      return message;
    })
    .catch((error) => {
      return (error = {
        error: error,
      });
    });
  return owner;
};
