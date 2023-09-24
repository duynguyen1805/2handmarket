import Danhmuc from "@/components/Danhmuc";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import router from "next/router";
import icon_bmw from "../../../assets/icon/ic_xeco/ic_hangxemay/icon_bmw.png";
import icon_ducati from "../../../assets/icon/ic_xeco/ic_hangxemay/icon_ducati.png";
import icon_honda from "../../../assets/icon/ic_xeco/ic_hangxemay/icon_honda.png";
import icon_kawasaki from "../../../assets/icon/ic_xeco/ic_hangxemay/icon_kawasaki.png";
import icon_ktm from "../../../assets/icon/ic_xeco/ic_hangxemay/icon_ktm.png";
import icon_kymco from "../../../assets/icon/ic_xeco/ic_hangxemay/icon_kymco.png";
import icon_piaggio from "../../../assets/icon/ic_xeco/ic_hangxemay/icon_piaggio.png";
import icon_suzuki from "../../../assets/icon/ic_xeco/ic_hangxemay/icon_suzuki.png";
import icon_sym from "../../../assets/icon/ic_xeco/ic_hangxemay/icon_sym.png";
import icon_yamaha from "../../../assets/icon/ic_xeco/ic_hangxemay/icon_yamaha.png";
import icon_other from "../../../assets/icon/ic_dodientu/ic_hangdienthoai/other.svg";
import icon_filter from "../../../assets/icon/icon_filter.svg";

//import css file Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ReactPaginate from "react-paginate";

import item_listxemay, {
  xemay,
} from "../../../components/obj_data_raw/List_Xemay";
import Display_product_horizontal from "@/components/Display_product_horizontal";
import { API_get_Phuongtien } from "@/service/userService";
import Modal_Filter_Phuongtien from "@/components/modal/Modal_Filter_Phuongtien";
import { MyContextProvider, useMyContext } from "@/contexts/MyContext";
import Display_product_vertical_v2 from "@/components/Display_product_vertical_v2";

const list_xemay: xemay[] = item_listxemay;

const Xe_may = () => {
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
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 530,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  const [itemXemay, setitemXemay] = useState<any[]>([]);
  const [pagehientai, setpagehientai] = useState<number>(1);
  const [totalpages, setTotalPages] = useState<number>(1);
  const [hang, setHang] = useState<string>();
  const [loaixemay, setLoaixemay] = useState(); //xeso, xetayga, xetaycon
  const [dungtich, setDungtich] = useState(); // dung tich
  const [dongxe, setdongxe] = useState(); // dongxe: winner,city,civic,ranger,...

  const { countfilter, count_filter } = useMyContext();

  useEffect(() => {
    fetchDataProduct();
  }, [pagehientai, hang]);
  const fetchDataProduct = async () => {
    if (!hang) {
      try {
        const build_data = {
          type: "xemay",
          soluong: 36,
          hang: "ALL",
          pagehientai: pagehientai,
        };
        const response = await API_get_Phuongtien(build_data);
        setitemXemay(response.xemay);
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
    type: "xemay",
    soluong: 36,
    hang: hang,
    dongxe: dongxe,
    loaixemay: loaixemay,
    dungtich: dungtich,
    pagehientai: pagehientai,
  };
  const fetchDataProduct_filter = async () => {
    try {
      const response = await API_get_Phuongtien(build_data_filter);
      setitemXemay(response.xemay);
      setTotalPages(response.totalpages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [filteredHang, setFilteredHang] = useState<number | null>(null);
  const Filter_Hang = async (key: number, tenHang: string) => {
    setitemXemay([]);
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
    setLoaixemay(undefined);
    setDungtich(undefined);
  };
  const Handle_TatcaHang = async () => {
    setFilteredHang(0);
    setHang(undefined);
    setpagehientai(1);
    setitemXemay([]);
    fetchDataProduct();
    count_filter(0);
  };
  const handlePageClick = (event: any) => {
    const selected = event.selected + 1;
    setpagehientai(selected);
  };
  const [openModalFilter, setopenModalFilter] = useState<boolean>(false);
  const handleClick_btnFilter = () => {
    setopenModalFilter(!openModalFilter);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <MyContextProvider>
        <Modal_Filter_Phuongtien
          type="xemay"
          hang={hang}
          setHang={setHang}
          dongxe={dongxe}
          setdongxe={setdongxe}
          loaixemay={loaixemay}
          setLoaixemay={setLoaixemay}
          dungtich={dungtich}
          setDungtich={setDungtich}
          setFilteredHang={setFilteredHang}
          fetchDataProduct_filter={() => fetchDataProduct_filter()}
          setpagehientai={setpagehientai}
          openModalFilter={openModalFilter}
          setopenModalFilter={setopenModalFilter}
        />
      </MyContextProvider>

      <Head>
        <title>2Hand Market - Xe máy</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon_2handmarket.png" />
      </Head>

      <div className="absolute h-auto w-full top-0 left-0">
        <Header />
      </div>
      <div className="h-auto min-h-screen w-[100%] pt-[80px] bg-gray-100 flex flex-col place-content-between">
        <div>
          {/* Điều hướng */}
          <div className="h-[60px] w-full flex items-center justify-center mt-2">
            <div className="h-full w-[1440px] bg-white text-xl flex items-center place-content-between p-1 rounded-lg shadow-md">
              <div className="flex items-end h-full w-auto">
                <Danhmuc />
                <p className="h-full w-auto flex items-center ml-3">
                  Trang chủ / Phương tiện / Xe máy
                </p>
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
                Mua bán Xe máy thuận tiện, nhanh chóng
              </p>
            </div>
          </div>
          {/* Option */}
          <div className="h-auto w-full flex items-center justify-center mt-3">
            <div className="bg-white shadow-sm h-full w-[1440px] px-2 pt-2">
              <div className="w-full flex items-center place-content-between">
                <p className="h-[50px] flex items-center text-2xl font-bold">
                  Khám phá Xe máy nhiều hãng đa dạng
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
                    {list_xemay &&
                      list_xemay.map((item: xemay) => {
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
                                    (item.key === 1 && icon_honda) ||
                                    (item.key === 2 && icon_yamaha) ||
                                    (item.key === 3 && icon_suzuki) ||
                                    (item.key === 4 && icon_sym) ||
                                    (item.key === 5 && icon_kawasaki) ||
                                    (item.key === 6 && icon_piaggio) ||
                                    (item.key === 7 && icon_kymco) ||
                                    (item.key === 8 && icon_bmw) ||
                                    (item.key === 9 && icon_ktm) ||
                                    (item.key === 10 && icon_ducati) ||
                                    (item.key === 11 && icon_other)
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
            <div className="bg-white shadow-sm h-auto min-h-[355px] max-h-[2140px] w-[1440px] flex flex-wrap gap-[10px] px-2 py-3 overflow-x-hidden">
              {itemXemay &&
                itemXemay.map((item: any, index: any) => {
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

export default Xe_may;
