import React, { useEffect, useState } from "react";
import item_listmaylanh, { maylanh } from "../obj_data_raw/List_Maylanh";
import { useMyContext } from "@/contexts/MyContext";
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
const Filter_maylanh = ({
  typeHang,
  settypeHang,
  setFilteredHang,
  congsuat,
  setcongsuat,
}: any) => {
  const [openHangmaylanh, setopenHangmaylanh] = useState(false);
  // dung cho count filter
  const { countfilter, count_filter } = useMyContext();
  const [chonHangmaylanh, setchonHangmaylanh] = useState(false);
  const [chonCongsuat, setchonCongsuat] = useState(false);

  useEffect(() => {
    if (typeHang) {
      setchonHangmaylanh(true);
      count_filter(countfilter - 1);
    }
    if (congsuat) {
      setchonCongsuat(true);
      count_filter(countfilter - 1);
    }
  }, []);
  useEffect(() => {
    if (chonHangmaylanh) {
      count_filter(countfilter + 1);
    }
  }, [chonHangmaylanh]);
  useEffect(() => {
    if (chonCongsuat) {
      count_filter(countfilter + 1);
    }
  }, [chonCongsuat]);

  const setSelectHangmaylanh = (item: maylanh) => {
    settypeHang(item.type);
    setFilteredHang(item.key);
    setopenHangmaylanh(!openHangmaylanh);
    setchonHangmaylanh(true);
  };
  const [openCongsuat, setopenCongsuat] = useState(false);
  const setSelectCongsuat = (item: any) => {
    setcongsuat(item.label);
    setopenCongsuat(!openCongsuat);
    setchonCongsuat(true);
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
            onClick={() => setopenHangmaylanh(!openHangmaylanh)}
            className="capitalize h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {typeHang}
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
            onClick={() => setopenCongsuat(!openCongsuat)}
            className="capitalize h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {congsuat}
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

export default Filter_maylanh;
