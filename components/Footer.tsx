import React from "react";
import gmail from "../assets/icon/gmail.png";
import facebook from "../assets/icon/facebook.png";
import phone from "../assets/icon/telephone.png";
import Image from "next/image";

const Footer = () => {
  return (
    <div className=" h-auto sm:w-[100%] bg-gray-100">
      <div className="h-auto w-full flex items-center justify-center">
        <div className="h-auto w-[990px] bg-gray-100 flex justify-center text-lg p-1">
          <p className="h-[50px] w-auto flex items-center">
            Liên hệ hỗ trợ - đóng góp ý kiến:
          </p>
          <div className="ml-4 h-[50px] w-auto flex items-center">
            <a
              href="https://www.facebook.com/tdn.sb"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={facebook}
                alt="Trang cá nhân"
                className="h-[32px] w-[32px]"
              />
            </a>
          </div>
          <div className="ml-4 h-[50px] w-auto flex items-center">
            <Image
              src={gmail}
              alt="Mail cá nhân"
              className="h-[35px] w-[35px] mr-1"
            />
            <p>duynguyenqwert@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
