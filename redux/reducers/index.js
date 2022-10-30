import { combineReducers } from "redux";
import appointmentReducer from "./appointmentReducer.js";

let reducers = combineReducers({
  appointment: appointmentReducer,
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

export default rootReducer;