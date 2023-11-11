import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import router from "next/router";
import icon_hoctap from "../assets/icon/ic_giaitri_thethao/icon_sach.svg";
import icon_dodientu from "../assets/icon/icon_dodientu.png";
import icon_dodungcanhan from "../assets/icon/icon_dodungcanhan.png";
import icon_donoithat from "../assets/icon/icon_donoithat.png";
import icon_giaitri from "../assets/icon/icon_giaitri.png";
import icon_thucung from "../assets/icon/icon_thucung.png";
import icon_tulanh from "../assets/icon/icon_tulanh.png";
import icon_xeco from "../assets/icon/icon_xeco.png";

import item_danhmuc, {
  danhmuc,
  sub_danhmuc,
} from "../components/obj_data_raw/Danhmuc_raw";
import { useMyContext } from "@/contexts/MyContext";
import Link from "next/link";

const danhmuc: danhmuc[] = item_danhmuc;

const NavbarDropdown: React.FC = () => {
  const { isLoading, handle_setIsLoading } = useMyContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handle_push_menu = async (link: string) => {
    try {
      handle_setIsLoading(true);
      await router.push(`${link}`);
      handle_setIsLoading(false);
    } catch (error) {
      console.error("Error navigating:", error);
      handle_setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex items-center justify-center sm:h-[45px] sm:w-[150px]  md:h-auto md:w-auto md:px-4 md:py-2 bg-gradient-to-br from-blue-300 to-blue-800 text-white text-2xl transition duration-300 ease-in-out bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-200 focus:ring-blue-500"
      >
        Danh mục
        <svg
          className={`w-4 h-4 ml-2 transition-transform duration-200 transform ${
            isOpen ? "rotate-180" : ""
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
      {isOpen && (
        <motion.div
          className="absolute sm:h-[600px] sm:w-[250px] md:h-[710px] lg:h-[710px] md:w-[700px] lg:w-[910px] left-0 mt-2 py-2 px-2 flex flex-wrap bg-white border border-gray-400 rounded-md shadow-2xl z-10 sm:overflow-auto lg:overflow-hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
          exit={{
            opacity: 0,
          }}
        >
          {danhmuc &&
            danhmuc.map((item_main: danhmuc) => {
              return (
                <div
                  key={item_main.key}
                  className="md:min-h-[300px] lg:h-[400px] w-[220px] flex flex-col"
                >
                  <Link
                    href={item_main.link}
                    onClick={() => handle_push_menu(item_main.link)}
                    className="text-2xl text-mauxanhtroi mb-1 cursor-pointer hover:text-blue-500"
                  >
                    <Image
                      src={
                        item_main.key === 0
                          ? icon_hoctap
                          : "" || item_main.key === 1
                          ? icon_xeco
                          : "" || item_main.key === 2
                          ? icon_dodientu
                          : "" || item_main.key === 3
                          ? icon_donoithat
                          : "" || item_main.key === 4
                          ? icon_tulanh
                          : "" || item_main.key === 5
                          ? icon_dodungcanhan
                          : "" || item_main.key === 6
                          ? icon_giaitri
                          : "" || item_main.key === 7
                          ? icon_thucung
                          : ""
                      }
                      alt="icon"
                      className="w-[32px] h-[32px]"
                    />
                    {item_main.label}
                  </Link>
                  {item_main.sub_danhmuc &&
                    item_main.sub_danhmuc.map((item_sub: sub_danhmuc) => {
                      return (
                        <Link
                          key={item_sub.key}
                          href={item_sub.link}
                          onClick={() => handle_push_menu(item_sub.link)}
                          className="text-xl py-[5px] cursor-pointer hover:border-b-2 hover:border-mauxanhtroi"
                        >
                          {item_sub.label}
                        </Link>
                      );
                    })}
                </div>
              );
            })}
        </motion.div>
      )}
    </div>
  );
};

export default NavbarDropdown;
