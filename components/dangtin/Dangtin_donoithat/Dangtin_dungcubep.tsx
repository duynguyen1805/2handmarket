import React, { useState } from "react";
const list_dungcunhabep = [
  {
    key: 1,
    label: "Nồi",
    type: "noi",
  },
  {
    key: 2,
    label: "Chảo",
    type: "chao",
  },
  {
    key: 3,
    label: "Dao, kéo, thớt",
    type: "daokeothot",
  },
  {
    key: 4,
    label: "Tô, chén, đĩa",
    type: "tochendia",
  },
  {
    key: 5,
    label: "Đũa, muỗng",
    type: "duamuong",
  },
  {
    key: 6,
    label: "Ly",
    type: "ly",
  },
  {
    key: 7,
    label: "Bình giữ nhiệt",
    type: "binhgiunhiet",
  },
  {
    key: 8,
    label: "Hộp đựng thực phẩm",
    type: "hopdungthucpham",
  },
  {
    key: 9,
    label: "Thùng đá, ca đá",
    type: "thungda",
  },
  {
    key: 10,
    label: "Khác",
    type: "other",
  },
];

const dangtin_dungcubep = ({ setloaichitiet }: any) => {
  const [openLoaidungcubep, setopenLoaidungcubep] = useState(false);
  const [titleLoaidungcubep, settitleLoaidungcubep] = useState("");

  const setSelectLoaidungcubep = (item: any) => {
    settitleLoaidungcubep(item.label);
    setloaichitiet(item.type);
    setopenLoaidungcubep(!openLoaidungcubep);
  };

  return (
    <>
      {/* cho banghe */}
      <div className="h-auto w-full space-y-3">
        {/* chon loaichitiet dungcubep */}
        <div className="relative">
          <div className="mb-1 px-1 flex">
            <p>Loại</p>
            <p className="text-red-500 ml-1">*</p>
          </div>
          <div
            onClick={() => setopenLoaidungcubep(!openLoaidungcubep)}
            className="h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {titleLoaidungcubep}
          </div>
          {openLoaidungcubep && (
            <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400 shadow-lg">
              {list_dungcunhabep &&
                list_dungcunhabep.map((item: any) => {
                  return (
                    <div
                      key={item.key}
                      className="h-[40px] w-full hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                      onClick={() => setSelectLoaidungcubep(item)}
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

export default dangtin_dungcubep;
