import React from "react";
import { useUserAuth } from "../../../../core/utils/context/AuthenticationContext";
import { showToast } from "../../../../core/utils/show-toast";
import "./NewChallengeButton.scss";

const NewChallengeButton = ({ action }) => {
  const { userInfo } = useUserAuth();

  return (
    <span
      onClick={() => {
        if (userInfo.userName) {
          action();
        } else {
          showToast(["!لطفا ابتدا وارد حساب خود شوید"], "error");
        }
      }}
      className="sign-button"
    >
      ایجاد چالش جدید
    </span>
  );
};
export default NewChallengeButton;
