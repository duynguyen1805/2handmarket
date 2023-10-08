import Head from "next/head";
import { Search_tindang_header } from "@/service/userService";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import ReactPaginate from "react-paginate";
import Footer from "@/components/Footer";
import Danhmuc from "@/components/Danhmuc";
import Display_product_vertical_v2 from "@/components/Display_product_vertical_v2";
import Display_product_vertical from "@/components/Display_product_vertical";
import router from "next/router";
import { useMyContext } from "@/contexts/MyContext";

interface Timkiem_Props {
  keyword: string;
}

const Keyword = ({ keyword }: Timkiem_Props) => {
  //lấy usecontext
  const { keyword_search, setKeywordSearch } = useMyContext();
  const [kqSearch, set_kqSearch] = useState<any>([]);
  const [pagehientai, setpagehientai] = useState<number>(1);
  const [totalpages, setTotalPages] = useState<number>(1);

  // search 36 item mỗi page
  useEffect(() => {
    const fetch_search_header = async () => {
      try {
        const response = await Search_tindang_header(
          keyword_search,
          36,
          pagehientai
        );
        const sort_response = response.resultSearch
          .slice()
          .sort(
            (a: any, b: any) =>
              new Date(b.ngayduyettin).getTime() -
              new Date(a.ngayduyettin).getTime()
          );
        set_kqSearch(sort_response);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.log("Error fetch_search_header: ", error);
      }
    };
    fetch_search_header();
  }, [keyword_search, pagehientai]);

  const handlePageClick = (event: any) => {
    const selected = event.selected + 1;
    setpagehientai(selected);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>2Hand Market - Điện thoại</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon_2handmarket.png" />
      </Head>
      <div className="absolute h-auto w-full top-0 left-0">
        <Header />
      </div>
      <div className="h-auto min-h-screen w-[100%] lg:pt-[80px] md:pt-[115px] sm:pt-[50px] bg-gray-100 flex flex-col place-content-between">
        <div>
          {/* Điều hướng */}
          <div className="h-[60px] w-full flex items-center justify-center mt-2">
            <div className="h-full w-[1440px] bg-white text-xl flex items-center place-content-between p-1 rounded-lg shadow-md">
              <div className="flex items-center h-full w-auto">
                <Danhmuc />
                <p className="h-full w-auto flex items-center ml-3">
                  Trang chủ / Tìm kiếm
                </p>
              </div>
            </div>
          </div>
          <div className="h-[50px] w-full my-2 flex items-center justify-center">
            <div className="w-[1440px] text-2xl flex items-end space-x-2">
              <p>Kết quả</p>
              <p className="text-xl font-bold">"{keyword_search}"</p>
              <p>có: {kqSearch.length} tin đăng</p>
            </div>
          </div>
          <div className="h-auto w-full flex flex-col items-center justify-center">
            {/* max-h-2140px cho 6 hàng ngang */}
            <div className="bg-white shadow-sm h-auto w-full min-h-[360px] max-h-[2140px] lg:max-w-[1440px] flex flex-wrap gap-[10px] px-2 py-3">
              {kqSearch &&
                kqSearch.map((item: any, index: any) => {
                  return (
                    <div key={index}>
                      <Display_product_vertical item={item} />
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

export const getServerSideProps: GetServerSideProps<Timkiem_Props> = async (
  context
) => {
  const { keyword } = context.params as {
    keyword: string;
  };

  //   const { keyword } = context.query;

  return {
    props: {
      keyword: keyword as string,
    },
  };
};

export default Keyword;
