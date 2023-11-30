import Danhmuc from "@/components/Danhmuc";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import router from "next/router";
import icon_apple from "../../../assets/icon/ic_dodientu/ic_hangdienthoai/apple.png";
import icon_asus from "../../../assets/icon/ic_dodientu/ic_hangdienthoai/asus.png";
import icon_huawei from "../../../assets/icon/ic_dodientu/ic_hangdienthoai/huawei.png";
import icon_other from "../../../assets/icon/ic_dodientu/ic_hangdienthoai/other.svg";
import icon_samsung from "../../../assets/icon/ic_dodientu/ic_hangdienthoai/samsung.png";
import icon_xiaomi from "../../../assets/icon/ic_dodientu/ic_hangdienthoai/xiaomi.png";
import icon_lenovo from "../../../assets/icon/ic_dodientu/ic_hangdienthoai/lenovo.png";
import icon_masstel from "../../../assets/icon/ic_dodientu/ic_hangdienthoai/masstel.png";
import icon_acer from "../../../assets/icon/ic_dodientu/ic_hangdienthoai/acer.png";
import icon_filter from "../../../assets/icon/icon_filter.svg";
import icon_loading from "../../../assets/icon/loading.png";
//import css file Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ReactPaginate from "react-paginate";

import item_list_tablet, {
  tablet,
} from "../../../components/obj_data_raw/List_Tablet";
import { API_get_Dodientu } from "@/service/userService";
import Modal_Filter_Dodientu from "@/components/modal/Modal_Filter_Dodientu";
import { useMyContext } from "@/contexts/MyContext";
import Display_product_vertical_v2 from "@/components/Display_product_vertical_v2";
import Link from "next/link";
import Display_product_horizontal from "@/components/Display_product_horizontal";
import { useMediaQuery } from "react-responsive";
import Loading_item from "@/components/loading/Loading_item";

const list_tablet: tablet[] = item_list_tablet;

