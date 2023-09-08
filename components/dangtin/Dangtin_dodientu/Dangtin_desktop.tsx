import React, { useState } from "react";
import item_list_laptop, { laptop } from "../../obj_data_raw/List_Laptop";
const list_laptop: laptop[] = item_list_laptop;
const chip_laptop = [
  {
    key: 1,
    label: "AMD",
  },
  {
    key: 2,
    label: "Intel Atom",
  },
  {
    key: 3,
    label: "Intel core i3",
  },
  {
    key: 4,
    label: "Intel core i5",
  },
  {
    key: 5,
    label: "Intel core i7",
  },
  {
    key: 6,
    label: "Intel Pentium",
  },
  {
    key: 7,
    label: "Intel Xeon",
  },
  {
    key: 8,
    label: "Ryzen 3",
  },
  {
    key: 9,
    label: "Ryzen 5",
  },
  {
    key: 10,
    label: "Ryzen 7",
  },
  {
    key: 11,
    label: "Khác",
  },
];
const dungluong_laptop = [
  {
    key: 1,
    label: "dưới 128GB",
  },
  {
    key: 2,
    label: "128GB",
  },
  {
    key: 3,
    label: "250GB",
  },
  {
    key: 4,
    label: "256GB",
  },
  {
    key: 5,
    label: "320GB",
  },
  {
    key: 6,
    label: "480GB",
  },
  {
    key: 7,
    label: "500GB",
  },
  {
    key: 8,
    label: "512GB",
  },
  {
    key: 9,
    label: "1TB",
  },
];
const ram_laptop = [
  {
    key: 1,
    label: "4GB",
  },
  {
    key: 2,
    label: "8GB",
  },
  {
    key: 3,
    label: "16GB",
  },
  {
    key: 4,
    label: "32GB",
  },
  {
    key: 5,
    label: "trên 32GB",
  },
];
const manhinh_desktop = [
  {
    key: 1,
    label: "Không bán kèm màn hình",
  },
  {
    key: 2,
    label: "15 - 16.9 inch",
  },
  {
    key: 3,
    label: "17 - 18.9 inch",
  },
  {
    key: 4,
    label: "19 - 20.9 inch",
  },
  {
    key: 5,
    label: "22 inch",
  },
  {
    key: 6,
    label: "24 inch",
  },
  {
    key: 7,
    label: "27 inch",
  },
  {
    key: 8,
    label: "32 inch",
  },
  {
    key: 9,
    label: "trên 32 inch",
  },
];
const cardmanhinh_laptop = [
  {
    key: 1,
    label: "Onboard",
  },
  {
    key: 2,
    label: "AMD",
  },
  {
    key: 3,
    label: "NVIDIA",
  },
  {
    key: 4,
    label: "Khác",
  },
];

