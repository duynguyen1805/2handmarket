import Danhmuc from "@/components/Danhmuc";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import router from "next/router";
import icon_dodungkhac from "../../assets/icon/ic_dodungcanhan/icon_dodungkhac.svg";
import icon_dongho from "../../assets/icon/ic_dodungcanhan/icon_dongho.svg";
import icon_giaydep from "../../assets/icon/ic_dodungcanhan/icon_giaydep.svg";
import icon_nuochoa from "../../assets/icon/ic_dodungcanhan/icon_nuochoa.svg";
import icon_quanao from "../../assets/icon/ic_dodungcanhan/icon_quanao.svg";
import icon_tuixach from "../../assets/icon/ic_dodungcanhan/icon_tuixach.svg";
import icon_filter from "../../assets/icon/icon_filter.svg";
import Display_product_horizontal from "@/components/Display_product_horizontal";
//import css file Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ReactPaginate from "react-paginate";
import item_danhmuc, {
  danhmuc,
  sub_danhmuc,
} from "../../components/obj_data_raw/Danhmuc_raw";
import { API_get_Docanhan } from "@/service/userService";
import { useMyContext } from "@/contexts/MyContext";

const danhmuc_main: any[] = item_danhmuc[5].sub_danhmuc;

const list_filter_docanhan = [
  { key: 4, label: "Tất cả", type: undefined },
  {
    key: 1,
    label: "Nữ",
    type: 1,
  },
  { key: 2, label: "Nam", type: 2 },
  { key: 3, label: "Nam và nữ", type: 3 },
];

