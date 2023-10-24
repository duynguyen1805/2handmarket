import Danhmuc from "@/components/Danhmuc";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import router from "next/router";
import { API_get_Dodientu } from "@/service/userService";
import ReactPaginate from "react-paginate";
import Display_product_vertical_v2 from "@/components/Display_product_vertical_v2";
import Link from "next/link";
import icon_loading from "../../../assets/icon/loading.png";

const list_loailinhkien = [
  { key: 1, label: "Linh kiện Máy tính", type: "linhkienmaytinh" },
  { key: 2, label: "Linh kiện Điện thoại", type: "linhkiendienthoai" },
  { key: 3, label: "Khác", type: "linhkienkhac" },
];

const Linh_kien = () => {
  const [itemLinhkien, setitemLinhkien] = useState<any[] | null>(null);
  const [pagehientai, setpagehientai] = useState<number>(1);
  const [totalpages, setTotalPages] = useState<number>(1);
  const [loailinhkien, setloailinhkien] = useState<string>();

  useEffect(() => {
    fetchDataProduct();
  }, [pagehientai, loailinhkien]);
  const fetchDataProduct = async () => {
    if (!loailinhkien) {
      try {
        const build_data = {
          type: "linhkien",
          soluong: 36,
          loailinhkien: "ALL",
          pagehientai: pagehientai,
        };
        const response = await API_get_Dodientu(build_data);
        setitemLinhkien(response.linhkien);
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
        type: "linhkien",
        soluong: 36,
        loailinhkien: loailinhkien,
        pagehientai: pagehientai,
      };
      const response = await API_get_Dodientu(build_data);
      setitemLinhkien(response.linhkien);
      setTotalPages(response.totalpages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [filteredHang, setFilteredHang] = useState<number | null>(null);
  const Filter_Linhkien = async (key: number, loailinhkien: string) => {
    setitemLinhkien(null);
    if (filteredHang === key) {
      setFilteredHang(null);
      setloailinhkien(undefined);
      setpagehientai(1);
    } else {
      setFilteredHang(key);
      setloailinhkien(loailinhkien);
      setpagehientai(1);
    }
  };
  const Handle_TatcaHang = async () => {
    setitemLinhkien(null);
    setFilteredHang(0);
    setloailinhkien(undefined);
    setpagehientai(1);
    fetchDataProduct();
  };
  const handlePageClick = (event: any) => {
    const selected = event.selected + 1;
    setpagehientai(selected);
    setitemLinhkien(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>2Hand Market - Linh kiện</title>
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
                <p>/ Đồ điện tử / Linh kiện</p>
              </div>
            </div>
          </div>
          <div className="text-lg font-bold w-full flex items-center justify-center mt-2">
            <div className="h-[30px] w-[960px] overflow-hidden">
              <p className="running-text">
                Mua bán linh kiện qua sử dụng thuận tiện, nhanh chóng
              </p>
            </div>
          </div>
          {/* Option */}
          <div className="h-auto w-full flex items-center justify-center mt-3">
            <div className="bg-white shadow-sm h-full w-auto md:w-full lg:w-[1440px] max-w-full px-2 pt-2">
              <div className="w-full flex items-center place-content-between">
                <p className="h-[50px] flex items-center text-2xl font-bold">
                  Khám phá Xe điện
                </p>
                <p
                  className="text-lg font-bold text-mauxanhtroi underline cursor-pointer hover:opacity-75"
                  onClick={() => Handle_TatcaHang()}
                >
                  Xem tất cả
                </p>
              </div>
              <div className="h-[140px] w-full pt-3">
                <div className="h-full w-full flex">
                  {list_loailinhkien &&
                    list_loailinhkien.map((item: any) => {
                      let split = item.label.split(" ");
                      let substring_1 = split[split.length - 2];
                      let substring_2 = split[split.length - 1];
                      return (
                        <div
                          key={item.key}
                          className="h-full w-[250px] cursor-pointer"
                        >
                          <div className="h-[70px] w-full flex items-center justify-center">
                            <div
                              onClick={() =>
                                Filter_Linhkien(item.key, item.type)
                              }
                              className={`h-[75px] w-[75px] flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-300 ${
                                item.key === filteredHang ? "bg-gray-300" : ""
                              }`}
                            >
                              {substring_1} {substring_2}
                            </div>
                          </div>
                          <p className="h-[30px] w-full text-xl flex justify-center cursor-pointer p-1">
                            {item.label}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          <div className="h-auto w-full flex flex-col items-center justify-center mt-3">
            <div className="bg-white shadow-sm h-auto min-h-[360px] w-auto md:w-full lg:w-[1440px]  sm:max-h-[4280] max-w-full flex justify-center flex-wrap gap-[10px] px-2 py-3 overflow-hidden">
              {itemLinhkien == null && (
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
              {itemLinhkien && itemLinhkien.length == 0 && (
                <div className="h-[50px] w-full text-2xl flex items-center justify-center space-x-2">
                  <p className="">
                    Danh mục hiện tại không có tin đăng nào hiển thị !
                  </p>
                </div>
              )}
              {itemLinhkien &&
                itemLinhkien.map((item: any, index: any) => {
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

export default Linh_kien;
