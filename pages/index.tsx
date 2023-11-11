import Head from "next/head";
import { useRef, useEffect, useState } from "react";
require("dotenv").config();
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  API_getAllcollection,
  API_getAllcollection_quangcao,
} from "@/service/userService";
import router from "next/router";
import Danhmuc from "@/components/Danhmuc";
import Display_product_vertical from "@/components/Display_product_vertical";
import { delay, motion } from "framer-motion";
import Image from "next/image";
import dealbatngan from "../assets/img/banner_dealbatngan.jpg";
import doSV from "../assets/img/banner_doSVthich.jpg";
import thuDienthoai from "../assets/img/banner_thudienthoai2h.jpg";
import trogantruong from "../assets/img/banner_trogantruong.png";
import daytinngay from "../assets/img/banner_daytinngay.png";

import icon_lg_hoctap from "../assets/img/icon_lg_hoctap.jpg";
import icon_lg_canhan from "../assets/img/icon_lg_canhan.png";
import icon_lg_dodientu from "../assets/img/icon_lg_dodientu.png";
import icon_lg_giaitri from "../assets/img/icon_lg_giaitri.png";
import icon_lg_noithat from "../assets/img/icon_lg_noithat.png";
import icon_lg_thucung from "../assets/img/icon_lg_thucung.png";
import icon_lg_tulanh from "../assets/img/icon_lg_tulanh.png";
import icon_lg_xeco from "../assets/img/icon_lg_xeco.png";
import icon_loading from "../assets/icon/loading.png";

//import css file Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "2Hand Market",
  description: "Website mua bán đồ qua sử dụng",
};

type DataInfor = {
  _id: string;
  name: string;
  account: string;
  address: string;
  role: string;
};

import item_danhmuc, {
  danhmuc,
  sub_danhmuc,
} from "../components/obj_data_raw/Danhmuc_raw";
import Nav_mobile from "@/components/Nav_mobile";
const danhmuc: danhmuc[] = item_danhmuc;

