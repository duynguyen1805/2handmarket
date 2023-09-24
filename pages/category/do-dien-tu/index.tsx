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

import Display_product_vertical from "@/components/Display_product_vertical";
import Display_product_horizontal from "@/components/Display_product_horizontal";

import item_danhmuc, {
  danhmuc,
  sub_danhmuc,
} from "../../../components/obj_data_raw/Danhmuc_raw";
import { API_get_Dodientu } from "@/service/userService";

const danhmuc_main: any[] = item_danhmuc[2].sub_danhmuc;

const Do_dien_tu = () => {
  const [itemALLDodientu, setitemALLDodientu] = useState<any[]>([]);
  const [active_tab_filter, setActiveTab] = useState<number>(0);

  useEffect(() => {
    setitemALLDodientu([]);
    fetchDataProduct();
  }, [active_tab_filter]);
  const fetchDataProduct = async () => {
    try {
      const build_data = {
        type: "ALL",
        soluong: 4,
        pagehientai: 1,
      };
      const response = await API_get_Dodientu(build_data);
      // sort moidang
      if (active_tab_filter === 1) {
        const sort_response = response.all_dodientu
          .slice()
          .sort(
            (a: any, b: any) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        setitemALLDodientu(sort_response);
      } else {
        const random_response = response.all_dodientu
          .slice()
          .sort(() => Math.random() - 0.5);
        setitemALLDodientu(random_response);
      }
      // console.log("check response: ", response);
    } catch (error) {
      console.error("Error fetching data:", error);
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
      <div className="absolute h-auto w-full top-0 left-0">
        <Header />
      </div>
      <div className="h-auto min-h-screen w-[100%] pt-[80px] bg-gray-100 flex flex-col place-content-between">
        <div>
          {/* Điều hướng */}
          <div className="h-[60px] w-full flex items-center justify-center mt-2">
            <div className="h-full w-[1440px] bg-white text-xl flex items-center p-1 rounded-lg shadow-md">
              <Danhmuc />
              <p className="h-full w-auto flex items-center ml-3">
                Trang chủ / Đồ điện tử
              </p>
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
          <div className="h-auto w-full flex items-center justify-center mt-3">
            <div className="bg-white shadow-sm h-full w-[1440px] px-2 pt-2">
              <p className="h-[50px] flex items-center text-2xl font-bold">
                Khám phá danh mục Đồ điện tử
              </p>
              <div className="h-[150px] w-full pt-3">
                <div className="h-full w-full flex items-center place-content-between">
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
                                  (item_danhmuc.key === 1 && icon_dienthoai) ||
                                  (item_danhmuc.key === 2 &&
                                    icon_maytinhbang) ||
                                  (item_danhmuc.key === 3 && icon_laptop) ||
                                  (item_danhmuc.key === 4 && icon_desktop) ||
                                  (item_danhmuc.key === 5 && icon_camera) ||
                                  (item_danhmuc.key === 6 && icon_smartwatch) ||
                                  (item_danhmuc.key === 7 && icon_phukien) ||
                                  (item_danhmuc.key === 8 && icon_linhkien)
                                }
                                alt="icon"
                                className="h-[50px] w-[50px] cursor-pointer"
                              />
                            </div>
                          </div>
                          <p className="h-[40px] w-full text-xl flex justify-center text-center cursor-pointer p-1">
                            {item_danhmuc.label}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          {/* List tin */}
          <div className="h-auto w-full flex items-center justify-center mt-3">
            <div className="bg-white shadow-sm h-auto max-h-[2110px] w-[1440px] p-2">
              <div className="h-[50px] w-[50%] flex mb-3">
                <p
                  className={
                    active_tab_filter === 0
                      ? "h-full w-[25%] text-2xl font-bold flex items-center justify-center border-b-4 border-blue-500 cursor-pointer"
                      : "h-full w-[25%] text-2xl font-bold flex items-center justify-center hover:border-b border-blue-500 cursor-pointer"
                  }
                  onClick={() => setActiveTab(0)}
                >
                  Gợi ý
                </p>
                <p
                  className={
                    active_tab_filter === 1
                      ? "h-full w-[25%] text-2xl font-bold flex items-center justify-center border-b-4 border-blue-500 cursor-pointer"
                      : "h-full w-[25%] text-2xl font-bold flex items-center justify-center hover:border-b border-blue-500 cursor-pointer"
                  }
                  onClick={() => setActiveTab(1)}
                >
                  Mới đăng
                </p>
              </div>
              <div className="max-h-[2110px] flex flex-wrap gap-[10px]">
                {itemALLDodientu &&
                  itemALLDodientu.map((item: any, index: any) => {
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

export default Do_dien_tu;
