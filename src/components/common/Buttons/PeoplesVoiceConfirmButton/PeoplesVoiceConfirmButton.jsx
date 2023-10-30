import React, { useEffect } from "react";
import { UseConfirmChallenge } from "../../../../core/services/api/confim-challenge";
import { useHistory } from "react-router-dom";
import { useUserAuth } from "../../../../core/utils/context/AuthenticationContext";
import { showToast } from "../../../../core/utils/show-toast";
import "./PeoplesVoiceConfirmButton.scss";
const PeoplesVoiceConfirmButton = ({ ButtonText, challengeId }) => {
  const history = useHistory();
  const {
    data: confirmData,
    isError: confirmIsError,
    isLoading: confirmIsLoading,
    isSuccess: confirmIsSuccess,
    mutate: confirmMutate,
  } = UseConfirmChallenge();

  const confirm = () => {
    confirmMutate({
      Id: challengeId,
    });
  };

  useEffect(() => {
    confirmIsSuccess && history.push("/");
  }, [confirmData]);

  return (
    <span onClick={confirm} id="Peoples-voice-confirm-button">
      {confirmIsLoading ? "در حال انجام" : ButtonText}
    </span>
  );
};
export default PeoplesVoiceConfirmButton;
