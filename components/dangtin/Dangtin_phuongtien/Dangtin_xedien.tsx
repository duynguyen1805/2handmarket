import React, { useState } from "react";
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

const Dangtin_xedien = ({ setLoaixedien, setDongcoxedien, setMausac }: any) => {
  const [openLoaixe, setopenLoaixe] = useState(false);
  const [openloaiDongco, setopenloaiDongco] = useState(false);
  // chọn loaixedien
  const [titleLoaixe, settitleLoaixe] = useState("");
  const [titleLoaiDongcoxe, settitleLoaiDongcoxe] = useState("");
  const handleopenLoaixe = () => {
    setopenLoaixe(!openLoaixe);
    setopenloaiDongco(false);
  };
  const setSelectLoaixedien = (item: any) => {
    settitleLoaixe(item.label);
    setLoaixedien(item.type);
    setopenLoaixe(!openLoaixe);
  };
  const handleopenloaiDongco = () => {
    setopenLoaixe(false);
    setopenloaiDongco(!openloaiDongco);
  };
  const setSelectLoaiDongcoxe = (item: any) => {
    settitleLoaiDongcoxe(item.label);
    setDongcoxedien(item.label);
    setopenloaiDongco(!openloaiDongco);
  };

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
            onClick={() => handleopenLoaixe()}
            className="h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {titleLoaixe}
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
            onClick={() => handleopenloaiDongco()}
            className="h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {titleLoaiDongcoxe}
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
        {/* thong tin khac */}
        <div className="flex space-x-2">
          <div>
            <div className="mb-1 px-1 flex">
              <p>Màu sắc</p>
            </div>
            <input
              type="text"
              className="h-[45px] w-full rounded-md border border-gray-400 outline-none px-2"
              onChange={(e) => setMausac(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dangtin_xedien;
