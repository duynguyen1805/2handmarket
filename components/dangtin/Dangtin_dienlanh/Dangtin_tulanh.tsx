import React, { useState } from "react";
import item_listtulanh, { tulanh } from "../../obj_data_raw/List_Tulanh";
const list_tulanh: tulanh[] = item_listtulanh;
const list_thetich = [
  {
    key: 1,
    label: "Dưới 100 lít",
  },
  {
    key: 2,
    label: "100 - 149 lít",
  },
  {
    key: 3,
    label: "150 - 199 lít",
  },
  {
    key: 4,
    label: "200 - 299 lít",
  },
  {
    key: 5,
    label: "300 - 399 lít",
  },
  {
    key: 6,
    label: "400 - 499 lít",
  },
  {
    key: 7,
    label: "trên 500 lít",
  },
];

const Dangtin_tulanh = ({ settypeHang, setthetich }: any) => {
  const [openHangtulanh, setopenHangtulanh] = useState(false);
  const [titleHangtulanh, settitleHangtulanh] = useState("");

  const setSelectHangtulanh = (item: tulanh) => {
    settitleHangtulanh(item.label);
    settypeHang(item.type);
    setopenHangtulanh(!openHangtulanh);
  };

  const [openThetich, setopenThetich] = useState(false);
  const [titleThetich, settitleThetich] = useState("");

  const setSelectThetich = (item: any) => {
    settitleThetich(item.label);
    setthetich(item.label);
    setopenThetich(!openThetich);
  };

  const handleopen = (value: any) => {
    if (value == "hang") {
      setopenHangtulanh(!openHangtulanh);
      setopenThetich(false);
    }
    if (value == "thetich") {
      setopenHangtulanh(false);
      setopenThetich(!openThetich);
    }
  };

  return (
    <>
      {/* cho tulanh */}
      <div className="h-auto w-full space-y-3">
        {/* chon hang tulanh */}
        <div className="relative">
          <div className="mb-1 px-1 flex">
            <p>Hãng</p>
            <p className="text-red-500 ml-1">*</p>
          </div>
          <div
            onClick={() => handleopen("hang")}
            className="h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {titleHangtulanh}
          </div>
          {openHangtulanh && (
            <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400 shadow-lg">
              {list_tulanh &&
                list_tulanh.map((item: tulanh) => {
                  return (
                    <div
                      key={item.key}
                      className="h-[40px] w-full hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                      onClick={() => setSelectHangtulanh(item)}
                    >
                      {item.label}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
        {/* chon thetich */}
        <div className="relative">
          <div className="mb-1 px-1 flex">
            <p>Thể tích</p>
            <p className="text-red-500 ml-1">*</p>
          </div>
          <div
            onClick={() => handleopen("thetich")}
            className="h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {titleThetich}
          </div>
          {openThetich && (
            <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400 shadow-lg">
              {list_thetich &&
                list_thetich.map((item: any) => {
                  return (
                    <div
                      key={item.key}
                      className="h-[40px] w-full hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                      onClick={() => setSelectThetich(item)}
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

export default Dangtin_tulanh;
