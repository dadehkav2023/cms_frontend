import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { RootState } from "../../../core/state/reducers";
import "./Map.scss";
const Map = () => {
  const state = useSelector((state) => state.setting);
  const linkIsValidRegex = /http/;
  const [linkIsValid, setLinkIsValid] = useState(false);

  useEffect(() => {
    setLinkIsValid(linkIsValidRegex.test(state.googleMapLink));
  }, [state]);
  return linkIsValid ? (
    <section className="map-section">
      <iframe src={state.googleMapLink} title="map"></iframe>
    </section>
  ) : (
    <></>
  );
};
export default Map;
