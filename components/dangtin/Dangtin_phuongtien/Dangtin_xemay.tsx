import React, { useState } from "react";
import item_listxemay, {
  xemay,
  dongxe,
} from "../../../components/obj_data_raw/List_Xemay";
const list_xemay: xemay[] = item_listxemay;

const list_loaixemay = [
  { key: 1, label: "Xe Số", type: "xeso" },
  { key: 2, label: "Xe Tay ga", type: "xetayga" },
  { key: 3, label: "Xe Tay côn", type: "xetaycon" },
];
const list_dungtichxemay = [
  { key: 1, label: "dưới 50cc" },
  { key: 2, label: "50 - 99cc" },
  { key: 3, label: "100 - 149cc" },
  { key: 4, label: "150 - 175cc" },
  { key: 5, label: "trên 175cc" },
];

const Dangtin_xemay = ({
  settypeHang,
  dongxe,
  setdongxe,
  setLoaixemay,
  setNamsanxuat,
  setDungtich,
  setMausac,
  setBienso,
  setKM,
}: any) => {
  const [keyHangxemay, setkeyHangxemay] = useState<number>(0);
  const dongxemay: dongxe[] = item_listxemay[keyHangxemay].dongxe;
  const [openHangxemay, setopenHangxemay] = useState(false);
  const [titleHangxemay, settitleHangxemay] = useState("");
  const [openLoaixe, setopenLoaixe] = useState(false);
  const [titleLoaixe, settitleLoaixe] = useState("");
  const [opendungtich, setopendungtich] = useState(false);
  const [titleDungtich, settitleDungtich] = useState("");
  const [opendonggxe, setopendongxe] = useState(false);

  const handleOpen = (value: string) => {
    if (value == "hang") {
      setopenHangxemay(!openHangxemay);
      setopendongxe(false);
      setopenLoaixe(false);
      setopendungtich(false);
    }
    if (value == "dongxe") {
      setopenHangxemay(false);
      setopendongxe(!opendonggxe);
      setopenLoaixe(false);
      setopendungtich(false);
    }
    if (value == "loaixe") {
      setopenHangxemay(false);
      setopendongxe(false);
      setopenLoaixe(!openLoaixe);
      setopendungtich(false);
    }
    if (value == "dungtich") {
      setopenHangxemay(false);
      setopendongxe(false);
      setopenLoaixe(false);
      setopendungtich(!opendungtich);
    }
  };
  const setSelectHangxemay = (item: xemay) => {
    settitleHangxemay(item.label);
    settypeHang(item.type);
    setkeyHangxemay(item.key - 1);
    setdongxe(undefined);
    setopenHangxemay(!openHangxemay);
  };
  const setSelectLoaixemay = (item: any) => {
    settitleLoaixe(item.label);
    setLoaixemay(item.type);
    setopenLoaixe(!openLoaixe);
  };
  const setSelectDungtich = (item: any) => {
    settitleDungtich(item.label);
    setDungtich(item.label);
    setopendungtich(!opendungtich);
  };
  const setSelectDongxe = (item: dongxe) => {
    setdongxe(item.type);
    setopendongxe(!opendonggxe);
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
            onClick={() => handleOpen("hang")}
            className="h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {titleHangxemay}
          </div>
          {openHangxemay && (
            <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400 shadow-lg">
              {list_xemay &&
                list_xemay.map((item: xemay) => {
                  return (
                    <div
                      key={item.key}
                      className="h-[40px] w-full hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                      onClick={() => setSelectHangxemay(item)}
                    >
                      {item.label}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
        <div className="relative">
          <div className="mb-1 px-1 flex">
            <p>Dòng xe</p>
          </div>
          <div
            onClick={() => handleOpen("dongxe")}
            className="h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {dongxe}
          </div>
          {opendonggxe && (
            <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400 shadow-lg">
              {dongxemay &&
                dongxemay.map((item: dongxe) => {
                  return (
                    <div
                      key={item.key}
                      className="h-[40px] w-full hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                      onClick={() => setSelectDongxe(item)}
                    >
                      {item.type}
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
        {/* chon loai xe (xeso, xetayga, xetaycon) */}
        <div className="relative">
          <div className="mb-1 px-1 flex">
            <p>Loại xe</p>
            <p className="text-red-500 ml-1">*</p>
          </div>
          <div
            onClick={() => handleOpen("loaixe")}
            className="h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {titleLoaixe}
          </div>
          {openLoaixe && (
            <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400">
              {list_loaixemay &&
                list_loaixemay.map((item: any) => {
                  return (
                    <div
                      key={item.key}
                      className="h-[40px] w-full hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                      onClick={() => setSelectLoaixemay(item)}
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
          <div className="relative w-1/2">
            <div className="mb-1 px-1 flex">
              <p>Dung tích</p>
            </div>
            <div
              onClick={() => handleOpen("dungtich")}
              className="h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
            >
              {titleDungtich}
            </div>
            {opendungtich && (
              <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400">
                {list_dungtichxemay &&
                  list_dungtichxemay.map((item: any) => {
                    return (
                      <div
                        key={item.key}
                        className="h-[40px] w-full hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                        onClick={() => setSelectDungtich(item)}
                      >
                        {item.label}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
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

export default Dangtin_xemay;
