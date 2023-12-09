import React from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import Spinner from "./Spinner";

const Loader = () => {
  const { isLoading } = useTypedSelector((state) => state.loader);

  return isLoading ? (
    <div className="absolute top-0 z-50">
      <div className="flex flex-col items-center justify-center gap-6 h-screen w-screen bg-black bg-opacity-90">
        <Spinner />
        <div className="text-white font-semibold text-2xl">Transaction pending...</div>
      </div>
    </div>
  ) : (
    <React.Fragment></React.Fragment>
  );
};

export default Loader;
