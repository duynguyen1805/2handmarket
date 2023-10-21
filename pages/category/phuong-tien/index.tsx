import Danhmuc from "@/components/Danhmuc";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import router from "next/router";
import icon_oto from "../../../assets/icon/ic_xeco/icon_oto.svg";
import icon_xemay from "../../../assets/icon/ic_xeco/icon_xemay.svg";
import icon_xedap from "../../../assets/icon/ic_xeco/icon_xedap.svg";
import icon_xedien from "../../../assets/icon/ic_xeco/icon_xedien.svg";
import icon_xetai from "../../../assets/icon/ic_xeco/icon_xetai.svg";
import icon_phutung from "../../../assets/icon/ic_xeco/icon_phutung.svg";
import icon_loading from "../../../assets//icon/loading.png";

import Display_product_vertical from "@/components/Display_product_vertical";
import Display_product_horizontal from "@/components/Display_product_horizontal";

import item_danhmuc, {
  danhmuc,
  sub_danhmuc,
} from "../../../components/obj_data_raw/Danhmuc_raw";
import { API_get_Phuongtien } from "@/service/userService";
import Link from "next/link";
//import css file Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const danhmuc_main: any[] = item_danhmuc[1].sub_danhmuc;

const Phuong_tien = () => {
  const [itemALLPhuongtien, setitemALLPhuongtien] = useState<any[]>([]);
  const [active_tab_filter, setActiveTab] = useState<number>(0);

  useEffect(() => {
    setitemALLPhuongtien([]);
    fetchDataProduct();
  }, [active_tab_filter]);
  const fetchDataProduct = async () => {
    try {
      const build_data = {
        type: "ALL",
        soluong: 6,
        pagehientai: 1,
      };
      const response = await API_get_Phuongtien(build_data);
      // sort moidang
      if (active_tab_filter === 1) {
        const sort_response = response.all_phuongtien
          .slice()
          .sort(
            (a: any, b: any) =>
              new Date(b.ngayduyettin).getTime() -
              new Date(a.ngayduyettin).getTime()
          );
        setitemALLPhuongtien(sort_response);
      } else {
        const random_response = response.all_phuongtien
          .slice()
          .sort(() => Math.random() - 0.5);
        setitemALLPhuongtien(random_response);
      }
      // console.log("check response: ", response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const settings_slider = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: false,
    delay: 300,
    responsive: [
      {
        breakpoint: 1024, // < 1024
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 767, // < 767
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 375, // < 375
        settings: {
          slidesToShow: 4,
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
        <title>2Hand Market - Phương tiện, xe cộ</title>
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
                <p>/ Phương tiện</p>
              </div>
            </div>
          </div>
          <div className="text-lg font-bold w-full flex items-center justify-center mt-2">
            <div className="h-[30px] w-[960px] overflow-hidden">
              <p className="running-text">
                Mua bán phương tiện, xe cộ thuận tiện, nhanh chóng
              </p>
            </div>
          </div>
          {/* Option */}
          <div className="sm:h-[210px] lg:h-auto w-full flex items-center justify-center mt-3">
            <div className="bg-white shadow-sm h-full sm:w-auto md:min-w-[767px] md:max-w-[1024px] lg:w-[1440px] lg:max-w-[1440px] px-2 pt-2">
              <p className="h-[50px] flex items-center text-2xl font-bold">
                Khám phá danh mục Phương tiện
              </p>
              <div className="h-[140px] w-full pt-3">
                <div className="h-full w-full">
                  <Slider {...settings_slider}>
                    {danhmuc_main &&
                      danhmuc_main.map((item_danhmuc: danhmuc) => {
                        return (
                          <div
                            key={item_danhmuc.key}
                            className="h-full w-1/4"
                            onClick={() => router.push(`${item_danhmuc.link}`)}
                          >
                            <div className="h-[70px] w-full flex items-center justify-center">
                              <div className="h-[70px] w-[70px] flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-300">
                                <Image
                                  src={
                                    (item_danhmuc.key === 1 && icon_oto) ||
                                    (item_danhmuc.key === 2 && icon_xemay) ||
                                    (item_danhmuc.key === 3 && icon_xetai) ||
                                    (item_danhmuc.key === 4 && icon_xedien) ||
                                    (item_danhmuc.key === 5 && icon_xedap) ||
                                    (item_danhmuc.key === 6 && icon_phutung)
                                  }
                                  alt="icon"
                                  className="h-[60px] w-[60px] cursor-pointer"
                                />
                              </div>
                            </div>
                            <p className="h-[40px] w-full lg:text-2xl md:text-xl flex justify-center text-center cursor-pointer p-1">
                              {item_danhmuc.label}
                            </p>
                          </div>
                        );
                      })}
                  </Slider>
                </div>
              </div>
            </div>
          </div>

          {/* List tin */}
          <div className="h-auto w-full flex items-center justify-center mt-3">
            <div className="bg-white shadow-sm h-auto w-full lg:w-[1440px] lg:max-h-[2110px] sm:max-h-[4220px] max-w-[1440px] p-2">
              <div className="h-[50px] w-[50%] flex mb-3">
                <p
                  className={
                    active_tab_filter === 0
                      ? "h-full md:w-[50%] lg:w-[25%] text-2xl font-bold flex items-center justify-center border-b-4 border-blue-500 cursor-pointer"
                      : "h-full md:w-[50%] lg:w-[25%] text-2xl font-bold flex items-center justify-center hover:border-b border-blue-500 cursor-pointer"
                  }
                  onClick={() => setActiveTab(0)}
                >
                  Gợi ý
                </p>
                <p
                  className={
                    active_tab_filter === 1
                      ? "h-full md:w-[50%] lg:w-[25%] text-2xl font-bold flex items-center justify-center border-b-4 border-blue-500 cursor-pointer"
                      : "h-full md:w-[50%] lg:w-[25%] text-2xl font-bold flex items-center justify-center hover:border-b border-blue-500 cursor-pointer"
                  }
                  onClick={() => setActiveTab(1)}
                >
                  Mới đăng
                </p>
              </div>
              <div className="lg:max-h-[2110px] sm:max-h-[4220px] flex justify-center flex-wrap gap-[10px]">
                {itemALLPhuongtien && itemALLPhuongtien.length == 0 && (
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
                {itemALLPhuongtien &&
                  itemALLPhuongtien.map((item: any, index: any) => {
                    return (
                      <div key={index}>
                        <Display_product_vertical item={item} />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Phuong_tien;
