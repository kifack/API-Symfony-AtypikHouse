import { applyMiddleware, createStore } from "redux";
import rootReducer from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

//const applyMiddleware = redux.applyMiddleware

const dataUse = {
  profil: {
    id: "Anonymous",
    name: "Anonyumous",
    lastName: "Anonymous",
  },
  destinations: null,
  error: null,
  load: false,
  connect: false,
};
export default function configureStore(etatInitial = {}) {
  return createStore(
    rootReducer,
    etatInitial,
    composeWithDevTools(applyMiddleware(thunk))
  );
}
