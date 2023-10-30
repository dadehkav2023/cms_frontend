// import { SettingActionType } from "../action-types/index";
// import { SettingAction } from "../actions";

const initialState = {
  title: "",
  body: "",
  show: false,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "setModal":
      return action.payload;

    default:
      return state;
  }
};

export default modalReducer;
