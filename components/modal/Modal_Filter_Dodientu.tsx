import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import Filter_dienthoai from "../filter/Filter_dienthoai";
import Filter_laptop from "../filter/Filter_laptop";
import Filter_maytinhbang from "../filter/Filter_maytinhbang";
import Filter_desktop from "../filter/Filter_desktop";
import Filter_mayanh from "../filter/Filter_mayanh";
import { useMyContext } from "@/contexts/MyContext";

interface ModalProps {
  type: any;
  hang?: any;
  setHang?: any;
  dongmay?: any;
  setdongmay?: any;
  mausac?: any;
  setMausac?: any;
  dungluong?: any;
  setDungluong?: any;
  chip?: any;
  setChip?: any;
  ram?: any;
  setRam?: any;
  sim?: any;
  setSim?: any;
  loaiocung?: any;
  setLoaiocung?: any;
  loaiCardmanhinh?: any;
  setCardmanhinh?: any;
  kichthuocmanhinh?: any;
  setKichthuocmanhinh?: any;
  loaimayanh?: any;
  setLoaimayanh?: any;
  setFilteredHang: any;
  fetchDataProduct_filter: any;
  setpagehientai: any;
  openModalFilter: boolean;
  setopenModalFilter: any;
}
const Modal_Filter_Dodientu: React.FC<ModalProps> = ({
  type, // dienthoai, laptop, oto, xemay,...
  hang,
  setHang,
  dongmay,
  setdongmay,
  mausac,
  setMausac,
  dungluong,
  setDungluong,
  chip,
  setChip,
  ram,
  setRam,
  sim,
  setSim,
  loaiocung,
  setLoaiocung,
  loaiCardmanhinh,
  setCardmanhinh,
  kichthuocmanhinh,
  setKichthuocmanhinh,
  loaimayanh,
  setLoaimayanh,
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
    if (type === "dienthoai") {
      setHang(undefined);
      setFilteredHang(null);
      setMausac(undefined);
      setDungluong(undefined);
      setRam(undefined);
      setdongmay(undefined);
    }
    if (type === "maytinhbang") {
      setHang(undefined);
      setFilteredHang(null);
      setDungluong(undefined);
      setRam(undefined);
      setSim(0), setKichthuocmanhinh(undefined);
      setdongmay(undefined);
    }
    if (type === "laptop") {
      setHang(undefined);
      setFilteredHang(null);
      setDungluong(undefined);
      setRam(undefined);
      setKichthuocmanhinh(undefined);
      setLoaiocung("SSD"), setCardmanhinh(undefined);
      setChip(undefined);
      setdongmay(undefined);
    }
    if (type === "desktop") {
      setHang(undefined);
      setFilteredHang(null);
      setDungluong(undefined);
      setRam(undefined);
      setKichthuocmanhinh(undefined);
      setLoaiocung("SSD"), setCardmanhinh(undefined);
    }
    if (type === "mayanh") {
      setHang(undefined);
      setFilteredHang(null);
      setLoaimayanh("mayanh");
      setdongmay(undefined);
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
          {type === "dienthoai" && (
            <div className="modal-body px-5 py-2 h-[650px] flex flex-col place-content-between">
              <Filter_dienthoai
                typeHang={hang}
                settypeHang={setHang}
                setFilteredHang={setFilteredHang}
                dongmay={dongmay}
                setdongmay={setdongmay}
                mausac={mausac}
                setMausac={setMausac}
                dungluong={dungluong}
                setDungluong={setDungluong}
                ram={ram}
                setRam={setRam}
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
          {type === "maytinhbang" && (
            <div className="modal-body px-5 py-2 h-[850px] flex flex-col place-content-between">
              <Filter_maytinhbang
                typeHang={hang}
                settypeHang={setHang}
                setFilteredHang={setFilteredHang}
                dongmay={dongmay}
                setdongmay={setdongmay}
                mausac={mausac}
                setMausac={setMausac}
                dungluong={dungluong}
                setDungluong={setDungluong}
                ram={ram}
                setRam={setRam}
                kichthuocmanhinh={kichthuocmanhinh}
                setKichthuocmanhinh={setKichthuocmanhinh}
                sim={sim}
                setSim={setSim}
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
          {type === "laptop" && (
            <div className="modal-body px-5 py-2 h-[850px] flex flex-col place-content-between">
              <Filter_laptop
                typeHang={hang}
                settypeHang={setHang}
                setFilteredHang={setFilteredHang}
                dongmay={dongmay}
                setdongmay={setdongmay}
                dungluong={dungluong}
                setDungluong={setDungluong}
                ram={ram}
                setRam={setRam}
                loaiocung={loaiocung}
                setLoaiocung={setLoaiocung}
                loaiCardmanhinh={loaiCardmanhinh}
                setCardmanhinh={setCardmanhinh}
                kichthuocmanhinh={kichthuocmanhinh}
                setKichthuocmanhinh={setKichthuocmanhinh}
                chip={chip}
                setChip={setChip}
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
          {type === "desktop" && (
            <div className="modal-body px-5 py-2 h-[800px] flex flex-col place-content-between">
              <Filter_desktop
                typeHang={hang}
                settypeHang={setHang}
                setFilteredHang={setFilteredHang}
                dungluong={dungluong}
                setDungluong={setDungluong}
                ram={ram}
                setRam={setRam}
                loaiocung={loaiocung}
                setLoaiocung={setLoaiocung}
                loaiCardmanhinh={loaiCardmanhinh}
                setCardmanhinh={setCardmanhinh}
                kichthuocmanhinh={kichthuocmanhinh}
                setKichthuocmanhinh={setKichthuocmanhinh}
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
          {type === "mayanh" && (
            <div className="modal-body px-5 py-2 h-[450px] flex flex-col place-content-between">
              <Filter_mayanh
                typeHang={hang}
                settypeHang={setHang}
                setFilteredHang={setFilteredHang}
                loaimayanh={loaimayanh}
                setLoaimayanh={setLoaimayanh}
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

export default Modal_Filter_Dodientu;
