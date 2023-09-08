import { useEffect, useState } from "react";
import Image from "next/image";
import telephone from "../assets/icon/telephone.png";
import location from "../assets/icon/location.png";
import user from "../assets/icon/user.png";

interface infor {
  name: string;
  sdt: string;
}

interface props {
  isOpen: boolean;
  toggleSidebar: () => void;
  info: infor;
}

const Sidebar: React.FC<props> = ({ isOpen, toggleSidebar, info }) => {
  const [name, setNameUser] = useState("");
  const [phonenumber, setPhoneUser] = useState("");

  useEffect(() => {
    setNameUser(info.name);
    setPhoneUser(info.sdt);
    console.log("check: ", info);
  }, []);

  return (
    <div className="block">
      <div
        className={`${
          isOpen ? "translate-x-0" : "translate-x-[-100%]"
        } transition-transform duration-300 ease-in-out fixed inset-y-0 left-0 w-[60%] p-1 mt-[190px] bg-gray-200 rounded-r-lg overflow-y-auto transform`}
      >
        <center className="h-auto w-[100%] space-y-2 cursor-pointer">
          <Image
            src={user}
            alt="icon"
            className="h-[30px] w-[30px] cursor-pointer"
            // onClick={handleClickUser}
          />
          {!name ? (
            <div className="h-auto w-[15%] ml-1">
              <div
                className=" hover:text-green-500 cursor-pointer"
                // onClick={clickLogin}
              >
                Đăng nhập
              </div>
              <div
                className=" hover:text-green-500 cursor-pointer"
                // onClick={clickRegister}
              >
                Đăng ký
              </div>
            </div>
          ) : (
            <div
              className="h-auto w-[100%] cursor-pointer"
              // onClick={handleClickUser}
            >
              <p className="text-xl font-medium">{name}</p>
              <p className="text-sm font-thin">{phonenumber}</p>
            </div>
          )}
        </center>
        <div className="h-[60px] w-[100%] flex gap-2.5 items-center justify-center ">
          <Image
            src={telephone}
            alt="icon"
            className="h-[25px] w-[25px] cursor-pointer"
          />
          <div className=" hover:text-green-500 cursor-pointer">
            Gọi mua hàng
          </div>
        </div>
        <div className="h-[60px] w-[100%] flex gap-2.5 items-center justify-center ">
          <Image
            src={location}
            alt="icon"
            className="h-[25px] w-[25px] cursor-pointer"
          />
          <div className=" hover:text-green-500 cursor-pointer">
            Hệ thống Shop
          </div>
        </div>
        <div className="h-[50px] w-full flex items-center justify-center bg-red-500 text-white ">
          Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
