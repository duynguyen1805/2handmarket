require("dotenv").config();
import React, { useEffect, useState } from "react";
import Image from "next/image";
import router, { useRouter } from "next/router";
import message from "../assets/icon/message.png";
import management_news from "../assets/icon/management_news.png";
import user from "../assets/icon/user.png";
import dangtin from "../assets/icon/dangtin.png";
import { useMyContext } from "@/contexts/MyContext";
import { motion } from "framer-motion";
import Link from "next/link";
// import Modal_Addnewuser from "../components/modal/Modal_Addnewuser";
import jwt from "jsonwebtoken";
import { sign, verify, Secret } from "jsonwebtoken";
import Cookies from "js-cookie";
// toast thông báo
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  getDocs,
  Timestamp,
  query,
  where,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../firebase.config";

const Header = () => {
  //lấy số lượng order qua usecontext
  const {
    countmessageunread,
    count_message_unread,
    keyword_search,
    setKeywordSearch,
    information_User,
    setInfoUser,
  } = useMyContext();
  const [datainforUser, setdatainforUser] = useState<any>(null); //thay thế bằng information_User

  useEffect(() => {
    if (information_User?._id) {
      const listUserChatCollectionRef = collection(
        db,
        "list_user_chat",
        information_User?._id,
        "list_chatting"
      );
      const Listchat_Query = query(
        listUserChatCollectionRef,
        orderBy("timestamp", "desc")
      );
      const unsubscribe = onSnapshot(Listchat_Query, async (snapshot) => {
        const listchat: any = [];
        // Mảng chứa tất cả các promises của get_latestMessage. do snapshot.forEach có thể hoàn thành trước khi lấy latestMsg
        snapshot.forEach((doc) => {
          const list_chat = doc.data();
          listchat.push(list_chat);
        });
        // console.log("check listchat từ header: ", listchat);
        // map listchat đếm số seen:false gán vào context
        if (listchat.length > 0) {
          let count = 0;
          for (let i = 0; i < listchat.length; i++) {
            if (listchat[i].seen == false) {
              count += 1;
            }
          }
          count_message_unread(count);
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [information_User]);

  // const [token_cookie, setToken_cookie] = useState<any>();
  // useEffect(() => {
  //   const fetchToken = async () => {
  //     const token_cookie = Cookies.get("jwt_token");
  //     if (token_cookie) {
  //       setToken_cookie(token_cookie);
  //       alert(`Đây là giá trị lấy từ Cookie: ${token_cookie}`);
  //       console.log(`Đây là giá trị lấy từ Cookie: ${token_cookie}`);
  //     } else {
  //       alert(`false cookie: ${token_cookie}`);
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
        const decoded = jwt.verify(parse_token, jwt_secret);
        // const decoded_cookie = jwt.verify(token_cookie, jwt_secret);
        if (decoded) {
          setdatainforUser(decoded);
          setInfoUser(decoded);
        }
      } catch (error) {
        console.log("Lỗi decoded token: ", error);
        setdatainforUser(null);
        setInfoUser(null);
      }
    } else {
      setdatainforUser(null);
      setInfoUser(null);
    }
  }, []);

  //mở option của người dùng
  const [isOpenOption, setOpenOptionUser] = useState(false);

  const clickLogin = () => {
    router.push("/account/login");
  };
  const clickRegister = () => {
    router.push("/account/register");
  };
  const handleClickManager = () => {
    router.push("/admin/adminDashboard");
  };
  const handleClickMessage = (idUser: any) => {
    if (idUser) {
      router.push(`/account/tin-nhan/${idUser}`);
      // .then(() => window.location.reload());
    } else {
      router.push("/account/login");
      toast.success("Bạn cần đăng nhập trước khi Nhắn tin.");
    }
  };
  const clickInfoDetail = (idUser: string) => {
    if (idUser) {
      router.push(`/account/trang-ca-nhan/${idUser}`);
    } else {
      router.push("/account/login");
    }
  };
  const clickQuanly_dangtin = (idUser: any) => {
    if (idUser) {
      router.push(`/account/quan-ly-tin/${idUser}`);
    } else {
      router.push("/account/login");
      toast.success("Bạn cần đăng nhập trước khi Quản lý tin đăng.");
    }
  };
  const handleClickUser = () => {
    setOpenOptionUser(!isOpenOption);
  };
  const Logout = () => {
    localStorage.clear();
    Cookies.remove("jwt_token");
    window.location.reload();
    router.push("/");
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // handleSearch(searchValue);
      handle_ClickSearch_pushnewpage();
    }
  };

  const [searchValue, setSearchValue] = useState<string>("");
  const [isClickSearch, setisClickSearch] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    setisClickSearch(false);
    // handleSearch(value);
  };

  const handle_ClickSearch_pushnewpage = () => {
    router.push({ pathname: `/tim-kiem/${searchValue}` });
    setKeywordSearch(searchValue);
  };

  return (
    <>
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
      {/* display medium/desktop */}
      <div className="sm:hidden md:block h-auto min-h-[80px] w-[100%] bg-mauxanhtroi py-0 border-b sticky top-0 left-0 z-20">
        <div className="w-[100%] lg:h-[80px] sm:h-[115px] lg:flex lg:flex-row lg:py-0 lg:space-y-0 sm:flex sm:flex-col sm:py-2 sm:space-y-2">
          <div className="lg:w-[50%] sm:w-full flex items-center">
            <Link
              href="/"
              className="md:hidden lg:block lg:h-[100px] lg:w-6/12 lg:scale-90  cursor-pointer bg-[url('../public/logo_2hand_removebg.png')] bg-no-repeat bg-contain bg-fixed bg-center"
            ></Link>

            <div className="relative w-6/12 sm:mx-auto sm:w-[80%] md:w-[100%] md:mx-[25px] lg:ml-[5px] lg:mr-[5px] lg:mb-[25px] lg:mt-[25px] rounded-[10px] bg-[#e2e2e2]">
              <div className="flex flex-row">
                <input
                  className="h-10 lg:w-[92%] md:w-[100%] text-[black] text-base pl-2.5 border-[none] outline-none bg-transparent"
                  onChange={handleChange}
                  type="text"
                  placeholder="Tìm kiếm"
                  onKeyDown={handleKeyDown}
                />
                <button
                  disabled={!searchValue}
                  onClick={() => handle_ClickSearch_pushnewpage()}
                  className="text-black w-[20%] h-10 bg-[#e9ecef] text-lg cursor-pointer rounded-tr-[10px] rounded-br-[10px] border-[unset] outline-none hover:bg-blue-300 hover:text-white"
                >
                  Tìm
                </button>
              </div>
            </div>
          </div>

          <div className="lg:w-[50%] sm:w-full flex items-center">
            {/* tinnhan */}
            <div
              className="h-auto lg:w-[25%] sm:w-[25%] flex gap-2.5 items-center justify-center cursor-pointer"
              onClick={() => handleClickMessage(information_User?._id)}
            >
              <div className="relative">
                <Image
                  src={message}
                  alt="icon"
                  className="h-[32px] w-[32px] cursor-pointer icon-white"
                />
                <div
                  className={`${
                    countmessageunread == 0 && "hidden"
                  } absolute h-[23px] w-[23px] top-[-10px] right-[-10px] rounded-full bg-red-500 text-white flex items-center justify-center`}
                >
                  {countmessageunread}
                </div>
              </div>

              <p className="text-white md:text-lg lg:text-xl text-center">
                Tin nhắn
              </p>
            </div>
            {/* quanlytin */}
            <div
              className="h-auto w-[25%] flex gap-1 items-center justify-center cursor-pointer"
              onClick={() => {
                clickQuanly_dangtin(information_User?._id);
              }}
            >
              <Image
                src={management_news}
                alt="icon"
                className="h-[32px] w-[32px] cursor-pointer icon-white"
              />
              <p className="text-white md:text-lg lg:text-xl text-center">
                Quản lý tin
              </p>
            </div>
            {/* login logout */}
            <div className="h-auto w-[25%] ml-2 flex items-center justify-center gap-1 cursor-pointer">
              {(!information_User || information_User == null) && (
                <Image
                  src={user}
                  alt="icon"
                  className="h-[25px] w-[25px] cursor-pointer icon-white"
                  onClick={handleClickUser}
                />
              )}
              {(!information_User || information_User == null) && (
                <div className="h-auto w-[100px] text-white ml-1 sm:hidden md:block">
                  <div
                    className=" hover:opacity-80 cursor-pointer"
                    onClick={clickLogin}
                  >
                    Đăng nhập
                  </div>
                  <div
                    className=" hover:opacity-80 cursor-pointer"
                    onClick={clickRegister}
                  >
                    Đăng ký
                  </div>
                </div>
              )}
              {information_User && information_User !== null && (
                <div className="relative">
                  <button
                    type="button"
                    onClick={handleClickUser}
                    className="flex items-center justify-center h-[45px] w-[150px] md:h-auto md:w-auto md:px-2 md:py-1 lg:py-3 bg-mauxanhtroi text-white md:text-lg lg:text-xl transition duration-300 ease-in-out rounded-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-200 focus:ring-blue-800 overflow-hidden"
                  >
                    <div
                      className="lg:h-[50px] lg:w-[50px] md:h-[40px] md:w-[40px] mr-1 bg-cover bg-no-repeat bg-center rounded-full"
                      style={{
                        backgroundImage: `url(${information_User?.avatar})`,
                      }}
                    ></div>
                    {information_User?.name.slice(
                      information_User?.name.lastIndexOf(" ") + 1
                    )}
                    <svg
                      className={`w-4 h-4 ml-2 transition-transform duration-200 transform ${
                        isOpenOption ? "rotate-180" : ""
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
                  </button>
                  {isOpenOption && (
                    <motion.div
                      className="absolute h-auto w-[200px] left-[-15px] mt-2 flex flex-wrap bg-white border rounded-md shadow-lg z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { duration: 0.4 } }}
                      exit={{
                        opacity: 0,
                      }}
                    >
                      <div className="h-full w-full flex flex-col">
                        <p className="h-[50px] text-xl flex items-center justify-center cursor-pointer hover:text-blue-500">
                          SĐT: {information_User?.account}
                        </p>
                        {information_User?.role === "Admin" && (
                          <div
                            className="h-[50px] border-t border-gray-400 flex justify-center items-center text-xl cursor-pointer hover:text-white hover:bg-blue-500"
                            onClick={handleClickManager}
                          >
                            Quản lý website
                          </div>
                        )}
                        <div
                          className="h-[50px] border-t border-gray-400 flex justify-center items-center text-xl cursor-pointer hover:text-white hover:bg-blue-500"
                          onClick={() => {
                            clickInfoDetail(information_User?._id);
                          }}
                        >
                          Trang cá nhân
                        </div>
                        <div
                          className="h-[50px] border-t border-gray-400 flex justify-center items-center text-xl cursor-pointer hover:text-white hover:bg-blue-500"
                          onClick={() => {
                            clickQuanly_dangtin(information_User?._id);
                          }}
                        >
                          Quản lý tin đăng
                        </div>
                        <div
                          className="h-[50px] border-t border-gray-400 rounded-b-md flex justify-center items-center text-xl text-red-500 cursor-pointer hover:bg-red-500 hover:text-white hover:text-xl"
                          onClick={Logout}
                        >
                          Đăng Xuất
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
            {/* Dangtin */}
            <div className="h-auto w-[25%] flex justify-center ml-2">
              <Link
                className="h-[50px] w-auto bg-blue-400 px-5 py-2 rounded-lg flex items-center hover:bg-blue-500 cursor-pointer"
                href={information_User ? "/dang-tin" : "/account/login"}
              >
                <Image
                  src={dangtin}
                  alt="icon"
                  className="w-[32px] h-[32px] icon-white mr-2"
                />
                <span className="text-white md:text-lg lg:text-xl text-center">
                  Đăng tin
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* display mobile */}
      <div className="md:hidden h-auto w-[100%] bg-mauxanhtroi py-0 border-b sticky top-0 left-0 z-20">
        <div className="w-[100%] py-2">
          <div className="w-full flex items-center">
            <Link
              href="/"
              className="md:hidden lg:block lg:h-[100px] lg:w-6/12 lg:scale-90  cursor-pointer bg-[url('../public/logo_2hand_removebg.png')] bg-no-repeat bg-contain bg-fixed bg-center"
            ></Link>

            <div className="relative w-6/12 sm:mx-auto sm:w-[95%] md:w-[100%] md:mx-[25px] lg:ml-[5px] lg:mr-[5px] lg:mb-[25px] lg:mt-[25px] rounded-[10px] bg-[#e2e2e2]">
              <div className="flex flex-row items-end">
                <input
                  className="h-10 w-[100%] text-[black] text-base pl-2.5 border-[none] outline-none bg-transparent"
                  onChange={handleChange}
                  type="text"
                  placeholder="Tìm kiếm"
                  onKeyDown={handleKeyDown}
                />
                <button
                  disabled={!searchValue}
                  onClick={() => handle_ClickSearch_pushnewpage()}
                  className="text-black w-[20%] h-10 bg-[#e9ecef] text-lg cursor-pointer rounded-tr-[10px] rounded-br-[10px] border-[unset] outline-none hover:bg-blue-300 hover:text-white"
                >
                  Tìm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
