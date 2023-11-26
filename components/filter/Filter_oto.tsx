import React, { useEffect, useState } from "react";
import item_listoto, { oto, dongxe } from "../obj_data_raw/List_Oto";
import { useMyContext } from "@/contexts/MyContext";
const list_oto: oto[] = item_listoto;

const Filter_oto = ({
  typeHang,
  settypeHang,
  setFilteredHang,
  dongxe,
  setdongxe,
  hopso,
  setHopso,
  nhienlieu,
  setNhienlieu,
  sochongoi,
  setChongoi,
}: any) => {
  const [keyHangoto, setkeyHangoto] = useState<number>(0);
  const dongxeoto: dongxe[] = item_listoto[keyHangoto].dongxe;
  const [openHangoto, setopenHangoto] = useState(false);
  // dung cho count filter
  const { countfilter, count_filter } = useMyContext();
  const [chonHangoto, setchonHangoto] = useState(false);
  const [chonHopsooto, setchonHopsooto] = useState(false);
  const [chonNhienlieuoto, setchonNhienlieuoto] = useState(false);
  const [chonChongoioto, setchonChongoioto] = useState<number>();
  const [opendonggxe, setopendongxe] = useState(false);
  const [chondongxe, setchondongxe] = useState(false);

  useEffect(() => {
    if (typeHang) {
      setchonHangoto(true);
      count_filter(countfilter - 1);
    }
    if (dongxe) {
      setchondongxe(true);
      count_filter(countfilter - 1);
    }
    if (hopso) {
      setchonHopsooto(true);
      count_filter(countfilter - 1);
    }
    if (nhienlieu) {
      setchonNhienlieuoto(true);
      count_filter(countfilter - 1);
    }
    if (sochongoi) {
      setchonChongoioto(1);
      count_filter(countfilter - 1);
    }
  }, []);

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
  // chọn hang xe
  const setSelectHangoto = (item: oto) => {
    settypeHang(item.type);
    setFilteredHang(item.key);
    setkeyHangoto(item.key - 1);
    setopenHangoto(!openHangoto);
    setchonHangoto(true);
    setdongxe(undefined);
  };
  const setSelectDongxe = (item: dongxe) => {
    setdongxe(item.type);
    setopendongxe(!opendonggxe);
    setchondongxe(true);
  };
  const handleClick_hopso = (n: number) => {
    setHopso(n);
    setchonHopsooto(true);
  };
  const handleClick_nhienlieu = (n: number) => {
    setNhienlieu(n);
    setchonNhienlieuoto(true);
  };
  const handleChange_chongoi = (value: any) => {
    setChongoi(value);
    if (value) {
      setchonChongoioto(1);
    } else {
      if (!value) {
        setchonChongoioto(2);
      }
    }
  };
  useEffect(() => {
    if (chonHangoto) {
      count_filter(countfilter + 1);
    }
  }, [chonHangoto]);
  useEffect(() => {
    if (chondongxe) {
      count_filter(countfilter + 1);
    }
  }, [chondongxe]);
  useEffect(() => {
    if (chonHopsooto) {
      count_filter(countfilter + 1);
    }
  }, [chonHopsooto]);
  useEffect(() => {
    if (chonNhienlieuoto) {
      count_filter(countfilter + 1);
    }
  }, [chonNhienlieuoto]);
  useEffect(() => {
    // if (chonChongoioto === 0) {
    //   count_filter(countfilter);
    // }
    if (chonChongoioto === 1) {
      count_filter(countfilter + 1);
    }
    if (chonChongoioto === 2) {
      count_filter(countfilter - 1);
    }
  }, [chonChongoioto]);

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
        {/* hop so */}
        <div className="h-[65px] w-full">
          <div className="h-[30px] px-1 flex">
            <p>Hộp số</p>
            <p className="text-red-500 ml-1">*</p>
          </div>
          <div className="flex item-center space-x-3">
            <button
              onClick={() => handleClick_hopso(0)}
              className={`md:h-[35px] w-auto px-5 rounded-full bg-gray-200 hover:border hover:border-mauxanhtroi ${
                hopso === 0 ? `bg-mauxanhtroi text-white` : ``
              }`}
            >
              Số tự động
            </button>
            <button
              onClick={() => handleClick_hopso(1)}
              className={`md:h-[35px] w-auto px-5 rounded-full bg-gray-200 hover:border hover:border-mauxanhtroi ${
                hopso === 1 ? `bg-mauxanhtroi text-white` : ``
              }`}
            >
              Số sàn
            </button>
            <button
              onClick={() => handleClick_hopso(2)}
              className={`md:h-[35px] w-auto px-5 rounded-full bg-gray-200 hover:border hover:border-mauxanhtroi ${
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
              onClick={() => handleClick_nhienlieu(0)}
              className={`h-[35px] w-auto px-5 rounded-full bg-gray-200 hover:border hover:border-mauxanhtroi ${
                nhienlieu === 0 ? "bg-mauxanhtroi text-white" : ""
              }`}
            >
              Xăng
            </button>
            <button
              onClick={() => handleClick_nhienlieu(1)}
              className={`h-[35px] w-auto px-5 rounded-full bg-gray-200 hover:border hover:border-mauxanhtroi ${
                nhienlieu === 1 ? "bg-mauxanhtroi text-white" : ""
              }`}
            >
              Dầu
            </button>
            <button
              onClick={() => handleClick_nhienlieu(2)}
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
              value={sochongoi ? sochongoi : ""}
              className="h-[45px] w-full rounded-md border border-gray-400 outline-none px-2"
              onChange={(e) => handleChange_chongoi(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter_oto;
