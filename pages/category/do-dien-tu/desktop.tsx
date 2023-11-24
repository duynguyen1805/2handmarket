import Danhmuc from "@/components/Danhmuc";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import router from "next/router";
import icon_other from "../../../assets/icon/ic_dodientu/ic_hangdienthoai/other.svg";
import icon_filter from "../../../assets/icon/icon_filter.svg";
import icon_loading from "../../../assets/icon/loading.png";
//import css file Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ReactPaginate from "react-paginate";

import item_list_desktop, {
  desktop,
} from "../../../components/obj_data_raw/List_Desktop";
import { API_get_Dodientu } from "@/service/userService";
import Modal_Filter_Dodientu from "@/components/modal/Modal_Filter_Dodientu";
import { useMyContext } from "@/contexts/MyContext";
import Display_product_vertical_v2 from "@/components/Display_product_vertical_v2";
import Link from "next/link";

const list_desktop: desktop[] = item_list_desktop;

const Desktop = () => {
  const settings_slider = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    autoplay: false,
    delay: 300,
    responsive: [
      {
        breakpoint: 1024, // < 1024
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 767, // < 767
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 375, // < 375
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
    ],
  };
  const [itemDesktop, setitemDesktop] = useState<any[] | null>(null);
  const [pagehientai, setpagehientai] = useState<number>(1);
  const [totalpages, setTotalPages] = useState<number>(1);
  const [cpu, setCPU] = useState<string>();
  const [ram, setRam] = useState(); // chon dungluong 8GB -> 1T
  const [dungluong, setDungluong] = useState(); // chon dungluong 8GB -> 1T
  const [loaiocung, setLoaiocung] = useState("SSD"); // hdd, ssd
  const [loaiCardmanhinh, setCardmanhinh] = useState(); // onboard, amd, nvidia
  const [kichthuocmanhinh, setKichthuocmanhinh] = useState(); // kích thước màn hình

  const { countfilter, count_filter } = useMyContext();

  useEffect(() => {
    fetchDataProduct();
  }, [pagehientai, cpu]);
  const fetchDataProduct = async () => {
    if (!cpu) {
      try {
        const build_data = {
          type: "desktop",
          soluong: 36,
          cpu: "ALL",
          pagehientai: pagehientai,
        };
        const response = await API_get_Dodientu(build_data);
        setitemDesktop(response.desktop);
        setTotalPages(response.totalpages);
        count_filter(0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      fetchDataProduct_filter();
    }
  };
  const build_data_filter = {
    type: "desktop",
    soluong: 36,
    cpu: cpu,
    pagehientai: pagehientai,
    ram: ram,
    ocung: dungluong,
    loaiocung: loaiocung,
    displaycard: loaiCardmanhinh,
  };
  const fetchDataProduct_filter = async () => {
    try {
      const response = await API_get_Dodientu(build_data_filter);
      setitemDesktop(response.desktop);
      setTotalPages(response.totalpages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [filteredHang, setFilteredHang] = useState<number | null>(null);
  const Filter_CPU = async (key: number, tenCPU: string) => {
    setitemDesktop(null);
    if (filteredHang === key) {
      setFilteredHang(null);
      setCPU(undefined);
      setpagehientai(1);
      count_filter(0);
    } else {
      setFilteredHang(key);
      setCPU(tenCPU);
      setpagehientai(1);
      count_filter(1);
    }
    setRam(undefined);
    setDungluong(undefined);
    setLoaiocung("SSD");
    setCardmanhinh(undefined);
  };
  const Handle_TatcaHang = async () => {
    setFilteredHang(0);
    setCPU(undefined);
    setpagehientai(1);
    setitemDesktop(null);
    fetchDataProduct();
    count_filter(0);
  };
  const handlePageClick = (event: any) => {
    const selected = event.selected + 1;
    setpagehientai(selected);
    setitemDesktop(null);
  };
  const [openModalFilter, setopenModalFilter] = useState<boolean>(false);
  const handleClick_btnFilter = () => {
    setopenModalFilter(!openModalFilter);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Modal_Filter_Dodientu
        type="desktop"
        hang={cpu}
        setHang={setCPU}
        dungluong={dungluong}
        setDungluong={setDungluong}
        ram={ram}
        setRam={setRam}
        loaiocung={loaiocung}
        setLoaiocung={setLoaiocung}
        loaiCardmanhinh={loaiCardmanhinh}
        setCardmanhinh={setCardmanhinh}
        kichthuocmanhinh={kichthuocmanhinh}
        setKichthuocmanhinh={setKichthuocmanhinh}
        setFilteredHang={setFilteredHang}
        fetchDataProduct_filter={() => fetchDataProduct_filter()}
        setpagehientai={setpagehientai}
        openModalFilter={openModalFilter}
        setopenModalFilter={setopenModalFilter}
      />

      <Head>
        <title>2Hand Market - Desktop</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon_2handmarket.png" />
      </Head>
      <Header />
      <div className="h-auto md:min-h-[calc(100vh-115px)] lg:min-h-[calc(100vh-80px)] w-[100%] sm:pb-20 md:pb-0 bg-gray-100 flex flex-col place-content-between">
        <div>
          {/* Điều hướng */}
          <div className="h-[60px] w-full flex items-center justify-center mt-2">
            <div className="h-full w-[1440px] bg-white sm:text-lg md:text-xl flex items-center place-content-between py-1 px-3 rounded-lg shadow-md">
              <div className="flex items-center h-full w-auto">
                <Danhmuc />
                <div className="h-full w-auto sm:hidden md:flex items-center ml-3 space-x-1">
                  <Link
                    href="/"
                    className="cursor-pointer hover:text-mauxanhtroi"
                  >
                    Trang chủ
                  </Link>{" "}
                  <p>/ Đồ điện tử / Desktop</p>
                </div>
              </div>
              <div
                className="relative h-full w-auto flex items-center space-x-2 px-3 rounded-md bg-white text-mauxanhtroi border border-mauxanhtroi cursor-pointer hover:opacity-80"
                onClick={() => handleClick_btnFilter()}
              >
                <Image
                  src={icon_filter}
                  alt=""
                  className="h-[60%] w-auto pt-1 icon-blue"
                />
                <p>Bộ lọc</p>
                <p className="absolute h-[26px] w-[26px] rounded-full top-[-10px] right-[-10px] text-white bg-mauxanhtroi border border-mauxanhtroi flex items-center justify-center hover:scale-110">
                  {countfilter}
                </p>
              </div>
            </div>
          </div>
          <div className="text-lg font-bold w-full flex items-center justify-center mt-2">
            <div className="h-[30px] w-[960px] overflow-hidden">
              <p className="running-text">
                Mua bán máy tính để bàn qua sử dụng thuận tiện, nhanh chóng
              </p>
            </div>
          </div>
          {/* Option */}
          <div className="h-auto w-full flex items-center justify-center mt-3">
            <div className="bg-white shadow-sm h-full w-auto md:w-full lg:w-[1440px] max-w-full px-2 pt-2">
              <div className="w-full flex items-center place-content-between">
                <p className="h-[50px] flex items-center sm:text-lg md:text-2xl font-bold">
                  Khám phá Desktop với đa dạng cấu hình
                </p>
                <p
                  className="text-lg text-end font-bold text-mauxanhtroi underline cursor-pointer hover:opacity-75"
                  onClick={() => Handle_TatcaHang()}
                >
                  Xem tất cả
                </p>
              </div>
              <div className="h-[140px] w-full pt-3">
                <div className="h-full w-full">
                  <Slider {...settings_slider}>
                    {list_desktop &&
                      list_desktop.map((item: desktop) => {
                        return (
                          <div key={item.key} className="h-full w-[150px]">
                            <div className="h-[70px] w-full flex items-center justify-center">
                              <div
                                onClick={() => Filter_CPU(item.key, item.label)}
                                className={`h-[70px] w-[70px] flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-300 ${
                                  item.key === filteredHang ? "bg-gray-300" : ""
                                }`}
                              >
                                {item.key === 11 && (
                                  <Image
                                    src={item.key === 11 && icon_other}
                                    alt="icon"
                                    className="h-[50px] w-[50px] cursor-pointer"
                                  />
                                )}
                                <p hidden={item.key === 11} className="text-lg">
                                  {item.sublabel}
                                </p>
                              </div>
                            </div>
                            <p className="h-[30px] w-full sm:text-sm md:text-xl flex justify-center cursor-pointer p-1 sm:mt-1 md:mt-0">
                              {item.label}
                            </p>
                          </div>
                        );
                      })}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
          <div className="h-auto w-full flex flex-col items-center justify-center mt-3">
            {itemDesktop == null && (
              <div className="h-[50px] w-full md:text-2xl flex items-center justify-center space-x-2">
                <Image
                  src={icon_loading}
                  alt=""
                  className="h-[45px] w-[45px] loading"
                />
                <p className="">
                  Loading... Vui lòng chờ Server phản hồi sau giây lát.
                </p>
              </div>
            )}
            {itemDesktop && itemDesktop.length == 0 && (
              <div className="h-[50px] w-full md:text-2xl flex items-center justify-center space-x-2">
                <p className="">
                  Danh mục hiện tại không có tin đăng nào hiển thị !
                </p>
              </div>
            )}
            {itemDesktop && itemDesktop.length !== 0 && (
              <div className="bg-white shadow-sm h-auto min-h-[360px] w-auto sm:w-full lg:w-[1440px] sm:max-h-[4280px] max-w-full sm:grid sm:grid-cols-2 md:flex justify-center md:flex-wrap gap-[10px] px-2 py-3 overflow-hidden">
                {itemDesktop &&
                  itemDesktop.map((item: any, index: any) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-center"
                      >
                        <Display_product_vertical_v2 item={item} />
                      </div>
                    );
                  })}
              </div>
            )}

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
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Desktop;
