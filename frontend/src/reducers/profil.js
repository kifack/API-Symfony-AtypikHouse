const dataUse = {
  profil: {
    id: "Anonymous",
    name: "Anonymous",
    lastName: "Anonymous",
  },
  error: null,
  load: false,
  message: "",
  connect: false,
  inscrit: false,
};

const profil = (state = dataUse, action) => {
  switch (action.type) {
    case "GET_USER":
      return {
        ...state,
        profil: action.user,
        connect: true,
      };

    case "AUTH_USER":
      return {
        ...state,
        profil: action.user,
        connect: true,
      };
    case "LOGOUT":
      localStorage.removeItem("jwtToken");
      return {
        ...state,
        profil: null,
        connect: false,
      };
    case "AUTH_ERRO":
      return {
        ...state,
        error: action.user,
      };

    case "REG_USER":
      return {
        ...state,
        profil: action.payload[1],
        message: action.payload[0],
        inscrit: true,
      };
    case "REG_ERRO":
      return {
        ...state,
        error: action.payload,
      };
    case "LOAD_END":
      return {
        ...state,
        load: true,
      };

    case "ADD_ROLE_OWNER":
      let profil = state.profil;
      profil.roles.push("ROLE_OWNER");

      return {
        ...state,
        profil,
      };

    default:
      return state;
  }
};

export default profil;
