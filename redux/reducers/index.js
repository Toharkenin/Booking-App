import { combineReducers } from "redux";
import appointmentReducer from "./appointmentReducer";
import userReducer from "./userSlice";

const rootReducer = combineReducers({
  appointment: appointmentReducer,
  userReducer: userReducer,
});

export default rootReducer;

