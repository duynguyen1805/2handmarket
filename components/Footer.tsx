import React, { useState } from "react";
import gmail from "../assets/icon/gmail.png";
import facebook from "../assets/icon/facebook.png";
import phone from "../assets/icon/telephone.png";
import Image from "next/image";
import { motion } from "framer-motion";

const Footer = () => {
  const [open_gmail, setOpen_gmail] = useState(false);

  return (
    <div className=" h-auto sm:w-[100%] bg-gray-100 sm:pb-[60px] md:pb-0">
      <div className="h-auto w-full flex items-center justify-center">
        <div className="h-auto w-[990px] bg-gray-100 flex justify-center text-lg p-1">
          <p className="h-[40px] w-auto flex items-center text-center">
            Liên hệ hỗ trợ - đóng góp:
          </p>
          <div className="ml-4 h-[40px] w-auto flex items-center">
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
          <div className="relative ml-4 h-[40px] w-auto flex items-center">
            <Image
              src={gmail}
              alt="Mail cá nhân"
              className="h-[35px] w-[35px] mr-1"
              onClick={() => setOpen_gmail(!open_gmail)}
            />
            {open_gmail && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 0.5, x: 0, transition: { duration: 0.3 } }}
                whileHover={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                }}
                className="absolute lg:top-0 lg:right-[-260px] sm:top-[-35px] sm:right-0 bg-black text-white px-2 py-1 rounded-md"
              >
                duynguyenqwert@gmail.com
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
