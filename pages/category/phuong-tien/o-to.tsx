import Danhmuc from "@/components/Danhmuc";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import router from "next/router";
import icon_audi from "../../../assets/icon/ic_xeco/ic_hangoto/icon_audi.png";
import icon_ford from "../../../assets/icon/ic_xeco/ic_hangoto/icon_ford.png";
import icon_honda from "../../../assets/icon/ic_xeco/ic_hangoto/icon_honda.png";
import icon_huyndai from "../../../assets/icon/ic_xeco/ic_hangoto/icon_huyndai.png";
import icon_kia from "../../../assets/icon/ic_xeco/ic_hangoto/icon_kia.png";
import icon_mazda from "../../../assets/icon/ic_xeco/ic_hangoto/icon_mazda.png";
import icon_merc from "../../../assets/icon/ic_xeco/ic_hangoto/icon_merc.png";
import icon_mitsubishi from "../../../assets/icon/ic_xeco/ic_hangoto/icon_mitsubishi.png";
import icon_toyota from "../../../assets/icon/ic_xeco/ic_hangoto/icon_toyota.png";
import icon_vinfast from "../../../assets/icon/ic_xeco/ic_hangoto/icon_vinfast.png";
import icon_other from "../../../assets/icon/ic_dodientu/ic_hangdienthoai/other.svg";
import icon_filter from "../../../assets/icon/icon_filter.svg";

//import css file Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ReactPaginate from "react-paginate";

import item_listoto, { oto } from "../../../components/obj_data_raw/List_Oto";
import Display_product_horizontal from "@/components/Display_product_horizontal";
import { API_get_Phuongtien } from "@/service/userService";
import Modal_Filter_Phuongtien from "@/components/modal/Modal_Filter_Phuongtien";
import { MyContextProvider, useMyContext } from "@/contexts/MyContext";

const list_oto: oto[] = item_listoto;

const Oto = () => {
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
  const [itemOto, setitemOto] = useState<any[]>([]);
  const [pagehientai, setpagehientai] = useState<number>(1);
  const [totalpages, setTotalPages] = useState<number>(1);
  const [hang, setHang] = useState<string>();
  const [hopso, setHopso] = useState<number>(0); // chọn hopso (0: sotudong, 1: sosan, 2: bantudong)
  const [nhienlieu, setNhienlieu] = useState<number>(0); // chọn nhienlieu (0: xang, 1: dau, 2: dien)
  const [sochongoi, setChongoi] = useState(); // chon chongoi
  const [dongxe, setdongxe] = useState(); // dongxe: winner,city,civic,ranger,...

  const { countfilter, count_filter } = useMyContext();

  useEffect(() => {
    fetchDataProduct();
  }, [pagehientai, hang]);
  const fetchDataProduct = async () => {
    if (!hang) {
      try {
        const build_data = {
          type: "oto",
          soluong: 10,
          hang: "ALL",
          pagehientai: pagehientai,
        };
        const response = await API_get_Phuongtien(build_data);
        setitemOto(response.oto);
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
    type: "oto",
    soluong: 10,
    hang: hang,
    dongxe: dongxe,
    hopso: hopso,
    nhienlieu: nhienlieu,
    sochongoi: sochongoi,
    pagehientai: pagehientai,
  };
  const fetchDataProduct_filter = async () => {
    try {
      const response = await API_get_Phuongtien(build_data_filter);
      setitemOto(response.oto);
      setTotalPages(response.totalpages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [filteredHang, setFilteredHang] = useState<number | null>(null);
  const Filter_Hang = async (key: number, tenHang: string) => {
    setitemOto([]);
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
    setHopso(0);
    setNhienlieu(0);
    setChongoi(undefined);
  };
  const Handle_TatcaHang = async () => {
    setitemOto([]);
    setFilteredHang(0);
    setHang(undefined);
    setpagehientai(1);
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
          type="oto"
          hang={hang}
          setHang={setHang}
          dongxe={dongxe}
          setdongxe={setdongxe}
          hopso={hopso}
          setHopso={setHopso}
          nhienlieu={nhienlieu}
          setNhienlieu={setNhienlieu}
          sochongoi={sochongoi}
          setChongoi={setChongoi}
          setFilteredHang={setFilteredHang}
          fetchDataProduct_filter={() => fetchDataProduct_filter()}
          setpagehientai={setpagehientai}
          openModalFilter={openModalFilter}
          setopenModalFilter={setopenModalFilter}
        />
      </MyContextProvider>

      <Head>
        <title>2Hand Market - Ô tô</title>
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
          <div className="h-[50px] w-full flex items-center justify-center mt-2">
            <div className="h-full w-[960px] bg-white text-lg flex items-center place-content-between p-1 rounded-lg shadow-md">
              <div className="flex items-end h-full w-auto">
                <Danhmuc />
                <p className="h-full w-auto flex items-center ml-3">
                  Trang chủ / Phương tiện / Ô tô
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
                Mua bán Ô tô thuận tiện, nhanh chóng
              </p>
            </div>
          </div>
          {/* Option */}
          <div className="h-auto w-full flex items-center justify-center mt-3">
            <div className="bg-white shadow-sm h-full w-[960px] px-2 pt-2">
              <div className="w-full flex items-center place-content-between">
                <p className="text-lg font-bold">
                  Khám phá ô tô nhiều hãng đa dạng
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
                    {list_oto &&
                      list_oto.map((item: oto) => {
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
                                    (item.key === 1 && icon_toyota) ||
                                    (item.key === 2 && icon_ford) ||
                                    (item.key === 3 && icon_mitsubishi) ||
                                    (item.key === 4 && icon_huyndai) ||
                                    (item.key === 5 && icon_honda) ||
                                    (item.key === 6 && icon_merc) ||
                                    (item.key === 7 && icon_kia) ||
                                    (item.key === 8 && icon_mazda) ||
                                    (item.key === 9 && icon_vinfast) ||
                                    (item.key === 10 && icon_audi) ||
                                    (item.key === 11 && icon_other)
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
                  </Slider>
                </div>
              </div>
            </div>
          </div>
          <div className="h-auto w-full flex flex-col items-center justify-center mt-3">
            <div className="bg-white shadow-sm h-auto min-h-[360px] max-h-[1620px] w-[960px] px-2 py-2 overflow-x-hidden">
              {itemOto &&
                itemOto.map((item: any, index: any) => {
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
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Oto;
