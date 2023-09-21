import React, { useState } from "react";
import item_list_tablet, {
  tablet,
  dongmay,
} from "../../obj_data_raw/List_Tablet";
const list_tablet: tablet[] = item_list_tablet;
const mausac_dienthoai = [
  {
    key: 1,
    label: "Đen",
  },
  {
    key: 2,
    label: "Đen bóng",
  },
  {
    key: 3,
    label: "Trắng",
  },
  {
    key: 4,
    label: "Đỏ",
  },
  {
    key: 5,
    label: "Vàng hồng",
  },
  {
    key: 6,
    label: "Hồng",
  },
  {
    key: 7,
    label: "Xanh dương",
  },
  {
    key: 8,
    label: "Tím",
  },
  {
    key: 9,
    label: "Khác",
  },
];
const dungluong_dienthoai = [
  {
    key: 1,
    label: "dưới 8GB",
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
    label: "64GB",
  },
  {
    key: 6,
    label: "128GB",
  },
  {
    key: 7,
    label: "256GB",
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
const ram_dienthoai = [
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
    label: "12GB",
  },
  {
    key: 3,
    label: "16GB",
  },
];
const manhinh_maytinhbang = [
  {
    key: 1,
    label: "dưới 7 inch",
  },
  {
    key: 2,
    label: "7 - 7.9 inch",
  },
  {
    key: 3,
    label: "8 - 8.9 inch",
  },
  {
    key: 4,
    label: "9 - 9.9 inch",
  },
  {
    key: 5,
    label: "10 - 10.9 inch",
  },
  {
    key: 6,
    label: "trên 10.9 inch",
  },
];

const Dangtin_maytinhbang = ({
  settypeHang,
  dongmay,
  setdongmay,
  mausac,
  setMausac,
  dungluong,
  setDungluong,
  ram,
  setRam,
  kichthuocmanhinh,
  setKichthuocmanhinh,
  sim,
  setSim,
}: any) => {
  const [keyHangmaytinhbang, setkeyHangmaytinhbang] = useState<number>(0);
  const dongmaymaytinhbang: dongmay[] =
    item_list_tablet[keyHangmaytinhbang].dongmay;
  const [openHangdienthoai, setopenHangdienthoai] = useState(false);
  const [titleHangdienthoai, settitleHangdienthoai] = useState("");
  const [openMausac, setopenMausac] = useState(false);
  const [openDungluong, setopenDungluong] = useState(false);
  const [openRam, setopenRam] = useState(false);
  const [openKichthuocmanhinh, setopenKichthuocmanhinh] = useState(false);
  const [opendongmay, setopendongmay] = useState(false);

  const handleopen = (value: any) => {
    if (value == "hang") {
      setopenHangdienthoai(!openHangdienthoai);
      setopenMausac(false);
      setopenDungluong(false);
      setopenRam(false);
      setopenKichthuocmanhinh(false);
      setopendongmay(false);
    }
    if (value == "dongmay") {
      setopenHangdienthoai(false);
      setopenMausac(false);
      setopenDungluong(false);
      setopenRam(false);
      setopenKichthuocmanhinh(false);
      setopendongmay(!opendongmay);
    }
    if (value == "mausac") {
      setopenHangdienthoai(false);
      setopenMausac(!openMausac);
      setopenDungluong(false);
      setopenRam(false);
      setopenKichthuocmanhinh(false);
      setopendongmay(false);
    }
    if (value == "dungluong") {
      setopenHangdienthoai(false);
      setopenMausac(false);
      setopenDungluong(!openDungluong);
      setopenRam(false);
      setopenKichthuocmanhinh(false);
      setopendongmay(false);
    }
    if (value == "ram") {
      setopenHangdienthoai(false);
      setopenMausac(false);
      setopenDungluong(false);
      setopenRam(!openRam);
      setopenKichthuocmanhinh(false);
      setopendongmay(false);
    }
    if (value == "kichthuocmanhinh") {
      setopenKichthuocmanhinh(!openKichthuocmanhinh);
      setopenHangdienthoai(false);
      setopenMausac(false);
      setopenDungluong(false);
      setopenRam(false);
      setopendongmay(false);
    }
  };

  const setSelectHangdienthoai = (item: tablet) => {
    settitleHangdienthoai(item.label);
    settypeHang(item.type);
    setkeyHangmaytinhbang(item.key - 1);
    setdongmay(undefined);
    setopenHangdienthoai(!openHangdienthoai);
  };
  const setSelectMausac = (item: any) => {
    setMausac(item);
    setopenMausac(!openMausac);
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
  const setSelectDongmay = (item: dongmay) => {
    setdongmay(item.type);
    setopendongmay(!opendongmay);
  };

  return (
    <>
      {/* cho maytinhbang */}
      <div className="h-auto w-full space-y-3">
        {/* chon hang maytinhbang */}
        <div className="relative">
          <div className="mb-1 px-1 flex">
            <p>Hãng</p>
            <p className="text-red-500 ml-1">*</p>
          </div>
          <div
            onClick={() => handleopen("hang")}
            className="h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {titleHangdienthoai}
          </div>
          {openHangdienthoai && (
            <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400 shadow-lg">
              {list_tablet &&
                list_tablet.map((item: tablet) => {
                  return (
                    <div
                      key={item.key}
                      className="h-[40px] w-full hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                      onClick={() => setSelectHangdienthoai(item)}
                    >
                      {item.label}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
        {/* chon dong may */}
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
              {dongmaymaytinhbang &&
                dongmaymaytinhbang.map((item: dongmay) => {
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
        {/* chon mausac maytinhbang */}
        <div className="relative">
          <div className="mb-1 px-1 flex">
            <p>Màu sắc</p>
            <p className="text-red-500 ml-1">*</p>
          </div>
          <div
            onClick={() => handleopen("mausac")}
            className="h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {mausac}
          </div>
          {openMausac && (
            <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400 shadow-lg">
              {mausac_dienthoai &&
                mausac_dienthoai.map((item: any) => {
                  return (
                    <div
                      key={item.key}
                      className="h-[40px] w-full hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                      onClick={() => setSelectMausac(item.label)}
                    >
                      {item.label}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
        {/* chon cosim3g maytinhbang */}
        <div className="h-[65px] w-full">
          <div className="h-[30px] px-1 flex">
            <p>Sử dụng sim 3G/4G</p>
          </div>
          <div className="flex item-center space-x-3">
            <button
              onClick={() => setSim(0)}
              className={`h-[35px] w-auto px-5 rounded-full bg-gray-200 hover:border hover:border-mauxanhtroi ${
                sim === 0 ? `bg-mauxanhtroi text-white` : ``
              }`}
            >
              Không có 3G/4G
            </button>
            <button
              onClick={() => setSim(1)}
              className={`h-[35px] w-auto px-5 rounded-full bg-gray-200 hover:border hover:border-mauxanhtroi ${
                sim === 1 ? `bg-mauxanhtroi text-white` : ``
              }`}
            >
              Hỗ trợ sim 3G/4G
            </button>
          </div>
        </div>
        {/* chon kichthuocmanhinh maytinhbang */}
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
        {/* chon ram maytinhbang */}
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
              {ram_dienthoai &&
                ram_dienthoai.map((item: any) => {
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
        {/* chon dungluong maytinhbang */}
        <div className="relative">
          <div className="mb-1 px-1 flex">
            <p>Dung lượng</p>
          </div>
          <div
            onClick={() => handleopen("dungluong")}
            className="h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {dungluong}
          </div>
          {openDungluong && (
            <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400 shadow-lg">
              {dungluong_dienthoai &&
                dungluong_dienthoai.map((item: any) => {
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
      </div>
    </>
  );
};

export default Dangtin_maytinhbang;
