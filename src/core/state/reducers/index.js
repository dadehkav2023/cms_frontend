import { combineReducers } from "redux";
import modalReducer from "./modalReducer";

import settingReducer from "./settingReducer";
import userReducer from "./userReducer";

const reducers = combineReducers({
  setting: settingReducer,
  modal: modalReducer,
  user: userReducer,
});

export default reducers;
