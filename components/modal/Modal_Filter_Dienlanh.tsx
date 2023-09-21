import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import Filter_tulanh from "../filter/Filter_tulanh";
import Filter_maygiat from "../filter/Filter_maygiat";
import Filter_maylanh from "../filter/Filter_maylanh";
import { useMyContext } from "@/contexts/MyContext";

interface ModalProps {
  type: any;
  hang?: any;
  setHang?: any;
  thetich?: any;
  setthetich?: any;
  khoiluonggiat?: any;
  setkhoiluonggiat?: any;
  cuagiat?: any;
  setcuagiat?: any;
  congsuat?: any;
  setcongsuat?: any;
  setFilteredHang: any;
  fetchDataProduct_filter: any;
  setpagehientai: any;
  openModalFilter: boolean;
  setopenModalFilter: any;
}
const Modal_Filter_Dienlanh: React.FC<ModalProps> = ({
  type, // tulanh, maygiat, maylanh
  hang,
  setHang,
  thetich,
  setthetich,
  khoiluonggiat,
  setkhoiluonggiat,
  cuagiat,
  setcuagiat,
  congsuat,
  setcongsuat,
  setFilteredHang,
  fetchDataProduct_filter,
  setpagehientai,
  openModalFilter,
  setopenModalFilter,
}) => {
  if (!openModalFilter) return null;

  const handleClick_Filter = () => {
    if (hang) {
      fetchDataProduct_filter();
    } else {
      setHang("ALL");
      fetchDataProduct_filter();
    }
    setpagehientai(1);
    setopenModalFilter(false);
  };
  const { countfilter, count_filter } = useMyContext();
  const handleClick_resetFilter = () => {
    if (type === "tulanh") {
      setHang("ALL");
      setFilteredHang(null);
      setthetich(undefined);
    }
    if (type === "maylanh") {
      setHang("ALL");
      setFilteredHang(null);
      setcongsuat(undefined);
    }
    if (type === "maygiat") {
      setHang("ALL");
      setFilteredHang(null);
      setkhoiluonggiat(undefined);
      setcuagiat(undefined);
    }
    setopenModalFilter(false);
    // count_filter(0);
    reset_count_filter();
  };
  const reset_count_filter = () => {
    count_filter(0);
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-30 flex items-start justify-center pt-[85px]">
      <div className="modal-overlay absolute inset-0 bg-gray-900 opacity-20" />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.3, delay: 0.1 },
        }}
        exit={{ opacity: 0, y: -50, transition: { duration: 0.3 } }}
        className="modal-container bg-white h-auto w-[600px] mx-auto rounded-lg shadow-lg z-50 overflow-y-auto"
      >
        <div className="modal-content">
          <div className="modal-header font-bold p-2 bg-mauxanhtroi text-white flex items-center place-content-between">
            <h3 className="text-lg font-semibold text-white pl-2">Bộ lọc</h3>
            <button
              className="modal-close-btn text-white px-2 py-1 "
              onClick={() => setopenModalFilter(false)}
            >
              ✖
            </button>
          </div>
          {type === "tulanh" && (
            <div className="modal-body px-5 py-2 h-[500px] flex flex-col place-content-between">
              <Filter_tulanh
                typeHang={hang}
                settypeHang={setHang}
                setFilteredHang={setFilteredHang}
                thetich={thetich}
                setthetich={setthetich}
              />
              {/* button */}
              <div className="h-[60px] w-full flex items-center space-x-3 place-content-between">
                <button
                  className={`px-4 py-2 border border-gray-300 bg-gray-200 hover:bg-gray-300 rounded-md cursor-pointer`}
                  onClick={() => handleClick_resetFilter()}
                >
                  Bỏ lọc
                </button>
                <div className="space-x-3">
                  <button
                    className={`px-4 py-2 border border-gray-300 bg-gray-200 hover:bg-mauxanhtroi hover:text-white rounded-md cursor-pointer`}
                    onClick={() => handleClick_Filter()}
                  >
                    Áp dụng
                  </button>
                  <button
                    className={`px-4 py-2 border border-gray-300 bg-gray-200 hover:bg-gray-300 rounded-md cursor-pointer`}
                    onClick={() => setopenModalFilter(false)}
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          )}
          {type === "maygiat" && (
            <div className="modal-body px-5 py-2 h-[500px] flex flex-col place-content-between">
              <Filter_maygiat
                typeHang={hang}
                settypeHang={setHang}
                setFilteredHang={setFilteredHang}
                khoiluonggiat={khoiluonggiat}
                setkhoiluonggiat={setkhoiluonggiat}
                cuagiat={cuagiat}
                setcuagiat={setcuagiat}
              />
              {/* button */}
              <div className="h-[60px] w-full flex items-center space-x-3 place-content-between">
                <button
                  className={`px-4 py-2 border border-gray-300 bg-gray-200 hover:bg-gray-300 rounded-md cursor-pointer`}
                  onClick={() => handleClick_resetFilter()}
                >
                  Bỏ lọc
                </button>
                <div className="space-x-3">
                  <button
                    className={`px-4 py-2 border border-gray-300 bg-gray-200 hover:bg-mauxanhtroi hover:text-white rounded-md cursor-pointer`}
                    onClick={() => handleClick_Filter()}
                  >
                    Áp dụng
                  </button>
                  <button
                    className={`px-4 py-2 border border-gray-300 bg-gray-200 hover:bg-gray-300 rounded-md cursor-pointer`}
                    onClick={() => setopenModalFilter(false)}
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          )}
          {type === "maylanh" && (
            <div className="modal-body px-5 py-2 h-[500px] flex flex-col place-content-between">
              <Filter_maylanh
                typeHang={hang}
                settypeHang={setHang}
                setFilteredHang={setFilteredHang}
                congsuat={congsuat}
                setcongsuat={setcongsuat}
              />
              {/* button */}
              <div className="h-[60px] w-full flex items-center space-x-3 place-content-between">
                <button
                  className={`px-4 py-2 border border-gray-300 bg-gray-200 hover:bg-gray-300 rounded-md cursor-pointer`}
                  onClick={() => handleClick_resetFilter()}
                >
                  Bỏ lọc
                </button>
                <div className="space-x-3">
                  <button
                    className={`px-4 py-2 border border-gray-300 bg-gray-200 hover:bg-mauxanhtroi hover:text-white rounded-md cursor-pointer`}
                    onClick={() => handleClick_Filter()}
                  >
                    Áp dụng
                  </button>
                  <button
                    className={`px-4 py-2 border border-gray-300 bg-gray-200 hover:bg-gray-300 rounded-md cursor-pointer`}
                    onClick={() => setopenModalFilter(false)}
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default Modal_Filter_Dienlanh;
