import React, { useState } from "react";
// frame motion
import { motion } from "framer-motion";

const Loading_item = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
      }}
      exit={{ opacity: 0, y: -50, transition: { duration: 0.3 } }}
      className={`sm:h-[280px] md:h-[330px] w-[228px] px-2 py-2 bg-white border border-gray-300 rounded-md shadow-sm`}
    >
      <div className="flex flex-col space-y-1 h-full">
        <div className="sm:h-[150px] md:h-[210px] w-full flex justify-center">
          <div className="h-[100%] w-[100%] slideBackground_loading"></div>
        </div>
        <div className="sm:h-[50px] md:h-[60px] w-full">
          <div className="h-[25px] w-[90%] slideBackground_loading"></div>
          <div className="h-[25px] w-2/3 mt-1 slideBackground_loading"></div>
        </div>
        <p className="h-[25px] w-full slideBackground_loading"></p>
        <p className="h-[25px] w-5/6 slideBackground_loading"></p>
      </div>
    </motion.div>
  );
};

export default Loading_item;
