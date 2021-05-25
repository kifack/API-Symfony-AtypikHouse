import { combineReducers } from "redux";
import auth from "./auth";
import location from "./location";
import user from "./user";
import comment from "./comment";
import destination from "./destination";
import category from "./category";
import thematic from "./thematic";
import field from "./field";

export default combineReducers({
  auth,
  location,
  user,
  comment,
  destination,
  category,
  thematic,
  field,
});
