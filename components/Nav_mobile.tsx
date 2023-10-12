import React, { useEffect, useState } from "react";
import icon_home from "../assets/icon/home.png";
import icon_message from "../assets/icon/message.png";
import icon_quanlytin from "../assets/icon/management_news.png";
import icon_user from "../assets/icon/user.png";
import icon_dangtin from "../assets/icon/dangtin.png";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";
// toast thông báo
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt from "jsonwebtoken";
import { sign, verify, Secret } from "jsonwebtoken";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { useMyContext } from "@/contexts/MyContext";

const Nav_mobile = () => {
  const [datainforUser, setdatainforUser] = useState<any>(null);
  const [isOpenOption, setOpenOptionUser] = useState(false);
  const [href_hientai, sethref_hientai] = useState<any>(null);
  const { isLogin, setLogin, information_User, setInfoUser } = useMyContext();

  useEffect(() => {
    sethref_hientai(router.pathname);
  });

  const [token_cookie, setToken_cookie] = useState<any>();
  useEffect(() => {
    const fetchToken = async () => {
      const token_cookie = Cookies.get("jwt_token");
      if (token_cookie) {
        setToken_cookie(token_cookie);
      }
    };
    fetchToken();
  }, []);

  useEffect(() => {
    //lấy thông tin người dùng
    const token: any = localStorage.getItem("token");
    // const token_cookie: any = Cookies.get("jwt_token");
    const parse_token = JSON.parse(token);
    if (parse_token && token_cookie) {
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
        }
      } catch (error) {
        console.log("Lỗi decoded token: ", error);
        setdatainforUser(null);
      }
    } else {
      setdatainforUser(null);
    }
  }, [token_cookie, isLogin]);
  const handleClickMessage = (idUser: any) => {
    if (idUser) {
      router
        .push(`/account/tin-nhan/${idUser}`)
        .then(() => window.location.reload());
    } else {
      router.push("/account/login");
      toast.success("Bạn cần đăng nhập trước khi Nhắn tin.");
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
  const handleClickManager = () => {
    router.push("/admin/adminDashboard");
  };
  const clickInfoDetail = (idUser: string) => {
    if (idUser) {
      router.push(`/account/trang-ca-nhan/${idUser}`);
    } else {
      router.push("/account/login");
    }
  };
  const Logout = () => {
    localStorage.clear();
    Cookies.remove("jwt_token");
    window.location.reload();
    router.push("/");
  };
  return (
    <div className="md:hidden fixed left-0 bottom-0 h-[60px] w-full bg-white border-t border-t-mauxanhtroi grid grid-cols-5 gap-0 items-center cursor-pointer">
      <Link
        href={"/"}
        className={`h-full text-sm flex flex-col items-center justify-center ${
          href_hientai === "/" ? "bg-mauxanhtroi text-white" : ""
        }`}
      >
        <Image
          src={icon_home}
          alt=""
          className={`h-[25px] w-[25px] ${
            href_hientai === "/" ? "icon-white" : "icon-blue"
          }`}
        />
        <p>Trang chủ</p>
      </Link>
      <div
        className={`h-full text-sm flex flex-col items-center justify-center ${
          href_hientai?.includes("quan-ly-tin")
            ? "bg-mauxanhtroi text-white"
            : ""
        }`}
        onClick={() => {
          clickQuanly_dangtin(datainforUser?._id);
        }}
      >
        <Image
          src={icon_quanlytin}
          alt=""
          className={`h-[25px] w-[25px] ${
            href_hientai?.includes("quan-ly-tin") ? "icon-white" : "icon-blue"
          }`}
        />
        <p>Quản lý tin</p>
      </div>
      <Link
        href={"/dang-tin"}
        className={`h-full text-sm flex flex-col items-center justify-center ${
          href_hientai?.includes("dang-tin") ? "bg-mauxanhtroi text-white" : ""
        }`}
      >
        <Image
          src={icon_dangtin}
          alt=""
          className={`h-[25px] w-[25px] ${
            href_hientai?.includes("dang-tin") ? "icon-white" : "icon-blue"
          }`}
        />
        <p>Đăng tin</p>
      </Link>
      <div
        className={`h-full text-sm flex flex-col items-center justify-center ${
          href_hientai?.includes("tin-nhan") ? "bg-mauxanhtroi text-white" : ""
        }`}
        onClick={() => handleClickMessage(datainforUser?._id)}
      >
        <div className="relative">
          <Image
            src={icon_message}
            alt=""
            className={`h-[25px] w-[25px] ${
              href_hientai?.includes("tin-nhan") ? "icon-white" : "icon-blue"
            }`}
          />
          <div
            className={`absolute h-[20px] w-[20px] top-[-8px] right-[-12px] rounded-full bg-red-500 text-white flex items-center justify-center`}
          >
            {/* {countmessageunread} */}1
          </div>
        </div>

        <p>Tin nhắn</p>
      </div>
      {(!datainforUser || datainforUser == null) && (
        <Link
          href={"/account/login"}
          className={`h-full text-sm flex flex-col items-center justify-center ${
            href_hientai?.includes("login") ? "bg-mauxanhtroi text-white" : ""
          }`}
        >
          <Image
            src={icon_user}
            alt=""
            className={`h-[25px] w-[25px] ${
              href_hientai?.includes("login") ? "icon-white" : "icon-blue"
            }`}
          />
          <p>Đăng nhập</p>
        </Link>
      )}
      {datainforUser && datainforUser !== null && (
        <div
          className="relative h-full text-sm flex flex-col items-center justify-center"
          onClick={handleClickUser}
        >
          <div
            className="h-[25px] w-[25px] bg-cover bg-no-repeat bg-center rounded-full"
            style={{
              backgroundImage: `url(${datainforUser?.avatar})`,
            }}
          ></div>
          <p>
            {datainforUser?.name.slice(
              datainforUser?.name.lastIndexOf(" ") + 1
            )}
          </p>
          {isOpenOption && (
            <motion.div
              className="absolute h-auto w-[180px] bottom-[60px] right-0 mt-2 flex flex-wrap bg-white border rounded-md shadow-lg z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.4 } }}
              exit={{
                opacity: 0,
              }}
            >
              <div className="h-full w-full flex flex-col">
                <p className="h-[50px] text-base flex items-center justify-center cursor-pointer hover:text-blue-500">
                  SĐT: {datainforUser?.account}
                </p>
                {datainforUser?.role === "Admin" && (
                  <div
                    className="h-[50px] border-t border-gray-400 flex justify-center items-center text-base cursor-pointer hover:text-white hover:bg-blue-500"
                    onClick={handleClickManager}
                  >
                    Quản lý website
                  </div>
                )}
                <div
                  className="h-[50px] border-t border-gray-400 flex justify-center items-center text-base cursor-pointer hover:text-white hover:bg-blue-500"
                  onClick={() => {
                    clickInfoDetail(datainforUser?._id);
                  }}
                >
                  Trang cá nhân
                </div>
                <div
                  className="h-[50px] border-t border-gray-400 flex justify-center items-center text-base cursor-pointer hover:text-white hover:bg-blue-500"
                  onClick={() => {
                    clickQuanly_dangtin(datainforUser?._id);
                  }}
                >
                  Quản lý tin đăng
                </div>
                <div
                  className="h-[50px] border-t border-gray-400 rounded-b-md flex justify-center items-center text-base text-red-500 cursor-pointer hover:bg-red-500 hover:text-white hover:text-sm"
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
  );
};

export default Nav_mobile;
