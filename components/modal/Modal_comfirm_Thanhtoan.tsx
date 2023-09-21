import React, { useState } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import Button_thanhtoanMomo from "../thanhtoan/Button_thanhtoanMomo";

interface ModalProps {
  setOpenModalnangcapTinuutien: any;
  isopenModalnangcapTinuutien: boolean;
  //   handlebutton_nangcapTinuutien: any;
}

const ModalComponent: React.FC<ModalProps> = ({
  isopenModalnangcapTinuutien,
  setOpenModalnangcapTinuutien,
  //   handlebutton_nangcapTinuutien,
}) => {
  if (!isopenModalnangcapTinuutien) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-30 flex items-center justify-center">
      <div className="modal-overlay absolute inset-0 bg-gray-900 opacity-20" />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.3, delay: 0.1 },
        }}
        exit={{ opacity: 0, y: -50, transition: { duration: 0.3 } }}
        className="modal-container bg-white h-auto w-[500px] md:max-w-md mx-auto rounded-lg shadow-lg z-50 overflow-y-auto"
      >
        <div className="modal-content">
          <div className="modal-header font-bold px-2 py-3 bg-mauxanhtroi text-white flex items-center place-content-between">
            <h3 className="text-lg font-semibold text-white">
              Nâng cấp Tin ưu tiên
            </h3>
            <button
              className="modal-close-btn text-white px-2 py-1 "
              onClick={() => setOpenModalnangcapTinuutien(false)}
            >
              ✖
            </button>
          </div>
          <div className="modal-body">
            <p className="text-lg h-[50px] w-full p-2">
              Phí nâng cấp Tin ưu tiên: 10.000 vnđ
            </p>
            <div className="h-[60px] w-full flex items-center justify-end px-2 space-x-3">
              <div className="">
                <Button_thanhtoanMomo />
              </div>
              <button
                className={`px-4 py-2 border border-gray-300 bg-gray-200 hover:bg-gray-300 rounded-md cursor-pointer`}
                onClick={() => setOpenModalnangcapTinuutien(false)}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default ModalComponent;
