import React, { useState } from "react";
const list_tuke = [
  {
    key: 1,
    label: "Tủ, kệ quần áo",
    type: "tukequanao",
  },
  {
    key: 2,
    label: "Tủ, kệ giày dép",
    type: "tukegiaydep",
  },
  {
    key: 3,
    label: "Tủ, kệ sách",
    type: "tukesach",
  },
  {
    key: 4,
    label: "Tủ, kệ tivi",
    type: "tuketivi",
  },
  {
    key: 5,
    label: "Tủ, kệ bếp",
    type: "tukebep",
  },
  {
    key: 6,
    label: "Tủ, kệ đầu giường",
    type: "tukedaugiuong",
  },
  {
    key: 7,
    label: "Tủ, kệ trưng bày",
    type: "tuketrungbay",
  },
  {
    key: 8,
    label: "Khác",
    type: "other",
  },
];

const Dangtin_tuke = ({ setloaichitiet }: any) => {
  const [openLoaituke, setopenLoaituke] = useState(false);
  const [titleLoaituke, settitleLoaituke] = useState("");

  const setSelectLoaibanghe = (item: any) => {
    settitleLoaituke(item.label);
    setloaichitiet(item.type);
    setopenLoaituke(!openLoaituke);
  };

  return (
    <>
      {/* cho banghe */}
      <div className="h-auto w-full space-y-3">
        {/* chon loaibanghe */}
        <div className="relative">
          <div className="mb-1 px-1 flex">
            <p>Loại</p>
            <p className="text-red-500 ml-1">*</p>
          </div>
          <div
            onClick={() => setopenLoaituke(!openLoaituke)}
            className="h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {titleLoaituke}
          </div>
          {openLoaituke && (
            <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400 shadow-lg">
              {list_tuke &&
                list_tuke.map((item: any) => {
                  return (
                    <div
                      key={item.key}
                      className="h-[40px] w-full hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                      onClick={() => setSelectLoaibanghe(item)}
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

export default Dangtin_tuke;
