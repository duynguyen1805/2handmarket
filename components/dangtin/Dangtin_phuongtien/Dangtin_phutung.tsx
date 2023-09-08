import React, { useState } from "react";
const list_loaiPhutung = [
  { key: 1, label: "Phụ tùng xe máy", type: "phutungxemay" },
  { key: 2, label: "Phụ tùng ô tô", type: "phutungoto" },
];

const dangtin_phutung = ({ setLoaiphutung }: any) => {
  const [openloaiPhutung, setopenloaiPhutung] = useState(false);
  // chọn loai phutung
  const [titlePhutung, settitlePhutung] = useState("");

  const setSelectLoaixedap = (item: any) => {
    settitlePhutung(item.label);
    setLoaiphutung(item.type);
    setopenloaiPhutung(!openloaiPhutung);
  };

  return (
    <>
      {/* cho xe oto */}
      <div className="h-auto w-full space-y-3">
        {/* chon loaiphutung */}
        <div className="relative">
          <div className="mb-1 px-1 flex">
            <p>Loại Phụ tùng</p>
            <p className="text-red-500 ml-1">*</p>
          </div>
          <div
            onClick={() => setopenloaiPhutung(!openloaiPhutung)}
            className="h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {titlePhutung}
          </div>
          {openloaiPhutung && (
            <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400">
              {list_loaiPhutung &&
                list_loaiPhutung.map((item: any) => {
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
      </div>
    </>
  );
};

export default dangtin_phutung;
