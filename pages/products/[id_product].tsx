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
import icon_tinhtrang from "../../assets/icon/ic_thongsokythuat/icon_tinhtrang.png";
import icon_cpu from "../../assets/icon/ic_thongsokythuat/icon_cpu.png";
import icon_dongmay from "../../assets/icon/ic_thongsokythuat/icon_dongmay.png";
import icon_hang from "../../assets/icon/ic_thongsokythuat/icon_hang.png";
import icon_mausac from "../../assets/icon/ic_thongsokythuat/icon_mausac.png";
import icon_ram from "../../assets/icon/ic_thongsokythuat/icon_ram.png";
import icon_rom from "../../assets/icon/ic_thongsokythuat/icon_rom.png";
import icon_screensize from "../../assets/icon/ic_thongsokythuat/icon_screensize.png";
import icon_vga from "../../assets/icon/ic_thongsokythuat/icon_vga.png";
import icon_diachi from "../../assets/icon/location.png";
import icon_loaithietbi from "../../assets/icon/ic_thongsokythuat/icon_loaithietbi.png";

import icon_hopso from "../../assets/icon/ic_thongsokythuat/icon_hopso.png";
import icon_dungtich from "../../assets/icon/ic_thongsokythuat/icon_dungtich.png";
import icon_sokm from "../../assets/icon/ic_thongsokythuat/icon_sokm.png";
import icon_ngaysanxuat from "../../assets/icon/ic_thongsokythuat/icon_ngaysanxuat.png";
import icon_nhieulieu from "../../assets/icon/ic_thongsokythuat/icon_nhieulieu.png";
import icon_sochongoi from "../../assets/icon/ic_thongsokythuat/icon_sochongoi.png";
import icon_taitrong from "../../assets/icon/ic_thongsokythuat/icon_taitrong.png";
import icon_loaixedien from "../../assets/icon/ic_thongsokythuat/icon_loaixedien.png";
import icon_phutung from "../../assets/icon/ic_xeco/icon_phutung.svg";
import icon_dongcoxedien from "../../assets/icon/ic_thongsokythuat/icon_dongcoxedien.png";

import icon_thetich from "../../assets/icon/ic_thongsokythuat/icon_thetich.png";
import icon_congsuat from "../../assets/icon/ic_thongsokythuat/icon_thetich.png";
import icon_cuagiat from "../../assets/icon/ic_thongsokythuat/icon_loaithietbi.png";
import icon_khoiluonggiat from "../../assets/icon/ic_thongsokythuat/icon_khoiluonggiat.png";

import icon_chogioitinh from "../../assets/icon/ic_thongsokythuat/icon_loaidocanhan.png";
import icon_loainhaccu from "../../assets/icon/ic_thongsokythuat/icon_loaithietbi.png";

import { GetServerSideProps } from "next";
import { API_getTindangbyId } from "@/service/userService";
import jwt from "jsonwebtoken";
import { sign, verify, Secret } from "jsonwebtoken";
import Cookies from "js-cookie";

interface CodeProductProps {
  id_product: string;
  type: string | null; //type: dienthoai, laptop,...
}

