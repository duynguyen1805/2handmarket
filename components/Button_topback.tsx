import React, { useEffect, useState } from "react";
import "animate.css";
import router from "next/router";
import jwt from "jsonwebtoken";
import { sign, verify, Secret } from "jsonwebtoken";
import { useMyContext } from "@/contexts/MyContext";

const Button_topback = () => {
  const { isLoading, handle_setIsLoading, isLogin } = useMyContext();
  const [isHovered_scrolltotop, setIsHovered_scrolltotop] = useState(false);
  const [isHovered_chatwithAD, setIsHovered_chatwithAD] = useState(false);
  const handle_scroll_top = () => {
    // Cuộn lên đầu trang web khi nút được click
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [datainforUser_current, setdatainforUser_current] = useState<any>();
  useEffect(() => {
    //lấy thông tin người dùng Đăng nhập
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
        setdatainforUser_current(decoded);
      } catch (error) {
        console.log("Lỗi decoded token: ", error);
        setdatainforUser_current(null);
      }
    }
  }, []);

  const handleClickMessage_toAdmin = async () => {
    const query: any = {
      current_user_name: datainforUser_current?.name,
      id_receiver: "64d733a8df7d5a5bec4959bf",
      name_receiver: "Admin",
    };
    try {
      handle_setIsLoading(true);
      await router.push({
        pathname: `/account/tin-nhan/${datainforUser_current?._id}`,
        query,
      });
      handle_setIsLoading(false);
    } catch (error) {
      console.error("Error navigating:", error);
      handle_setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className="fixed bottom-5 right-3 h-[40px] w-[40px] bg-white border border-mauxanhtroi rounded-full sm:hidden md:flex items-center justify-center cursor-pointer animate__animated animate__fadeIn"
        onClick={() => handle_scroll_top()}
        onMouseEnter={() => setIsHovered_scrolltotop(true)}
        onMouseLeave={() => setIsHovered_scrolltotop(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 15.75l7.5-7.5 7.5 7.5"
          />
        </svg>
        {isHovered_scrolltotop && (
          <span className="absolute bottom-0 right-11 h-10 w-[110px] flex items-center justify-center bg-gray-200 rounded-md">
            Đến đầu trang
          </span>
        )}
      </div>
      {(datainforUser_current || isLogin == true) && (
        <div
          className="fixed bottom-[65px] right-3 h-[40px] w-[40px] bg-white border border-mauxanhtroi rounded-full sm:hidden md:flex items-center justify-center cursor-pointer animate__animated animate__fadeIn"
          onClick={handleClickMessage_toAdmin}
          onMouseEnter={() => setIsHovered_chatwithAD(true)}
          onMouseLeave={() => setIsHovered_chatwithAD(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z"
            />
          </svg>
          {isHovered_chatwithAD && (
            <span className="absolute bottom-0 right-11 h-10 w-[120px] flex items-center justify-center bg-gray-200 rounded-md">
              Nhắn tin Admin
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default Button_topback;
