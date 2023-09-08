import React, { useState } from "react";
import item_listoto, { oto, dongxe } from "../../obj_data_raw/List_Oto";
const list_oto: oto[] = item_listoto;

const dangtin_oto = ({
  settypeHang,
  dongxe,
  setdongxe,
  setNamsanxuat,
  hopso,
  setHopso,
  nhienlieu,
  setNhienlieu,
  setChongoi,
  setMausac,
  setBienso,
  setKM,
}: any) => {
  const [keyHangoto, setkeyHangoto] = useState<number>(0);
  const dongxeoto: dongxe[] = item_listoto[keyHangoto].dongxe;
  const [openHangoto, setopenHangoto] = useState(false);
  const [titleHangoto, settitleHangoto] = useState("");
  const [opendonggxe, setopendongxe] = useState(false);

  const handleOpen = (value: string) => {
    if (value == "hang") {
      setopenHangoto(!openHangoto);
      setopendongxe(false);
    }
    if (value == "dongxe") {
      setopenHangoto(false);
      setopendongxe(!opendonggxe);
    }
  };

  const setSelectHangoto = (item: oto) => {
    settitleHangoto(item.label);
    settypeHang(item.type);
    setkeyHangoto(item.key - 1);
    setdongxe(undefined);
    setopenHangoto(!openHangoto);
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
            {titleHangoto}
          </div>
          {openHangoto && (
            <div className="absolute z-10 mt-1 h-auto max-h-[260px] w-full overflow-auto bg-white border border-gray-400 shadow-lg">
              {list_oto &&
                list_oto.map((item: oto) => {
                  return (
                    <div
                      key={item.key}
                      className="h-[40px] w-full hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                      onClick={() => setSelectHangoto(item)}
                    >
                      {item.label}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
        {/* chon dong xe */}
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
              {dongxeoto &&
                dongxeoto.map((item: dongxe) => {
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
        {/* hop so */}
        <div className="h-[65px] w-full">
          <div className="h-[30px] px-1 flex">
            <p>Hộp số</p>
            <p className="text-red-500 ml-1">*</p>
          </div>
          <div className="flex item-center space-x-3">
            <button
              onClick={() => setHopso(0)}
              className={`h-[35px] w-auto px-5 rounded-full bg-gray-200 hover:border hover:border-mauxanhtroi ${
                hopso === 0 ? `bg-mauxanhtroi text-white` : ``
              }`}
            >
              Số tự động
            </button>
            <button
              onClick={() => setHopso(1)}
              className={`h-[35px] w-auto px-5 rounded-full bg-gray-200 hover:border hover:border-mauxanhtroi ${
                hopso === 1 ? `bg-mauxanhtroi text-white` : ``
              }`}
            >
              Số sàn
            </button>
            <button
              onClick={() => setHopso(2)}
              className={`h-[35px] w-auto px-5 rounded-full bg-gray-200 hover:border hover:border-mauxanhtroi ${
                hopso === 2 ? `bg-mauxanhtroi text-white` : ``
              }`}
            >
              Bán tự động
            </button>
          </div>
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
            <button
              onClick={() => setNhienlieu(2)}
              className={`h-[35px] w-auto px-5 rounded-full bg-gray-200 hover:border hover:border-mauxanhtroi ${
                nhienlieu === 2 ? "bg-mauxanhtroi text-white" : ""
              }`}
            >
              Điện
            </button>
          </div>
        </div>
        {/* thong tin khac */}
        <div className="flex space-x-2">
          <div>
            <div className="mb-1 px-1 flex">
              <p>Số chỗ ngồi</p>
            </div>
            <input
              type="text"
              className="h-[45px] w-full rounded-md border border-gray-400 outline-none px-2"
              onChange={(e) => setChongoi(e.target.value)}
            />
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

export default dangtin_oto;
