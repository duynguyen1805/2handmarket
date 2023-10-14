import Danhmuc from "@/components/Danhmuc";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import router from "next/router";
import icon_amnhac from "../../assets/icon/ic_giaitri_thethao/icon_amnhac.svg";
import icon_dothethao from "../../assets/icon/ic_giaitri_thethao/icon_dothethao.svg";
import icon_game from "../../assets/icon/ic_giaitri_thethao/icon_game.svg";
import icon_sach from "../../assets/icon/ic_giaitri_thethao/icon_sach.svg";
import icon_sothichkhac from "../../assets/icon/ic_giaitri_thethao/icon_sothichkhac.svg";
//import css file Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ReactPaginate from "react-paginate";

import item_danhmuc, {
  danhmuc,
  sub_danhmuc,
} from "../../components/obj_data_raw/Danhmuc_raw";
import { API_get_Dogiaitri } from "@/service/userService";
import Display_product_vertical_v2 from "@/components/Display_product_vertical_v2";
import Link from "next/link";
const danhmuc_main: any[] = item_danhmuc[6].sub_danhmuc;

const Do_giai_tri = () => {
  const [itemALLDogiaitri, setitemALLDogiaitri] = useState<any[]>([]);
  const [pagehientai, setpagehientai] = useState<number>(1);
  const [totalpages, setTotalPages] = useState<number>(1);
  const [type_danhmucgiaitri, settype_danhmucgiaitri] = useState<string>();

  useEffect(() => {
    fetchDataProduct();
  }, [pagehientai, type_danhmucgiaitri]);
  const fetchDataProduct = async () => {
    if (!type_danhmucgiaitri) {
      try {
        const build_data = {
          type: "ALL",
          soluong: 36,
          pagehientai: pagehientai,
        };
        const response = await API_get_Dogiaitri(build_data);
        setitemALLDogiaitri(response.all_dogiaitri);
        setTotalPages(response.totalpages);
        console.log("check response: ", response);
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
        type: type_danhmucgiaitri,
        soluong: 36,
        pagehientai: pagehientai,
      };
      const response = await API_get_Dogiaitri(build_data);
      setitemALLDogiaitri(response.all_dogiaitri);
      setTotalPages(response.totalpages);
      console.log("check response: ", response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [filteredHang, setFilteredHang] = useState<number | null>(null);
  const Filter_loaiDogiaitri = async (key: number, tenloai: string) => {
    setitemALLDogiaitri([]);
    if (filteredHang === key) {
      setFilteredHang(null);
      settype_danhmucgiaitri(undefined);
      setpagehientai(1);
    } else {
      setFilteredHang(key);
      settype_danhmucgiaitri(tenloai);
      setpagehientai(1);
    }
  };
  const Handle_TatcaHang = async () => {
    setFilteredHang(0);
    settype_danhmucgiaitri(undefined);
    setpagehientai(1);
    setitemALLDogiaitri([]);
    fetchDataProduct();
  };
  const handlePageClick = (event: any) => {
    const selected = event.selected + 1;
    setpagehientai(selected);
  };
  const settings_slider = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
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
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 375, // < 375
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>2Hand Market - Đồ dùng giải trí, thể thao</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon_2handmarket.png" />
      </Head>
      <div className="absolute h-auto w-full top-0 left-0">
        <Header />
      </div>
      <div className="h-auto min-h-screen w-[100%] lg:pt-[80px] md:pt-[115px] bg-gray-100 flex flex-col place-content-between">
        <div>
          {/* Điều hướng */}
          <div className="h-[60px] w-full flex items-center justify-center mt-2">
            <div className="h-full w-[1440px] bg-white text-xl flex items-center p-1 rounded-lg shadow-md">
              <Danhmuc />
              <div className="h-full w-auto flex items-center ml-3 space-x-1">
                <Link
                  href="/"
                  className="cursor-pointer hover:text-mauxanhtroi"
                >
                  Trang chủ
                </Link>{" "}
                <p>/ Đồ dùng giải trí, thể thao</p>
              </div>
            </div>
          </div>
          <div className="text-lg font-bold w-full flex items-center justify-center mt-2">
            <div className="h-[30px] w-[960px] overflow-hidden">
              <p className="running-text">
                Mua bán đồ dùng giải trí, thể thao thuận tiện, nhanh chóng
              </p>
            </div>
          </div>
          {/* Option */}
          <div className="h-auto w-full flex items-center justify-center mt-3">
            <div className="bg-white shadow-sm h-full w-auto md:w-full lg:w-[1440px] max-w-full px-2 pt-2">
              <div className="w-full flex items-center place-content-between">
                <p className="h-[50px] flex items-center text-2xl font-bold">
                  Khám phá đa dạng đồ dùng giải trí, thể thao
                </p>
                <p
                  className="text-lg font-bold text-mauxanhtroi underline cursor-pointer hover:opacity-75"
                  onClick={() => Handle_TatcaHang()}
                >
                  Xem tất cả
                </p>
              </div>
              <div className="h-[140px] w-full pt-3">
                <div className="h-full w-full">
                  <Slider {...settings_slider}>
                    {danhmuc_main &&
                      danhmuc_main.map((item: sub_danhmuc) => {
                        return (
                          <div key={item.key} className="h-full w-[200px]">
                            <div className="h-[70px] w-full flex items-center justify-center">
                              <div
                                onClick={() =>
                                  Filter_loaiDogiaitri(item.key, item.type)
                                }
                                className={`h-[70px] w-[70px] flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-300 ${
                                  item.key === filteredHang ? "bg-gray-300" : ""
                                }`}
                              >
                                <Image
                                  src={
                                    (item.key === 1 && icon_amnhac) ||
                                    (item.key === 2 && icon_sach) ||
                                    (item.key === 3 && icon_dothethao) ||
                                    (item.key === 4 && icon_game) ||
                                    (item.key === 5 && icon_sothichkhac)
                                  }
                                  alt="icon"
                                  className="h-[50px] w-[50px] cursor-pointer"
                                />
                              </div>
                            </div>
                            <p className="h-[30px] w-full text-xl flex justify-center cursor-pointer p-1">
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
            <div className="bg-white shadow-sm h-auto min-h-[360px] w-auto md:w-full lg:w-[1440px]  sm:max-h-[4280] max-w-full flex justify-center flex-wrap gap-[10px] px-2 py-3 overflow-hidden">
              {itemALLDogiaitri &&
                itemALLDogiaitri.map((item: any, index: any) => {
                  return (
                    <div key={index}>
                      <Display_product_vertical_v2 item={item} />
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
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Do_giai_tri;
