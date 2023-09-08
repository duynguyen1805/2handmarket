import React, { useEffect, useState } from "react";
import item_list_camera, { camera } from "../obj_data_raw/List_Camera";
import { useMyContext } from "@/contexts/MyContext";
const list_mayanh: camera[] = item_list_camera;

const filter_mayanh = ({
  typeHang,
  settypeHang,
  setFilteredHang,
  loaimayanh,
  setLoaimayanh,
}: any) => {
  const [openHangmayanh, setopenHangMayanh] = useState(false);
  // dung cho count filter
  const { countfilter, count_filter } = useMyContext();
  const [chonHangmayanh, setchonHangmayanh] = useState(false);
  const [chonLoaithietbi, setchonLoaithietbi] = useState(false);

  useEffect(() => {
    if (typeHang) {
      setchonHangmayanh(true);
      count_filter(countfilter - 1);
    }
    if (loaimayanh) {
      setchonLoaithietbi(true);
      count_filter(countfilter - 1);
    }
  }, []);
  useEffect(() => {
    if (chonHangmayanh) {
      count_filter(countfilter + 1);
    }
  }, [chonHangmayanh]);
  useEffect(() => {
    if (chonLoaithietbi) {
      count_filter(countfilter + 1);
    }
  }, [chonLoaithietbi]);

  const setSelectHangmayanh = (item: camera) => {
    settypeHang(item.type);
    setFilteredHang(item.key);
    setopenHangMayanh(!openHangmayanh);
    setchonHangmayanh(true);
  };
  const handleClick_loaithietbi = (n: string) => {
    setLoaimayanh(n);
    setchonLoaithietbi(true);
  };

  return (
    <>
      {/* cho mayanh */}
      <div className="h-auto w-full space-y-3">
        {/* chon loai thietbi */}
        <div className="h-[65px] w-full">
          <div className="h-[30px] px-1 flex">
            <p>Loại thiết bị</p>
          </div>
          <div className="flex item-center space-x-3">
            <button
              onClick={() => handleClick_loaithietbi("mayanh")}
              className={`h-[35px] w-auto px-5 rounded-full bg-gray-200 hover:border hover:border-mauxanhtroi ${
                loaimayanh === "mayanh" ? `bg-mauxanhtroi text-white` : ``
              }`}
            >
              Máy ảnh
            </button>
            <button
              onClick={() => handleClick_loaithietbi("mayquay")}
              className={`h-[35px] w-auto px-5 rounded-full bg-gray-200 hover:border hover:border-mauxanhtroi ${
                loaimayanh === "mayquay" ? `bg-mauxanhtroi text-white` : ``
              }`}
            >
              Máy quay
            </button>
            <button
              onClick={() => handleClick_loaithietbi("other")}
              className={`h-[35px] w-auto px-5 rounded-full bg-gray-200 hover:border hover:border-mauxanhtroi ${
                loaimayanh === "other" ? `bg-mauxanhtroi text-white` : ``
              }`}
            >
              Phụ kiện
            </button>
          </div>
        </div>
        {/* chon hang mayanh */}
        <div className="relative">
          <div className="mb-1 px-1 flex">
            <p>Hãng</p>
            <p className="text-red-500 ml-1">*</p>
          </div>
          <div
            onClick={() => setopenHangMayanh(!openHangmayanh)}
            className="capitalize h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {typeHang}
          </div>
          {openHangmayanh && (
            <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400 shadow-lg">
              {list_mayanh &&
                list_mayanh.map((item: camera) => {
                  return (
                    <div
                      key={item.key}
                      className="h-[40px] w-full hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                      onClick={() => setSelectHangmayanh(item)}
                    >
                      {item.label}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default filter_mayanh;
