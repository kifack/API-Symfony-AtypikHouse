import axios from "axios";
import setAuthorizationToken from "./../tools/setAuthorizationToken";
import jwt from "jsonwebtoken";
import { API_ROOT } from "../components/urls";

export const connexionApi = (data) => {
  let profil = axios
    .post("http://localhost:8000/login", data)
    // .post("http://api.f2i-dev2-ami-bc-akb-vyk.fr/login", data)
    .then((res) => {
      const user = res.data;
      localStorage.setItem("jwtToken", user.token);
      return (profil = {
        id: user.data.id,
        mail: user.data.email,
        roles: user.data.roles,
        name: user.data.name,
        lastName: user.data.lastName,
        phone: user.data.phone,
        rue: user.data.rue,
        city: user.data.city,
        zipCode: user.data.zipCode,
        dateOfBirth: user.data.dateOfBirth,
      });
    })
    .catch((error) => {
      return (error = {
        error: error,
      });
    });
  return profil;
};

export const dataUser = (data) => {
  let profil = axios
    .get(`${API_ROOT}/users?email=${data}`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return (error = {
        error: error,
      });
    });
  return profil;
};
