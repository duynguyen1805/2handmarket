import React, { useState } from "react";
const list_dodiennhabep = [
  {
    key: 1,
    label: "Máy pha cà phê",
    type: "mayphacaphe",
  },
  {
    key: 2,
    label: "Nồi cơm điện",
    type: "noicomdien",
  },
  {
    key: 3,
    label: "Nồi áp suất",
    type: "noiapsuat",
  },
  {
    key: 4,
    label: "Nồi chiên không dầu",
    type: "noichienkhongdau",
  },
  {
    key: 5,
    label: "Lò nướng",
    type: "lonuong",
  },
  {
    key: 6,
    label: "Lò vi sóng",
    type: "lovisong",
  },
  {
    key: 7,
    label: "Máy xay",
    type: "mayxay",
  },
  {
    key: 8,
    label: "Máy ép trái cây",
    type: "mayeptraicay",
  },
  {
    key: 9,
    label: "Máy đánh trứng",
    type: "maydanhtrung",
  },
  {
    key: 10,
    label: "Bình đun, bình thủy điện",
    type: "binhdun",
  },
  {
    key: 11,
    label: "Bếp Gas",
    type: "bepgas",
  },
  {
    key: 12,
    label: "Bếp từ",
    type: "beptu",
  },
  {
    key: 13,
    label: "Bếp hồng ngoại",
    type: "bephongngoai",
  },
  {
    key: 14,
    label: "Máy lọc nước",
    type: "maylocnuoc",
  },
  {
    key: 15,
    label: "Khác",
    type: "other",
  },
];

const dangtin_bep = ({ setloaichitiet }: any) => {
  const [openLoaidodienbep, setopenLoaidodienbep] = useState(false);
  const [titleLoaidodienbep, settitleLoaidodienbep] = useState("");

  const setSelectLoaigiuongnem = (item: any) => {
    settitleLoaidodienbep(item.label);
    setloaichitiet(item.type);
    setopenLoaidodienbep(!openLoaidodienbep);
  };

  return (
    <>
      {/* cho banghe */}
      <div className="h-auto w-full space-y-3">
        {/* chon loaibanghe */}
        <div className="relative">
          <div className="mb-1 px-1 flex">
            <p>Loại</p>
            <p className="text-red-500 ml-1">*</p>
          </div>
          <div
            onClick={() => setopenLoaidodienbep(!openLoaidodienbep)}
            className="h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {titleLoaidodienbep}
          </div>
          {openLoaidodienbep && (
            <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400 shadow-lg">
              {list_dodiennhabep &&
                list_dodiennhabep.map((item: any) => {
                  return (
                    <div
                      key={item.key}
                      className="h-[40px] w-full hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                      onClick={() => setSelectLoaigiuongnem(item)}
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

export default dangtin_bep;
