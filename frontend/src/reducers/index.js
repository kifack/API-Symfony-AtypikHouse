import { combineReducers } from "redux";
import profil from "./profil";
import location from "./location";
import category from "./category";
import thematic from "./thematic";
import destination from "./destination";
import booking from "./booking";
import comment from "./comment";
import activity from "./activity";
import loading from "./loading";
import owner from "./owner";

export default combineReducers({
  profil,
  location,
  category,
  thematic,
  destination,
  booking,
  comment,
  activity,
  loading,
  owner
});
