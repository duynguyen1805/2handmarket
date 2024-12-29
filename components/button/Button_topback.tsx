import React, { useEffect, useState } from "react";
import "animate.css";
import router from "next/router";
import jwt from "jsonwebtoken";
import { sign, verify, Secret } from "jsonwebtoken";
import { useMyContext } from "@/contexts/MyContext";
import { API_delete_thongbao, API_get_thongbao } from "@/service/userService";
import { useSession } from "next-auth/react";

interface UserData {
  name: string;
  email: string;
  image: string;
  _id?: string | any;
  token_gg?: any;
  id_token?: any;
  accessToken?: any;
}
interface SessionData {
  user: UserData;
  expires: any;
}

const Button_topback = () => {
  //lấy data session login bằng google (status: ['loading', 'authenticated', 'unauthenticated'])
  const { data, status } = useSession<SessionData | any>();
  const {
    isLoading,
    handle_setIsLoading,
    isLogin,
    information_User,
    setInfoUser,
  } = useMyContext();
  const [isHovered_darkmode, setIsHovered_darkmode] = useState(false);
  const [isHovered_scrolltotop, setIsHovered_scrolltotop] = useState(false);
  const [isHovered_chatwithAD, setIsHovered_chatwithAD] = useState(false);
  const [isHovered_youtube, setIsHovered_youtube] = useState(false);
  const handle_scroll_top = () => {
    // Cuộn lên đầu trang web khi nút được click
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleClickMessage_toAdmin = async () => {
    try {
      handle_setIsLoading(true);
      await router.push({
        pathname: `/youtube`,
      });
      handle_setIsLoading(false);
    } catch (error) {
      console.error("Error navigating:", error);
      handle_setIsLoading(false);
    }
  };
  const [datainforUser, setdatainforUser] = useState<any>(null);
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
      // nếu không có token login acc&pass => check có login gg hay không
      if (data) {
        setInfoUser(data.user);
        console.log("check data: ", data);
      } else {
        setdatainforUser(null);
        setInfoUser(null);
      }
    }
  }, [data]);

  const [open_noti, setOpen_noti] = useState<boolean>(false);
  const [data_noti, setdata_noti] = useState<any[]>([]);

  const fetch_data = async () => {
    const response = await API_get_thongbao(
      information_User?._id ? information_User._id : datainforUser?._id
    );
    if (response) {
      setdata_noti(response.thongbao);
    }
  };

  const handle_open_noti = async () => {
    setOpen_noti(!open_noti);
    if (open_noti === false) {
      fetch_data();
    }
  };

  const handle_delete_noti = async (item: any) => {
    try {
      const response = await API_delete_thongbao(
        information_User?._id ? information_User._id : datainforUser?._id,
        item.id_tindang,
        item.trangthai
      );
      if (response) {
        fetch_data();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [isDarkMode, set_isDarkMode] = useState<boolean>(false);
  const handle_darkmode = () => {
    set_isDarkMode(!isDarkMode);
  };

  return (
    <div>
      {/* button darkmode */}
      {/* <div
        className={`fixed bottom-[110px] right-3 h-[40px] w-[40px] bg-mauxanhtroi rounded-full sm:hidden md:flex items-center justify-center cursor-pointer hover:scale-110 duration-500 animate__animated animate__fadeIn`}
        onClick={() => handle_darkmode()}
        onMouseEnter={() => setIsHovered_darkmode(true)}
        onMouseLeave={() => setIsHovered_darkmode(false)}
      >
        {isDarkMode == false ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 icon-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 icon-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            />
          </svg>
        )}

        {isHovered_darkmode && (
          <span className="absolute bottom-0 right-11 h-10 w-[110px] flex items-center justify-center bg-gray-200 rounded-md">
            Dark mode
          </span>
        )}
      </div> */}
      <div
        className={`fixed bottom-5 right-3 h-[40px] w-[40px] bg-mauxanhtroi rounded-full sm:hidden md:flex items-center justify-center cursor-pointer hover:scale-110 duration-500 animate__animated animate__fadeIn`}
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
          className="w-6 h-6 icon-white"
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
      {(information_User || isLogin == true) && (
        <div
          className="fixed bottom-[110px] right-3 h-[40px] w-[40px] bg-mauxanhtroi rounded-full sm:hidden md:flex items-center justify-center cursor-pointer hover:scale-110 duration-500 animate__animated animate__fadeIn"
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
            className="w-6 h-6 icon-white"
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
      {/* nút Youtube */}
      <div
        className="fixed bottom-[65px] right-3 h-[40px] w-[40px] border-mauxanhtroi border rounded-full sm:hidden md:flex items-center justify-center cursor-pointer hover:scale-110 duration-500 animate__animated animate__fadeIn"
        onClick={handleClickMessage_toAdmin}
        onMouseEnter={() => setIsHovered_youtube(true)}
        onMouseLeave={() => setIsHovered_youtube(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="60"
          height="60"
          viewBox="0 0 48 48"
        >
          <path
            fill="#FF3D00"
            d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"
          ></path>
          <path fill="#FFF" d="M20 31L20 17 32 24z"></path>
        </svg>
        {isHovered_youtube && (
          <span className="absolute bottom-0 right-11 h-10 w-[120px] flex items-center justify-center bg-gray-200 rounded-md">
            Youtube
          </span>
        )}
      </div>

      {/* nút thông báo */}
      {(information_User?.role == "Client" ||
        datainforUser?.role == "Client") && (
        <div
          className={`${
            open_noti && "translate-x-[-448px] bg-red-500"
          } z-20 fixed top-[81px] right-0 h-[90px] w-[25px] bg-mauxanhtroi rounded-l-lg sm:hidden md:flex items-center justify-center cursor-pointer hover:w-[35px] duration-500 animate__animated animate__fadeIn`}
          onClick={() => handle_open_noti()}
        >
          {open_noti ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 icon-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 icon-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
              />
            </svg>
          )}
        </div>
      )}

      <div
        className={`${
          open_noti && "translate-x-[-450px]"
        } z-20 fixed top-[81px] right-[-450px] h-[600px] w-[450px] bg-white border-y border-l border-gray-300 shadow-lg rounded-bl-lg sm:hidden md:block overflow-auto duration-500 animate__animated animate__fadeIn`}
      >
        {data_noti &&
          data_noti.length > 0 &&
          data_noti.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className="relative h-[90px] w-full flex items-center py-1 px-2 border border-gray-300 overflow-hidden"
              >
                <div className="h-full w-full flex flex-col items-center">
                  <span className="h-2/3 w-full overflow-hidden">
                    {item.tieude}
                  </span>
                  <span className="h-1/3 w-full font-thin">
                    {item.trangthai == 2 &&
                      "Tin đã được DUYỆT. Bạn có thể nhìn thấy tin ở trang chủ."}
                    {item.trangthai == 3 &&
                      "Tin bị TỪ CHÔI. Xem lý do trong mục Quản lý tin."}
                  </span>
                </div>
                <div
                  className="absolute right-0 top-0 h-full w-[25px] flex items-center justify-center bg-red-500 text-white hover:w-[35px] duration-500 animate__animated animate__fadeIn"
                  onClick={() => handle_delete_noti(item)}
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
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        {data_noti && data_noti.length == 0 && (
          <div className="h-[90px] w-full text-xl font-bold flex items-center justify-center">
            Chưa có thông báo mới !
          </div>
        )}
      </div>
    </div>
  );
};

export default Button_topback;
