import { useMyContext } from "@/contexts/MyContext";
import React from "react";

const Loading_routerpush = () => {
  const { isLoading } = useMyContext();
  return (
    <>{isLoading && <div className="loading-router z-30 mt-[80px]"></div>}</>
  );
};

export default Loading_routerpush;
