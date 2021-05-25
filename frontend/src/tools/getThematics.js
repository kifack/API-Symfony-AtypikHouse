import axios from "axios";
import { API_ROOT } from "../components/urls";
export const allThemaApi = () => {
  let thematics = axios.get(API_ROOT + "/All/thematics").then((res) => {
    return res;
  });
  return thematics;
};
