import React from "react";

const item_inCart = () => {
  return (
    <div className=" h-[120px] w-full flex border-y border-gray-500">
      <div className="h-full w-[50%] py-1 px-1">name</div>
      <div className="border-x-2 border-gray-500 h-full w-[25%]">
        <div className="w-full h-[40%] border border-b-black flex items-center justify-center text-xl">
          {(2 * 3).toLocaleString("vi-VN")}đ
        </div>
        <div className="w-full h-[60%] flex items-center justify-center">
          <p
            className="font-medium text-2xl py-[13px] bg-green-500 text-white  rounded-l-lg h-[26px] w-[30px] flex items-center justify-center cursor-pointer"
            // onClick={giamSL}
          >
            -
          </p>
          <input
            className="w-[60px] px-1 border border-green-500 flex text-center focus:outline-none"
            // value={sl ?? ""}
            // onChange={(e) => {
            //   const value = parseInt(e.target.value);
            //   setSL(isNaN(value) ? item_order.is_sold : value);
            // }}
          ></input>
          <p
            className="font-medium text-xl py-[13px] bg-green-500 text-white rounded-r-lg h-[26px] w-[30px] flex items-center justify-center cursor-pointer"
            // onClick={tangSL}
          >
            +
          </p>
        </div>
      </div>
      <button className="w-[40px] border border-red-500 bg-red-500 text-white">
        Xóa
      </button>
    </div>
  );
};

export default item_inCart;
