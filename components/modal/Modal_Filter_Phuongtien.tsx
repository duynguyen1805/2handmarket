import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import Filter_xemay from "../filter/Filter_xemay";
import Filter_oto from "../filter/Filter_oto";
import Filter_xetai from "../filter/Filter_xetai";
import Filter_xedien from "../filter/Filter_xedien";
import { useMyContext } from "@/contexts/MyContext";

interface ModalProps {
  type: any;
  hang?: any;
  setHang?: any;
  dongxe?: any;
  setdongxe?: any;
  loaixemay?: any;
  setLoaixemay?: any;
  dungtich?: any;
  setDungtich?: any;
  hopso?: any;
  setHopso?: any;
  nhienlieu?: any;
  setNhienlieu?: any;
  sochongoi?: any;
  setChongoi?: any;
  taitrong?: any;
  setTaitrong?: any;
  dongcoxedien?: any;
  setDongcoxedien?: any;
  setFilteredHang: any;
  fetchDataProduct_filter: any;
  setpagehientai: any;
  openModalFilter: boolean;
  setopenModalFilter: any;
}
const Modal_Filter_Phuongtien: React.FC<ModalProps> = ({
  type, // oto, xemay,...
  hang,
  setHang,
  dongxe,
  setdongxe,
  loaixemay,
  setLoaixemay,
  dungtich,
  setDungtich,
  hopso,
  setHopso,
  nhienlieu,
  setNhienlieu,
  sochongoi,
  setChongoi,
  taitrong,
  setTaitrong,
  dongcoxedien,
  setDongcoxedien,
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
    if (type === "xemay") {
      setHang(undefined);
      setFilteredHang(null);
      setLoaixemay(undefined);
      setDungtich(undefined);
      setdongxe(undefined);
    }
    if (type === "oto") {
      setHang(undefined);
      setFilteredHang(null);
      setHopso(0);
      setNhienlieu(0);
      setChongoi(undefined);
      setdongxe(undefined);
    }
    if (type === "xetai") {
      setHang(undefined);
      setFilteredHang(null);
      setNhienlieu(0);
      setTaitrong(undefined);
    }
    if (type === "xedien") {
      setHang(undefined);
      setFilteredHang(null);
      setDongcoxedien(undefined);
    }
    setopenModalFilter(false);
    count_filter(0);
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-10 flex items-start justify-center pt-[85px]">
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
          {type === "xemay" && (
            <div className="modal-body px-5 py-2 h-[550px] flex flex-col place-content-between">
              <Filter_xemay
                typeHang={hang}
                settypeHang={setHang}
                setFilteredHang={setFilteredHang}
                dongxe={dongxe}
                setdongxe={setdongxe}
                loaixemay={loaixemay}
                setLoaixemay={setLoaixemay}
                dungtich={dungtich}
                setDungtich={setDungtich}
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
          {type === "oto" && (
            <div className="modal-body px-5 py-2 h-[500px] flex flex-col place-content-between">
              <Filter_oto
                typeHang={hang}
                settypeHang={setHang}
                setFilteredHang={setFilteredHang}
                dongxe={dongxe}
                setdongxe={setdongxe}
                hopso={hopso}
                setHopso={setHopso}
                nhienlieu={nhienlieu}
                setNhienlieu={setNhienlieu}
                sochongoi={sochongoi}
                setChongoi={setChongoi}
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
          {type === "xetai" && (
            <div className="modal-body px-5 py-2 h-[500px] flex flex-col place-content-between">
              <Filter_xetai
                typeHang={hang}
                settypeHang={setHang}
                setFilteredHang={setFilteredHang}
                taitrong={taitrong}
                setTaitrong={setTaitrong}
                nhienlieu={nhienlieu}
                setNhienlieu={setNhienlieu}
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
          {type === "xedien" && (
            <div className="modal-body px-5 py-2 h-[500px] flex flex-col place-content-between">
              <Filter_xedien
                loaixedien={hang}
                setLoaixedien={setHang}
                setFilteredHang={setFilteredHang}
                typedongcoxedien={dongcoxedien}
                setDongcoxedien={setDongcoxedien}
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

export default Modal_Filter_Phuongtien;
