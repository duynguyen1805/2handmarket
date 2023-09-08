import React, { useEffect, useState } from "react";
import item_listmaygiat, { maygiat } from "../obj_data_raw/List_Maygiat";
import { useMyContext } from "@/contexts/MyContext";
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

const filter_maygiat = ({
  typeHang,
  settypeHang,
  setFilteredHang,
  khoiluonggiat,
  setkhoiluonggiat,
  cuagiat,
  setcuagiat,
}: any) => {
  const [openHangmaygiat, setopenHangmaygiat] = useState(false);
  // dung cho count filter
  const { countfilter, count_filter } = useMyContext();
  const [chonHangmaygiat, setchonHangmaygiat] = useState(false);
  const [chonKhoiluonggiat, setchonKhoiluonggiat] = useState(false);
  const [chonCuagiat, setchonCuagiat] = useState(false);

  useEffect(() => {
    if (typeHang) {
      setchonHangmaygiat(true);
      count_filter(countfilter - 1);
    }
    if (khoiluonggiat) {
      setchonKhoiluonggiat(true);
      count_filter(countfilter - 1);
    }
    if (cuagiat) {
      setchonCuagiat(true);
      count_filter(countfilter - 1);
    }
  }, []);
  useEffect(() => {
    if (chonHangmaygiat) {
      count_filter(countfilter + 1);
    }
  }, [chonHangmaygiat]);
  useEffect(() => {
    if (chonKhoiluonggiat) {
      count_filter(countfilter + 1);
    }
  }, [chonKhoiluonggiat]);
  useEffect(() => {
    if (chonCuagiat) {
      count_filter(countfilter + 1);
    }
  }, [chonCuagiat]);

  const setSelectHangmaygiat = (item: maygiat) => {
    settypeHang(item.type);
    setFilteredHang(item.key);
    setopenHangmaygiat(!openHangmaygiat);
    setchonHangmaygiat(true);
  };
  const [openKhoiluonggiat, setopenKhoiluonggiat] = useState(false);
  const setSelectKhoiluonggiat = (item: any) => {
    setkhoiluonggiat(item.label);
    setopenKhoiluonggiat(!openKhoiluonggiat);
    setchonKhoiluonggiat(true);
  };
  const [openCuagiat, setopenCuagiat] = useState(false);
  const setSelectCuagiat = (item: any) => {
    setcuagiat(item.label);
    setopenCuagiat(!openCuagiat);
    setchonCuagiat(true);
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
            onClick={() => setopenHangmaygiat(!openHangmaygiat)}
            className="capitalize h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {typeHang}
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
            onClick={() => setopenCuagiat(!openCuagiat)}
            className="capitalize h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {cuagiat}
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
            onClick={() => setopenKhoiluonggiat(!openKhoiluonggiat)}
            className="capitalize h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {khoiluonggiat}
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

export default filter_maygiat;
