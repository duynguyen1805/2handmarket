import React, { useEffect, useState } from "react";
import item_list_laptop, { laptop, dongmay } from "../obj_data_raw/List_Laptop";
import { useMyContext } from "@/contexts/MyContext";
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
const manhinh_maytinhbang = [
  {
    key: 1,
    label: "dưới 11 inch",
  },
  {
    key: 2,
    label: "11 - 12.9 inch",
  },
  {
    key: 3,
    label: "13 - 14.9 inch",
  },
  {
    key: 4,
    label: "15 - 16.9 inch",
  },
  {
    key: 5,
    label: "17 - 18.9 inch",
  },
  {
    key: 6,
    label: "19 - 20.9 inch",
  },
  {
    key: 7,
    label: "trên 21 inch",
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

const Filter_laptop = ({
  typeHang,
  settypeHang,
  setFilteredHang,
  dongmay,
  setdongmay,
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
  const [keyHanglaptop, setkeyHanglaptop] = useState<number>(0);
  const dongmaylaptop: dongmay[] = item_list_laptop[keyHanglaptop].dongmay;
  const [openHanglaptop, setopenHanglaptop] = useState(false);
  const [openDungluong, setopenDungluong] = useState(false);
  const [openRam, setopenRam] = useState(false);
  const [openKichthuocmanhinh, setopenKichthuocmanhinh] = useState(false);
  const [openLoaicardmanhinh, setopenLoaicardmanhinh] = useState(false);
  const [openChip, setopenChip] = useState(false);
  // dung cho count filter
  const { countfilter, count_filter } = useMyContext();
  const [chonHanglaptop, setchonHanglaptop] = useState(false);
  const [chonDungluong, setchonDungluong] = useState(false);
  const [chonRam, setchonRam] = useState(false);
  const [chonKichthuocmanhinh, setchonKichthuocmanhinh] = useState(false);
  const [chonLoaicardmanhinh, setchonLoaicardmanhinh] = useState(false);
  const [chonChip, setchonChip] = useState(false);
  const [chonLoaiocung, setchonLoaiocung] = useState(false);
  const [opendongmay, setopendongmay] = useState(false);
  const [chondongmay, setchondongmay] = useState(false);

  useEffect(() => {
    if (typeHang) {
      setchonHanglaptop(true);
      count_filter(countfilter - 1);
    }
    if (dongmay) {
      setchondongmay(true);
      count_filter(countfilter - 1);
    }
    if (dungluong) {
      setchonDungluong(true);
      count_filter(countfilter - 1);
    }
    if (loaiocung == "SSD" || loaiocung == "HDD") {
      setchonLoaiocung(true);
      count_filter(countfilter - 1);
    }
    if (ram) {
      setchonRam(true);
      count_filter(countfilter - 1);
    }
    if (kichthuocmanhinh) {
      setchonKichthuocmanhinh(true);
      count_filter(countfilter - 1);
    }
    if (loaiCardmanhinh) {
      setchonLoaicardmanhinh(true);
      count_filter(countfilter - 1);
    }
    if (chip) {
      setchonChip(true);
      count_filter(countfilter - 1);
    }
  }, []);

  const handleopen = (value: any) => {
    if (value == "hang") {
      setopenHanglaptop(!openHanglaptop);
      setopenDungluong(false);
      setopenRam(false);
      setopenKichthuocmanhinh(false);
      setopenLoaicardmanhinh(false);
      setopenChip(false);
      setopendongmay(false);
    }
    if (value == "dongmay") {
      setopenHanglaptop(false);
      setopenDungluong(false);
      setopenRam(false);
      setopenKichthuocmanhinh(false);
      setopenLoaicardmanhinh(false);
      setopenChip(false);
      setopendongmay(!opendongmay);
    }
    if (value == "kichthuocmanhinh") {
      setopenHanglaptop(false);
      setopenDungluong(false);
      setopenRam(false);
      setopenKichthuocmanhinh(!openKichthuocmanhinh);
      setopenLoaicardmanhinh(false);
      setopenChip(false);
      setopendongmay(false);
    }
    if (value == "dungluong") {
      setopenHanglaptop(false);
      setopenDungluong(!openDungluong);
      setopenRam(false);
      setopenKichthuocmanhinh(false);
      setopenLoaicardmanhinh(false);
      setopenChip(false);
      setopendongmay(false);
    }
    if (value == "ram") {
      setopenHanglaptop(false);
      setopenDungluong(false);
      setopenRam(!openRam);
      setopenKichthuocmanhinh(false);
      setopenLoaicardmanhinh(false);
      setopenChip(false);
      setopendongmay(false);
    }
    if (value == "cardmanhinh") {
      setopenHanglaptop(false);
      setopenDungluong(false);
      setopenRam(false);
      setopenKichthuocmanhinh(false);
      setopenLoaicardmanhinh(!openLoaicardmanhinh);
      setopenChip(false);
      setopendongmay(false);
    }
    if (value == "cpu") {
      setopenHanglaptop(false);
      setopenDungluong(false);
      setopenRam(false);
      setopenKichthuocmanhinh(false);
      setopenLoaicardmanhinh(false);
      setopenChip(!openChip);
      setopendongmay(false);
    }
  };

  useEffect(() => {
    if (chonHanglaptop) {
      count_filter(countfilter + 1);
    }
  }, [chonHanglaptop]);
  useEffect(() => {
    if (chondongmay) {
      count_filter(countfilter + 1);
    }
  }, [chondongmay]);
  useEffect(() => {
    if (chonKichthuocmanhinh) {
      count_filter(countfilter + 1);
    }
  }, [chonKichthuocmanhinh]);
  useEffect(() => {
    if (chonDungluong) {
      count_filter(countfilter + 1);
    }
  }, [chonDungluong]);
  useEffect(() => {
    if (chonRam) {
      count_filter(countfilter + 1);
    }
  }, [chonRam]);
  useEffect(() => {
    if (chonLoaicardmanhinh) {
      count_filter(countfilter + 1);
    }
  }, [chonLoaicardmanhinh]);
  useEffect(() => {
    if (chonChip) {
      count_filter(countfilter + 1);
    }
  }, [chonChip]);
  useEffect(() => {
    if (chonLoaiocung) {
      count_filter(countfilter + 1);
    }
  }, [chonLoaiocung]);

  const setSelectHanglaptop = (item: laptop) => {
    settypeHang(item.type);
    setFilteredHang(item.key);
    setkeyHanglaptop(item.key - 1);
    setopenHanglaptop(!openHanglaptop);
    setchonHanglaptop(true);
    setdongmay(undefined);
  };
  const setSelectDongmay = (item: dongmay) => {
    setdongmay(item.type);
    setopendongmay(!opendongmay);
    setchondongmay(true);
  };
  const setSelectDungluong = (item: any) => {
    setDungluong(item);
    setopenDungluong(!openDungluong);
    setchonDungluong(true);
  };
  const handleClick_loaiocung = (n: string) => {
    setLoaiocung(n);
    setchonLoaiocung(true);
  };
  const setSelectRam = (item: any) => {
    setRam(item);
    setopenRam(!openRam);
    setchonRam(true);
  };
  const setSelectKichthuocmanhinh = (item: any) => {
    setKichthuocmanhinh(item);
    setopenKichthuocmanhinh(!openKichthuocmanhinh);
    setchonKichthuocmanhinh(true);
  };
  const setSelectLoaicardmanhinh = (item: any) => {
    setCardmanhinh(item);
    setopenLoaicardmanhinh(!openLoaicardmanhinh);
    setchonLoaicardmanhinh(true);
  };
  const setSelectChip = (item: any) => {
    setChip(item);
    setopenChip(!openChip);
    setchonChip(true);
  };

  return (
    <>
      {/* cho laptop */}
      <div className="h-auto w-full space-y-3">
        {/* chon hang laptop */}
        <div className="relative">
          <div className="mb-1 px-1 flex">
            <p>Hãng</p>
            <p className="text-red-500 ml-1">*</p>
          </div>
          <div
            onClick={() => handleopen("hang")}
            className="capitalize h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {typeHang}
          </div>
          {openHanglaptop && (
            <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400 shadow-lg">
              {list_laptop &&
                list_laptop.map((item: laptop) => {
                  return (
                    <div
                      key={item.key}
                      className="h-[40px] w-full hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                      onClick={() => setSelectHanglaptop(item)}
                    >
                      {item.label}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
        {/* chon dongmay */}
        <div className="relative">
          <div className="mb-1 px-1 flex">
            <p>Dòng máy</p>
          </div>
          <div
            onClick={() => handleopen("dongmay")}
            className="h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {dongmay}
          </div>
          {opendongmay && (
            <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400 shadow-lg">
              {dongmaylaptop &&
                dongmaylaptop.map((item: dongmay) => {
                  return (
                    <div
                      key={item.key}
                      className="h-[40px] w-full hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                      onClick={() => setSelectDongmay(item)}
                    >
                      {item.type}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
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
        {/* chon kichthuocmanhinh */}
        <div className="relative">
          <div className="mb-1 px-1 flex">
            <p>Kích thước màn hình</p>
          </div>
          <div
            onClick={() => handleopen("kichthuocmanhinh")}
            className="h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {kichthuocmanhinh}
          </div>
          {openKichthuocmanhinh && (
            <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400 shadow-lg">
              {manhinh_maytinhbang &&
                manhinh_maytinhbang.map((item: any) => {
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
              onClick={() => handleClick_loaiocung("SSD")}
              className={`h-[35px] w-auto px-5 rounded-full bg-gray-200 hover:border hover:border-mauxanhtroi ${
                loaiocung === "SSD" ? `bg-mauxanhtroi text-white` : ``
              }`}
            >
              SSD
            </button>
            <button
              onClick={() => handleClick_loaiocung("HDD")}
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
      </div>
    </>
  );
};

export default Filter_laptop;
