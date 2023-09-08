import React, { useState } from "react";
const list_den = [
  {
    key: 1,
    label: "Đèn chùm",
    type: "denchum",
  },
  {
    key: 2,
    label: "Đèn ốp",
    type: "denop",
  },
  {
    key: 3,
    label: "Đèn ngoài trời",
    type: "denngoaitroi",
  },
  {
    key: 4,
    label: "Đèn trang trí",
    type: "dentrangtri",
  },
  {
    key: 5,
    label: "Đèn ngủ",
    type: "denngu",
  },
  {
    key: 6,
    label: "Đèn pin",
    type: "denpin",
  },
  {
    key: 7,
    label: "Đèn bàn",
    type: "denban",
  },
  {
    key: 8,
    label: "Đèn năng lượng mặt trời",
    type: "dennangluongmattroi",
  },
  {
    key: 9,
    label: "Khác",
    type: "other",
  },
];

const dangtin_den = ({ setloaichitiet }: any) => {
  const [openLoaiden, setopenLoaiden] = useState(false);
  const [titleLoaiden, settitleLoaiden] = useState("");

  const setSelectLoaiden = (item: any) => {
    settitleLoaiden(item.label);
    setloaichitiet(item.type);
    setopenLoaiden(!openLoaiden);
  };

  return (
    <>
      {/* cho banghe */}
      <div className="h-auto w-full space-y-3">
        {/* chon loaichitiet den */}
        <div className="relative">
          <div className="mb-1 px-1 flex">
            <p>Loại</p>
            <p className="text-red-500 ml-1">*</p>
          </div>
          <div
            onClick={() => setopenLoaiden(!openLoaiden)}
            className="h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {titleLoaiden}
          </div>
          {openLoaiden && (
            <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400 shadow-lg">
              {list_den &&
                list_den.map((item: any) => {
                  return (
                    <div
                      key={item.key}
                      className="h-[40px] w-full hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                      onClick={() => setSelectLoaiden(item)}
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

export default dangtin_den;
