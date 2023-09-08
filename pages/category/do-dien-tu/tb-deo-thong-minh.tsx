import Danhmuc from "@/components/Danhmuc";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import router from "next/router";
import icon_smartwatch from "../../../assets/icon/ic_dodientu/ic_hangdienthoai/smartwatch.png";
import icon_vongtaythongminh from "../../../assets/icon/ic_dodientu/ic_hangdienthoai/vongtaythongminh.png";

import Display_product_horizontal from "@/components/Display_product_horizontal";
import { API_get_Dodientu } from "@/service/userService";
import ReactPaginate from "react-paginate";

const tb_deo_thong_minh = () => {
  const [itemThietbideothongminh, setitemThietbideothongminh] = useState<any[]>(
    []
  );
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
          soluong: 10,
          loaithietbideo: "ALL",
          pagehientai: pagehientai,
        };
        const response = await API_get_Dodientu(build_data);
        setitemThietbideothongminh(response.thietbideothongminh);
        setTotalPages(response.totalpages);
        console.log("check response: ", response);
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
        soluong: 10,
        loaithietbideo: loaithietbideo,
        pagehientai: pagehientai,
      };
      const response = await API_get_Dodientu(build_data);
      setitemThietbideothongminh(response.thietbideothongminh);
      setTotalPages(response.totalpages);
      console.log("check response: ", response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [filteredHang, setFilteredHang] = useState<number | null>(null);
  const Filter_loaivongdeo = async (key: number, loaivongdeo: string) => {
    setitemThietbideothongminh([]);
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
    setitemThietbideothongminh([]);
    fetchDataProduct();
  };
  const handlePageClick = (event: any) => {
    const selected = event.selected + 1;
    setpagehientai(selected);
  };

  return (
    <div className="bg-gray-100">
      <Head>
        <title>2Hand Market - Thiết bị đeo thông minh</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon_2handmarket.png" />
      </Head>
      <Header />
      {/* Điều hướng */}
      <div className="h-[50px] w-full flex items-center justify-center mt-2">
        <div className="h-full w-[960px] bg-white text-lg flex items-center p-1 rounded-lg shadow-md">
          <Danhmuc />
          <p className="h-full w-auto flex items-center ml-3">
            Trang chủ / Đồ điện tử / Thiết bị đeo thông minh
          </p>
        </div>
      </div>
      <div className="text-lg font-bold w-full flex items-center justify-center mt-2">
        <div className="h-[30px] w-[960px] overflow-hidden">
          <p className="running-text">
            Mua bán thiết bị đeo thông minh qua sử dụng thuận tiện, nhanh chóng
          </p>
        </div>
      </div>
      {/* Option */}
      <div className="h-auto w-full flex items-center justify-center mt-3">
        <div className="bg-white shadow-sm h-full w-[960px] px-2 pt-2">
          <div className="w-full flex items-center place-content-between">
            <p className="text-lg font-bold">
              Khám phá các Thiết bị đeo thông minh đa dạng
            </p>
            <p
              className="text-lg font-bold text-mauxanhtroi underline cursor-pointer hover:opacity-75"
              onClick={() => Handle_TatcaHang()}
            >
              Xem tất cả
            </p>
          </div>
          <div className="h-[140px] w-full pt-3">
            <div className="h-full w-full flex items-center">
              <div className="h-full w-[150px]">
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
                <p className="h-[30px] w-full flex text-center justify-center cursor-pointer p-1">
                  Đồng hồ thông minh
                </p>
              </div>
              <div className="h-full w-[150px]">
                <div className="h-[70px] w-full flex items-center justify-center">
                  <div
                    onClick={() => Filter_loaivongdeo(2, "vongtaythongminh")}
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
                <p className="h-[30px] w-full flex text-center justify-center cursor-pointer p-1">
                  Vòng tay thông minh
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-auto w-full flex flex-col items-center justify-center mt-3">
        <div className="bg-white shadow-sm h-auto min-h-[360px] max-h-[1620px] w-[960px] p-2 overflow-x-hidden">
          {itemThietbideothongminh &&
            itemThietbideothongminh.map((item: any, index: any) => {
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
      <Footer />
    </div>
  );
};

export default tb_deo_thong_minh;