const Home = () => {
  const [pagehientai, setpagehientai] = useState<number>(1);
  const pagehientaiRef = useRef<number>(1);
  const isFirstLoad = useRef(false);
  const [count_item_return, setcount_item_return] = useState<number>(0);

  const [tindang_ganday, setTindang_ganday] = useState<any[]>([]);
  useEffect(() => {
    if (pagehientai !== pagehientaiRef.current) {
      fetchDataProduct();
      pagehientaiRef.current = pagehientai;
    } else {
      if (!isFirstLoad.current) {
        fetchDataProduct();
        isFirstLoad.current = true;
      }
    }
  }, [pagehientai]);

  const fetchDataProduct = async () => {
    try {
      const response = await API_getAllcollection(pagehientai);
      setcount_item_return(response.all_collection.length);
      setTindang_ganday((prevTindang) => [
        ...prevTindang,
        ...response.all_collection,
      ]);
    } catch (error) {
      console.error("Error fetch data: ", error);
    }
  };

  // Cho tin đăng quảng cáo
  const [pagehientai_qc, setpagehientai_qc] = useState<number>(1);
  const pagehientai_qc_Ref = useRef<number>(1);
  const isFirstLoad_qc = useRef(false);
  const [count_item_qc_return, setcount_item_qc_return] = useState<number>(0);
  const [errcode, seterrcode] = useState<number | null>(null);

  const [tindang_qc, setTindang_qc] = useState<any[] | null>([]);
  useEffect(() => {
    if (pagehientai_qc !== pagehientai_qc_Ref.current) {
      fetchData_tindang_qc();
      pagehientai_qc_Ref.current = pagehientai_qc;
    } else {
      if (!isFirstLoad_qc.current) {
        fetchData_tindang_qc();
        isFirstLoad_qc.current = true;
      }
    }
  }, [pagehientai_qc]);

  const fetchData_tindang_qc = async () => {
    try {
      const response = await API_getAllcollection_quangcao(pagehientai_qc);
      seterrcode(response.errCode);
      setcount_item_qc_return(response.all_collection.length);
      setTindang_qc((prevTindang: any) => [
        ...prevTindang,
        ...response.all_collection,
      ]);
      // console.log("Check res: ", response.all_collection);
    } catch (error) {
      console.error("Error fetch data: ", error);
    }
  };

  const settings_slider = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
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
  const settings_slider_danhmuc = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    delay: 300,
    responsive: [
      {
        breakpoint: 1024, // < 1024
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
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
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  const [isLoading, setIsLoading] = useState(false);
  const handle_loading_router_push = async (link: string) => {
    try {
      // Bắt đầu loading
      setIsLoading(true);
      // Thực hiện router.push
      await router.push(`${link}`);
      // Dừng loading khi trang đã được push và hiển thị
      setIsLoading(false);
    } catch (error) {
      // Xử lý lỗi nếu cần thiết
      console.error("Error navigating:", error);
      // Dừng loading nếu có lỗi
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100">
      {/* Thanh loading */}
      {isLoading && <div className="loading-router z-30 mt-[80px]"></div>}
      <Head>
        <title>2Hand Market</title>
        <meta name="description" content="Website mua bán đồ qua sử dụng" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon_2handmarket.png" />
        <meta name="robots" content="index, follow"></meta>
        <meta name="keywords" content="đồ cũ, do cu, 2handmarket"></meta>
      </Head>
      <Header />
      {/* Banner */}
      <div className="max-h-[330px] h-auto w-full flex items-center justify-center">
        <div className="bg-white shadow-sm h-full w-auto lg:w-[1440px] sm:min-w-full md:min-w-[767px] max-w-full px-2 pt-1 flex flex-col items-center justify-center space-y-2">
          <div className="h-[50px] w-full py-1">
            <Danhmuc />
          </div>
          <div className="h-full w-full pb-8 overflow-hidden flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.3 } }}
              className="h-full w-auto sm:min-w-full md:min-w-[767px] max-w-[960px]"
            >
              <Slider {...settings_slider}>
                <Image
                  src={dealbatngan}
                  alt=""
                  className="h-full w-full rounded-md"
                />
                <Image src={doSV} alt="" className="h-full w-full rounded-md" />
                <Image
                  src={thuDienthoai}
                  alt=""
                  className="h-full w-full rounded-md"
                />
                <Image
                  src={trogantruong}
                  alt=""
                  className="h-full w-full rounded-md"
                />
                <Image
                  src={daytinngay}
                  alt=""
                  className="h-fit w-full rounded-md"
                />
              </Slider>
            </motion.div>
          </div>
        </div>
      </div>
      {/* Khám phá danh mục */}
      <div className="sm:h-[210px] md:h-[240px] lg:h-[210px] w-full flex items-center justify-center mt-3">
        <div className="bg-white shadow-sm h-full sm:w-auto sm:min-w-full md:min-w-[767px] md:max-w-[1024px] lg:w-[1440px] lg:max-w-[1440px] px-2 md:pt-2">
          <p className="h-[50px] w-full sm:text-xl md:text-2xl font-bold flex items-center">
            Khám phá danh mục
          </p>
          <div className="h-[130px] w-full lg:pt-5">
            <div className="h-full w-full">
              <Slider {...settings_slider_danhmuc}>
                {danhmuc &&
                  danhmuc.slice(0, 8).map((item_main: danhmuc) => {
                    return (
                      <div
                        key={item_main.key}
                        className="h-full w-1/4"
                        // onClick={() => router.push(`${item_main.link}`)}
                        onClick={() =>
                          handle_loading_router_push(item_main.link)
                        }
                      >
                        <div className="h-[80px] w-full flex items-center justify-center">
                          <Image
                            src={
                              item_main.key === 0
                                ? icon_lg_hoctap
                                : "" || item_main.key === 1
                                ? icon_lg_xeco
                                : "" || item_main.key === 2
                                ? icon_lg_dodientu
                                : "" || item_main.key === 3
                                ? icon_lg_noithat
                                : "" || item_main.key === 4
                                ? icon_lg_tulanh
                                : "" || item_main.key === 5
                                ? icon_lg_canhan
                                : "" || item_main.key === 6
                                ? icon_lg_giaitri
                                : "" || item_main.key === 7
                                ? icon_lg_thucung
                                : ""
                            }
                            alt="icon"
                            className="lg:h-[80px] lg:w-[80px] sm:h-[70px] sm:w-[70px] rounded-3xl cursor-pointer"
                          />
                        </div>
                        <p className="h-[50px] w-full lg:text-xl md::text-lg sm:text-base flex items-center justify-center text-center cursor-pointer">
                          {item_main.label}
                        </p>
                      </div>
                    );
                  })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
      {/* Quảng cáo tin đăng */}
      <div className="h-auto w-auto flex items-center justify-center mt-3">
        <div className="bg-white shadow-sm h-auto w-auto lg:w-[1440px] sm:w-full sm:max-h-[4220px] max-w-[1440px] p-2">
          <p className="h-[50px] w-full flex items-center sm:text-xl md:text-2xl font-bold">
            Tin đăng nổi bật
          </p>
          <div className="h-auto w-full pt-2 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-wrap items-center justify-center gap-[10px]">
            {errcode == null && (
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
            {errcode == 0 && tindang_qc && tindang_qc.length == 0 && (
              <div className="h-[50px] w-full text-2xl flex items-center justify-center space-x-2">
                <p className="">
                  Hiện tại không có tin đăng nào gợi ý cho bạn !
                </p>
              </div>
            )}
            {tindang_qc &&
              tindang_qc.map((item: any, index: number) => {
                return (
                  <div key={index} className="flex items-center justify-center">
                    <Display_product_vertical
                      item={item}
                      active_tab_filter={0}
                    />
                  </div>
                );
              })}
            {count_item_qc_return < 12 || pagehientai_qc == 4 ? (
              <></>
            ) : (
              <button
                disabled={
                  count_item_qc_return < 12
                    ? count_item_qc_return < 12
                    : pagehientai_qc == 4
                }
                className="h-[40px] w-full flex items-center justify-center bg-gray-200 cursor-pointer"
                onClick={() => setpagehientai_qc(pagehientai_qc + 1)}
              >
                <span className="text-mauxanhtroi font-bold text-xl">
                  {count_item_qc_return < 12 || pagehientai_qc == 4
                    ? "Hết"
                    : "Xem thêm"}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Tin đăng gần đây - 2060px cho 6x6 item dọc, small 4220px cho 3x12 item*/}
      <div className="h-auto w-full flex items-center justify-center mt-3">
        <div className="bg-white shadow-sm h-auto w-auto lg:w-[1440px] sm:w-full sm:max-h-[4220px] max-w-[1440px] p-2">
          <p className="h-[50px] w-full flex items-center sm:text-xl md:text-2xl font-bold">
            Tin đăng gần đây
          </p>
          <div className="h-auto w-full pt-2 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-wrap items-center justify-center gap-[10px]">
            {tindang_ganday && tindang_ganday.length == 0 && (
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
            {tindang_ganday &&
              tindang_ganday.map((item: any, index: number) => {
                return (
                  <div key={index} className="flex items-center justify-center">
                    <Display_product_vertical item={item} />
                  </div>
                );
              })}
            <button
              disabled={
                count_item_return < 36
                  ? count_item_return < 36
                  : pagehientai == 4
              }
              className="h-[40px] w-full flex items-center justify-center bg-gray-200 cursor-pointer"
              onClick={() => setpagehientai(pagehientai + 1)}
            >
              <span className="text-mauxanhtroi font-bold text-xl">
                {count_item_return < 36 || pagehientai == 4
                  ? "Hết"
                  : "Xem thêm"}
              </span>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
