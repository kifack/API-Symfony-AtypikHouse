import api from "./api";

const setAuthToken = (token) => {
  if (token) {
    console.log("setting...");
    api.defaults.headers.common.authorization = "Bearer " + token;
    localStorage.setItem("token", token);
  } else {
    console.log("deleting...");
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }
};

export default setAuthToken;
