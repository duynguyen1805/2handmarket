import React, { useState } from "react";
const list_type = [
  {
    key: 2,
    label: "Cho nam",
  },
  {
    key: 1,
    label: "Cho nữ",
  },
  {
    key: 3,
    label: "Cả nam và nữ",
  },
];

const dangtin_docanhan = ({ setchogioitinh }: any) => {
  const [open, setopen] = useState(false);
  const [title, settitle] = useState("");

  const setSelect = (item: any) => {
    settitle(item.label);
    setchogioitinh(item.key);
    setopen(!open);
  };

  return (
    <>
      {/* cho maylanh */}
      <div className="h-auto w-full space-y-3">
        {/* chon chogioitinh */}
        <div className="relative">
          <div className="mb-1 px-1 flex">
            <p>Loại sản phẩm</p>
            <p className="text-red-500 ml-1">*</p>
          </div>
          <div
            onClick={() => setopen(!open)}
            className="h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {title}
          </div>
          {open && (
            <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400 shadow-lg">
              {list_type &&
                list_type.map((item: any) => {
                  return (
                    <div
                      key={item.key}
                      className="h-[40px] w-full hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                      onClick={() => setSelect(item)}
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

export default dangtin_docanhan;
