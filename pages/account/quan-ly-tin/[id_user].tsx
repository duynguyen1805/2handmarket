import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import router from "next/router";
import { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "@/utils/authMiddleware";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import left_back from "../../../assets/icon/left-arrow.png";
import "react-phone-input-2/lib/style.css";
// toast thông báo
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  API_Antin,
  API_Order,
  API_cancelOrder,
  API_deleteTindang,
  API_getTindangbyIduser,
  API_updateStatusTindang,
  API_Capnhat_trangthai_thanhtoan,
} from "@/service/userService";
import Danhmuc from "@/components/Danhmuc";
import { motion } from "framer-motion";
import { render } from "react-dom";
import { useMyContext } from "@/contexts/MyContext";
import Modal_comfirm_Huytin from "@/components/modal/Modal_comfirm_Huytin";
import Modal_TuchoiTindang from "@/components/modal/Modal_TuchoiTindang";
import Modal_comfirm_Thanhtoan from "@/components/modal/Modal_comfirm_Thanhtoan";

const { PhoneNumberUtil, PhoneNumberFormat } = require("google-libphonenumber");
const phoneUtil = PhoneNumberUtil.getInstance();

interface infodetailProps {
  id_user: string;
}
const Quanly_tindang = ({ id_user }: infodetailProps) => {
  //history_order: là id của User
  const [tindang, setTindang] = useState<any>([]);
  const allowedRoles = ["Admin", "Client"];
  const checkRoleMiddleware = authMiddleware(allowedRoles);

  const [itemNangcap, setItemNangcap] = useState<any>();
  useEffect(() => {
    //lấy thông tin người dùng
    const storedItems = localStorage.getItem("itemNangcap");
    if (storedItems) {
      setItemNangcap(JSON.parse(storedItems));
    }
  }, []);
  useEffect(() => {
    // lấy resultCode từ momo trả về
    const resultCode = router.query.resultCode;
    console.log("check resultCode: ", resultCode);
    if (resultCode === "0") {
      // gọi hàm cập nhật trangthaithanhtoan
      fetch_update_trangthaithanhtoan();
    }
  }, [itemNangcap]);

  const [trangthaithanhtoan, settrangthaithanhtoan] = useState<number>();
  const fetch_update_trangthaithanhtoan = async () => {
    try {
      const response = await API_Capnhat_trangthai_thanhtoan({
        id: itemNangcap?._id,
        typeTindang: itemNangcap?.type,
      });
      console.log("check response: ", response);
      settrangthaithanhtoan(response.trangthaithanhtoan);
      localStorage.removeItem("itemNangcap");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchdata_tindang_user();
  }, [trangthaithanhtoan]);
  const fetchdata_tindang_user = async () => {
    try {
      const response = await API_getTindangbyIduser(id_user);
      setTindang(response.tindang);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const goBack = () => {
    router.back();
  };
  const listFilter = [
    { id: 2, name: "Đang hiển thị" },
    { id: 1, name: "Đợi duyệt" },
    { id: 3, name: "Bị từ chối" },
    { id: 4, name: "Tin ẩn" },
  ];
  const [isOpen, setIsOpen] = useState<number | null>(2);
  const filteredList =
    isOpen === -1
      ? tindang
      : tindang.filter((item: any) => item.trangthai === isOpen);

  const handleClickfilted = (key: number) => {
    fetchdata_tindang_user();
    setIsOpen(key);
  };
  const clickTindang = (type: string, id: string) => {
    router.push({
      pathname: `/products/${id}`,
      query: { type: type },
    });
  };
  const handleXoatindang = async (type: string, id: string) => {
    try {
      const response = await API_deleteTindang(type, id);
      if (response) {
        {
          response.errCode === 0 &&
            toast.success(response.message) &&
            fetchdata_tindang_user();
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [isopenModalAntin, setOpenModalLydoAntin] = useState(false);
  const [isopenModalHuytin, setOpenModalHuytin] = useState(false);
  const [isopenModalnangcapTinuutien, setOpenModalnangcapTinuutien] =
    useState(false);
  const [type, setType] = useState<any>();
  const [idTindang, setIdTindang] = useState<any>();

  const handlebutton_huytin = (type: string, id: string) => {
    setOpenModalHuytin(!isopenModalHuytin);
    setType(type);
    setIdTindang(id);
  };
  const handlebutton_antin = (type: string, id: string) => {
    setOpenlidotuchoi(!openlidotuchoi);
    setType(type);
    setIdTindang(id);
  };
  const handlebutton_hienthilai = (type: string, id: string) => {
    build_data_antin = {
      id: id,
      typeTindang: type,
      lydoantin: null,
    };
    setTimeout(() => {
      handleUpdateStatus_Antin();
    }, 1000);
  };
  const handlebutton_daban = (type: string, id: string) => {
    build_data_antin = {
      id: id,
      typeTindang: type,
      lydoantin: "ĐÃ BÁN",
    };
    setTimeout(() => {
      handleUpdateStatus_Antin();
    }, 1000);
  };
  const handlebutton_nangcapTinuutien = (item: any) => {
    const itemJSON = JSON.stringify(item);
    localStorage.setItem("itemNangcap", itemJSON);
    setOpenModalnangcapTinuutien(!isopenModalnangcapTinuutien);
  };

  const [openlidotuchoi, setOpenlidotuchoi] = useState(false);
  const [inputLydoantin, setInputLydoantin] = useState<any>();
  const handleChangeLydoantin = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newValue = event.target.value;
    if (newValue.length <= 1500) {
      const updatedValue = newValue.replace(/\n/g, "\n"); // Thêm ký tự \n vào thay vì /n
      setInputLydoantin(updatedValue);
    }
  };
  const Openlidotuchoi = () => {
    setOpenlidotuchoi(!openlidotuchoi);
    setInputLydoantin(null);
  };
  var build_data_antin = {
    id: idTindang,
    typeTindang: type,
    lydoantin: inputLydoantin,
  };
  const handleUpdateStatus_Antin = async () => {
    try {
      const response = await API_Antin(build_data_antin);
      if (response.errCode === 0) {
        {
          response.trangthai === 2 && toast.success("Tin đã được Hiển thị lại");
        }
        {
          response.trangthai === 4 &&
            response.lydoantin !== "ĐÃ BÁN" &&
            toast.success("Tin đã được Ẩn") &&
            Openlidotuchoi();
        }
        {
          response.trangthai === 4 &&
            response.lydoantin == "ĐÃ BÁN" &&
            toast.success("Tin đã được Ẩn, lý do ĐÃ BÁN");
        }

        fetchdata_tindang_user();
      } else {
        toast.error("Cập nhật không thành công");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen relative">
      <Head>
        <title>Quản lý tin đăng</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon_2handmarket.png" />
      </Head>
      <div className="absolute h-auto w-full top-0 left-0">
        <Header />
      </div>
      <div className="h-auto min-h-screen w-full bg-gray-100 pt-[90px] flex flex-col place-content-between">
        <div>
          {/* Điều hướng */}
          <div className="h-[60px] w-full flex items-center justify-center mt-2">
            <div className="h-full w-[960px] bg-white text-xl flex items-center p-1 rounded-lg shadow-md">
              <Danhmuc />
              <p className="h-full w-auto flex items-center ml-3">
                Trang chủ / Quản lý tin
              </p>
            </div>
          </div>
          <div className="h-auto w-full flex items-center justify-center mt-2">
            <div className="h-auto max-h-[1400px] w-[960px] mt-3 px-2 border rounded-lg bg-white overflow-auto">
              {/* display medium */}
              <div className="sm:hidden md:flex h-auto min-h-[570px] w-[100%] px-1 py-5 flex-col items-center overflow-auto">
                <div className="flex items-center space-x-5 pr-16">
                  <div className="md:hidden h-[40px] w-[40px]" onClick={goBack}>
                    <Image
                      src={left_back}
                      alt="icon"
                      className="h-[25px] w-[25px] cursor-pointer"
                      // onClick={handleClickUser}
                    />
                  </div>

                  <motion.p
                    initial={{ opacity: 0, x: 20 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { duration: 1, delay: 0.2 },
                    }}
                    className="uppercase sm:text-lg md:text-2xl font-medium mb-2"
                  >
                    Quản lý tin đăng
                  </motion.p>
                </div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.5, delay: 0.2 },
                  }}
                  className="h-[50px] w-full mb-2 flex"
                >
                  {listFilter &&
                    listFilter.map((item_listFilter: any) => {
                      return (
                        <div
                          key={item_listFilter.id}
                          className={
                            isOpen !== item_listFilter.id
                              ? `h-full min-w-[150px] flex items-center justify-center text-lg hover:border-b-2 hover:border-blue-600 cursor-pointer`
                              : `h-full min-w-[150px] flex items-center justify-center text-lg border-b-4 border-blue-600 cursor-pointer`
                          }
                          onClick={() => handleClickfilted(item_listFilter.id)}
                        >
                          {item_listFilter.name}
                        </div>
                      );
                    })}
                </motion.div>

                {filteredList &&
                  filteredList.lenght !== 0 &&
                  filteredList.map((item: any, index: number) => {
                    //handle thời gian đã đăng
                    function tinhthoigiandadang(time: Date): string {
                      const timehientai: Date = new Date();
                      const ngaytao: Date = new Date(time);
                      const thoigiandadang: number =
                        timehientai.getTime() - ngaytao.getTime();

                      if (thoigiandadang < 60000) {
                        // Dưới 1 phút
                        return `${Math.floor(
                          thoigiandadang / 1000
                        )} giây trước`;
                      } else if (thoigiandadang < 3600000) {
                        // 1 giờ = 3600000 milli giây
                        const minutes: number = Math.floor(
                          thoigiandadang / 60000
                        ); // 1 phút = 60000 milli giây
                        return `${minutes} phút trước`;
                      } else if (thoigiandadang < 86400000) {
                        // 1 ngày = 86400000 milli giây
                        const hours: number = Math.floor(
                          thoigiandadang / 3600000
                        ); // 1 giờ = 3600000 milli giây
                        return `${hours} giờ trước`;
                      } else if (thoigiandadang < 604800000) {
                        // 1 tuần = 604800000 milli giây
                        const days: number = Math.floor(
                          thoigiandadang / 86400000
                        ); // 1 ngày = 86400000 milli giây
                        return `${days} ngày trước`;
                      } else {
                        const weeks: number = Math.floor(
                          thoigiandadang / 604800000
                        ); // 1 tuần = 604800000 milli giây
                        return `${weeks} tuần trước`;
                      }
                    }
                    const thoigiandadang: string = tinhthoigiandadang(
                      item.updatedAt
                    );
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.3, delay: 0.1 },
                        }}
                        exit={{
                          opacity: 0,
                          y: -50,
                          transition: { duration: 0.3 },
                        }}
                        className="h-[160px] w-full p-1 mt-3 flex border border-gray-400 shadow-md rounded-md cursor-pointer overflow-auto"
                      >
                        <div
                          className="h-[150px] w-[150px] flex justify-center"
                          onClick={() => clickTindang(item.type, item._id)}
                        >
                          <div
                            className="h-full w-full bg-center bg-contain bg-no-repeat"
                            style={{ backgroundImage: `url(${item.img[0]})` }}
                          ></div>
                        </div>
                        <div className="w-[780px] flex items-center place-content-between">
                          <div
                            className="h-full w-[500px] px-2"
                            onClick={() => clickTindang(item.type, item._id)}
                          >
                            <div className="h-[50%] w-full">
                              <p className="h-auto max-h-[50px] w-full text-lg pb-1 overflow-hidden">
                                {item.tieude}{" "}
                              </p>
                              <p className="h-[40px] w-full font-bold text-red-500">
                                {item.price.toLocaleString("vi-VN")} đ
                              </p>
                            </div>
                            <div className="h-[50%] w-full flex items-end pb-3">
                              <div>
                                <p className="h-[30px] w-full text-lg">
                                  Đăng tin: {thoigiandadang}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            className={`${
                              isOpen && isOpen === 3 && "hidden"
                            } h-full w-[300px] flex items-end justify-end`}
                          >
                            {isOpen === 1 && (
                              <div
                                className={`h-auto w-auto px-5 py-1 border border-red-500 hover:bg-red-500 hover:text-white rounded-md flex items-center justify-center text-lg`}
                                onClick={() =>
                                  handlebutton_huytin(item.type, item._id)
                                }
                              >
                                Hủy tin
                              </div>
                            )}
                            {isOpen === 2 && (
                              <div
                                className={`h-full w-full flex items-center`}
                              >
                                <div className="h-full w-[50%] flex items-end">
                                  <button
                                    disabled={item.trangthaithanhtoan == 1}
                                    className={`${
                                      item.trangthaithanhtoan == 1
                                        ? "bg-mauxanhtroi text-white"
                                        : ""
                                    } h-[40px] py-1 w-[140px] border border-mauxanhtroi hover:bg-mauxanhtroi hover:text-white rounded-md flex items-center justify-center text-lg`}
                                    onClick={() =>
                                      handlebutton_nangcapTinuutien(item)
                                    }
                                  >
                                    {item.trangthaithanhtoan == 1
                                      ? "Tin ưu tiên"
                                      : "Đẩy tin"}
                                  </button>
                                </div>
                                <div className="h-full w-[50%] flex flex-col place-content-between">
                                  <button
                                    className={`h-[40px] py-1 w-[140px] border border-gray-500 hover:bg-gray-200 rounded-md flex items-center justify-center text-lg`}
                                    onClick={() =>
                                      handlebutton_antin(item.type, item._id)
                                    }
                                  >
                                    Ẩn tin
                                  </button>
                                  <button
                                    className={`h-[40px] py-1 w-[140px] border border-gray-500 hover:bg-red-500 hover:text-white rounded-md flex items-center justify-center text-lg`}
                                    onClick={() =>
                                      handlebutton_huytin(item.type, item._id)
                                    }
                                  >
                                    Xóa tin
                                  </button>
                                  <button
                                    className="h-[40px] py-1 w-[140px] text-lg border border-gray-500 rounded-md hover:text-white hover:bg-green-500"
                                    onClick={() =>
                                      handlebutton_daban(item.type, item._id)
                                    }
                                  >
                                    Đã bán
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                          {isOpen === 3 && (
                            <div className={`h-full w-[350px]`}>
                              <div className="h-full w-full border border-red-500 rounded-md break-words whitespace-pre-wrap font-mono">
                                <p className="w-full text-center bg-red-500 py-1 text-white">
                                  Lý do từ chối
                                </p>
                                <p className="p-1">{item.lydoantin}</p>
                              </div>
                            </div>
                          )}
                          {isOpen === 4 && (
                            <div className={`h-full w-[350px]`}>
                              <div className="h-[65%] w-full border border-red-500 rounded-md break-words whitespace-pre-wrap font-mono overflow-auto">
                                <p className="w-full text-center bg-red-500 py-1 text-white">
                                  Lý do ẩn tin
                                </p>
                                <p className="p-1">{item.lydoantin}</p>
                              </div>
                              <div className="h-[35%] w-full py-2">
                                <div
                                  className="border border-mauxanhtroi rounded-md h-full w-full flex items-center justify-center text-lg hover:bg-mauxanhtroi hover:text-white"
                                  onClick={() =>
                                    handlebutton_hienthilai(item.type, item._id)
                                  }
                                >
                                  Hiển thị lại
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>

      <Modal_comfirm_Thanhtoan
        isopenModalnangcapTinuutien={isopenModalnangcapTinuutien}
        setOpenModalnangcapTinuutien={setOpenModalnangcapTinuutien}
        // handlebutton_nangcapTinuutien={() =>
        //   handlebutton_nangcapTinuutien()
        // }
      />
      <Modal_comfirm_Huytin
        isopenModalHuytin={isopenModalHuytin}
        setOpenModalHuytin={setOpenModalHuytin}
        handlebutton_huytin={() => handleXoatindang(type, idTindang)}
      />
      <Modal_TuchoiTindang
        inputLydoantin={inputLydoantin}
        handleChangeLydoantin={handleChangeLydoantin}
        handleUpdateStatusTindang={() => handleUpdateStatus_Antin()}
        openlidotuchoi={openlidotuchoi}
        Openlidotuchoi={Openlidotuchoi}
      />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

// truyen id user
export const getServerSideProps: GetServerSideProps<infodetailProps> = async (
  context
) => {
  const { id_user } = context.params as {
    id_user: string;
  };

  return {
    props: {
      id_user: id_user as string,
    },
  };
};

export default Quanly_tindang;
