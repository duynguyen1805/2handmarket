import React, { useState } from "react";
const list_giuongnem = [
  {
    key: 1,
    label: "Giường",
    type: "giuong",
  },
  {
    key: 2,
    label: "Nệm",
    type: "nem",
  },
  {
    key: 3,
    label: "Chăn, ga, gối",
    type: "changagoi",
  },
  {
    key: 4,
    label: "Khác",
    type: "other",
  },
];

const dangtin_giuongnem = ({ setloaichitiet }: any) => {
  const [openLoaigiuongnem, setopenLoaigiuongnem] = useState(false);
  const [titleLoaigiuongnem, settitleLoaigiuongnem] = useState("");

  const setSelectLoaigiuongnem = (item: any) => {
    settitleLoaigiuongnem(item.label);
    setloaichitiet(item.type);
    setopenLoaigiuongnem(!openLoaigiuongnem);
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
            onClick={() => setopenLoaigiuongnem(!openLoaigiuongnem)}
            className="h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {titleLoaigiuongnem}
          </div>
          {openLoaigiuongnem && (
            <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400 shadow-lg">
              {list_giuongnem &&
                list_giuongnem.map((item: any) => {
                  return (
                    <div
                      key={item.key}
                      className="h-[40px] w-full hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                      onClick={() => setSelectLoaigiuongnem(item)}
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

export default dangtin_giuongnem;
