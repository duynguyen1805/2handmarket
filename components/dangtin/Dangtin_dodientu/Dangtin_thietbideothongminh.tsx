import React, { useState } from "react";

const Dangtin_thietbideothongminh = ({
  loaithietbideo,
  setloaithietbideo,
}: any) => {
  return (
    <>
      {/* cho mayanh */}
      <div className="h-auto w-full space-y-3">
        {/* chon loai thietbi */}
        <div className="h-[65px] w-full">
          <div className="h-[30px] px-1 flex">
            <p>Loại thiết bị</p>
            <p className="text-red-500 ml-1">*</p>
          </div>
          <div className="flex item-center space-x-3">
            <button
              onClick={() => setloaithietbideo("donghothongminh")}
              className={`h-[35px] w-auto px-5 rounded-full bg-gray-200 hover:border hover:border-mauxanhtroi ${
                loaithietbideo === "donghothongminh"
                  ? `bg-mauxanhtroi text-white`
                  : ``
              }`}
            >
              Đồng hồ thông minh
            </button>
            <button
              onClick={() => setloaithietbideo("vongtaythongminh")}
              className={`h-[35px] w-auto px-5 rounded-full bg-gray-200 hover:border hover:border-mauxanhtroi ${
                loaithietbideo === "vongtaythongminh"
                  ? `bg-mauxanhtroi text-white`
                  : ``
              }`}
            >
              Vòng tay thông minh
            </button>
            <button
              onClick={() => setloaithietbideo("other")}
              className={`h-[35px] w-auto px-5 rounded-full bg-gray-200 hover:border hover:border-mauxanhtroi ${
                loaithietbideo === "other" ? `bg-mauxanhtroi text-white` : ``
              }`}
            >
              Khác
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dangtin_thietbideothongminh;