const do_dung_ca_nhan = () => {
  const [itemALLDocanhan, setitemALLDocanhan] = useState<any[]>([]);
  const [pagehientai, setpagehientai] = useState<number>(1);
  const [totalpages, setTotalPages] = useState<number>(1);
  const [type_danhmuccanhan, settype_danhmuccanhan] = useState<
    string | undefined
  >("ALL");
  const [labelFilter, setlabelFilter] = useState<string>("Tất cả");
  const [typeFilter, settypeFilter] = useState<number>();

  useEffect(() => {
    fetchDataProduct();
  }, [pagehientai, type_danhmuccanhan, typeFilter]);
  const fetchDataProduct = async () => {
    if (!type_danhmuccanhan && !typeFilter) {
      try {
        const build_data = {
          type: "ALL",
          soluong: 10,
          pagehientai: pagehientai,
        };
        const response = await API_get_Docanhan(build_data);
        setitemALLDocanhan(response.all_docanhan);
        setTotalPages(response.totalpages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      fetchDataProduct_filter();
    }
  };
  const fetchDataProduct_filter = async () => {
    try {
      const build_data = {
        type: type_danhmuccanhan,
        chogioitinh: typeFilter,
        soluong: 10,
        pagehientai: pagehientai,
      };
      const response = await API_get_Docanhan(build_data);
      setitemALLDocanhan(response.all_docanhan);
      setTotalPages(response.totalpages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [filteredHang, setFilteredHang] = useState<number | null>(null);
  const Filter_loaiDocanhan = async (key: number, tenloai: string) => {
    setitemALLDocanhan([]);
    if (filteredHang === key) {
      setFilteredHang(null);
      settype_danhmuccanhan(undefined);
      setpagehientai(1);
    } else {
      setFilteredHang(key);
      settype_danhmuccanhan(tenloai);
      setpagehientai(1);
    }
  };
  const Handle_TatcaHang = async () => {
    setFilteredHang(0);
    settype_danhmuccanhan(undefined);
    setpagehientai(1);
    setitemALLDocanhan([]);
    fetchDataProduct();
  };
  const handlePageClick = (event: any) => {
    const selected = event.selected + 1;
    setpagehientai(selected);
  };
  const [openModalFilter, setopenModalFilter] = useState<boolean>(false);
  const handleClick_btnFilter = () => {
    setopenModalFilter(!openModalFilter);
  };
  const setSelectFilter = (item: any) => {
    setlabelFilter(item.label);
    settypeFilter(item.type);
    setopenModalFilter(false);
  };

  return (
    <div className="bg-gray-100">
      <Head>
        <title>2Hand Market - Đồ dùng cá nhân</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon_2handmarket.png" />
      </Head>
      <Header />
      {/* Điều hướng */}
      <div className="h-[50px] w-full flex items-center justify-center mt-2">
        <div className="h-full w-[960px] bg-white text-lg flex items-center place-content-between p-1 rounded-lg shadow-md">
          <div className="flex items-end h-full w-auto">
            <Danhmuc />
            <p className="h-full w-auto flex items-center ml-3">
              Trang chủ / Đồ dùng cá nhân
            </p>
          </div>
          <div className="relative h-full">
            <div
              className="h-full w-auto min-w-[120px] flex items-center place-content-between space-x-2 px-3 rounded-md bg-white text-mauxanhtroi border border-mauxanhtroi cursor-pointer hover:opacity-80"
              onClick={() => handleClick_btnFilter()}
            >
              <p className="text-xl text-black">Lọc:</p>
              <p>{labelFilter}</p>
            </div>
            {openModalFilter && (
              <div className="absolute z-10 mt-1 h-auto w-full overflow-auto bg-white border border-gray-400 rounded-md shadow-lg">
                {list_filter_docanhan &&
                  list_filter_docanhan.map((item: any) => {
                    return (
                      <div
                        key={item.key}
                        className="h-[40px] w-full hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                        onClick={() => setSelectFilter(item)}
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
      <div className="text-lg font-bold w-full flex items-center justify-center mt-2">
        <div className="h-[30px] w-[960px] overflow-hidden">
          <p className="running-text">
            Mua bán đồ cá nhân thuận tiện, nhanh chóng
          </p>
        </div>
      </div>
      {/* Option */}
      <div className="h-auto w-full flex items-center justify-center mt-3">
        <div className="bg-white shadow-sm h-full w-[960px] px-2 pt-2">
          <div className="w-full flex items-center place-content-between">
            <p className="text-lg font-bold">
              Khám phá đa dạng đồ dùng cá nhân
            </p>
            <p
              className="text-lg font-bold text-mauxanhtroi underline cursor-pointer hover:opacity-75"
              onClick={() => Handle_TatcaHang()}
            >
              Xem tất cả
            </p>
          </div>
          <div className="h-[140px] w-full pt-3">
            <div className="h-full w-full flex">
              {danhmuc_main &&
                danhmuc_main.map((item: sub_danhmuc) => {
                  return (
                    <div key={item.key} className="h-full w-[150px]">
                      <div className="h-[70px] w-full flex items-center justify-center">
                        <div
                          onClick={() =>
                            Filter_loaiDocanhan(item.key, item.type)
                          }
                          className={`h-[70px] w-[70px] flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-300 ${
                            item.key === filteredHang ? "bg-gray-300" : ""
                          }`}
                        >
                          <Image
                            src={
                              (item.key === 1 && icon_quanao) ||
                              (item.key === 2 && icon_dongho) ||
                              (item.key === 3 && icon_giaydep) ||
                              (item.key === 4 && icon_nuochoa) ||
                              (item.key === 5 && icon_tuixach) ||
                              (item.key === 6 && icon_dodungkhac)
                            }
                            alt="icon"
                            className="h-[50px] w-[50px] cursor-pointer"
                          />
                        </div>
                      </div>
                      <p className="h-[30px] w-full flex justify-center cursor-pointer p-1">
                        {item.label}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="h-auto w-full flex flex-col items-center justify-center mt-3">
        <div className="bg-white shadow-sm h-auto min-h-[360px] max-h-[1940px] w-[960px] p-2 overflow-x-hidden">
          {itemALLDocanhan &&
            itemALLDocanhan.map((item: any, index: any) => {
              return (
                <div key={index}>
                  <Display_product_horizontal item={item} />
                </div>
              );
            })}
        </div>
        <div className="bg-gray-100 mt-5 mb-3">
          <ReactPaginate
            forcePage={pagehientai - 1}
            breakLabel="..."
            nextLabel="Sau >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            pageCount={totalpages}
            previousLabel="< Trước"
            renderOnZeroPageCount={null}
            //css
            pageClassName="h-full w-[35px] flex items-center justify-center text-lg border border-blue-500 text-blue-500"
            pageLinkClassName="page-link"
            previousClassName="h-full w-[100px] bg-gray-100 rounded-l-md border-2 border-blue-500 flex items-center justify-center text-lg text-blue-500 cursor-pointer"
            previousLinkClassName="page-link"
            nextClassName="h-full w-[100px] bg-gray-100 rounded-r-md border-2 border-blue-500 flex items-center justify-center text-lg text-blue-500 cursor-pointer"
            nextLinkClassName="page-link"
            breakClassName="h-full w-[35px] flex items-center justify-center border border-blue-500 text-blue-500"
            breakLinkClassName="page-link"
            containerClassName="h-[40px] flex items-center justify-center space-x-2"
            activeClassName="bg-blue-500 text-white"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default do_dung_ca_nhan;
