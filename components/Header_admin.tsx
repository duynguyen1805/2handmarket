import React, { useEffect, useState } from "react";
import Image from "next/image";
import router, { useRouter } from "next/router";
import telephone from "../assets/icon/telephone.png";
import location from "../assets/icon/location.png";
import user from "../assets/icon/user.png";
import shopping_cart from "../assets/icon/shopping-cart.png";
import Cart from "./Cart";
import { redirect } from "next/dist/server/api-utils";
import Sidebar from "@/components/Sidebar";
import CustomScrollbar from "./modal/CustomScrollbars";
import { useMyContext } from "@/contexts/MyContext";
import { API_searchProduct } from "@/service/userService";

interface nav_admin {
  id: any;
  name: any;
  link: any;
}

interface ModalProps {
  nav_admin_mobile: any;
  Open: (value: number) => void;
}

type DataInfor = {
  _id: string;
  name: string;
  account: string;
  address: string;
  role: string;
};

const Header_admin: React.FC<ModalProps> = ({ nav_admin_mobile, Open }) => {
  //lấy số lượng order qua usecontext
  const { information_User, setInfoUser } = useMyContext();

  useEffect(() => {
    //lấy thông tin người dùng
    const storedItems = localStorage.getItem("inforUser");
    if (storedItems) {
      setdatainforUser(JSON.parse(storedItems));
    }
  }, []);
  const [datainforUser, setdatainforUser] = useState<DataInfor>();
  const [isOpen, setIsCartVisible] = useState(false);
  const [isOpenOption, setOpenOptionUser] = useState(false);
  const [name, setName] = useState<any>("");
  const [sdt, setSDT] = useState<any>("");
  const [role, setRole] = useState<any>("");
  const [nameOpen, setNameOpen] = useState<any>("");

  const handleToggleCart = () => {
    setIsCartVisible(!isOpen);
  };

  const clickLogin = () => {
    router.push("/account/login");
  };
  const clickRegister = () => {
    router.push("/account/register");
  };
  const returnHome = () => {
    router.push("/");
  };

  const handleClickUser = () => {
    setOpenOptionUser(!isOpenOption);
  };

  const Logout = () => {
    localStorage.clear();
    router.push("/");
    // window.location.reload();
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function toggleSidebar(link: any) {
    Open(link.id);
    setNameOpen(link.name);
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

  const clickItemSearch = (codeSP: string, typeSP: string) => {
    router.push({
      pathname: `/products/${codeSP}`,
      query: { type: typeSP },
    });
    window.location.assign(`/products/${codeSP}?type=${typeSP}`);
  };

  return (
    <>
      {/* display mobile - admin */}
      <div className="md:hidden h-auto w-[100%] bg-[white] px-2">
        <div className="w-[100%] h-auto space-y-1">
          <div
            className="h-[80px] w-[100%] scale-100 bg-no-repeat bg-contain bg-fixed bg-center"
            style={{ backgroundImage: `url(https://i.imgur.com/1t9wTeR.png)` }}
            onClick={returnHome}
          ></div>
          <div className="w-[100%] flex items-center mt-1">
            <div className="relative flex flex-row w-[100%] rounded-[10px] bg-[#e2e2e2]">
              <input
                className="h-10 w-[100%] text-[black] text-base pl-2.5 border-[none] outline-none bg-transparent"
                type="text"
                onChange={handleChange}
                placeholder="Tìm kiếm"
              />
              <button
                onClick={() => handleSearch(searchValue)}
                className="text-black w-[20%] h-10 bg-[#e9ecef] text-lg cursor-pointer rounded-tr-[10px] rounded-br-[10px] border-[unset] outline-none hover:opacity-70"
              >
                Tìm
              </button>
              {isClickSearch && searchResults && (
                <div className="absolute h-auto max-h-[450px] w-full left-0 mt-11 flex flex-wrap border bg-white rounded-md shadow-2xl z-10 overflow-auto">
                  {searchResults.map((itemSearch: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="min-h-[50px] w-full px-2 border-b text-lg flex items-center place-content-between hover:bg-gray-100"
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
          <div className="w-[100%] flex items-center place-content-between">
            <div className="relative h-auto w-auto">
              <button
                type="button"
                onClick={toggleSidebar}
                className="flex items-center justify-center w-[150px] my-2 p-2 bg-black text-white text-lg rounded-md"
              >
                Menu Admin
                <svg
                  className={`w-4 h-4 ml-2 transition-transform duration-200 transform ${
                    isSidebarOpen ? "rotate-180" : ""
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
              {isSidebarOpen && (
                <div className="absolute h-auto w-[65vw] left-0 pt-2 bg-white border rounded-md shadow-lg z-10">
                  <center className="h-auto w-[100%] mt-2 space-y-2 border-green-500 border-b-2">
                    <Image
                      src={user}
                      alt="icon"
                      className="h-[50px] w-[50px] cursor-pointer"
                      onClick={handleClickUser}
                    />
                    {!datainforUser?.name ? (
                      <div className="h-auto w-[100%] ml-1">
                        <div
                          className=" hover:text-green-500 cursor-pointer"
                          onClick={clickLogin}
                        >
                          Đăng nhập
                        </div>
                        <div
                          className=" hover:text-green-500 cursor-pointer"
                          onClick={clickRegister}
                        >
                          Đăng ký
                        </div>
                      </div>
                    ) : (
                      <div
                        className="h-auto w-[100%] cursor-pointer"
                        onClick={handleClickUser}
                      >
                        <p className="text-2xl font-medium">
                          {datainforUser?.name}
                        </p>
                        <p className="text-lg font-thin">
                          {datainforUser?.account}
                        </p>
                      </div>
                    )}
                  </center>
                  {nav_admin_mobile.map((link: any) => (
                    <div
                      key={link.id}
                      className={
                        isOpen !== link.id
                          ? "h-[40px] w-auto flex gap-2.5 items-center mx-1 px-2 my-1 rounded-lg hover:bg-gray-200 cursor-pointer"
                          : "h-[40px] w-auto flex gap-2.5 items-center mx-1 px-2 my-1 rounded-lg hover:bg-gray-200 cursor-pointer active"
                      }
                      onClick={() => toggleSidebar(link)}
                    >
                      {link.name}
                    </div>
                  ))}
                  <div
                    className="h-[40px] w-full flex items-center justify-center bg-red-500 text-white rounded-b-lg cursor-pointer hover:bg-opacity-80"
                    onClick={Logout}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>

            <div className="h-[100%] w-auto text-xl font-bold text-center">
              {nameOpen}
            </div>
            {/* div giỏ hàng */}
            {datainforUser?.role === "Client" ? (
              <div className="h-auto lg:w-[18%] md:w-[15%] min-w-[10%] md:ml-2 sm:mr-5">
                <button
                  className="sm:w-[120px] sm:h-[50px] md:w-[60px] md:h-[60px] lg:w-[100%] border border-lime-600 sm:px-0 sm:py-0 px-5 py-2  rounded-lg flex flex-row items-center justify-center space-x-3 hover:text-white hover:bg-green-500"
                  onClick={handleToggleCart}
                >
                  <Image
                    src={shopping_cart}
                    alt="icon"
                    className="w-[15px] h-[15px] sm:w-[30px] sm:h-[30px]"
                  />{" "}
                  <span className="sm:hidden lg:block">Giỏ hàng</span>
                </button>
                {isOpen && <Cart onClose={() => setIsCartVisible(false)} />}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header_admin;
