import React, { useState } from "react";
import item_listmaygiat, { maygiat } from "../../obj_data_raw/List_Maygiat";
const list_maygiat: maygiat[] = item_listmaygiat;
const list_Khoiluonggiat = [
  {
    key: 1,
    label: "dưới 7 kg",
  },
  {
    key: 2,
    label: "7 - 7.9 kg",
  },
  {
    key: 3,
    label: "8 - 8.9 kg",
  },
  {
    key: 4,
    label: "9 - 9.9 kg",
  },
  {
    key: 5,
    label: "trên 10 kg",
  },
];
const list_cuagiat = [
  { key: 1, label: "Cửa trước" },
  { key: 2, label: "Cửa trên" },
];

const dangtin_maygiat = ({
  settypeHang,
  setkhoiluonggiat,
  setcuagiat,
}: any) => {
  const [openHangmaygiat, setopenHangmaygiat] = useState(false);
  const [titleHangmaygiat, settitleHangmaygiat] = useState("");
  const setSelectHangmaygiat = (item: maygiat) => {
    settitleHangmaygiat(item.label);
    settypeHang(item.type);
    setopenHangmaygiat(!openHangmaygiat);
  };

  const [openKhoiluonggiat, setopenKhoiluonggiat] = useState(false);
  const [titleKhoiluonggiat, settitleKhoiluonggiat] = useState("");
  const setSelectKhoiluonggiat = (item: any) => {
    settitleKhoiluonggiat(item.label);
    setkhoiluonggiat(item.label);
    setopenKhoiluonggiat(!openKhoiluonggiat);
  };

  const [openCuagiat, setopenCuagiat] = useState(false);
  const [titleCuagiat, settitleCuagiat] = useState("");
  const setSelectCuagiat = (item: any) => {
    settitleCuagiat(item.label);
    setcuagiat(item.label);
    setopenCuagiat(!openCuagiat);
  };

  const handleopen = (value: any) => {
    if (value == "hang") {
      setopenHangmaygiat(!openHangmaygiat);
      setopenKhoiluonggiat(false);
      setopenCuagiat(false);
    }
    if (value == "khoiluonggiat") {
      setopenHangmaygiat(false);
      setopenKhoiluonggiat(!openKhoiluonggiat);
      setopenCuagiat(false);
    }
    if (value == "cuagiat") {
      setopenHangmaygiat(false);
      setopenKhoiluonggiat(false);
      setopenCuagiat(!openCuagiat);
    }
  };

  return (
    <>
      {/* cho maygiat */}
      <div className="h-auto w-full space-y-3">
        {/* chon hang maygiat */}
        <div className="relative">
          <div className="mb-1 px-1 flex">
            <p>Hãng</p>
            <p className="text-red-500 ml-1">*</p>
          </div>
          <div
            onClick={() => handleopen("hang")}
            className="h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {titleHangmaygiat}
          </div>
          {openHangmaygiat && (
            <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400 shadow-lg">
              {list_maygiat &&
                list_maygiat.map((item: maygiat) => {
                  return (
                    <div
                      key={item.key}
                      className="h-[40px] w-full hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                      onClick={() => setSelectHangmaygiat(item)}
                    >
                      {item.label}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
        {/* chon cuagiat */}
        <div className="relative">
          <div className="mb-1 px-1 flex">
            <p>Cửa giặt</p>
          </div>
          <div
            onClick={() => handleopen("cuagiat")}
            className="h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {titleCuagiat}
          </div>
          {openCuagiat && (
            <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400 shadow-lg">
              {list_cuagiat &&
                list_cuagiat.map((item: any) => {
                  return (
                    <div
                      key={item.key}
                      className="h-[40px] w-full hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                      onClick={() => setSelectCuagiat(item)}
                    >
                      {item.label}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
        {/* chon Khoiluonggiat */}
        <div className="relative">
          <div className="mb-1 px-1 flex">
            <p>Khối lượng giặt</p>
          </div>
          <div
            onClick={() => handleopen("khoiluonggiat")}
            className="h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {titleKhoiluonggiat}
          </div>
          {openKhoiluonggiat && (
            <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400 shadow-lg">
              {list_Khoiluonggiat &&
                list_Khoiluonggiat.map((item: any) => {
                  return (
                    <div
                      key={item.key}
                      className="h-[40px] w-full hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                      onClick={() => setSelectKhoiluonggiat(item)}
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

export default dangtin_maygiat;
