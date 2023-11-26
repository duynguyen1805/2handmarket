import React from "react";
import Image from "next/image";
import router from "next/router";
// frame motion
import { motion } from "framer-motion";
import icon_star from "../assets/icon/icon_star.png";
import { useMyContext } from "@/contexts/MyContext";

interface Props {
  item: any;
}

const Display_product_horizontal: React.FC<Props> = ({ item }) => {
  const { isLoading, handle_setIsLoading } = useMyContext();

  const clickProduct = async (type: string, id: string) => {
    try {
      handle_setIsLoading(true);
      await router.push({
        pathname: `/products/${id}`,
        query: { type: type },
      });
      handle_setIsLoading(false);
    } catch (error) {
      console.error("Error navigating:", error);
      handle_setIsLoading(false);
    }
  };
  //handle thời gian đã đăng
  function tinhthoigiandadang(time: Date): string {
    const timehientai: Date = new Date();
    const ngaytao: Date = new Date(time);
    const thoigiandadang: number = timehientai.getTime() - ngaytao.getTime();

    if (thoigiandadang < 60000) {
      // Dưới 1 phút
      return `${Math.floor(thoigiandadang / 1000)} giây trước`;
    } else if (thoigiandadang < 3600000) {
      // 1 giờ = 3600000 milli giây
      const minutes: number = Math.floor(thoigiandadang / 60000); // 1 phút = 60000 milli giây
      return `${minutes} phút trước`;
    } else if (thoigiandadang < 86400000) {
      // 1 ngày = 86400000 milli giây
      const hours: number = Math.floor(thoigiandadang / 3600000); // 1 giờ = 3600000 milli giây
      return `${hours} giờ trước`;
    } else if (thoigiandadang < 604800000) {
      // 1 tuần = 604800000 milli giây
      const days: number = Math.floor(thoigiandadang / 86400000); // 1 ngày = 86400000 milli giây
      return `${days} ngày trước`;
    } else {
      const weeks: number = Math.floor(thoigiandadang / 604800000); // 1 tuần = 604800000 milli giây
      return `${weeks} tuần trước`;
    }
  }
  const thoigiandadang: string = tinhthoigiandadang(item.ngayduyettin);

  // chỉ cho giao diện mobile
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: { duration: 0.3, delay: 0.1 },
      }}
      exit={{ opacity: 0, y: -50, transition: { duration: 0.3 } }}
      whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
      className="mb-1 h-[100px] w-full p-1 flex border border-gray-300 cursor-pointer hover:border-mauxanhtroi hover:shadow-lg"
      onClick={() => clickProduct(item.type, item._id)}
    >
      <div className="h-full w-[150px] max-w-[100px] flex justify-center">
        <div
          className="h-full w-full bg-center bg-contain bg-no-repeat"
          style={{ backgroundImage: `url(${item.img[0]})` }}
        ></div>
      </div>
      <div className="h-full w-[calc(100% - 150px)] px-1">
        <div className="h-[50%] w-full">
          <div className="h-auto w-full text-base font-bold overflow-hidden flex items-center place-content-between">
            <p className="overflow-hidden h-[25px]">{item.tieude}</p>
            {/* {item.trangthaithanhtoan == 1 && (
              <div className="flex items-center space-x-1">
                <Image src={icon_star} alt="" className="h-[25px] w-[25px]" />
                <p className="text-animation font-mono">Tin ưu tiên</p>
              </div>
            )} */}
          </div>
          <p className="h-auto w-full text-sm font-bold text-red-500">
            {item.price.toLocaleString("vi-VN")} đ
          </p>
        </div>
        <div className="h-[50%] w-full flex items-end text-sm">
          <div>
            <p className="h-auto w-full">{item.infor_user.name}</p>
            <p className="h-auto w-full font-thin">{thoigiandadang}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Display_product_horizontal;
