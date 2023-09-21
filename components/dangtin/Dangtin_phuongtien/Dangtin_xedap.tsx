import React, { useState } from "react";
const list_loaixedap = [
  { key: 1, label: "Xe Đạp Phổ thông", type: "xedapphothong" },
  { key: 2, label: "Xe Đạp Thể thao", type: "xedapthethao" },
  { key: 3, label: "Xe Đạp Trẻ em", type: "xedaptreem" },
];

const Dangtin_xedap = ({ setLoaixedap, setMausac }: any) => {
  const [openLoaixe, setopenLoaixe] = useState(false);
  // chọn loaixedien
  const [titleLoaixe, settitleLoaixe] = useState("");

  const setSelectLoaixedap = (item: any) => {
    settitleLoaixe(item.label);
    setLoaixedap(item.type);
    setopenLoaixe(!openLoaixe);
  };

  return (
    <>
      {/* cho xe oto */}
      <div className="h-auto w-full space-y-3">
        {/* chon loai xe dap */}
        <div className="relative">
          <div className="mb-1 px-1 flex">
            <p>Loại xe đạp</p>
            <p className="text-red-500 ml-1">*</p>
          </div>
          <div
            onClick={() => setopenLoaixe(!openLoaixe)}
            className="h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {titleLoaixe}
          </div>
          {openLoaixe && (
            <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400">
              {list_loaixedap &&
                list_loaixedap.map((item: any) => {
                  return (
                    <div
                      key={item.key}
                      className="h-[40px] w-full hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                      onClick={() => setSelectLoaixedap(item)}
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

export default Dangtin_xedap;
