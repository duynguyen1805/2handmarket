import React, { useState } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";

interface ModalProps {
  inputLydoantin: string;
  handleChangeLydoantin: any;
  handleUpdateStatusTindang: any;
  openlidotuchoi: boolean;
  Openlidotuchoi: any;
}

const ModalComponent: React.FC<ModalProps> = ({
  inputLydoantin,
  handleChangeLydoantin,
  handleUpdateStatusTindang,
  openlidotuchoi,
  Openlidotuchoi,
}) => {
  if (!openlidotuchoi) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div className="modal-overlay absolute inset-0 bg-gray-900 opacity-50" />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.3, delay: 0.1 },
        }}
        exit={{ opacity: 0, y: -50, transition: { duration: 0.3 } }}
        className="modal-container bg-white h-[315px] w-[500px] md:max-w-md mx-auto rounded-lg shadow-lg z-50 overflow-y-auto"
      >
        <div className="modal-content">
          <div className="modal-header font-bold px-2 py-3 bg-red-500 text-white flex items-center place-content-between">
            <h3 className="text-lg font-semibold text-white">Lý do từ chối</h3>
            <button
              className="modal-close-btn text-white px-2 py-1 "
              onClick={() => Openlidotuchoi()}
            >
              ✖
            </button>
          </div>
          <div className="modal-body">
            <textarea
              className="min-h-[200px] max-h-[200px] w-full p-2 border-t border-gray-400 outline-none"
              value={inputLydoantin}
              onChange={handleChangeLydoantin}
              placeholder="Nhập lý do."
            ></textarea>
            <div className="w-full flex items-center justify-end px-2">
              <button
                disabled={!inputLydoantin}
                className={`px-4 py-2 border border-gray-300 bg-gray-200 hover:bg-gray-300 rounded-md cursor-pointer`}
                onClick={() => handleUpdateStatusTindang()}
              >
                Xác nhận
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
