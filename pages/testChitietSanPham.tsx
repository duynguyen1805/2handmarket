import Danhmuc from "@/components/Danhmuc";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import router from "next/router";
//import css file Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Display_product_horizontal from "@/components/Display_product_horizontal";
import img_demo from "../public/sp_demo_1.jpg";
import icon_tinhtrang from "../assets/icon/ic_thongsokythuat/icon_tinhtrang.png";
import icon_cpu from "../assets/icon/ic_thongsokythuat/icon_cpu.png";
import icon_dongmay from "../assets/icon/ic_thongsokythuat/icon_dongmay.png";
import icon_hang from "../assets/icon/ic_thongsokythuat/icon_hang.png";
import icon_mausac from "../assets/icon/ic_thongsokythuat/icon_mausac.png";
import icon_ram from "../assets/icon/ic_thongsokythuat/icon_ram.png";
import icon_rom from "../assets/icon/ic_thongsokythuat/icon_rom.png";
import icon_screensize from "../assets/icon/ic_thongsokythuat/icon_screensize.png";
import icon_vga from "../assets/icon/ic_thongsokythuat/icon_vga.png";
import icon_diachi from "../assets/icon/location.png";

const dien_thoai = () => {
  const [active_tab_filter, setActiveTab] = useState<number>(0);

  return (
    <div className="bg-gray-100">
      <Head>
        <title>2Hand Market - Chi tiết sản phẩm</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon_2handmarket.png" />
      </Head>
      <Header />
      {/* Điều hướng */}
      <div className="h-[50px] w-full flex items-center justify-center mt-2">
        <div className="h-full w-[1000px] bg-white text-lg flex items-center p-1 rounded-lg shadow-md">
          <Danhmuc />
          <p className="h-full w-auto flex items-center ml-3">
            Trang chủ / Sản phẩm
          </p>
        </div>
      </div>
      <div className="h-auto w-full flex items-center justify-center mt-3">
        <div className="bg-white shadow-sm h-[800px] w-[1000px] p-2 flex">
          <div className="h-full w-[55%]">
            <div className="h-[540px] w-full">
              <Image
                src={img_demo}
                alt="demo"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="h-[80px] w-full p-1 flex items-center border border-gray-400 rounded-md mt-2">
              <div className="h-[70px] w-[70px] bg-gray-100 rounded-full flex items-center justify-center">
                Avatar
              </div>
              <div className="h-full w-[500px] flex items-center place-content-between">
                <div className="w-[200px] space-y-2 px-5">
                  <p className="font-bold">Trần Duy Nguyễn</p>
                  <p>Online 5 phút trước</p>
                </div>
                <div className="w-[100px] text-center text-mauxanhtroi py-2 border border-mauxanhtroi rounded-lg hover:bg-mauxanhtroi hover:text-white cursor-pointer">
                  Xem trang
                </div>
              </div>
            </div>
            <div className="h-auto w-full px-2 space-y-2 mb-2">
              <p className="text-lg">Khu vực</p>
              <div className="text-lg font-thin flex items-center space-x-2">
                <Image
                  src={icon_diachi}
                  alt="diachi"
                  className="h-[30px] w-[30px] object-contain"
                />
                <p>194, Trường Tây A, Trường Thành, Thới Lai, TP.Cần Thơ</p>
              </div>
            </div>
            <div className="h-auto w-full p-2 flex item-center">
              <div className="h-full w-[60%] border border-mauxanhtroi bg-mauxanhtroi text-white text-lg text-center p-3 rounded-l-lg hover:opacity-80 cursor-pointer">
                Bấm để hiện số điện thoại
              </div>
              <div className="h-full w-[40%] border border-mauxanhtroi text-lg text-center p-3 rounded-r-lg hover:bg-gray-50 cursor-pointer">
                Chat với người bán
              </div>
            </div>
          </div>
          <div className="h-full w-[45%] px-2 overflow-auto">
            <p className="h-auto max-h-[60px] w-full text-lg font-bold">
              Bộ PC Core i5 Ram 8G, VGA 2G, SSD 128G, màn 22 new
            </p>
            <div className="h-[60px] w-full flex items-center place-content-between">
              <p className="h-full w-auto text-lg flex items-center font-bold text-red-500">
                12.000.000 đ
              </p>
              <div className="h-auto w-auto px-5 py-1 flex items-center justify-center border border-red-500 rounded-lg cursor-pointer hover:bg-red-500 hover:text-white">
                {" "}
                Lưu tin
              </div>
            </div>
            {/* mô tả sản phẩm */}
            <div className="h-auto max-h-[510px] w-full overflow-hidden">
              <p className="h-auto w-auto flex items-center">
                Trọn bộ PC Led Trắng - Main H61 new - Chíp Core i5-3470 tốc độ
                xử lý tối đa 3.6Ghz x 4cpus 2nd - Ram DDR3 8GB 2nd (2 thanh 4G
                có thể nâng thêm) - Card rời AMD R7 250 2GB D5 2nd - SSD 128GB
                new - Case Led VSP mặt hông cường lực new + 1 fan led new - Tản
                nhiệt CPU led 2 ống đồng new - Nguồn ColorMaster 350w CST 2nd -
                Màn hình VSP 22" trắng Full viền Full HD new 🎁🎁🎁Tặng kèm
                Chuột Phím led trắng new + lót chuột new + bộ mô hình trang trí
                như ảnh ✨✨✨Main bh 1 năm, Màn hình bh 2 năm, SSD bh 3 năm,
                còn lại bh 1 tháng 👉👉👉Máy sài văn phòng mượt mà, làm đồ họa
                Photoshop, Corel, Skepchup, Autocad, AI đều Ok. 👍👍👍Chơi mượt
                các game: Liên minh, Fifa, Liên Quân, PUBG Mobile, Đột Kích,
                Valorant, Võ Lâm,... 💳💳💳Góp 0% qua thẻ tín dụng 💳💳💳 Trọn
                bộ PC Led Trắng - Main H61 new - Chíp Core i5-3470 tốc độ xử lý
                tối đa 3.6Ghz x 4cpus 2nd - Ram DDR3 8GB 2nd (2 thanh 4G có thể
                nâng thêm) - Card rời AMD R7 250 2GB D5 2nd - SSD 128GB new
              </p>
            </div>
            {/* thông số kỹ thuật */}
            <div className="w-full font-bold mt-2">Thông số kỹ thuật</div>
            <div className="h-auto max-h-[250px] w-full flex flex-wrap">
              <div className="h-[50px] w-[50%] flex items-center space-x-2">
                <Image
                  src={icon_tinhtrang}
                  alt="tinhtrang"
                  className="h-[30px] w-[30px] object-contain"
                />
                <p>Trình trạng: Đã sử dụng</p>
              </div>
              <div className="h-[50px] w-[50%] flex items-center space-x-2">
                <Image
                  src={icon_hang}
                  alt="tinhtrang"
                  className="h-[30px] w-[30px] object-contain"
                />
                <p>Hãng: MSI</p>
              </div>
              <div className="h-[50px] w-[50%] flex items-center space-x-2">
                <Image
                  src={icon_dongmay}
                  alt="tinhtrang"
                  className="h-[30px] w-[30px] object-contain"
                />
                <p>Dòng máy: MSI modern 14</p>
              </div>
              <div className="h-[50px] w-[50%] flex items-center space-x-2">
                <Image
                  src={icon_mausac}
                  alt="tinhtrang"
                  className="h-[30px] w-[30px] object-contain"
                />
                <p>Màu sắc: Xanh đen</p>
              </div>
              <div className="h-[50px] w-[50%] flex items-center space-x-2">
                <Image
                  src={icon_ram}
                  alt="tinhtrang"
                  className="h-[30px] w-[30px] object-contain"
                />
                <p>Ram: 16GB</p>
              </div>
              <div className="h-[50px] w-[50%] flex items-center space-x-2">
                <Image
                  src={icon_rom}
                  alt="tinhtrang"
                  className="h-[30px] w-[30px] object-contain"
                />
                <p>Bộ nhớ: 512GB</p>
              </div>
              <div className="h-[50px] w-[50%] flex items-center space-x-2">
                <Image
                  src={icon_cpu}
                  alt="tinhtrang"
                  className="h-[30px] w-[30px] object-contain"
                />
                <p>Vi xử lý: i5 11210</p>
              </div>
              <div className="h-[50px] w-[50%] flex items-center space-x-2">
                <Image
                  src={icon_screensize}
                  alt="tinhtrang"
                  className="h-[30px] w-[30px] object-contain"
                />
                <p>Kích thước màn hình: 14in</p>
              </div>
              <div className="h-[50px] w-[50%] flex items-center space-x-2">
                <Image
                  src={icon_vga}
                  alt="tinhtrang"
                  className="h-[30px] w-[30px] object-contain"
                />
                <p>Card màn hình: NVIDIA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default dien_thoai;
