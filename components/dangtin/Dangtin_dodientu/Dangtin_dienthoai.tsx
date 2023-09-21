import React, { useEffect, useState } from "react";
import item_listphone, {
  phonebrand,
  dongmay,
} from "../../obj_data_raw/List_Phonebrand_raw";
const list_dienthoai: phonebrand[] = item_listphone;
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
    label: "Bạc",
  },
  {
    key: 4,
    label: "Trắng",
  },
  {
    key: 5,
    label: "Đỏ",
  },
  {
    key: 6,
    label: "Vàng hồng",
  },
  {
    key: 7,
    label: "Hồng",
  },
  {
    key: 8,
    label: "Xanh dương",
  },
  {
    key: 9,
    label: "Tím",
  },
  {
    key: 10,
    label: "Màu khác",
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

const Dangtin_dienthoai = ({
  settypeHang,
  dongmay,
  setdongmay,
  mausac,
  setMausac,
  dungluong,
  setDungluong,
  ram,
  setRam,
}: any) => {
  const [keyHangdienthoai, setkeyHangdienthoai] = useState<number>(0);
  const dongmaydienthoai: dongmay[] = item_listphone[keyHangdienthoai].dongmay;
  const [openHangdienthoai, setopenHangdienthoai] = useState(false);
  const [titleHangdienthoai, settitleHangdienthoai] = useState("");
  const [openMausac, setopenMausac] = useState(false);
  const [openDungluong, setopenDungluong] = useState(false);
  const [openRam, setopenRam] = useState(false);
  const [opendongmay, setopendongmay] = useState(false);

  const handleopen = (value: any) => {
    if (value == "hang") {
      setopenHangdienthoai(!openHangdienthoai);
      setopenMausac(false);
      setopenDungluong(false);
      setopenRam(false);
      setopendongmay(false);
    }
    if (value == "dongmay") {
      setopenHangdienthoai(false);
      setopenMausac(false);
      setopenDungluong(false);
      setopenRam(false);
      setopendongmay(!opendongmay);
    }
    if (value == "mausac") {
      setopenHangdienthoai(false);
      setopenMausac(!openMausac);
      setopenDungluong(false);
      setopenRam(false);
      setopendongmay(false);
    }
    if (value == "dungluong") {
      setopenHangdienthoai(false);
      setopenMausac(false);
      setopenDungluong(!openDungluong);
      setopenRam(false);
      setopendongmay(false);
    }
    if (value == "ram") {
      setopenHangdienthoai(false);
      setopenMausac(false);
      setopenDungluong(false);
      setopenRam(!openRam);
      setopendongmay(false);
    }
  };

  const setSelectHangdienthoai = (item: phonebrand) => {
    settitleHangdienthoai(item.label);
    settypeHang(item.type);
    setkeyHangdienthoai(item.key - 1);
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
  const setSelectDongmay = (item: dongmay) => {
    setdongmay(item.type);
    setopendongmay(!opendongmay);
  };

  return (
    <>
      {/* cho dienthoai */}
      <div className="h-auto w-full space-y-3">
        {/* chon hang dienthoai */}
        <div className="relative">
          <div className="mb-1 px-1 flex">
            <p>Hãng</p>
            <p className="text-red-500 ml-1">*</p>
          </div>
          <div
            onClick={() => handleopen("hang")}
            className="capitalize h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {titleHangdienthoai}
          </div>
          {openHangdienthoai && (
            <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400 shadow-lg">
              {list_dienthoai &&
                list_dienthoai.map((item: phonebrand) => {
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
              {dongmaydienthoai &&
                dongmaydienthoai.map((item: dongmay) => {
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
        {/* chon mausac dienthoai */}
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
        {/* chon ram dienthoai */}
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
        {/* chon dungluong dienthoai */}
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

export default Dangtin_dienthoai;
