import React, { useState } from "react";
import Image from "next/image";
import router from "next/router";
// frame motion
import { motion } from "framer-motion";
import icon_star from "../assets/icon/icon_star.png";

interface Props {
  item: any;
  active_tab_filter?: number;
}

const Display_product_vertical: React.FC<Props> = ({
  item,
  active_tab_filter,
}) => {
  const clickProduct = (type: string, id: string) => {
    router.push({
      pathname: `/products/${id}`,
      query: { type: type },
    });
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, delay: 0.1 },
      }}
      exit={{ opacity: 0, y: -50, transition: { duration: 0.3 } }}
      whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
      className={`relative sm:h-[330px] w-[228px] px-2 pt-1 border cursor-pointer hover:border-mauxanhtroi hover:shadow-lg ${
        item.trangthaithanhtoan == 1 ? "border-mauxanhtroi" : "border-gray-300"
      }`}
      onClick={() => clickProduct(item.type, item._id)}
    >
      <div className="h-[210px] w-full flex justify-center">
        <div
          className="h-full w-full bg-center bg-contain bg-no-repeat"
          style={{ backgroundImage: `url(${item.img[0]})` }}
        ></div>
        <div
          className={
            item.trangthaithanhtoan == 1 && active_tab_filter == 0
              ? `h-[50px] w-full bg-mauxanhtroi text-white text-xl flex items-center justify-center absolute top-0`
              : ""
          }
        >
          {item.trangthaithanhtoan == 1 && active_tab_filter == 0 && (
            <div className="flex items-center space-x-2">
              <Image src={icon_star} alt="" className="h-[20px] w-[20px]" />
              <p className="text-gradient font-bold">Tin nổi bật</p>
            </div>
          )}
        </div>
      </div>
      <p className="h-[60px] w-full sm:text-lg md:text-xl overflow-hidden">
        {item.tieude}
      </p>
      <p className="h-[25px] w-full sm:text-base md:text-lg font-bold text-red-500">
        {item.price.toLocaleString("vi-VN")} đ
      </p>
      <p className="h-[25px] w-full sm:text-base md:text-lg font-thin">
        {thoigiandadang}
      </p>
    </motion.div>
  );
};

export default Display_product_vertical;
