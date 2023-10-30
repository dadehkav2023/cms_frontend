import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function HandleScroll({ children }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <>{children}</>;
}
