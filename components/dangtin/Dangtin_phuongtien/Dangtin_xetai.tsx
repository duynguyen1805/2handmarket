import React, { useState } from "react";
import item_listxetai, {
  xetai,
} from "../../../components/obj_data_raw/List_Xetai";
const list_xetai: xetai[] = item_listxetai;

const list_taitrong = [
  {
    key: 1,
    label: "dưới 1 tấn",
  },
  {
    key: 2,
    label: "2 tấn",
  },
  {
    key: 3,
    label: "3 tấn",
  },
  {
    key: 4,
    label: "4 tấn",
  },
  {
    key: 5,
    label: "5 tấn",
  },
  {
    key: 6,
    label: "6 tấn",
  },
  {
    key: 7,
    label: "7 tấn",
  },
  {
    key: 8,
    label: "8 tấn",
  },
  {
    key: 9,
    label: "9 tấn",
  },
  {
    key: 10,
    label: "10 tấn",
  },
  {
    key: 11,
    label: "11 tấn",
  },
  {
    key: 12,
    label: "12 tấn",
  },
  {
    key: 13,
    label: "13 tấn",
  },
  {
    key: 14,
    label: "14 tấn",
  },
  {
    key: 15,
    label: "15 tấn",
  },
  {
    key: 16,
    label: "16 tấn",
  },
  {
    key: 17,
    label: "17 tấn",
  },
  {
    key: 18,
    label: "18 tấn",
  },
  {
    key: 19,
    label: "trên 18 tấn",
  },
];

const Dangtin_xetai = ({
  settypeHang,
  setNamsanxuat,
  setTaitrong,
  nhienlieu,
  setNhienlieu,
  setMausac,
  setBienso,
  setKM,
}: any) => {
  const [openHangxetai, setopenHangxetai] = useState(false);
  const [titleHangxetai, settitleHangxetai] = useState("");

  const [openTaitrong, setopenTaitrong] = useState(false);
  const [titleTaitrong, settitleTaitrong] = useState("");

  const handleopenHangxetai = () => {
    setopenHangxetai(!openHangxetai);
    setopenTaitrong(false);
  };
  const setSelectHangxetai = (item: xetai) => {
    settitleHangxetai(item.label);
    settypeHang(item.type);
    setopenHangxetai(!openHangxetai);
  };
  const handleopenTaitrong = () => {
    setopenHangxetai(false);
    setopenTaitrong(!openTaitrong);
  };
  const setSelectTaitrong = (item: any) => {
    settitleTaitrong(item.label);
    setTaitrong(item.label);
    setopenTaitrong(!openTaitrong);
  };

  return (
    <>
      {/* cho xe oto */}
      <div className="h-auto w-full space-y-3">
        {/* chon hang xe */}
        <div className="relative">
          <div className="mb-1 px-1 flex">
            <p>Hãng</p>
            <p className="text-red-500 ml-1">*</p>
          </div>
          <div
            onClick={() => handleopenHangxetai()}
            className="h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {titleHangxetai}
          </div>
          {openHangxetai && (
            <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400">
              {list_xetai &&
                list_xetai.map((item: xetai) => {
                  return (
                    <div
                      key={item.key}
                      className="h-[40px] w-full hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                      onClick={() => setSelectHangxetai(item)}
                    >
                      {item.label}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
        {/* chon taitrong */}
        <div className="relative">
          <div className="mb-1 px-1 flex">
            <p>Tải trọng</p>
            <p className="text-red-500 ml-1">*</p>
          </div>
          <div
            onClick={() => handleopenTaitrong()}
            className="h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {titleTaitrong}
          </div>
          {openTaitrong && (
            <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400">
              {list_taitrong &&
                list_taitrong.map((item: any) => {
                  return (
                    <div
                      key={item.key}
                      className="h-[40px] w-full hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                      onClick={() => setSelectTaitrong(item)}
                    >
                      {item.label}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
        {/* nam san xuat */}
        <div>
          <div className="mb-1 px-1 flex">
            <p>Năm sản xuất</p>
            <p className="text-red-500 ml-1">*</p>
          </div>
          <input
            type="number"
            className="h-[45px] w-full rounded-md border border-gray-400 outline-none px-2"
            onChange={(e) => setNamsanxuat(e.target.value)}
          />
        </div>
        {/* nhien lieu */}
        <div className="h-[65px] w-full">
          <div className="h-[30px] px-1 flex">
            <p>Nhiên liệu</p>
            <p className="text-red-500 ml-1">*</p>
          </div>
          <div className="flex item-center space-x-3">
            <button
              onClick={() => setNhienlieu(0)}
              className={`h-[35px] w-auto px-5 rounded-full bg-gray-200 hover:border hover:border-mauxanhtroi ${
                nhienlieu === 0 ? "bg-mauxanhtroi text-white" : ""
              }`}
            >
              Xăng
            </button>
            <button
              onClick={() => setNhienlieu(1)}
              className={`h-[35px] w-auto px-5 rounded-full bg-gray-200 hover:border hover:border-mauxanhtroi ${
                nhienlieu === 1 ? "bg-mauxanhtroi text-white" : ""
              }`}
            >
              Dầu
            </button>
          </div>
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
          <div>
            <div className="mb-1 px-1 flex">
              <p>Biển số</p>
            </div>
            <input
              type="text"
              className="h-[45px] w-full rounded-md border border-gray-400 outline-none px-2"
              onChange={(e) => setBienso(e.target.value)}
            />
          </div>
        </div>
        {/* so km */}
        <div>
          <div className="mb-1 px-1 flex">
            <p>Số KM</p>
            <p className="text-red-500 ml-1">*</p>
          </div>
          <input
            type="number"
            className="h-[45px] w-full rounded-md border border-gray-400 outline-none px-2"
            onChange={(e) => setKM(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default Dangtin_xetai;
