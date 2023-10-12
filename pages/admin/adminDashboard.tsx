require("dotenv").config();
import Header from "@/components/Header";
import DS_doiduyet from "@/components/admin/DS_doiduyet";
import Head from "next/head";
import Image from "next/image";
import Home from "../../assets/icon/home.png";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ManageUser from "@/components/admin/ManageUser";
// toast thông báo
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import jwt from "jsonwebtoken";
import { sign, verify, Secret } from "jsonwebtoken";
import Cookies from "js-cookie";

import item_danhmuc, {
  danhmuc,
  sub_danhmuc,
} from "../../components/obj_data_raw/Danhmuc_raw";
import DS_daduyet from "@/components/admin/DS_daduyet";
import { API_get_soluongtin_Allcollection } from "@/service/userService";
import io from "socket.io-client";
const danhmuc: danhmuc[] = item_danhmuc;

const AdminDashboard = () => {
  const router = useRouter();
  const [isOpenDoiduyet, setOpenDoiduyet] = useState(false);
  const [isOpenDaduyet, setOpenDaduyet] = useState(false);
  const [isOpenQuanlyTK, setOpenQuanlyTK] = useState(false);
  const [selectChitietDoiduyet, setselectChitietDoiduyen] = useState<number>();
  const [selectChitietDaduyet, setselectChitietDaduyen] = useState<number>();
  const [noti_newPostMessage, setNoti_NewPostMessage] = useState<any>();
  const [allowed_render, setAllowed_render] = useState(false);

  useEffect(() => {
    const BACKEND_URL: any = process.env.NEXT_PUBLIC_BACKEND_URL;
    // Tạo kết nối Socket.io với server backend
    const socket = io(BACKEND_URL); // Thay URL phù hợp với server backend của bạn

    // Lắng nghe sự kiện 'new-post' từ server
    socket.on("new-post", (data) => {
      // data là thông báo hoặc dữ liệu mới từ server
      setNoti_NewPostMessage(data.message);
      toast.success(data.message);
      get_soluongtin_moicollection();
    });

    return () => {
      socket.disconnect(); // Ngắt kết nối khi unmount component (tuỳ vào tình huống)
    };
  }, []);

  // const [token_cookie, setToken_cookie] = useState<any>();
  // useEffect(() => {
  //   const fetchToken = async () => {
  //     const token_cookie = Cookies.get("jwt_token");
  //     if (token_cookie) {
  //       setToken_cookie(token_cookie);
  //     }
  //   };
  //   fetchToken();
  // }, []);

  useEffect(() => {
    //lấy thông tin người dùng
    const token: any = localStorage.getItem("token");
    // const token_cookie: any = Cookies.get("jwt_token");
    const parse_token = JSON.parse(token);
    if (parse_token) {
      let jwt_key = "2handmarket_tdn" || process.env.NEXT_PUBLIC_JWT_SECRET;
      if (!jwt_key) {
        throw new Error(
          "JWT_SECRET is not defined in the environment variables."
        );
      }
      const jwt_secret: Secret = jwt_key;
      try {
        const decoded: any = jwt.verify(parse_token, jwt_secret);
        const role = decoded.role;
        if (role === null || role === "Client") {
          router.push("/");
          router.replace("/");
        } else {
          setAllowed_render(true);
        }
      } catch (error) {
        console.log("Lỗi decoded token: ", error);
      }
    } else {
      router.push("/account/login");
    }
  }, []);
  const handleLogout = () => {
    localStorage.clear();
    Cookies.remove("jwt_token");
    window.location.reload();
    router.push("/");
  };

  const [list_soluongtin_daduyet, setlist_soluongtin_daduyet] = useState<any[]>(
    []
  );
  const [list_soluongtin_doiduyet, setlist_soluongtin_doiduyet] = useState<
    any[]
  >([]);
  useEffect(() => {
    const get_soluongtin_moicollection = async () => {
      try {
        const response = await API_get_soluongtin_Allcollection();
        setlist_soluongtin_daduyet(response.all_soluongtin_daduyet);
        setlist_soluongtin_doiduyet(response.all_soluongtin_doiduyet);
      } catch (error) {
        console.log(error);
      }
    };
    get_soluongtin_moicollection();
  }, []);
  const get_soluongtin_moicollection = async () => {
    try {
      const response = await API_get_soluongtin_Allcollection();
      setlist_soluongtin_daduyet(response.all_soluongtin_daduyet);
      setlist_soluongtin_doiduyet(response.all_soluongtin_doiduyet);
    } catch (error) {
      console.log(error);
    }
  };

  function handleSelect(value: number) {
    if (value === 0) {
      setOpenDoiduyet(!isOpenDoiduyet);
      // setOpenDaduyet(false);
      setOpenQuanlyTK(false);
    }
    if (value === 1) {
      // setOpenDoiduyet(false);
      setOpenDaduyet(!isOpenDaduyet);
      setOpenQuanlyTK(false);
    }
    if (value === 2) {
      setOpenDoiduyet(false);
      setOpenDaduyet(false);
      setOpenQuanlyTK(!isOpenQuanlyTK);
    }
  }
  const [selectMain, setselectMain] = useState<string>();
  const [selectoption, setselectoption] = useState<string>();
  const selectChitietDoiduyen = (
    doiduyet: string,
    value: number,
    type: string
  ) => {
    setselectMain(doiduyet);
    setselectChitietDoiduyen(value);
    setselectChitietDaduyen(-1);
    setselectoption(type);
  };
  const selectChitietDaduyen = (
    daduyet: string,
    value: number,
    type: string
  ) => {
    setselectMain(daduyet);
    setselectChitietDaduyen(value);
    setselectoption(type);
  };
  const selectQuanlytaikhoan = () => {
    handleSelect(2);
    setOpenDoiduyet(false);
    setOpenDaduyet(false);
    setselectMain(undefined);
    setselectoption(undefined);
  };

  return (
    <>
      <Head>
        <title>Quản lý Website</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon_2handmarket.png" />
      </Head>
      {allowed_render && (
        <div className="lg:bg-gray-50 sm:h-full lg:h-screen">
          {/* screen: medium & desktop */}
          <div className="sm:hidden md:block">
            <Header />
            <div className="md:block lg:flex md:h-full lg:h-[855px] bg-white">
              <div className="bg-mauxanhtroi px-2 py-3 text-white flex space-y-1 md:flex-row lg:flex-col md:h-full md:w-[100%] lg:h-auto lg:w-[300px] overflow-y-auto overflow-x-hidden">
                {/* doi duyet */}
                <div
                  className={`flex items-center place-content-between py-2 px-2 text-2xl rounded-md cursor-pointer hover:bg-blue-300 ${
                    isOpenDoiduyet ? "bg-white text-mauxanhtroi" : ""
                  }`}
                  onClick={() => handleSelect(0)}
                >
                  Tin đợi duyệt
                  <svg
                    className={`w-6 h-6 ml-2 transition-transform duration-200 transform ${
                      isOpenDoiduyet ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                {isOpenDoiduyet && (
                  <div className=" h-auto w-full">
                    {danhmuc &&
                      danhmuc.map((item: danhmuc, index: number) => {
                        return (
                          <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{
                              opacity: 1,
                              x: 0,
                              transition: { duration: 0.3, delay: 0.1 },
                            }}
                            whileHover={{
                              translateX: 15,
                              transition: { duration: 0.3, delay: 0.1 },
                            }}
                            key={index}
                            className={`py-2 px-5 cursor-pointer text-lg ${
                              selectMain === "doiduyet" &&
                              index === selectChitietDoiduyet &&
                              "border-b border-white"
                            }`}
                            onClick={() =>
                              selectChitietDoiduyen(
                                "doiduyet",
                                index,
                                item.type
                              )
                            }
                          >
                            <div className="flex items-center place-content-between">
                              <p>{item.label}</p>
                              <p>{list_soluongtin_doiduyet[index]}</p>
                            </div>
                          </motion.div>
                        );
                      })}
                  </div>
                )}
                {/* da duyet */}
                <div
                  className={`flex items-center place-content-between py-2 px-2 text-2xl rounded-md cursor-pointer hover:bg-blue-300 ${
                    isOpenDaduyet ? "bg-white text-mauxanhtroi" : ""
                  }`}
                  onClick={() => handleSelect(1)}
                >
                  Tin đã duyệt
                  <svg
                    className={`w-6 h-6 ml-2 transition-transform duration-200 transform ${
                      isOpenDaduyet ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                {isOpenDaduyet && (
                  <div className=" h-auto w-full">
                    {danhmuc &&
                      danhmuc.map((item: danhmuc, index: number) => {
                        return (
                          <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{
                              opacity: 1,
                              x: 0,
                              transition: { duration: 0.3, delay: 0.1 },
                            }}
                            whileHover={{
                              translateX: 15,
                              transition: { duration: 0.3, delay: 0.1 },
                            }}
                            key={index}
                            className={`py-2 px-5 cursor-pointer text-lg ${
                              selectMain === "daduyet" &&
                              index === selectChitietDaduyet &&
                              "border-b border-white"
                            }`}
                            onClick={() =>
                              selectChitietDaduyen("daduyet", index, item.type)
                            }
                          >
                            <div className="flex items-center place-content-between">
                              <p>{item.label}</p>
                              <p>{list_soluongtin_daduyet[index]}</p>
                            </div>
                          </motion.div>
                        );
                      })}
                  </div>
                )}
                {/* tai khoan user */}
                <div
                  className={`flex items-center place-content-between py-2 px-2 text-2xl rounded-md cursor-pointer hover:bg-blue-300 ${
                    isOpenQuanlyTK ? "bg-white text-mauxanhtroi" : ""
                  }`}
                  onClick={() => selectQuanlytaikhoan()}
                >
                  Tài khoản
                </div>

                {/* button logout */}
                <button
                  onClick={handleLogout}
                  className="md:hidden lg:flex w-full items-center justify-center pt-5"
                >
                  <p className="bg-white h-full w-[200px] p-2 text-lg text-red-500 rounded-md hover:bg-red-500 hover:text-white">
                    Đăng xuất
                  </p>
                </button>
              </div>
              <div className="md:h-[700px] lg:h-full flex-1 p-1 overflow-y-auto">
                {selectoption && selectMain === "doiduyet" && (
                  <DS_doiduyet
                    selectoption={selectoption}
                    get_soluongtin_moicollection={get_soluongtin_moicollection}
                  />
                )}
                {selectoption && selectMain === "daduyet" && (
                  <DS_daduyet
                    selectoption={selectoption}
                    get_soluongtin_moicollection={get_soluongtin_moicollection}
                  />
                )}
                {isOpenQuanlyTK && <ManageUser />}
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default AdminDashboard;
