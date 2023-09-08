import React, { useState } from "react";
const list_banghe = [
  {
    key: 1,
    label: "Ghế đẩu",
    type: "ghedau",
  },
  {
    key: 2,
    label: "Ghế dựa",
    type: "ghedua",
  },
  {
    key: 3,
    label: "Ghế văn phòng",
    type: "ghevanphong",
  },
  {
    key: 4,
    label: "Ghế massage",
    type: "ghemassage",
  },
  {
    key: 5,
    label: "Sofa",
    type: "sofa",
  },
  {
    key: 6,
    label: "Ghế gaming",
    type: "ghegaming",
  },
  {
    key: 7,
    label: "Bàn cà phê",
    type: "bancaphe",
  },
  {
    key: 8,
    label: "Bàn ăn",
    type: "banan",
  },
  {
    key: 9,
    label: "Bàn làm việc",
    type: "banlamviec",
  },
  {
    key: 10,
    label: "Khác",
    type: "other",
  },
];

const dangtin_banghe = ({ setloaichitiet }: any) => {
  const [openLoaibanghe, setopenLoaibanghe] = useState(false);
  const [titleLoaibanghe, settitleLoaibanghe] = useState("");

  const setSelectLoaibanghe = (item: any) => {
    settitleLoaibanghe(item.label);
    setloaichitiet(item.type);
    setopenLoaibanghe(!openLoaibanghe);
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
            onClick={() => setopenLoaibanghe(!openLoaibanghe)}
            className="h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {titleLoaibanghe}
          </div>
          {openLoaibanghe && (
            <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400 shadow-lg">
              {list_banghe &&
                list_banghe.map((item: any) => {
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

export default dangtin_banghe;
