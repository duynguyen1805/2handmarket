import Danhmuc from "@/components/Danhmuc";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import router from "next/router";
import icon_daikin from "../../../assets/icon/ic_tulanhmaylanh/ic_hangtulanh/icon_daikin.png";
import icon_mitsubishi from "../../../assets/icon/ic_xeco/ic_hangoto/icon_mitsubishi.png";
import icon_lg from "../../../assets/icon/ic_tulanhmaylanh/ic_hangtulanh/icon_lg.png";
import icon_pana from "../../../assets/icon/ic_tulanhmaylanh/ic_hangtulanh/icon_pana.png";
import icon_samsung from "../../../assets/icon/ic_tulanhmaylanh/ic_hangtulanh/icon_samsung.png";
import icon_sanyo from "../../../assets/icon/ic_tulanhmaylanh/ic_hangtulanh/icon_sanyo.png";
import icon_sharp from "../../../assets/icon/ic_tulanhmaylanh/ic_hangtulanh/icon_sharp.png";
import icon_toshiba from "../../../assets/icon/ic_tulanhmaylanh/ic_hangtulanh/icon_toshiba.png";
import icon_other from "../../../assets/icon/ic_dodientu/ic_hangdienthoai/other.svg";
import icon_filter from "../../../assets/icon/icon_filter.svg";
import icon_loading from "../../../assets/icon/loading.png";
//import css file Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ReactPaginate from "react-paginate";

import item_listmaylanh, {
  maylanh,
} from "../../../components/obj_data_raw/List_Maylanh";
import { API_get_Dienlanh } from "@/service/userService";
import Modal_Filter_Dienlanh from "@/components/modal/Modal_Filter_Dienlanh";
import { useMyContext } from "@/contexts/MyContext";
import Display_product_vertical_v2 from "@/components/Display_product_vertical_v2";
import Link from "next/link";

const list_maylanh: maylanh[] = item_listmaylanh;