const Chi_tiet_san_pham = ({ type, id_product }: CodeProductProps) => {
  const [item, setItem] = useState<any>({});
  const [img_arr, setImg_arr] = useState<any>([]);
  const [infoClient, setInfoClient] = useState<any>({});
  const [openNumber, setopenNumber] = useState(false);

  const settings_slider = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    delay: 300,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 530,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  useEffect(() => {
    fetchDataProduct();
  }, []);
  const fetchDataProduct = async () => {
    try {
      const response = await API_getTindangbyId(type, id_product);
      console.log("check response: ", response);
      setItem(response.dataItem[0]);
      setInfoClient(response.userInfo[0]);
      //để map img
      setImg_arr(response.dataItem[0].img); //format: data:image/png;base64, abcdef
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [datainforUser_current, setdatainforUser_current] = useState<any>();
  useEffect(() => {
    //lấy thông tin người dùng Đăng nhập
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
        setdatainforUser_current(decoded);
      } catch (error) {
        console.log("Lỗi decoded token: ", error);
        setdatainforUser_current(null);
      }
    }
  }, []);

  const handleClickMessage = () => {
    const query: any = {
      current_user_name: datainforUser_current?.name,
      id_receiver: infoClient._id,
      name_receiver: infoClient.name,
    };
    router.push({
      pathname: `/account/tin-nhan/${datainforUser_current?._id}`,
      query,
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>2Hand Market - Chi tiết sản phẩm</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon_2handmarket.png" />
      </Head>
      <div className="absolute h-auto w-full top-0 left-0">
        <Header />
      </div>
      <div className="h-auto min-h-screen w-[100%] pt-[80px] bg-gray-100 flex flex-col place-content-between">
        <div>
          {/* Điều hướng */}
          <div className="h-[60px] w-full flex items-center justify-center mt-2">
            <div className="h-full w-[1440px] bg-white text-xl flex items-center p-1 rounded-lg shadow-md">
              <Danhmuc />
              <p className="h-full w-auto flex items-center ml-3">
                Trang chủ / Sản phẩm
              </p>
            </div>
          </div>
          <div className="h-auto w-full flex items-center justify-center mt-3">
            <div className="bg-white shadow-sm h-auto w-[1440px] flex">
              <div className="h-full w-[55%] p-2 sticky top-0">
                <div className="h-[540px] w-full">
                  <Slider {...settings_slider}>
                    {img_arr &&
                      img_arr.map((item: any, index: number) => {
                        return (
                          <div
                            key={index}
                            className="h-[500px] w-[500px] flex justify-center"
                          >
                            <div
                              className="h-full w-full bg-center bg-contain bg-no-repeat"
                              style={{ backgroundImage: `url(${item})` }}
                            ></div>
                          </div>
                        );
                      })}
                  </Slider>
                </div>
                <div className="h-[90px] w-full p-1 flex items-center border border-gray-400 rounded-md mt-2">
                  <div className="h-[70px] w-[70px] flex items-center justify-center">
                    <div
                      className="h-full w-full rounded-full bg-center bg-cover bg-no-repeat"
                      style={{ backgroundImage: `url(${infoClient?.img})` }}
                    ></div>
                  </div>
                  <div className="h-full w-[680px] flex items-center place-content-between">
                    <div className="w-[200px] text-lg space-y-2 px-5">
                      <p className="font-bold">{infoClient?.name}</p>
                      <p>Online 5 phút trước</p>
                    </div>
                    <div
                      className="w-auto text-center text-mauxanhtroi text-lg py-2 px-3 border border-mauxanhtroi rounded-lg hover:bg-mauxanhtroi hover:text-white cursor-pointer"
                      onClick={() =>
                        router.push(`/account/trang-ca-nhan/${infoClient?._id}`)
                      }
                    >
                      Xem trang
                    </div>
                  </div>
                </div>
                <div className="h-auto w-full p-2">
                  <div className="text-xl font-thin flex items-center space-x-2">
                    <Image
                      src={icon_diachi}
                      alt="diachi"
                      className="h-[30px] w-[30px] object-contain"
                    />
                    <p>{infoClient?.address}</p>
                  </div>
                </div>
                <div className="h-auto w-full px-1 py-2 flex item-center">
                  <div
                    onClick={() => setopenNumber(!openNumber)}
                    className="h-full w-[60%] border border-mauxanhtroi bg-mauxanhtroi text-white text-xl text-center p-3 rounded-l-lg hover:opacity-80 cursor-pointer"
                  >
                    {openNumber
                      ? `${
                          infoClient.account
                            ? infoClient.account
                            : "Không có thông tin số điện thoại"
                        }`
                      : "Bấm để hiện số điện thoại"}
                  </div>
                  <div
                    className="h-full w-[40%] border border-mauxanhtroi text-xl text-center p-3 rounded-r-lg hover:bg-gray-50 cursor-pointer"
                    onClick={handleClickMessage}
                  >
                    Chat với người bán
                  </div>
                </div>
              </div>
              <div className="h-full w-[45%] px-2 py-2">
                <p className="h-auto max-h-[60px] w-full overflow-hidden text-2xl font-bold">
                  {item.tieude}
                </p>
                <div className="h-[60px] w-full flex items-center place-content-between">
                  <p className="h-full w-auto text-xl flex items-center font-bold text-red-500">
                    {item.price?.toLocaleString("vi-VN")} đ
                  </p>
                  {/* <div className="h-auto w-auto px-5 py-1 text-xl flex items-center justify-center border border-red-500 rounded-lg cursor-pointer hover:bg-red-500 hover:text-white">
                    {" "}
                    Lưu tin
                  </div> */}
                </div>
                {/* mô tả sản phẩm */}
                <p className="w-full text-lg font-bold mb-2">Mô tả chi tiết</p>
                <div className="h-auto w-full overflow-hidden">
                  <pre className="h-auto w-full text-lg break-words whitespace-pre-wrap font-mono">
                    {item.mota}
                  </pre>
                </div>
                {/* thông số kỹ thuật */}
                <div
                  hidden={
                    item.type === "cho" ||
                    item.type === "meo" ||
                    item.type === "ca"
                  }
                  className="w-full text-lg font-bold mt-5"
                >
                  Thông số kỹ thuật
                </div>
                <div className="h-auto max-h-[250px] w-full text-lg flex flex-wrap">
                  <div
                    hidden={
                      item.type === "cho" ||
                      item.type === "meo" ||
                      item.type === "ca" ||
                      item.type === "other_thucung"
                    }
                    className="h-[50px] w-[50%] flex items-center space-x-2"
                  >
                    <Image
                      hidden={
                        item.type === "cho" ||
                        item.type === "meo" ||
                        item.type === "ca" ||
                        item.type === "other_thucung"
                      }
                      src={icon_tinhtrang}
                      alt="tinhtrang"
                      className="h-[30px] w-[30px] object-contain"
                    />
                    <p
                      hidden={
                        item.type === "cho" ||
                        item.type === "meo" ||
                        item.type === "ca" ||
                        item.type === "other_thucung"
                      }
                    >
                      Trình trạng:{" "}
                      {(item.tinhtrang === 2 && "Mới") ||
                        (item.tinhtrang === 1 && "Đã sử dụng (đã sửa chữa)") ||
                        (item.tinhtrang === 0 && "Đã sử dụng")}
                    </p>
                  </div>
                  <div
                    className={
                      !item.hang
                        ? "hidden"
                        : "h-[50px] w-[50%] flex items-center space-x-2"
                    }
                  >
                    <Image
                      src={icon_hang}
                      alt="tinhtrang"
                      className="h-[30px] w-[30px] object-contain"
                    />
                    <div className="flex item-center space-x-1">
                      <p>Hãng:</p> <p className="uppercase">{item.hang}</p>
                    </div>
                  </div>
                  <div
                    className={
                      !item.loaimayanh
                        ? "hidden"
                        : "h-[50px] w-[50%] flex items-center space-x-2"
                    }
                  >
                    <Image
                      src={icon_loaithietbi}
                      alt="tinhtrang"
                      className="h-[30px] w-[30px] object-contain"
                    />
                    <div className="flex item-center space-x-1">
                      <p>Loại thiết bị:</p>{" "}
                      <p className="">
                        {(item.loaimayanh === "mayanh" && "Máy ảnh") ||
                          (item.loaimayanh === "mayquay" && "Máy quay") ||
                          (item.loaimayanh === "other" && "Phụ kiện")}
                      </p>
                    </div>
                  </div>
                  <div
                    className={
                      !item.loaithietbideo
                        ? "hidden"
                        : "h-[50px] w-[50%] flex items-center space-x-2"
                    }
                  >
                    <Image
                      src={icon_loaithietbi}
                      alt="tinhtrang"
                      className="h-[30px] w-[30px] object-contain"
                    />
                    <div className="flex item-center space-x-1">
                      <p>Loại:</p>{" "}
                      <p className="">
                        {(item.loaithietbideo === "donghothongminh" &&
                          "Đồng hồ thông minh") ||
                          (item.loaithietbideo === "vongtaythongminh" &&
                            "Vòng tay thông minh") ||
                          (item.loaithietbideo === "other" && "Phụ kiện")}
                      </p>
                    </div>
                  </div>
                  <div
                    className={
                      !item.loailinhkien
                        ? "hidden"
                        : "h-[50px] w-[50%] flex items-center space-x-2"
                    }
                  >
                    <Image
                      src={icon_loaithietbi}
                      alt="tinhtrang"
                      className="h-[30px] w-[30px] object-contain"
                    />
                    <div className="flex item-center space-x-1">
                      <p>Loại:</p>{" "}
                      <p className="">
                        {(item.loailinhkien === "linhkienmaytinh" &&
                          "Linh kiện máy tính") ||
                          (item.loailinhkien === "linhkiendienthoai" &&
                            "Linh kiện điện thoại") ||
                          (item.loailinhkien === "other" && "Linh kiện khác")}
                      </p>
                    </div>
                  </div>
                  <div
                    className={
                      !item.loaiphukien
                        ? "hidden"
                        : "h-[50px] w-[50%] flex items-center space-x-2"
                    }
                  >
                    <Image
                      src={icon_loaithietbi}
                      alt="tinhtrang"
                      className="h-[30px] w-[30px] object-contain"
                    />
                    <div className="flex item-center space-x-1">
                      <p>Loại:</p>{" "}
                      <p className="">
                        {(item.loaiphukien === "manhinh" && "Màn hình") ||
                          (item.loaiphukien === "chuot" && "Chuột") ||
                          (item.loaiphukien === "banphim" && "Bàn phím") ||
                          (item.loaiphukien === "tainghe" && "Tai nghe") ||
                          (item.loaiphukien === "capsac" && "Cáp sạc") ||
                          (item.loaiphukien === "other" && "Khác")}
                      </p>
                    </div>
                  </div>
                  <div
                    className={
                      !item.loaixedien
                        ? "hidden"
                        : "h-[50px] w-[50%] flex items-center space-x-2"
                    }
                  >
                    <Image
                      src={icon_loaixedien}
                      alt="tinhtrang"
                      className="h-[30px] w-[30px] object-contain"
                    />
                    <div className="flex item-center space-x-1">
                      <p>Loại xe:</p>{" "}
                      <p className="">
                        {item.loaixedien === "xemaydien"
                          ? "Xe máy điện"
                          : "Xe đạp điện"}
                      </p>
                    </div>
                  </div>
                  <div
                    className={
                      !item.loaixedap
                        ? "hidden"
                        : "h-[50px] w-[50%] flex items-center space-x-2"
                    }
                  >
                    <Image
                      src={icon_loaixedien}
                      alt="tinhtrang"
                      className="h-[30px] w-[30px] object-contain"
                    />
                    <div className="flex item-center space-x-1">
                      <p>Loại xe:</p>{" "}
                      <p className="">
                        {(item.loaixedap === "xedapthethao" &&
                          "Xe đạp thể thao") ||
                          (item.loaixedap === "xedapphothong" &&
                            "Xe đạp phổ thông") ||
                          (item.xedap === "xedaptreem" && "Xe đạp trẻ em")}
                      </p>
                    </div>
                  </div>
                  <div
                    className={
                      !item.loaiphutung
                        ? "hidden"
                        : "h-[50px] w-[50%] flex items-center"
                    }
                  >
                    <Image
                      src={icon_phutung}
                      alt="tinhtrang"
                      className="h-[45px] w-[45px] object-contain"
                    />
                    <div className="flex item-center space-x-1">
                      <p>Loại xe:</p>{" "}
                      <p className="">
                        {item.loaiphutung === "phutungxemay"
                          ? "Phụ tùng xe máy"
                          : "Phụ tùng ô tô"}
                      </p>
                    </div>
                  </div>
                  <div
                    className={
                      !item.dongcoxedien
                        ? "hidden"
                        : "h-[50px] w-[50%] flex items-center space-x-2"
                    }
                  >
                    <Image
                      src={icon_dongcoxedien}
                      alt="tinhtrang"
                      className="h-[30px] w-[30px] object-contain"
                    />
                    <div className="flex item-center space-x-1">
                      <p>Động cơ:</p> <p className="">{item.dongcoxedien}</p>
                    </div>
                  </div>
                  <div
                    className={
                      !item.thetich
                        ? "hidden"
                        : "h-[50px] w-[50%] flex items-center space-x-2"
                    }
                  >
                    <Image
                      src={icon_thetich}
                      alt="tinhtrang"
                      className="h-[30px] w-[30px] object-contain"
                    />
                    <div className="flex item-center space-x-1">
                      <p>Thể tích:</p> <p className="">{item.thetich}</p>
                    </div>
                  </div>
                  <div
                    className={
                      !item.congsuat
                        ? "hidden"
                        : "h-[50px] w-[50%] flex items-center space-x-2"
                    }
                  >
                    <Image
                      src={icon_congsuat}
                      alt="tinhtrang"
                      className="h-[30px] w-[30px] object-contain"
                    />
                    <div className="flex item-center space-x-1">
                      <p>Công suất:</p> <p className="">{item.congsuat}</p>
                    </div>
                  </div>
                  <div
                    className={
                      !item.cuagiat
                        ? "hidden"
                        : "h-[50px] w-[50%] flex items-center space-x-2"
                    }
                  >
                    <Image
                      src={icon_cuagiat}
                      alt="tinhtrang"
                      className="h-[30px] w-[30px] object-contain"
                    />
                    <div className="flex item-center space-x-1">
                      <p>Cửa giặt:</p> <p className="">{item.cuagiat}</p>
                    </div>
                  </div>
                  <div
                    className={
                      !item.khoiluonggiat
                        ? "hidden"
                        : "h-[50px] w-[50%] flex items-center space-x-2"
                    }
                  >
                    <Image
                      src={icon_khoiluonggiat}
                      alt="tinhtrang"
                      className="h-[30px] w-[30px] object-contain"
                    />
                    <div className="flex item-center space-x-1">
                      <p>Khối lượng giặt:</p>{" "}
                      <p className="">{item.khoiluonggiat}</p>
                    </div>
                  </div>
                  <div
                    className={
                      !item.chogioitinh
                        ? "hidden"
                        : "h-[50px] w-[50%] flex items-center space-x-2"
                    }
                  >
                    <Image
                      src={icon_chogioitinh}
                      alt="tinhtrang"
                      className="h-[30px] w-[30px] object-contain"
                    />
                    <div className="flex item-center space-x-1">
                      <p>Loại:</p>{" "}
                      <p className="">
                        {(item.chogioitinh === 1 && "Đồ nữ") ||
                          (item.chogioitinh === 2 && "Đồ nam") ||
                          (item.chogioitinh === 3 && "Cả nam và nữ")}
                      </p>
                    </div>
                  </div>
                  <div
                    className={
                      !item.loainhaccu
                        ? "hidden"
                        : "h-[50px] w-[50%] flex items-center space-x-2"
                    }
                  >
                    <Image
                      src={icon_loainhaccu}
                      alt="tinhtrang"
                      className="h-[30px] w-[30px] object-contain"
                    />
                    <div className="flex item-center space-x-1">
                      <p>Loại nhạc cụ:</p>{" "}
                      <p className="uppercase">{item.loainhaccu}</p>
                    </div>
                  </div>
                  <div
                    className={
                      !item.dongmay
                        ? "hidden"
                        : "h-[50px] w-[50%] flex items-center space-x-2"
                    }
                  >
                    <Image
                      src={icon_dongmay}
                      alt="tinhtrang"
                      className="h-[30px] w-[30px] object-contain"
                    />
                    <p>Dòng máy: {item.dongmay}</p>
                  </div>
                  <div
                    className={
                      !item.mausac
                        ? "hidden"
                        : "h-[50px] w-[50%] flex items-center space-x-2"
                    }
                  >
                    <Image
                      src={icon_mausac}
                      alt="tinhtrang"
                      className="h-[30px] w-[30px] object-contain"
                    />
                    <p className="uppercase">Màu sắc: {item.mausac}</p>
                  </div>
                  <div
                    className={
                      !item.ram
                        ? "hidden"
                        : "h-[50px] w-[50%] flex items-center space-x-2"
                    }
                  >
                    <Image
                      src={icon_ram}
                      alt="tinhtrang"
                      className="h-[30px] w-[30px] object-contain"
                    />
                    <p className="uppercase">Ram: {item.ram}</p>
                  </div>
                  <div
                    className={
                      !item.dungluong && !item.ocung
                        ? "hidden"
                        : "h-[50px] w-[50%] flex items-center space-x-2"
                    }
                  >
                    <Image
                      src={icon_rom}
                      alt="tinhtrang"
                      className="h-[30px] w-[30px] object-contain"
                    />
                    <p className="uppercase">
                      Bộ nhớ: {item.dungluong || item.ocung}
                    </p>
                  </div>
                  <div
                    className={
                      !item.cpu
                        ? "hidden"
                        : "h-[50px] w-[50%] flex items-center space-x-2"
                    }
                  >
                    <Image
                      src={icon_cpu}
                      alt="tinhtrang"
                      className="h-[30px] w-[30px] object-contain"
                    />
                    <p>Vi xử lý: {item.cpu}</p>
                  </div>
                  <div
                    className={
                      !item.screensize
                        ? "hidden"
                        : "h-[50px] w-[50%] flex items-center space-x-2"
                    }
                  >
                    <Image
                      src={icon_screensize}
                      alt="tinhtrang"
                      className="h-[30px] w-[30px] object-contain"
                    />
                    <p>Kích thước màn hình: {item.screensize}</p>
                  </div>
                  <div
                    className={
                      !item.displaycard
                        ? "hidden"
                        : "h-[50px] w-[50%] flex items-center space-x-2"
                    }
                  >
                    <Image
                      src={icon_vga}
                      alt="tinhtrang"
                      className="h-[30px] w-[30px] object-contain"
                    />
                    <p>Card màn hình: {item.displaycard}</p>
                  </div>
                  <div
                    className={
                      !item.hopso
                        ? "hidden"
                        : "h-[50px] w-[50%] flex items-center space-x-2"
                    }
                  >
                    <Image
                      src={icon_hopso}
                      alt="tinhtrang"
                      className="h-[30px] w-[30px] object-contain"
                    />
                    <p>
                      Hộp số:{" "}
                      {(item.hopso === 0 && "Số tự động") ||
                        (item.hopso === 1 && "Số sàn") ||
                        (item.hopso === 2 && "Bán tự động")}
                    </p>
                  </div>
                  <div
                    className={
                      !item.namsanxuat
                        ? "hidden"
                        : "h-[50px] w-[50%] flex items-center space-x-2"
                    }
                  >
                    <Image
                      src={icon_ngaysanxuat}
                      alt="tinhtrang"
                      className="h-[30px] w-[30px] object-contain"
                    />
                    <p>Năm sản xuất: {item.namsanxuat}</p>
                  </div>
                  <div
                    className={
                      !item.sokm
                        ? "hidden"
                        : "h-[50px] w-[50%] flex items-center space-x-2"
                    }
                  >
                    <Image
                      src={icon_sokm}
                      alt="tinhtrang"
                      className="h-[30px] w-[30px] object-contain"
                    />
                    <p>Số KM: {item.sokm}</p>
                  </div>
                  <div
                    className={
                      !item.dungtich
                        ? "hidden"
                        : "h-[50px] w-[50%] flex items-center space-x-2"
                    }
                  >
                    <Image
                      src={icon_dungtich}
                      alt="tinhtrang"
                      className="h-[30px] w-[30px] object-contain"
                    />
                    <p>Dung tích: {item.dungtich}</p>
                  </div>
                  <div
                    className={
                      item.nhienlieu == 0 ||
                      item.nhienlieu == 1 ||
                      item.nhienlieu == 2
                        ? "h-[50px] w-[50%] flex items-center space-x-2"
                        : "hidden"
                    }
                  >
                    <Image
                      src={icon_nhieulieu}
                      alt="tinhtrang"
                      className="h-[30px] w-[30px] object-contain"
                    />
                    <p>
                      Nhiên liệu:{" "}
                      {(item.nhienlieu === 0 && "Xăng") ||
                        (item.nhienlieu === 1 && "Dầu") ||
                        (item.nhienlieu === 2 && "Điện")}
                    </p>
                  </div>
                  <div
                    className={
                      !item.taitrong
                        ? "hidden"
                        : "h-[50px] w-[50%] flex items-center space-x-2"
                    }
                  >
                    <Image
                      src={icon_taitrong}
                      alt="tinhtrang"
                      className="h-[30px] w-[30px] object-contain"
                    />
                    <p>Tải trọng: {item.taitrong}</p>
                  </div>
                  <div
                    className={
                      !item.sochongoi
                        ? "hidden"
                        : "h-[50px] w-[50%] flex items-center space-x-2"
                    }
                  >
                    <Image
                      src={icon_sochongoi}
                      alt="tinhtrang"
                      className="h-[30px] w-[30px] object-contain"
                    />
                    <p>Số chỗ ngồi: {item.sochongoi} chỗ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<CodeProductProps> = async (
  context
) => {
  const { id_product } = context.params as {
    id_product: string;
  };

  // Lấy query parameters (push từ Product.tsx) từ context.query
  const { type } = context.query;

  return {
    props: {
      id_product: id_product as string,
      type: type as string | null,
    },
  };
};

export default Chi_tiet_san_pham;