const dangtin_desktop = ({
  dungluong,
  setDungluong,
  ram,
  setRam,
  kichthuocmanhinh,
  setKichthuocmanhinh,
  loaiocung,
  setLoaiocung,
  loaiCardmanhinh,
  setCardmanhinh,
  chip,
  setChip,
}: any) => {
  const [openDungluong, setopenDungluong] = useState(false);
  const [openRam, setopenRam] = useState(false);
  const [openKichthuocmanhinh, setopenKichthuocmanhinh] = useState(false);
  const [openLoaicardmanhinh, setopenLoaicardmanhinh] = useState(false);
  const [openChip, setopenChip] = useState(false);

  const handleopen = (value: any) => {
    if (value == "kichthuocmanhinh") {
      setopenDungluong(false);
      setopenRam(false);
      setopenKichthuocmanhinh(!openKichthuocmanhinh);
      setopenLoaicardmanhinh(false);
      setopenChip(false);
    }
    if (value == "dungluong") {
      setopenDungluong(!openDungluong);
      setopenRam(false);
      setopenKichthuocmanhinh(false);
      setopenLoaicardmanhinh(false);
      setopenChip(false);
    }
    if (value == "ram") {
      setopenDungluong(false);
      setopenRam(!openRam);
      setopenKichthuocmanhinh(false);
      setopenLoaicardmanhinh(false);
      setopenChip(false);
    }
    if (value == "cardmanhinh") {
      setopenDungluong(false);
      setopenRam(false);
      setopenKichthuocmanhinh(false);
      setopenLoaicardmanhinh(!openLoaicardmanhinh);
      setopenChip(false);
    }
    if (value == "cpu") {
      setopenDungluong(false);
      setopenRam(false);
      setopenKichthuocmanhinh(false);
      setopenLoaicardmanhinh(false);
      setopenChip(!openChip);
    }
  };

  const setSelectDungluong = (item: any) => {
    setDungluong(item);
    setopenDungluong(!openDungluong);
  };
  const setSelectRam = (item: any) => {
    setRam(item);
    setopenRam(!openRam);
  };
  const setSelectKichthuocmanhinh = (item: any) => {
    setKichthuocmanhinh(item);
    setopenKichthuocmanhinh(!openKichthuocmanhinh);
  };
  const setSelectLoaicardmanhinh = (item: any) => {
    setCardmanhinh(item);
    setopenLoaicardmanhinh(!openLoaicardmanhinh);
  };
  const setSelectChip = (item: any) => {
    setChip(item);
    setopenChip(!openChip);
  };

  return (
    <>
      {/* cho laptop */}
      <div className="h-auto w-full space-y-3">
        {/* chon chip */}
        <div className="relative">
          <div className="mb-1 px-1 flex">
            <p>Vi xử lí</p>
          </div>
          <div
            onClick={() => handleopen("cpu")}
            className="h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {chip}
          </div>
          {openChip && (
            <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400 shadow-lg">
              {chip_laptop &&
                chip_laptop.map((item: any) => {
                  return (
                    <div
                      key={item.key}
                      className="h-[40px] w-full hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                      onClick={() => setSelectChip(item.label)}
                    >
                      {item.label}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
        {/* chon ram  */}
        <div className="relative">
          <div className="mb-1 px-1 flex">
            <p>Ram</p>
          </div>
          <div
            onClick={() => handleopen("ram")}
            className="h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {ram}
          </div>
          {openRam && (
            <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400 shadow-lg">
              {ram_laptop &&
                ram_laptop.map((item: any) => {
                  return (
                    <div
                      key={item.key}
                      className="h-[40px] w-full hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                      onClick={() => setSelectRam(item.label)}
                    >
                      {item.label}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
        {/* chon dungluong  */}
        <div className="relative">
          <div className="mb-1 px-1 flex">
            <p>Ổ cứng</p>
          </div>
          <div
            onClick={() => handleopen("dungluong")}
            className="h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {dungluong}
          </div>
          {openDungluong && (
            <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400 shadow-lg">
              {dungluong_laptop &&
                dungluong_laptop.map((item: any) => {
                  return (
                    <div
                      key={item.key}
                      className="h-[40px] w-full hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                      onClick={() => setSelectDungluong(item.label)}
                    >
                      {item.label}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
        {/* chon loaiocung */}
        <div className="h-[65px] w-full">
          <div className="h-[30px] px-1 flex">
            <p>Loại ổ cứng</p>
          </div>
          <div className="flex item-center space-x-3">
            <button
              onClick={() => setLoaiocung("SSD")}
              className={`h-[35px] w-auto px-5 rounded-full bg-gray-200 hover:border hover:border-mauxanhtroi ${
                loaiocung === "SSD" ? `bg-mauxanhtroi text-white` : ``
              }`}
            >
              SSD
            </button>
            <button
              onClick={() => setLoaiocung("HDD")}
              className={`h-[35px] w-auto px-5 rounded-full bg-gray-200 hover:border hover:border-mauxanhtroi ${
                loaiocung === "HDD" ? `bg-mauxanhtroi text-white` : ``
              }`}
            >
              HDD
            </button>
          </div>
        </div>
        {/* chon cardmanhinh  */}
        <div className="relative">
          <div className="mb-1 px-1 flex">
            <p>Card màn hình</p>
          </div>
          <div
            onClick={() => handleopen("cardmanhinh")}
            className="h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {loaiCardmanhinh}
          </div>
          {openLoaicardmanhinh && (
            <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400 shadow-lg">
              {cardmanhinh_laptop &&
                cardmanhinh_laptop.map((item: any) => {
                  return (
                    <div
                      key={item.key}
                      className="h-[40px] w-full hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                      onClick={() => setSelectLoaicardmanhinh(item.label)}
                    >
                      {item.label}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
        {/* chon kichthuocmanhinh */}
        <div className="relative">
          <div className="mb-1 px-1 flex">
            <p>Kích thước màn hình (nếu có bán kèm)</p>
          </div>
          <div
            onClick={() => handleopen("kichthuocmanhinh")}
            className="h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {kichthuocmanhinh}
          </div>
          {openKichthuocmanhinh && (
            <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400 shadow-lg">
              {manhinh_desktop &&
                manhinh_desktop.map((item: any) => {
                  return (
                    <div
                      key={item.key}
                      className="h-[40px] w-full hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                      onClick={() => setSelectKichthuocmanhinh(item.label)}
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

export default dangtin_desktop;
