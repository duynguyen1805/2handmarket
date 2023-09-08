import React, { useEffect, useState } from "react";
import item_listtulanh, { tulanh } from "../obj_data_raw/List_Tulanh";
import { useMyContext } from "@/contexts/MyContext";
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

const filter_tulanh = ({
  typeHang,
  settypeHang,
  setFilteredHang,
  thetich,
  setthetich,
}: any) => {
  const [openHangtulanh, setopenHangtulanh] = useState(false);
  // dung cho count filter
  const { countfilter, count_filter } = useMyContext();
  const [chonHangtulanh, setchonHangtulanh] = useState(false);
  const [chonThetich, setchonThetich] = useState(false);

  useEffect(() => {
    if (typeHang) {
      setchonHangtulanh(true);
      count_filter(countfilter - 1);
    }
    if (thetich) {
      setchonThetich(true);
      count_filter(countfilter - 1);
    }
  }, []);
  useEffect(() => {
    if (chonHangtulanh) {
      count_filter(countfilter + 1);
    }
  }, [chonHangtulanh]);
  useEffect(() => {
    if (chonThetich) {
      count_filter(countfilter + 1);
    }
  }, [chonThetich]);

  const setSelectHangtulanh = (item: tulanh) => {
    settypeHang(item.type);
    setFilteredHang(item.key);
    setopenHangtulanh(!openHangtulanh);
    setchonHangtulanh(true);
  };
  const [openThetich, setopenThetich] = useState(false);
  const setSelectThetich = (item: any) => {
    setthetich(item.label);
    setopenThetich(!openThetich);
    setchonThetich(true);
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
            onClick={() => setopenHangtulanh(!openHangtulanh)}
            className="capitalize h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {typeHang}
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
            onClick={() => setopenThetich(!openThetich)}
            className="h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {thetich}
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

export default filter_tulanh;
