import React, { useEffect, useState } from "react";
import item_listxemay, {
  xemay,
  dongxe,
} from "../../components/obj_data_raw/List_Xemay";
import { useMyContext } from "@/contexts/MyContext";
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

const Filter_xemay = ({
  typeHang,
  settypeHang,
  setFilteredHang,
  dongxe,
  setdongxe,
  loaixemay,
  setLoaixemay,
  dungtich,
  setDungtich,
}: any) => {
  const [keyHangxemay, setkeyHangxemay] = useState<number>(0);
  const dongxemay: dongxe[] = item_listxemay[keyHangxemay].dongxe;
  const [openHangxemay, setopenHangxemay] = useState(false);
  const [openLoaixe, setopenLoaixe] = useState(false);
  const [opendungtich, setopendungtich] = useState(false);
  // dung de count_filter
  const { countfilter, count_filter } = useMyContext();
  const [chonHangxemay, setchonHangxemay] = useState(false);
  const [chonLoaixe, setchonLoaixe] = useState(false);
  const [chondungtich, setchondungtich] = useState(false);
  const [opendonggxe, setopendongxe] = useState(false);
  const [chondongxe, setchondongxe] = useState(false);

  useEffect(() => {
    if (typeHang) {
      setchonHangxemay(true);
      count_filter(countfilter - 1);
    }
    if (dongxe) {
      setchondongxe(true);
      count_filter(countfilter - 1);
    }
    if (loaixemay) {
      setchonLoaixe(true);
      count_filter(countfilter - 1);
    }
    if (dungtich) {
      setchondungtich(true);
      count_filter(countfilter - 1);
    }
  }, []);
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
    settypeHang(item.type);
    setFilteredHang(item.key);
    setkeyHangxemay(item.key - 1);
    setopenHangxemay(!openHangxemay);
    setchonHangxemay(true);
    setdongxe(undefined);
  };
  const setSelectLoaixemay = (item: any) => {
    setLoaixemay(item.type);
    setopenLoaixe(!openLoaixe);
    setchonLoaixe(true);
  };
  const setSelectDungtich = (item: any) => {
    setDungtich(item.label);
    setopendungtich(!opendungtich);
    setchondungtich(true);
  };
  const setSelectDongxe = (item: dongxe) => {
    setdongxe(item.type);
    setopendongxe(!opendonggxe);
    setchondongxe(true);
  };
  useEffect(() => {
    if (chonHangxemay) {
      count_filter(countfilter + 1);
    }
  }, [chonHangxemay]);
  useEffect(() => {
    if (chondongxe) {
      count_filter(countfilter + 1);
    }
  }, [chondongxe]);
  useEffect(() => {
    if (chonLoaixe) {
      count_filter(countfilter + 1);
    }
  }, [chonLoaixe]);
  useEffect(() => {
    if (chondungtich) {
      count_filter(countfilter + 1);
    }
  }, [chondungtich]);

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
            className="capitalize h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {typeHang}
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
        {/* chon dongxe */}
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
        {/* chon loai xe (xeso, xetayga, xetaycon) */}
        <div className="relative">
          <div className="mb-1 px-1 flex">
            <p>Loại xe</p>
            <p className="text-red-500 ml-1">*</p>
          </div>
          <div
            onClick={() => handleOpen("loaixe")}
            className="capitalize h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
          >
            {loaixemay === "xeso" && "Xe số"}
            {loaixemay === "xetayga" && "Xe tay ga"}
            {loaixemay === "xetaycon" && "Xe tay côn"}
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
              className="capitalize h-[45px] w-full bg-white rounded-md border border-gray-400 outline-none p-2 flex mr-2 cursor-pointer"
            >
              {dungtich}
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
        </div>
      </div>
    </>
  );
};

export default Filter_xemay;
