import Loginreducer from "./Loginreducer";
import Postreducer from "./Postreducer";
import ListReducer from "./ListReducer";
import { combineReducers } from "redux";

const Allreducer = combineReducers({
  username: Loginreducer,
  post: Postreducer,
  list: ListReducer,
});
export default Allreducer;
