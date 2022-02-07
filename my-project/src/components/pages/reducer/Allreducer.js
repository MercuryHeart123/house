import Loginreducer from "./Loginreducer";
import Postreducer from "./Postreducer";
import { combineReducers } from "redux";

const Allreducer = combineReducers({
    username : Loginreducer,
    post : Postreducer
})
export default Allreducer