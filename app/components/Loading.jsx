import React from "react";
import { ClipLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="w-full h-screen overflow-hidden flex justify-center items-center">
      <ClipLoader color="#6366F1" loading margin={3} speedMultiplier={1} />
    </div>
  );
};

export default React.memo(Loading);
