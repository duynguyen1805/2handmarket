import React, { useState } from "react";
import item_list_phukien, { phukien } from "../../obj_data_raw/List_Phukien";
const list_phukien: phukien[] = item_list_phukien;

const Dangtin_loaiphukien = ({ setloaiphukien }: any) => {
  const [openLoaiphukien, setopenLoaiphukien] = useState(false);
  const [titleLoaiphukien, settitleLoaiphukien] = useState("");

  const setSelectLoaiphukien = (item: phukien) => {
    settitleLoaiphukien(item.label);
    setloaiphukien(item.type);
    setopenLoaiphukien(!openLoaiphukien);
  };

  return (
    <>
      {/* cho mayanh */}
      <div className="h-auto w-full space-y-3">
        {/* chon loai thietbi */}
        {/* <div className="h-[65px] w-full">
          <div className="h-[30px] px-1 flex">
            <p>Loại thiết bị</p>
          </div>
          <div className="flex item-center space-x-3">
            <button
              onClick={() => setLoaimayanh(0)}
              className={`h-[35px] w-auto px-5 rounded-full bg-gray-200 hover:border hover:border-mauxanhtroi ${
                loaimayanh === 0 ? `bg-mauxanhtroi text-white` : ``
              }`}
            >
              Máy ảnh
            </button>
            <button
              onClick={() => setLoaimayanh(1)}
              className={`h-[35px] w-auto px-5 rounded-full bg-gray-200 hover:border hover:border-mauxanhtroi ${
                loaimayanh === 1 ? `bg-mauxanhtroi text-white` : ``
              }`}
            >
              Máy quay
            </button>
            <button
              onClick={() => setLoaimayanh(2)}
              className={`h-[35px] w-auto px-5 rounded-full bg-gray-200 hover:border hover:border-mauxanhtroi ${
                loaimayanh === 2 ? `bg-mauxanhtroi text-white` : ``
              }`}
            >
              Phụ kiện
            </button>
          </div>
        </div> */}
        {/* chon loaiphukien */}
        <div className="relative">
          <div className="mb-1 px-1 flex">
            <p>Loại</p>
            <p className="text-red-500 ml-1">*</p>
          </div>
          <div
            onClick={() => setopenLoaiphukien(!openLoaiphukien)}
            className="h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {titleLoaiphukien}
          </div>
          {openLoaiphukien && (
            <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400 shadow-lg">
              {list_phukien &&
                list_phukien.map((item: phukien) => {
                  return (
                    <div
                      key={item.key}
                      className="h-[40px] w-full hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                      onClick={() => setSelectLoaiphukien(item)}
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

export default Dangtin_loaiphukien;
