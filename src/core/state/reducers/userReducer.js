// import { SettingActionType } from "../action-types/index";
// import { SettingAction } from "../actions";

const initialState = {
  Id: 0,
  fullName: "",
  username: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "setUser":
      return action.payload;

    default:
      return state;
  }
};

export default userReducer;
