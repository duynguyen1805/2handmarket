import Danhmuc from "@/components/Danhmuc";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import router from "next/router";
import icon_phutungoto from "../../../assets/icon/ic_xeco/ic_phutung/icon_phutungoto.png";
import icon_phutungxemay from "../../../assets/icon/ic_xeco/ic_phutung/icon_phutungxemay.png";
import Display_product_horizontal from "@/components/Display_product_horizontal";
import { API_get_Phuongtien } from "@/service/userService";
import ReactPaginate from "react-paginate";

const Phu_tung_xe = () => {
  const [itemPhutung, setitemPhutung] = useState<any[]>([]);
  const [pagehientai, setpagehientai] = useState<number>(1);
  const [totalpages, setTotalPages] = useState<number>(1);
  const [loaiphutung, setloaiphutung] = useState<string>();

  useEffect(() => {
    fetchDataProduct();
  }, [pagehientai, loaiphutung]);
  const fetchDataProduct = async () => {
    if (!loaiphutung) {
      try {
        const build_data = {
          type: "phutung",
          soluong: 10,
          loaiphutung: "ALL",
          pagehientai: pagehientai,
        };
        const response = await API_get_Phuongtien(build_data);
        setitemPhutung(response.phutung);
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
        type: "phutung",
        soluong: 10,
        loaiphutung: loaiphutung,
        pagehientai: pagehientai,
      };
      const response = await API_get_Phuongtien(build_data);
      setitemPhutung(response.phutung);
      setTotalPages(response.totalpages);
      console.log("check response: ", response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [filteredHang, setFilteredHang] = useState<number | null>(null);
  const Filter_loaiphutung = async (key: number, loaiphutung: string) => {
    setitemPhutung([]);
    if (filteredHang === key) {
      setFilteredHang(null);
      setloaiphutung(undefined);
      setpagehientai(1);
    } else {
      setFilteredHang(key);
      setloaiphutung(loaiphutung);
      setpagehientai(1);
    }
  };
  const Handle_TatcaHang = async () => {
    setFilteredHang(0);
    setloaiphutung(undefined);
    setpagehientai(1);
    setitemPhutung([]);
    fetchDataProduct();
  };
  const handlePageClick = (event: any) => {
    const selected = event.selected + 1;
    setpagehientai(selected);
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>2Hand Market - Phụ tùng Oto - Xe máy</title>
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
            <div className="h-full w-[960px] bg-white text-lg flex items-center p-1 rounded-lg shadow-md">
              <Danhmuc />
              <p className="h-full w-auto flex items-center ml-3">
                Trang chủ / Phương tiện / Phụ tùng
              </p>
            </div>
          </div>
          <div className="text-lg font-bold w-full flex items-center justify-center mt-2">
            <div className="h-[30px] w-[960px] overflow-hidden">
              <p className="running-text">
                Mua bán Phụ tùng thuận tiện, nhanh chóng
              </p>
            </div>
          </div>
          {/* Option */}
          <div className="h-auto w-full flex items-center justify-center mt-3">
            <div className="bg-white shadow-sm h-full w-[960px] px-2 pt-2">
              <div className="w-full flex items-center place-content-between">
                <p className="text-lg font-bold">
                  Khám phá Phụ tùng Oto - Xe máy
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
                    <div
                      onClick={() => Filter_loaiphutung(1, "phutungoto")}
                      className="h-[70px] w-full flex items-center justify-center"
                    >
                      <div
                        className={`h-[70px] w-[70px] flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-300 ${
                          1 === filteredHang ? "bg-gray-300" : ""
                        }`}
                      >
                        <Image
                          src={icon_phutungoto}
                          alt="icon"
                          className="h-[60px] w-[60px] cursor-pointer"
                        />
                      </div>
                    </div>
                    <p className="h-[30px] w-full flex text-center justify-center cursor-pointer p-1">
                      Phụ tùng ô tô
                    </p>
                  </div>
                  <div className="h-full w-[150px]">
                    <div
                      onClick={() => Filter_loaiphutung(2, "phutungxemay")}
                      className="h-[70px] w-full flex items-center justify-center"
                    >
                      <div
                        className={`h-[70px] w-[70px] flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-300 ${
                          2 === filteredHang ? "bg-gray-300" : ""
                        }`}
                      >
                        <Image
                          src={icon_phutungxemay}
                          alt="icon"
                          className="h-[60px] w-[60px] cursor-pointer"
                        />
                      </div>
                    </div>
                    <p className="h-[30px] w-full flex text-center justify-center cursor-pointer p-1">
                      Phụ tùng xe máy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-auto w-full flex flex-col items-center justify-center mt-3">
            <div className="bg-white shadow-sm h-auto min-h-[360px] max-h-[1620px] w-[960px] px-2 py-2 overflow-x-hidden">
              {itemPhutung &&
                itemPhutung.map((item: any, index: any) => {
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

export default Phu_tung_xe;
