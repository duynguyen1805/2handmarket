import React, { useState } from "react";
import item_list_camera, { camera } from "../../obj_data_raw/List_Camera";
const list_mayanh: camera[] = item_list_camera;

const Dangtin_linhkien = ({ loailinhkien, setloailinhkien }: any) => {
  return (
    <>
      {/* cho mayanh */}
      <div className="h-auto w-full space-y-3">
        {/* chon loai thietbi */}
        <div className="h-[65px] w-full">
          <div className="h-[30px] px-1 flex">
            <p>Loại linh kiện</p>
            <p className="text-red-500 ml-1">*</p>
          </div>
          <div className="flex item-center space-x-3">
            <button
              onClick={() => setloailinhkien("linhkienmaytinh")}
              className={`h-[35px] w-auto px-5 rounded-full bg-gray-200 hover:border hover:border-mauxanhtroi ${
                loailinhkien === "linhkienmaytinh"
                  ? `bg-mauxanhtroi text-white`
                  : ``
              }`}
            >
              Linh kiện máy tính
            </button>
            <button
              onClick={() => setloailinhkien("linhkiendienthoai")}
              className={`h-[35px] w-auto px-5 rounded-full bg-gray-200 hover:border hover:border-mauxanhtroi ${
                loailinhkien === "linhkiendienthoai"
                  ? `bg-mauxanhtroi text-white`
                  : ``
              }`}
            >
              Linh kiện điện thoại
            </button>
            <button
              onClick={() => setloailinhkien("other")}
              className={`h-[35px] w-auto px-5 rounded-full bg-gray-200 hover:border hover:border-mauxanhtroi ${
                loailinhkien === "other" ? `bg-mauxanhtroi text-white` : ``
              }`}
            >
              Linh kiện khác
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dangtin_linhkien;
