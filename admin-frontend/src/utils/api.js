import axios from "axios";
import store from "../store/store";
import { LOGOUT } from "../actions/types";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v01",
  // baseURL: "http://api.f2i-dev2-ami-bc-akb-vyk.fr/api/v01",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const { dispatch } = store;

export default api;
