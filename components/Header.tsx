import React, { useEffect, useState } from "react";
import Image from "next/image";
import router, { useRouter } from "next/router";
import telephone from "../assets/icon/telephone.png";
import message from "../assets/icon/message.png";
import management_news from "../assets/icon/management_news.png";
import location from "../assets/icon/location.png";
import user from "../assets/icon/user.png";
import dangtin from "../assets/icon/dangtin.png";
import manager from "../assets/icon/checklist.png";
import { useMyContext } from "@/contexts/MyContext";
import styles from "../styles/Home.module.css";
// import debounce from "debounce";
// import debounce from "lodash.debounce";
import debounce from "lodash/debounce";
import { API_searchProduct } from "@/service/userService";
import { motion } from "framer-motion";
import Link from "next/link";
// import Modal_Addnewuser from "../components/modal/Modal_Addnewuser";

const Header = () => {
  //lấy số lượng order qua usecontext
  const { information_User, setInfoUser } = useMyContext();
  //lấy số lượng order lưu vào usecontext
  useEffect(() => {
    const inforUser = localStorage.getItem("inforUser");
    if (inforUser) {
      const parsedinforUser = JSON.parse(inforUser);
      setInfoUser(parsedinforUser);
    }
  }, []);

  type DataInfor = {
    _id: string;
    name: string;
    account: string;
    address: string;
    role: string;
    avatar: string;
  };

  const [datainforUser, setdatainforUser] = useState<DataInfor>();

  useEffect(() => {
    //lấy thông tin người dùng
    const storedItems = localStorage.getItem("inforUser");
    if (storedItems) {
      setdatainforUser(JSON.parse(storedItems));
    }
  }, []);

  //mở giỏ hàng
  const [isOpen, setIsCartVisible] = useState(false);
  //mở option của người dùng
  const [isOpenOption, setOpenOptionUser] = useState(false);

  const handleToggleCart = () => {
    setIsCartVisible(!isOpen);
  };
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
    router
      .push(`/account/tin-nhan/${idUser}`)
      .then(() => window.location.reload());
  };
  const clickInfoDetail = (idUser: string) => {
    router.push(`/account/trang-ca-nhan/${idUser}`);
  };
  const clickQuanly_dangtin = (idUser: string) => {
    router.push(`/account/quan-ly-tin/${idUser}`);
  };
  const clickItemSearch = (codeSP: string, typeSP: string) => {
    router.push({
      pathname: `/products/${codeSP}`,
      query: { type: typeSP },
    });
    window.location.assign(`/products/${codeSP}?type=${typeSP}`);
  };
  const handleClickUser = () => {
    setOpenOptionUser(!isOpenOption);
  };
  const Logout = () => {
    localStorage.clear();
    // window.location.reload();
    router.push("/");
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch(searchValue);
    }
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isClickSearch, setisClickSearch] = useState<boolean>(false);

  const handleSearch = async (value: string) => {
    setisClickSearch(true);
    try {
      const response = await API_searchProduct(value);
      setSearchResults(response.resultSearch);
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    setisClickSearch(false);
    handleSearch(value);
  };

  return (
    <>
      {/* display medium/desktop */}
      <div className="h-auto min-h-[80px] w-[100%] bg-mauxanhtroi px-2.5 py-0 border-b sticky top-0 left-0 z-20">
        <div className="w-[100%] h-[80px] flex">
          <div className="w-[60%] flex items-center">
            <Link
              href="/"
              className="lg:h-[100px] lg:w-4/12 lg:scale-95 lg:ml-[2%] cursor-pointer bg-[url('../public/logo_2hand_removebg.png')] bg-no-repeat bg-contain bg-fixed bg-center"
            ></Link>

            <div className="relative w-8/12 sm:mx-auto sm:w-[80%] md:w-[100%] md:mx-[30px] lg:ml-[5px] lg:mr-[25px] lg:mb-[25px] md:mb-[10px] md:mt-[25px] rounded-[10px] bg-[#e2e2e2]">
              <div className="flex flex-row">
                <input
                  className="h-10 lg:w-[92%] md:w-[100%] text-[black] text-base pl-2.5 border-[none] outline-none bg-transparent"
                  onChange={handleChange}
                  type="text"
                  placeholder="Tìm kiếm"
                  onKeyDown={handleKeyDown}
                />
                <button
                  onClick={() => handleSearch(searchValue)}
                  className="text-black w-[20%] h-10 bg-[#e9ecef] text-lg cursor-pointer rounded-tr-[10px] rounded-br-[10px] border-[unset] outline-none hover:bg-blue-300 hover:text-white"
                >
                  Tìm
                </button>
              </div>
              {isClickSearch && searchResults && (
                <div className="absolute h-auto max-h-[450px] w-full left-0 mt-2 flex flex-wrap border bg-white rounded-md shadow-2xl z-10 overflow-auto">
                  {searchResults.map((itemSearch: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="h-[50px] w-full px-2 border-b text-lg flex items-center place-content-between hover:bg-gray-100"
                        onClick={() =>
                          clickItemSearch(itemSearch.code, itemSearch.type)
                        }
                      >
                        <p>
                          {itemSearch.name} - {itemSearch.unit}
                        </p>
                        <p>{itemSearch.price.toLocaleString("VI-vi")}đ</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="w-[40%] flex items-center">
            {/* tinnhan */}
            <div
              className="h-auto lg:w-[25%] sm:w-[15%] flex gap-2.5 items-center justify-center cursor-pointer"
              onClick={() => handleClickMessage(datainforUser?._id)}
            >
              <Image
                src={message}
                alt="icon"
                className="h-[32px] w-[32px] cursor-pointer icon-white"
              />
              <p className="text-white text-lg">Tin nhắn test</p>
            </div>
            {/* quanlytin */}
            <div
              className="h-auto w-[25%] flex gap-2.5 items-center justify-center cursor-pointer"
              onClick={() => {
                clickQuanly_dangtin(
                  datainforUser ? datainforUser?._id : window.location.href
                );
              }}
            >
              <Image
                src={management_news}
                alt="icon"
                className="h-[32px] w-[32px] cursor-pointer icon-white"
              />
              <p className="text-white text-lg">Quản lý tin</p>
            </div>
            {/* login logout */}
            <div className="h-auto w-[25%] flex items-center justify-center gap-2 cursor-pointer">
              {!datainforUser?.name ? (
                <Image
                  src={user}
                  alt="icon"
                  className="h-[25px] w-[25px] cursor-pointer icon-white"
                  onClick={handleClickUser}
                />
              ) : (
                <></>
              )}
              {!datainforUser?.name ? (
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
              ) : (
                <div className="relative">
                  <button
                    type="button"
                    onClick={handleClickUser}
                    className="flex items-center justify-center h-[45px] w-[150px] md:h-auto md:w-auto md:px-2 md:py-3 bg-mauxanhtroi text-white text-lg transition duration-300 ease-in-out rounded-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-200 focus:ring-blue-800"
                    // className="flex items-center justify-center h-[45px] w-[150px] md:h-auto md:w-auto md:px-2 md:py-3 bg-gradient-to-br from-green-500 to-blue-500 text-white text-lg transition duration-300 ease-in-out bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-200 focus:ring-green-500"
                  >
                    {/* <Image
                      src={user}
                      alt="icon"
                      className="h-[25px] w-[25px] cursor-pointer icon-white mr-2"
                      onClick={handleClickUser}
                    /> */}
                    <div
                      className="h-[50px] w-[50px] mr-1 bg-cover bg-no-repeat bg-center rounded-full"
                      style={{
                        backgroundImage: `url(${datainforUser?.avatar})`,
                      }}
                    ></div>
                    {datainforUser?.name}
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
                      className="absolute h-auto w-[200px] left-[-16px] mt-2 flex flex-wrap bg-white border rounded-md shadow-lg z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { duration: 0.4 } }}
                      exit={{
                        opacity: 0,
                      }}
                    >
                      <div className="h-full w-full flex flex-col">
                        <p className="h-[50px] text-xl flex items-center justify-center cursor-pointer hover:text-blue-500">
                          SĐT: {datainforUser?.account}
                        </p>
                        {datainforUser?.role === "Admin" && (
                          <div
                            className="h-[50px] border-t border-gray-400 flex justify-center items-center text-lg cursor-pointer hover:text-white hover:bg-blue-500"
                            onClick={handleClickManager}
                          >
                            Quản lý website
                          </div>
                        )}
                        <div
                          className="h-[50px] border-t border-gray-400 flex justify-center items-center text-lg cursor-pointer hover:text-white hover:bg-blue-500"
                          onClick={() => {
                            clickInfoDetail(datainforUser?._id);
                          }}
                        >
                          Trang cá nhân
                        </div>
                        <div
                          className="h-[50px] border-t border-gray-400 flex justify-center items-center text-lg cursor-pointer hover:text-white hover:bg-blue-500"
                          onClick={() => {
                            clickQuanly_dangtin(datainforUser?._id);
                          }}
                        >
                          Quản lý tin đăng
                        </div>
                        <div
                          className="h-[50px] border-t border-gray-400 rounded-b-md flex justify-center items-center text-lg text-red-500 cursor-pointer hover:bg-red-500 hover:text-white hover:text-xl"
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
            <div className="h-auto w-[25%] flex justify-center">
              <Link
                className="h-[50px] w-auto bg-blue-400 px-5 py-2 rounded-lg flex items-center hover:bg-blue-500 cursor-pointer"
                href="/dang-tin"
              >
                <Image
                  src={dangtin}
                  alt="icon"
                  className="w-[32px] h-[32px] icon-white mr-2"
                />
                <span className="text-white text-xl">Đăng tin</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
