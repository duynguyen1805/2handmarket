import React, { useState } from "react";
import item_listmaylanh, { maylanh } from "../../obj_data_raw/List_Maylanh";
const list_maylanh: maylanh[] = item_listmaylanh;
const list_congsuat = [
  {
    key: 1,
    label: "1 HP (ngựa)",
  },
  {
    key: 2,
    label: "1.5 HP (ngựa)",
  },
  {
    key: 3,
    label: "2 HP (ngựa)",
  },
  {
    key: 4,
    label: "trên 2 HP (ngựa)",
  },
  {
    key: 5,
    label: "dưới 10,000 BTU",
  },
  {
    key: 6,
    label: "10,000 - 20,000 BTU",
  },
  {
    key: 7,
    label: "trên 20,000 BTU",
  },
];

const dangtin_maylanh = ({ settypeHang, setcongsuat }: any) => {
  const [openHangmaylanh, setopenHangmaylanh] = useState(false);
  const [titleHangmaylanh, settitleHangmaylanh] = useState("");
  const setSelectHangmaylanh = (item: maylanh) => {
    settitleHangmaylanh(item.label);
    settypeHang(item.type);
    setopenHangmaylanh(!openHangmaylanh);
  };

  const [openCongsuat, setopenCongsuat] = useState(false);
  const [titleCongsuat, settitleCongsuat] = useState("");
  const setSelectCongsuat = (item: any) => {
    settitleCongsuat(item.label);
    setcongsuat(item.label);
    setopenCongsuat(!openCongsuat);
  };

  const handleopen = (value: any) => {
    if (value == "hang") {
      setopenHangmaylanh(!openHangmaylanh);
      setopenCongsuat(false);
    }
    if (value == "congsuat") {
      setopenHangmaylanh(false);
      setopenCongsuat(!openCongsuat);
    }
  };

  return (
    <>
      {/* cho maylanh */}
      <div className="h-auto w-full space-y-3">
        {/* chon hang maylanh */}
        <div className="relative">
          <div className="mb-1 px-1 flex">
            <p>Hãng</p>
            <p className="text-red-500 ml-1">*</p>
          </div>
          <div
            onClick={() => handleopen("hang")}
            className="h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {titleHangmaylanh}
          </div>
          {openHangmaylanh && (
            <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400 shadow-lg">
              {list_maylanh &&
                list_maylanh.map((item: maylanh) => {
                  return (
                    <div
                      key={item.key}
                      className="h-[40px] w-full hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                      onClick={() => setSelectHangmaylanh(item)}
                    >
                      {item.label}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
        {/* chon congsuat */}
        <div className="relative">
          <div className="mb-1 px-1 flex">
            <p>Công suất</p>
            <p className="text-red-500 ml-1">*</p>
          </div>
          <div
            onClick={() => handleopen("congsuat")}
            className="h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {titleCongsuat}
          </div>
          {openCongsuat && (
            <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400 shadow-lg">
              {list_congsuat &&
                list_congsuat.map((item: any) => {
                  return (
                    <div
                      key={item.key}
                      className="h-[40px] w-full hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                      onClick={() => setSelectCongsuat(item)}
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

export default dangtin_maylanh;
