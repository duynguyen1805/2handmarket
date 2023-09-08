import React, { useState } from "react";
const list_quat = [
  {
    key: 1,
    label: "Quạt hơi nước",
    type: "quathoinuoc",
  },
  {
    key: 2,
    label: "Quạt điều hòa",
    type: "quatdieuhoa",
  },
  {
    key: 3,
    label: "Quạt đứng",
    type: "quatdung",
  },
  {
    key: 4,
    label: "Quạt treo tường",
    type: "quattreotuong",
  },
  {
    key: 5,
    label: "Quạt hộp",
    type: "quathop",
  },
  {
    key: 6,
    label: "Quạt trần",
    type: "quattran",
  },
  {
    key: 7,
    label: "Quạt sạc điện/Quạt mini",
    type: "quatmini",
  },
  {
    key: 8,
    label: "Khác",
    type: "other",
  },
];

const dangtin_quat = ({ setloaichitiet }: any) => {
  const [openLoaiquat, setopenLoaiquat] = useState(false);
  const [titleLoaiquat, settitleLoaiquat] = useState("");

  const setSelectLoaiquat = (item: any) => {
    settitleLoaiquat(item.label);
    setloaichitiet(item.type);
    setopenLoaiquat(!openLoaiquat);
  };

  return (
    <>
      {/* cho banghe */}
      <div className="h-auto w-full space-y-3">
        {/* chon loaichitiet quat */}
        <div className="relative">
          <div className="mb-1 px-1 flex">
            <p>Loại</p>
            <p className="text-red-500 ml-1">*</p>
          </div>
          <div
            onClick={() => setopenLoaiquat(!openLoaiquat)}
            className="h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {titleLoaiquat}
          </div>
          {openLoaiquat && (
            <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400 shadow-lg">
              {list_quat &&
                list_quat.map((item: any) => {
                  return (
                    <div
                      key={item.key}
                      className="h-[40px] w-full hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                      onClick={() => setSelectLoaiquat(item)}
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

export default dangtin_quat;
