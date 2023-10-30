export const setSetting = (data) => {
  return (dispatch) => {
    dispatch({
      type: "setsetting",
      payload: data,
    });
  };
};
export const setModal = (data) => {
  return (dispatch) => {
    dispatch({
      type: "setModal",
      payload: data,
    });
  };
};
