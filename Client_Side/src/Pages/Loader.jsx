import React from "react";
import { ScaleLoader } from "react-spinners";
const Loader = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <ScaleLoader />
    </div>
  );
};

export default Loader;
