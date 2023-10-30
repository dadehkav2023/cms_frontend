import React from "react";
import { UseSignChallenge } from "../../../../core/services/api/sign-challenge";
import { useUserAuth } from "../../../../core/utils/context/AuthenticationContext";
import { showToast } from "../../../../core/utils/show-toast";
import "./PeoplesVoiceSignButton.scss";
const PeoplesVoiceSignButton = ({ ButtonText, challengeId }) => {
  const { userInfo } = useUserAuth();
  const {
    data: signData,
    isError: signIsError,
    isLoading: signIsLoading,
    isSuccess: signIsSuccess,
    mutate: signMutate,
  } = UseSignChallenge();

  const sign = () => {
    signMutate({
      farmerVoiceId: challengeId,
      signatoryNationalCode: userInfo.userName,
      signatoryUserIp: "192.168.1.1",
    });
  };

  return (
    <span onClick={sign} id="Peoples-voice-button">
      {signIsLoading ? "در حال انجام" : ButtonText}
    </span>
  );
};
export default PeoplesVoiceSignButton;
