import Danhmuc from "@/components/Danhmuc";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import router from "next/router";
import icon_maygiat from "../../../assets/icon/ic_tulanhmaylanh/icon_maygiat.svg";
import icon_maylanh from "../../../assets/icon/ic_tulanhmaylanh/icon_maylanh.svg";
import icon_tulanh from "../../../assets/icon/ic_tulanhmaylanh/icon_tulanh.svg";
import icon_loading from "../../../assets/icon/loading.png";
import Display_product_horizontal from "@/components/Display_product_horizontal";
//import css file Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import item_danhmuc, {
  danhmuc,
  sub_danhmuc,
} from "../../../components/obj_data_raw/Danhmuc_raw";
import Display_product_vertical from "@/components/Display_product_vertical";
import { API_get_Dienlanh } from "@/service/userService";
import Link from "next/link";

const danhmuc_main: any[] = item_danhmuc[4].sub_danhmuc;

const Dien_lanh = () => {
  const [itemALLDienlanh, setitemALLDienlanh] = useState<any[]>([]);
  const [active_tab_filter, setActiveTab] = useState<number>(0);

  useEffect(() => {
    setitemALLDienlanh([]);
    fetchDataProduct();
  }, [active_tab_filter]);
  const fetchDataProduct = async () => {
    try {
      const build_data = {
        type: "ALL",
        soluong: 10,
        pagehientai: 1,
      };
      const response = await API_get_Dienlanh(build_data);
      // sort moidang
      if (active_tab_filter === 1) {
        const sort_response = response.all_dienlanh
          .slice()
          .sort(
            (a: any, b: any) =>
              new Date(b.ngayduyettin).getTime() -
              new Date(a.ngayduyettin).getTime()
          );
        setitemALLDienlanh(sort_response);
      } else {
        const random_response = response.all_dienlanh
          .slice()
          .sort(() => Math.random() - 0.5);
        setitemALLDienlanh(random_response);
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
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    delay: 300,
    responsive: [
      {
        breakpoint: 1024, // < 1024
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 767, // < 767
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 375, // < 375
        settings: {
          slidesToShow: 3,
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
        <title>2Hand Market - Đồ điện lạnh</title>
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
                <p>/ Điện lạnh</p>
              </div>
            </div>
          </div>
          <div className="text-lg font-bold w-full flex items-center justify-center mt-2">
            <div className="h-[30px] w-[960px] overflow-hidden">
              <p className="running-text">
                Mua bán đồ điện lạnh thuận tiện, nhanh chóng
              </p>
            </div>
          </div>
          {/* Option */}
          <div className="h-auto w-full flex items-center justify-center mt-3">
            <div className="bg-white shadow-sm h-full sm:w-auto md:min-w-[767px] md:max-w-[1024px] lg:w-[1440px] lg:max-w-[1440px] px-2 pt-2">
              <p className="h-[50px] flex items-center text-2xl font-bold">
                Khám phá đa dạng tủ lạnh, máy giặt, máy lạnh
              </p>
              <div className="h-[140px] w-full pt-3">
                <div className="h-full w-full">
                  <Slider {...settings_slider}>
                    {danhmuc_main &&
                      danhmuc_main.map((item: sub_danhmuc) => {
                        return (
                          <div
                            key={item.key}
                            className="h-full w-[150px]"
                            onClick={() => router.push(`${item.link}`)}
                          >
                            <div className="h-[70px] w-full flex items-center justify-center">
                              <div className="h-[70px] w-[70px] flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-300">
                                <Image
                                  src={
                                    (item.key === 1 && icon_tulanh) ||
                                    (item.key === 2 && icon_maygiat) ||
                                    (item.key === 3 && icon_maylanh)
                                  }
                                  alt="icon"
                                  className="h-[50px] w-[50px] cursor-pointer"
                                />
                              </div>
                            </div>
                            <p className="h-[40px] w-full text-2xl flex justify-center cursor-pointer p-1">
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
                {itemALLDienlanh && itemALLDienlanh.length == 0 && (
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
                {itemALLDienlanh &&
                  itemALLDienlanh.map((item: any, index: any) => {
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

export default Dien_lanh;
