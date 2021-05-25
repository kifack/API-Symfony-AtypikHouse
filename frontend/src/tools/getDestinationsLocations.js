import axios from "axios";
import { API_ROOT } from "../components/urls";
export const allDestinApi = () => {
  let destinations = axios.get(API_ROOT + "/All/destinations").then((res) => {
    return res;
  });
  return destinations;
};
