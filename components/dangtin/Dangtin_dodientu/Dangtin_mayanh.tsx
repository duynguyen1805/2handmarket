import React, { useState } from "react";
import item_list_camera, { camera } from "../../obj_data_raw/List_Camera";
const list_mayanh: camera[] = item_list_camera;

const dangtin_mayanh = ({ settypeHang, loaimayanh, setLoaimayanh }: any) => {
  const [openHangmayanh, setopenHangMayanh] = useState(false);
  const [titleHangMayanh, settitleHangMayanh] = useState("");

  const setSelectHanglaptop = (item: camera) => {
    settitleHangMayanh(item.label);
    settypeHang(item.type);
    setopenHangMayanh(!openHangmayanh);
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
              onClick={() => setLoaimayanh("mayanh")}
              className={`h-[35px] w-auto px-5 rounded-full bg-gray-200 hover:border hover:border-mauxanhtroi ${
                loaimayanh === "mayanh" ? `bg-mauxanhtroi text-white` : ``
              }`}
            >
              Máy ảnh
            </button>
            <button
              onClick={() => setLoaimayanh("mayquay")}
              className={`h-[35px] w-auto px-5 rounded-full bg-gray-200 hover:border hover:border-mauxanhtroi ${
                loaimayanh === "mayquay" ? `bg-mauxanhtroi text-white` : ``
              }`}
            >
              Máy quay
            </button>
            <button
              onClick={() => setLoaimayanh("other")}
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
            className="h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {titleHangMayanh}
          </div>
          {openHangmayanh && (
            <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400 shadow-lg">
              {list_mayanh &&
                list_mayanh.map((item: camera) => {
                  return (
                    <div
                      key={item.key}
                      className="h-[40px] w-full hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                      onClick={() => setSelectHanglaptop(item)}
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

export default dangtin_mayanh;