const May_lanh = () => {
  const settings_slider = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 5,
    autoplay: false,
    delay: 300,
    responsive: [
      {
        breakpoint: 1024, // < 1024
        settings: {
          slidesToShow: 5,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 767, // < 767
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 375, // < 375
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
    ],
  };
  const [itemMaylanh, setitemMaylanh] = useState<any[] | null>(null);
  const [pagehientai, setpagehientai] = useState<number>(1);
  const [totalpages, setTotalPages] = useState<number>(1);
  const [hang, setHang] = useState<string>();
  const [congsuat, setcongsuat] = useState(); // 1 hp, ....

  const { countfilter, count_filter } = useMyContext();

  useEffect(() => {
    fetchDataProduct();
  }, [pagehientai, hang]);
  const fetchDataProduct = async () => {
    if (!hang) {
      try {
        const build_data = {
          type: "maylanh",
          soluong: 36,
          hang: "ALL",
          pagehientai: pagehientai,
        };
        const response = await API_get_Dienlanh(build_data);
        setitemMaylanh(response.maylanh);
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
    type: "maylanh",
    soluong: 36,
    hang: hang,
    congsuat: congsuat,
    pagehientai: pagehientai,
  };
  const fetchDataProduct_filter = async () => {
    try {
      const response = await API_get_Dienlanh(build_data_filter);
      setitemMaylanh(response.maylanh);
      setTotalPages(response.totalpages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [filteredHang, setFilteredHang] = useState<number | null>(null);
  const Filter_Hang = async (key: number, tenHang: string) => {
    setitemMaylanh(null);
    if (filteredHang === key) {
      setFilteredHang(null);
      setHang(undefined);
      setpagehientai(1);
      count_filter(0);
    } else {
      setFilteredHang(key);
      setHang(tenHang);
      setpagehientai(1);
      count_filter(1);
    }
    setcongsuat(undefined);
  };
  const Handle_TatcaHang = async () => {
    setFilteredHang(0);
    setitemMaylanh(null);
    fetchDataProduct();
    count_filter(0);
  };
  const handlePageClick = (event: any) => {
    const selected = event.selected + 1;
    setpagehientai(selected);
    setitemMaylanh(null);
  };
  const [openModalFilter, setopenModalFilter] = useState<boolean>(false);
  const handleClick_btnFilter = () => {
    setopenModalFilter(!openModalFilter);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Modal_Filter_Dienlanh
        type="maylanh"
        hang={hang}
        setHang={setHang}
        congsuat={congsuat}
        setcongsuat={setcongsuat}
        setFilteredHang={setFilteredHang}
        fetchDataProduct_filter={() => fetchDataProduct_filter()}
        setpagehientai={setpagehientai}
        openModalFilter={openModalFilter}
        setopenModalFilter={setopenModalFilter}
      />
      <Head>
        <title>2Hand Market - Tủ lạnh</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon_2handmarket.png" />
      </Head>
      <Header />
      <div className="h-auto md:min-h-[calc(100vh-115px)] lg:min-h-[calc(100vh-80px)] w-[100%] lg:pt-[0px] md:pt-[0px] bg-gray-100 flex flex-col place-content-between">
        <div>
          {/* Điều hướng */}
          <div className="h-[60px] w-full flex items-center justify-center mt-2">
            <div className="h-full w-[1440px] bg-white text-xl flex items-center place-content-between py-1 px-3 rounded-lg shadow-md">
              <div className="flex items-center h-full w-auto">
                <Danhmuc />
                <div className="h-full w-auto flex items-center ml-3 space-x-1">
                  <Link
                    href="/"
                    className="cursor-pointer hover:text-mauxanhtroi"
                  >
                    Trang chủ
                  </Link>{" "}
                  <p>/ Điện lạnh / Máy lạnh</p>
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
                Mua bán tủ lạnh cũ, mới thuận tiện, nhanh chóng
              </p>
            </div>
          </div>
          {/* Option */}
          <div className="h-auto w-full flex items-center justify-center mt-3">
            <div className="bg-white shadow-sm h-full w-auto md:w-full lg:w-[1440px] max-w-full px-2 pt-2">
              <div className="w-full flex items-center place-content-between">
                <p className="h-[50px] flex items-center text-2xl font-bold">
                  Khám phá Tủ lạnh với nhiều nhãn hàng
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
                    {list_maylanh &&
                      list_maylanh.map((item: maylanh) => {
                        return (
                          <div key={item.key} className="h-full w-[150px]">
                            <div className="h-[70px] w-full flex items-center justify-center">
                              <div
                                onClick={() => Filter_Hang(item.key, item.type)}
                                className={`h-[70px] w-[70px] flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-300 ${
                                  item.key === filteredHang ? "bg-gray-300" : ""
                                }`}
                              >
                                <Image
                                  src={
                                    (item.key === 1 && icon_daikin) ||
                                    (item.key === 2 && icon_pana) ||
                                    (item.key === 3 && icon_toshiba) ||
                                    (item.key === 4 && icon_lg) ||
                                    (item.key === 5 && icon_mitsubishi) ||
                                    (item.key === 6 && icon_samsung) ||
                                    (item.key === 7 && icon_sharp) ||
                                    (item.key === 8 && icon_sanyo) ||
                                    (item.key === 9 && icon_other)
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
              {itemMaylanh == null && (
                <div className="h-[50px] w-full text-2xl flex items-center justify-center space-x-2">
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
              {itemMaylanh && itemMaylanh.length == 0 && (
                <div className="h-[50px] w-full text-2xl flex items-center justify-center space-x-2">
                  <p className="">
                    Danh mục hiện tại không có tin đăng nào hiển thị !
                  </p>
                </div>
              )}
              {itemMaylanh &&
                itemMaylanh.map((item: any, index: any) => {
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

export default May_lanh;
