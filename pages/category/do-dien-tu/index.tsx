import Danhmuc from "@/components/Danhmuc";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import router from "next/router";
import icon_dienthoai from "../../../assets/icon/ic_dodientu/icon_dienthoai.svg";
import icon_maytinhbang from "../../../assets/icon/ic_dodientu/icon_maytinhbang.svg";
import icon_laptop from "../../../assets/icon/ic_dodientu/icon_laptop.svg";
import icon_desktop from "../../../assets/icon/ic_dodientu/icon_desktop.svg";
import icon_smartwatch from "../../../assets/icon/ic_dodientu/icon_smartwatch.svg";
import icon_camera from "../../../assets/icon/ic_dodientu/icon_camera.svg";
import icon_phukien from "../../../assets/icon/ic_dodientu/icon_phukien.svg";
import icon_linhkien from "../../../assets/icon/ic_dodientu/icon_linhkien.svg";
import icon_loading from "../../../assets/icon/loading.png";

import Display_product_vertical from "@/components/Display_product_vertical";

import item_danhmuc, {
  danhmuc,
  sub_danhmuc,
} from "../../../components/obj_data_raw/Danhmuc_raw";
import { API_get_Dodientu } from "@/service/userService";
import Link from "next/link";
//import css file Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useMyContext } from "@/contexts/MyContext";

const danhmuc_main: any[] = item_danhmuc[2].sub_danhmuc;

const Do_dien_tu = () => {
  const { isLoading, handle_setIsLoading } = useMyContext();
  const [itemALLDodientu, setitemALLDodientu] = useState<any[] | null>(null);
  const [active_tab_filter, setActiveTab] = useState<number>(0);

  useEffect(() => {
    setitemALLDodientu(null);
    fetchDataProduct();
  }, [active_tab_filter]);
  const fetchDataProduct = async () => {
    try {
      const build_data = {
        type: "ALL",
        soluong: 36,
        pagehientai: 1,
      };
      const response = await API_get_Dodientu(build_data);
      // sort moidang
      if (active_tab_filter === 1) {
        const sort_response = response.all_dodientu
          .slice()
          .sort(
            (a: any, b: any) =>
              new Date(b.ngayduyettin).getTime() -
              new Date(a.ngayduyettin).getTime()
          );
        setitemALLDodientu(sort_response);
      } else {
        setitemALLDodientu(response.all_dodientu);
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
          slidesToShow: 5,
          slidesToScroll: 1,
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
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,

          dots: true,
        },
      },
    ],
  };

  const handle_loading_router_push = async (link: string) => {
    try {
      handle_setIsLoading(true);
      await router.push(`${link}`);
      handle_setIsLoading(false);
    } catch (error) {
      console.error("Error navigating:", error);
      handle_setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>2Hand Market - Đồ điện tử</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon_2handmarket.png" />
      </Head>
      <Header />
      <div className="h-auto md:min-h-[calc(100vh-115px)] lg:min-h-[calc(100vh-80px)] w-[100%] sm:pb-20 md:pb-0 bg-gray-100 flex flex-col place-content-between">
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
                <p>/ Đồ điện tử</p>
              </div>
            </div>
          </div>
          <div className="text-lg font-bold w-full flex items-center justify-center mt-2">
            <div className="h-[30px] w-[960px] overflow-hidden">
              <p className="running-text">
                Mua bán đồ điện tử thông minh thuận tiện, nhanh chóng
              </p>
            </div>
          </div>
          {/* Option */}
          <div className="md:h-[230px] lg:h-auto w-full flex items-center justify-center mt-3">
            <div className="bg-white shadow-sm h-full sm:max-w-full md:min-w-[767px] md:max-w-[1024px] lg:w-[1440px] lg:max-w-[1440px] px-2 md:pt-2">
              <p className="h-[50px] flex items-center sm:text-lg md:text-2xl font-bold">
                Khám phá danh mục Đồ điện tử
              </p>
              <div className="sm:h-[160px] md:h-[170px] w-full md:pt-3">
                <div className="h-full w-full">
                  <Slider {...settings_slider}>
                    {danhmuc_main &&
                      danhmuc_main.map((item_danhmuc: danhmuc) => {
                        return (
                          <div
                            key={item_danhmuc.key}
                            className="h-full w-1/4"
                            // onClick={() => router.push(`${item_danhmuc.link}`)}
                            onClick={() =>
                              handle_loading_router_push(item_danhmuc.link)
                            }
                          >
                            <div className="h-[70px] w-full flex items-center justify-center">
                              <div className="h-[70px] w-[70px] flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-300">
                                <Image
                                  src={
                                    (item_danhmuc.key === 1 &&
                                      icon_dienthoai) ||
                                    (item_danhmuc.key === 2 &&
                                      icon_maytinhbang) ||
                                    (item_danhmuc.key === 3 && icon_laptop) ||
                                    (item_danhmuc.key === 4 && icon_desktop) ||
                                    (item_danhmuc.key === 5 && icon_camera) ||
                                    (item_danhmuc.key === 6 &&
                                      icon_smartwatch) ||
                                    (item_danhmuc.key === 7 && icon_phukien) ||
                                    (item_danhmuc.key === 8 && icon_linhkien)
                                  }
                                  alt="icon"
                                  className="h-[50px] w-[50px] cursor-pointer"
                                />
                              </div>
                            </div>
                            <p className="h-[60px] w-full sm:text-sm md:text-xl flex justify-center text-center cursor-pointer p-1 sm:mt-1 md:mt-0">
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
                      ? "h-full md:w-[50%] lg:w-[25%] sm:text-xl md:text-2xl font-bold flex items-center justify-center border-b-4 border-blue-500 cursor-pointer"
                      : "h-full md:w-[50%] lg:w-[25%] sm:text-xl md:text-2xl font-bold flex items-center justify-center hover:border-b border-blue-500 cursor-pointer"
                  }
                  onClick={() => setActiveTab(0)}
                >
                  Gợi ý
                </p>
              </div>
              {itemALLDodientu == null && (
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
              {itemALLDodientu && itemALLDodientu.length == 0 && (
                <div className="h-[50px] w-full md:text-2xl flex items-center justify-center space-x-2">
                  <p className="">
                    Danh mục hiện tại không có tin đăng nào hiển thị !
                  </p>
                </div>
              )}
              {itemALLDodientu && itemALLDodientu.length !== 0 && (
                <div className="lg:max-h-[2110px] sm:max-h-[4220px] sm:grid sm:grid-cols-2 md:flex justify-center md:flex-wrap gap-[10px]">
                  {itemALLDodientu &&
                    itemALLDodientu.map((item: any, index: any) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-center"
                        >
                          <Display_product_vertical
                            item={item}
                            active_tab_filter={active_tab_filter}
                          />
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Do_dien_tu;
