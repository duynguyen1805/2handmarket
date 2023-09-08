import { useMyContext } from "@/contexts/MyContext";
import React, { useEffect, useState } from "react";
const list_loaixedien = [
  { key: 1, label: "Xe Đạp điện", type: "xedapdien" },
  { key: 2, label: "Xe Máy điện", type: "xemaydien" },
];
const dongcoxedien = [
  { key: 1, label: "dưới 200W" },
  { key: 2, label: "200 - 250W" },
  { key: 3, label: "251 - 350W" },
  { key: 4, label: "351 - 500W" },
  { key: 5, label: "501 - 1000W" },
  { key: 6, label: "trên 1000W" },
];

const filter_xedien = ({
  loaixedien,
  setLoaixedien,
  setFilteredHang,
  typedongcoxedien,
  setDongcoxedien,
}: any) => {
  const [openLoaixe, setopenLoaixe] = useState(false);
  const [openloaiDongco, setopenloaiDongco] = useState(false);
  // dung cho count filter
  const { countfilter, count_filter } = useMyContext();
  const [chonLoaixedien, setchonLoaixedien] = useState(false);
  const [chonLoaiDongcoxe, setchonLoaiDongcoxe] = useState(false);

  useEffect(() => {
    if (loaixedien) {
      setchonLoaixedien(true);
      count_filter(countfilter - 1);
    }
    if (typedongcoxedien) {
      setchonLoaiDongcoxe(true);
      count_filter(countfilter - 1);
    }
  }, []);
  const setSelectLoaixedien = (item: any) => {
    setLoaixedien(item.type);
    setFilteredHang(item.key);
    setopenLoaixe(!openLoaixe);
    setchonLoaixedien(true);
  };
  const setSelectLoaiDongcoxe = (item: any) => {
    setDongcoxedien(item.label);
    setopenloaiDongco(!openloaiDongco);
    setchonLoaiDongcoxe(true);
  };
  useEffect(() => {
    if (chonLoaixedien) {
      count_filter(countfilter + 1);
    }
  }, [chonLoaixedien]);
  useEffect(() => {
    if (chonLoaiDongcoxe) {
      count_filter(countfilter + 1);
    }
  }, [chonLoaiDongcoxe]);

  return (
    <>
      {/* cho xe oto */}
      <div className="h-auto w-full space-y-3">
        {/* chon loai xe dien (xemaydien, xedapdien) */}
        <div className="relative">
          <div className="mb-1 px-1 flex">
            <p>Loại xe</p>
            <p className="text-red-500 ml-1">*</p>
          </div>
          <div
            onClick={() => setopenLoaixe(!openLoaixe)}
            className="capitalize h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {loaixedien === "xedapdien" && "Xe đạp điện"}
            {loaixedien === "xemaydien" && "Xe máy điện"}
          </div>
          {openLoaixe && (
            <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400">
              {list_loaixedien &&
                list_loaixedien.map((item: any) => {
                  return (
                    <div
                      key={item.key}
                      className="h-[40px] w-full hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                      onClick={() => setSelectLoaixedien(item)}
                    >
                      {item.label}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
        {/* chon dongcoxedien */}
        <div className="relative">
          <div className="mb-1 px-1 flex">
            <p>Động cơ</p>
          </div>
          <div
            onClick={() => setopenloaiDongco(!openloaiDongco)}
            className="h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {typedongcoxedien}
          </div>
          {openloaiDongco && (
            <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400">
              {dongcoxedien &&
                dongcoxedien.map((item: any) => {
                  return (
                    <div
                      key={item.key}
                      className="h-[40px] w-ful hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                      onClick={() => setSelectLoaiDongcoxe(item)}
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

export default filter_xedien;
