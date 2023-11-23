import Danhmuc from "@/components/Danhmuc";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import router from "next/router";
import icon_smartwatch from "../../../assets/icon/ic_dodientu/ic_hangdienthoai/smartwatch.png";
import icon_vongtaythongminh from "../../../assets/icon/ic_dodientu/ic_hangdienthoai/vongtaythongminh.png";
import icon_loading from "../../../assets/icon/loading.png";
import { API_get_Dodientu } from "@/service/userService";
import ReactPaginate from "react-paginate";
import Display_product_vertical_v2 from "@/components/Display_product_vertical_v2";
import Link from "next/link";

const Tb_deo_thong_minh = () => {
  const [itemThietbideothongminh, setitemThietbideothongminh] = useState<
    any[] | null
  >(null);
  const [pagehientai, setpagehientai] = useState<number>(1);
  const [totalpages, setTotalPages] = useState<number>(1);
  const [loaithietbideo, setloaithietbideo] = useState<string>();

  useEffect(() => {
    fetchDataProduct();
  }, [pagehientai, loaithietbideo]);
  const fetchDataProduct = async () => {
    if (!loaithietbideo) {
      try {
        const build_data = {
          type: "thietbideothongminh",
          soluong: 36,
          loaithietbideo: "ALL",
          pagehientai: pagehientai,
        };
        const response = await API_get_Dodientu(build_data);
        setitemThietbideothongminh(response.thietbideothongminh);
        setTotalPages(response.totalpages);
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
        type: "thietbideothongminh",
        soluong: 36,
        loaithietbideo: loaithietbideo,
        pagehientai: pagehientai,
      };
      const response = await API_get_Dodientu(build_data);
      setitemThietbideothongminh(response.thietbideothongminh);
      setTotalPages(response.totalpages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [filteredHang, setFilteredHang] = useState<number | null>(null);
  const Filter_loaivongdeo = async (key: number, loaivongdeo: string) => {
    setitemThietbideothongminh(null);
    if (filteredHang === key) {
      setFilteredHang(null);
      setloaithietbideo(undefined);
      setpagehientai(1);
    } else {
      setFilteredHang(key);
      setloaithietbideo(loaivongdeo);
      setpagehientai(1);
    }
  };
  const Handle_TatcaHang = async () => {
    setFilteredHang(0);
    setloaithietbideo(undefined);
    setpagehientai(1);
    setitemThietbideothongminh(null);
    fetchDataProduct();
  };
  const handlePageClick = (event: any) => {
    const selected = event.selected + 1;
    setpagehientai(selected);
    setitemThietbideothongminh(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>2Hand Market - Thiết bị đeo thông minh</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon_2handmarket.png" />
      </Head>
      <Header />
      <div className="h-auto md:min-h-[calc(100vh-115px)] lg:min-h-[calc(100vh-80px)] sm:pb-20 md:pb-0 md:pt-[0px] bg-gray-100 flex flex-col place-content-between">
        <div>
          {/* Điều hướng */}
          <div className="h-[60px] w-full flex items-center justify-center mt-2">
            <div className="h-full w-[1440px] bg-white text-xl flex items-center p-1 rounded-lg shadow-md">
              <Danhmuc />
              <div className="h-full w-auto sm:hidden md:flex items-center ml-3 space-x-1">
                <Link
                  href="/"
                  className="cursor-pointer hover:text-mauxanhtroi"
                >
                  Trang chủ
                </Link>{" "}
                <p>/ Đồ điện tử / Thiết bị đeo thông minh</p>
              </div>
            </div>
          </div>
          <div className="text-lg font-bold w-full flex items-center justify-center mt-2">
            <div className="h-[30px] w-[960px] overflow-hidden">
              <p className="running-text">
                Mua bán thiết bị đeo thông minh qua sử dụng thuận tiện, nhanh
                chóng
              </p>
            </div>
          </div>
          {/* Option */}
          <div className="h-auto w-full flex items-center justify-center mt-3">
            <div className="bg-white shadow-sm h-full md:w-full lg:w-[1440px] max-w-full px-2 pt-2">
              <div className="w-full flex items-center place-content-between">
                <p className="h-[50px] flex items-center sm:text-lg md:text-2xl font-bold">
                  Khám phá các Thiết bị đeo thông minh đa dạng
                </p>
                <p
                  className="text-lg text-end font-bold text-mauxanhtroi underline cursor-pointer hover:opacity-75"
                  onClick={() => Handle_TatcaHang()}
                >
                  Xem tất cả
                </p>
              </div>
              <div className="sm:h-[120px] md:h-[140px] w-full pt-3">
                <div className="h-full w-full flex items-center">
                  <div className="h-full w-[250px]">
                    <div className="h-[70px] w-full flex items-center justify-center">
                      <div
                        onClick={() => Filter_loaivongdeo(1, "donghothongminh")}
                        className={`h-[70px] w-[70px] flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-300 ${
                          1 === filteredHang ? "bg-gray-300" : ""
                        }`}
                      >
                        <Image
                          src={icon_smartwatch}
                          alt="icon"
                          className="h-[50px] w-[50px] cursor-pointer"
                        />
                      </div>
                    </div>
                    <p className="h-[30px] w-full sm:text-lg md:text-xl flex text-center justify-center cursor-pointer p-1">
                      Đồng hồ thông minh
                    </p>
                  </div>
                  <div className="h-full w-[250px]">
                    <div className="h-[70px] w-full flex items-center justify-center">
                      <div
                        onClick={() =>
                          Filter_loaivongdeo(2, "vongtaythongminh")
                        }
                        className={`h-[70px] w-[70px] flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-300 ${
                          2 === filteredHang ? "bg-gray-300" : ""
                        }`}
                      >
                        <Image
                          src={icon_vongtaythongminh}
                          alt="icon"
                          className="h-[50px] w-[50px] cursor-pointer"
                        />
                      </div>
                    </div>
                    <p className="h-[30px] w-full sm:text-lg md:text-xl flex text-center justify-center cursor-pointer p-1">
                      Vòng tay thông minh
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-auto w-full flex flex-col items-center justify-center mt-3">
            {itemThietbideothongminh == null && (
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
            {itemThietbideothongminh && itemThietbideothongminh.length == 0 && (
              <div className="h-[50px] w-full md:text-2xl flex items-center justify-center space-x-2">
                <p className="">
                  Danh mục hiện tại không có tin đăng nào hiển thị !
                </p>
              </div>
            )}
            {itemThietbideothongminh &&
              itemThietbideothongminh.length !== 0 && (
                <div className="bg-white shadow-sm h-auto min-h-[360px] w-auto sm:w-full lg:w-[1440px] sm:max-h-[4280px] max-w-full sm:grid sm:grid-cols-2 md:flex justify-center md:flex-wrap gap-[10px] px-2 py-3 overflow-hidden">
                  {itemThietbideothongminh &&
                    itemThietbideothongminh.map((item: any, index: any) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-center"
                        >
                          <Display_product_vertical_v2 item={item} />
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

export default Tb_deo_thong_minh;