const May_tinh_bang = () => {
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
  const [itemMaytinhbang, setitemMaytinhbang] = useState<any[] | null>(null);
  const [pagehientai, setpagehientai] = useState<number>(1);
  const [totalpages, setTotalPages] = useState<number>(1);
  const [hang, setHang] = useState<string>();
  const [mausac, setMausac] = useState(); // chon mausac
  const [dungluong, setDungluong] = useState(); // chon dungluong 8GB -> 1T
  const [ram, setRam] = useState(); // chon dungluong 8GB -> 1T
  const [sim, setSim] = useState<number>(0); // hỗ trợ sim (0, 1)
  const [kichthuocmanhinh, setKichthuocmanhinh] = useState(); // kích thước màn hình
  const [dongmay, setdongmay] = useState();

  const { countfilter, count_filter } = useMyContext();

  useEffect(() => {
    fetchDataProduct();
  }, [pagehientai, hang]);
  const fetchDataProduct = async () => {
    if (!hang) {
      try {
        const build_data = {
          type: "maytinhbang",
          soluong: 36,
          hang: "ALL",
          pagehientai: pagehientai,
        };
        const response = await API_get_Dodientu(build_data);
        setitemMaytinhbang(response.maytinhbang);
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
    type: "maytinhbang",
    soluong: 36,
    hang: hang,
    dongmay: dongmay,
    mausac: mausac,
    ram: ram,
    dungluong: dungluong,
    sim: sim,
    screensize: kichthuocmanhinh,
    pagehientai: pagehientai,
  };
  const fetchDataProduct_filter = async () => {
    try {
      const response = await API_get_Dodientu(build_data_filter);
      setitemMaytinhbang(response.maytinhbang);
      setTotalPages(response.totalpages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [filteredHang, setFilteredHang] = useState<number | null>(null);
  const Filter_Hang = async (key: number, tenHang: string) => {
    setitemMaytinhbang(null);
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
    setMausac(undefined);
    setRam(undefined);
    setDungluong(undefined);
    setSim(0);
    setKichthuocmanhinh(undefined);
  };
  const Handle_TatcaHang = async () => {
    setFilteredHang(0);
    setHang(undefined);
    setpagehientai(1);
    setitemMaytinhbang(null);
    fetchDataProduct();
    count_filter(0);
  };
  const handlePageClick = (event: any) => {
    const selected = event.selected + 1;
    setpagehientai(selected);
    setitemMaytinhbang(null);
  };
  const [openModalFilter, setopenModalFilter] = useState<boolean>(false);
  const handleClick_btnFilter = () => {
    setopenModalFilter(!openModalFilter);
  };

  // check màn hình mobile
  const isSmallScreen = useMediaQuery({
    query: "(max-width: 767px)",
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <Modal_Filter_Dodientu
        type="maytinhbang"
        hang={hang}
        setHang={setHang}
        dongmay={dongmay}
        setdongmay={setdongmay}
        mausac={mausac}
        setMausac={setMausac}
        dungluong={dungluong}
        setDungluong={setDungluong}
        ram={ram}
        setRam={setRam}
        sim={sim}
        setSim={setSim}
        kichthuocmanhinh={kichthuocmanhinh}
        setKichthuocmanhinh={setKichthuocmanhinh}
        setFilteredHang={setFilteredHang}
        fetchDataProduct_filter={() => fetchDataProduct_filter()}
        setpagehientai={setpagehientai}
        openModalFilter={openModalFilter}
        setopenModalFilter={setopenModalFilter}
      />

      <Head>
        <title>2Hand Market - Máy tính bảng</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon_2handmarket.png" />
      </Head>
      <Header />
      <div className="h-auto md:min-h-[calc(100vh-115px)] lg:min-h-[calc(100vh-80px)] w-[100%] sm:pb-20 md:pb-0 bg-gray-100 flex flex-col place-content-between">
        <div>
          {/* Điều hướng */}
          <div className="h-[60px] w-full flex items-center justify-center mt-2">
            <div className="h-full w-[1440px] bg-white md:text-xl flex items-center place-content-between py-1 px-3 rounded-lg shadow-md">
              <div className="flex items-center h-full w-auto">
                <Danhmuc />
                <div className="h-full w-auto sm:hidden md:flex items-center ml-3 space-x-1">
                  <Link
                    href="/"
                    className="cursor-pointer hover:text-mauxanhtroi"
                  >
                    Trang chủ
                  </Link>{" "}
                  <p>/ Đồ điện tử / Máy tính bảng</p>
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
                Mua bán máy tính bảng thông minh qua sử dụng thuận tiện, nhanh
                chóng
              </p>
            </div>
          </div>
          {/* Option */}
          <div className="h-auto w-full flex items-center justify-center mt-3">
            <div className="bg-white shadow-sm h-full w-auto md:w-full lg:w-[1440px] max-w-full px-2 pt-2">
              <div className="w-full flex items-center place-content-between">
                <p className="h-[50px] flex items-center sm:text-lg md:text-2xl font-bold">
                  Khám phá Máy tính bảng với nhiều nhãn hàng
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
                    {list_tablet &&
                      list_tablet.map((item: tablet) => {
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
                                    (item.key === 1 && icon_apple) ||
                                    (item.key === 2 && icon_samsung) ||
                                    (item.key === 3 && icon_asus) ||
                                    (item.key === 4 && icon_huawei) ||
                                    (item.key === 5 && icon_lenovo) ||
                                    (item.key === 6 && icon_xiaomi) ||
                                    (item.key === 7 && icon_acer) ||
                                    (item.key === 8 && icon_masstel) ||
                                    (item.key === 9 && icon_other)
                                  }
                                  alt="icon"
                                  className="h-[50px] w-[50px] cursor-pointer"
                                />
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
            {itemMaytinhbang == null && (
              <div className="h-auto sm:max-h-[280px] md:max-h-[350px] sm:w-full lg:w-[1440px] max-w-full py-2 bg-white sm:grid sm:grid-cols-2 md:flex md:flex-wrap items-center justify-center gap-[10px] overflow-hidden">
                <Loading_item />
                <Loading_item />
                <Loading_item />
                <Loading_item />
                <Loading_item />
                <Loading_item />
              </div>
            )}
            {itemMaytinhbang && itemMaytinhbang.length == 0 && (
              <div className="h-[50px] w-full md:text-2xl flex items-center justify-center space-x-2">
                <p className="">
                  Danh mục hiện tại không có tin đăng nào hiển thị !
                </p>
              </div>
            )}
            {itemMaytinhbang && itemMaytinhbang.length !== 0 && (
              <div className="bg-white shadow-sm h-auto min-h-[360px] w-auto sm:w-full lg:w-[1440px] sm:max-h-[4280px] max-w-full  md:flex justify-center md:flex-wrap gap-[10px] px-2 py-3 overflow-hidden">
                {itemMaytinhbang &&
                  itemMaytinhbang.map((item: any, index: any) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-center"
                      >
                        {!isSmallScreen ? (
                          <Display_product_vertical_v2 item={item} />
                        ) : (
                          <Display_product_horizontal item={item} />
                        )}
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

export default May_tinh_bang;
