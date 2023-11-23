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
import icon_loading from "../../assets/icon/loading.png";

import { GetServerSideProps } from "next";
import { API_getTindangbyId } from "@/service/userService";
import jwt from "jsonwebtoken";
import { sign, verify, Secret } from "jsonwebtoken";
import Cookies from "js-cookie";
import { useMyContext } from "@/contexts/MyContext";
// xem img
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import axios from "axios";
import { toast } from "react-toastify";

interface CodeProductProps {
  id_product: string;
  type: string | null; //type: dienthoai, laptop,...
}

const Chi_tiet_san_pham = ({ type, id_product }: CodeProductProps) => {
  const { isLoading, handle_setIsLoading, information_User } = useMyContext();

  const [item, setItem] = useState<any>();
  const [img_arr, setImg_arr] = useState<any>([]);
  const [infoClient, setInfoClient] = useState<any>();
  const [openNumber, setopenNumber] = useState(false);
  const [errCode, seterrCode] = useState<number | undefined>();

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
      // console.log("check response: ", response);
      seterrCode(response.errCode);
      setItem(response.dataItem[0]);
      setInfoClient(response.userInfo[0]);
      //để map img
      setImg_arr(response.dataItem[0].img); //format: data:image/png;base64, abcdef
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [datainforUser_current, setdatainforUser_current] =
    useState<any>(information_User);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  // check đăng nhập
  useEffect(() => {
    const checkPermission = async () => {
      // check token login acc&pass
      let token: any = localStorage.getItem("token");
      let parse_token = JSON.parse(token);
      if (parse_token) {
        // decoded token
        let jwt_key = "2handmarket_tdn" || process.env.NEXT_PUBLIC_JWT_SECRET;
        const jwt_secret: Secret = jwt_key;
        try {
          const decoded: any = jwt.verify(parse_token, jwt_secret);
          setHasPermission(true);
          setdatainforUser_current(decoded);
        } catch (error) {
          console.log("Lỗi decoded token: ", error);
          setHasPermission(false);
          setdatainforUser_current(null);
        }
      } else {
        // check session login google
        try {
          const response = await axios.post(`/api/check_permission`);
          const data = await response.data;
          if (data.hasPermission) {
            setHasPermission(true);
            setdatainforUser_current(data.session.user);
          } else {
            setHasPermission(false);
          }
        } catch (error) {
          console.error("Error checking permission:", error);
          setHasPermission(false);
        }
      }
    };
    checkPermission();
  }, [router]);

  const handleClickMessage = async () => {
    console.log("check datainforUser_current: ", datainforUser_current);
    const query: any = {
      current_user_name: datainforUser_current?.name,
      id_receiver: infoClient._id,
      name_receiver: infoClient.name,
    };
    if (hasPermission == false) {
      // toast yêu cầu login
      toast.error("Vui lòng đăng nhập để thực hiện chức năng này!");
    } else {
      try {
        handle_setIsLoading(true);
        await router.push({
          pathname: `/account/tin-nhan/${datainforUser_current?._id}`,
          query,
        });
        handle_setIsLoading(false);
      } catch (error) {
        console.error("Error navigating:", error);
        handle_setIsLoading(false);
      }
    }
  };

  const handle_push_trangcanhan = async (id: string) => {
    try {
      handle_setIsLoading(true);
      await router.push(`/account/trang-ca-nhan/${id}`);
      handle_setIsLoading(false);
    } catch (error) {
      console.error("Error navigating:", error);
      handle_setIsLoading(false);
    }
  };

  const [isOpen_img, setIsOpen_img] = useState(false);
  const [index_img_select, setindex_img_select] = useState<number>();
  let img_tindang: any = [];
  const handle_click_img_tindang = (index: number) => {
    setIsOpen_img(true);
    setindex_img_select(index);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Lightbox
        open={isOpen_img}
        close={() => setIsOpen_img(false)}
        plugins={[Zoom]}
        slides={img_tindang}
        index={index_img_select}
      />
      <Head>
        <title>2Hand Market - Chi tiết sản phẩm</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon_2handmarket.png" />
      </Head>
      <Header />
      <div className="h-auto md:min-h-[calc(100vh-115px)] lg:min-h-[calc(100vh-80px)] w-[100%] lg:pt-[0px] md:pt-[0px] bg-gray-100 flex flex-col place-content-between">
        <div>
          {/* Điều hướng */}
          <div className="h-[60px] w-full flex items-center justify-center mt-2">
            <div className="h-full md:w-full lg:w-[1440px] max-w-full bg-white text-xl flex items-center p-1 rounded-lg shadow-md">
              <Danhmuc />
              <p className="h-full w-auto flex items-center ml-3">
                Trang chủ / Sản phẩm
              </p>
            </div>
          </div>
          <div className="h-auto w-full flex items-center justify-center mt-3">
            <div className="bg-white shadow-sm h-auto md:w-full lg:w-[1440px] max-w-full flex">
              {infoClient && errCode == 0 && (
                <div className="h-full w-[55%] p-2 sticky top-0">
                  <div className="h-[540px] w-full">
                    <Slider {...settings_slider}>
                      {img_arr &&
                        img_arr.map((item: any, index: number) => {
                          img_tindang.push({ src: item });
                          return (
                            <div
                              key={index}
                              className="h-[500px] w-[500px] flex justify-center outline-none"
                            >
                              <div
                                className="h-full w-full bg-center bg-contain bg-no-repeat outline-none"
                                style={{ backgroundImage: `url(${item})` }}
                                onClick={() => handle_click_img_tindang(index)}
                              ></div>
                            </div>
                          );
                        })}
                    </Slider>
                  </div>
                  <div className="h-[90px] w-full p-1 flex items-center border border-gray-400 rounded-md mt-2">
                    <div className="h-[70px] min-w-[70px] flex items-center justify-center">
                      <div
                        className="h-full w-full rounded-full bg-center bg-cover bg-no-repeat"
                        style={{ backgroundImage: `url(${infoClient?.img})` }}
                      ></div>
                    </div>
                    <div className="h-full w-[680px] flex items-center place-content-between">
                      <div className="w-[200px] text-xl space-y-2 px-5">
                        <p className="font-bold">{infoClient?.name}</p>
                        {/* <p>Online 5 phút trước</p> */}
                      </div>
                      <div
                        className="w-auto text-center text-mauxanhtroi text-lg py-2 px-3 border border-mauxanhtroi rounded-lg hover:bg-mauxanhtroi hover:text-white cursor-pointer"
                        onClick={() => handle_push_trangcanhan(infoClient?._id)}
                      >
                        Xem trang
                      </div>
                    </div>
                  </div>
                  {infoClient?.address && (
                    <div className="h-auto w-full p-2">
                      <div className="md:text-lg lg:text-xl font-thin flex items-center space-x-2">
                        <Image
                          src={icon_diachi}
                          alt="diachi"
                          className="h-[30px] w-[30px] object-contain"
                        />
                        <p>{infoClient?.address}</p>
                      </div>
                    </div>
                  )}
                  <div className="h-auto w-full px-1 py-2 flex item-center lg:text-xl">
                    <div
                      onClick={() => setopenNumber(!openNumber)}
                      className="max-h-full w-[60%] border border-mauxanhtroi bg-mauxanhtroi text-white text-center p-3 rounded-l-lg hover:opacity-80 cursor-pointer"
                    >
                      {openNumber
                        ? `${
                            infoClient.account
                              ? infoClient.account
                              : "Không có thông tin số điện thoại"
                          }`
                        : "Liên hệ số điện thoại"}
                    </div>
                    <div
                      className="max-h-full w-[40%] border border-mauxanhtroi text-center p-3 rounded-r-lg hover:bg-gray-50 cursor-pointer"
                      onClick={handleClickMessage}
                    >
                      Chat với người bán
                    </div>
                  </div>
                </div>
              )}
              {errCode == undefined && (
                <div className="h-[100px] w-full text-2xl flex items-center justify-center space-x-2">
                  <Image
                    src={icon_loading}
                    alt=""
                    className="h-[45px] w-[45px] loading"
                  />
                  <p className="">
                    Loading... Vui lòng chờ Server phản hồi sau giây lát.
                  </p>
                </div>
              )}
              {errCode == 1 && (
                <div className="h-[100px] w-full text-2xl flex items-center justify-center space-x-2">
                  <p className="">Tin đăng KHÔNG còn tồn tại</p>
                </div>
              )}
              {item && (
                <div className="h-full w-[45%] px-2 py-2">
                  <p className="h-auto max-h-[60px] w-full overflow-hidden text-2xl font-bold">
                    {item.tieude}
                  </p>
                  <div className="h-[60px] w-full flex flex-col items-start justify-center my-2">
                    {item.new_pur_price && (
                      <p className="h-full w-auto text-xl flex items-center space-x-1">
                        <span>Giá mua mới:</span>

                        <span className="font-bold">
                          {item.new_pur_price?.toLocaleString("vi-VN")} đ
                        </span>
                      </p>
                    )}
                    <p className="h-full w-auto text-xl flex items-center font-bold text-red-500">
                      Giá bán lại: {item.price?.toLocaleString("vi-VN")} đ
                    </p>
                    {/* <div className="h-auto w-auto px-5 py-1 text-xl flex items-center justify-center border border-red-500 rounded-lg cursor-pointer hover:bg-red-500 hover:text-white">
                    {" "}
                    Lưu tin
                  </div> */}
                  </div>
                  {/* mô tả sản phẩm */}
                  <p className="w-full text-lg font-bold mb-2">
                    Mô tả chi tiết
                  </p>
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
                    {/* Thông số kỹ thuật */}
                  </div>
                  <div className="h-auto max-h-[250px] w-full lg:text-lg flex flex-wrap md:gap-1 lg:gap-0">
                    <div
                      hidden={
                        item.type === "cho" ||
                        item.type === "meo" ||
                        item.type === "ca" ||
                        item.type === "other_thucung"
                      }
                      className="h-[50px] md:w-[100%] lg:w-[50%] flex md:flex-col lg:flex-row md:items-start lg:items-center space-x-2"
                    >
                      <div className="flex items-center space-x-2">
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
                            (item.tinhtrang === 1 &&
                              "Đã sử dụng (đã sửa chữa)") ||
                            (item.tinhtrang === 0 && "Đã sử dụng")}
                        </p>
                      </div>
                    </div>
                    <div
                      className={
                        !item.hang
                          ? "hidden"
                          : "h-[50px] md:w-[100%] lg:w-[50%] flex md:flex-col lg:flex-row md:items-start lg:items-center space-x-2"
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <Image
                          src={icon_hang}
                          alt="tinhtrang"
                          className="h-[30px] w-[30px] object-contain"
                        />
                        <div className="flex item-center space-x-1">
                          <p>Hãng:</p> <p className="uppercase">{item.hang}</p>
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        !item.loaimayanh
                          ? "hidden"
                          : "h-[50px] md:w-[100%] lg:w-[50%] flex md:flex-col lg:flex-row md:items-start lg:items-center space-x-2"
                      }
                    >
                      <div className="flex items-center space-x-2">
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
                    </div>
                    <div
                      className={
                        !item.loaithietbideo
                          ? "hidden"
                          : "h-[50px] md:w-[100%] lg:w-[50%] flex md:flex-col lg:flex-row md:items-start lg:items-center space-x-2"
                      }
                    >
                      <div className="flex items-center space-x-2">
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
                    </div>
                    <div
                      className={
                        !item.loailinhkien
                          ? "hidden"
                          : "h-[50px] md:w-[100%] lg:w-[50%] flex md:flex-col lg:flex-row md:items-start lg:items-center space-x-2"
                      }
                    >
                      <div className="flex items-center space-x-2">
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
                              (item.loailinhkien === "other" &&
                                "Linh kiện khác")}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        !item.loaiphukien
                          ? "hidden"
                          : "h-[50px] md:w-[100%] lg:w-[50%] flex md:flex-col lg:flex-row md:items-start lg:items-center space-x-2"
                      }
                    >
                      <div className="flex items-center space-x-2">
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
                    </div>
                    <div
                      className={
                        !item.loaixedien
                          ? "hidden"
                          : "h-[50px] md:w-[100%] lg:w-[50%] flex md:flex-col lg:flex-row md:items-start lg:items-center space-x-2"
                      }
                    >
                      <div className="flex items-center space-x-2">
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
                    </div>
                    <div
                      className={
                        !item.loaixedap
                          ? "hidden"
                          : "h-[50px] md:w-[100%] lg:w-[50%] flex md:flex-col lg:flex-row md:items-start lg:items-center space-x-2"
                      }
                    >
                      <div className="flex items-center space-x-2">
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
                    </div>
                    <div
                      className={
                        !item.loaiphutung
                          ? "hidden"
                          : "h-[50px] w-[50%] flex items-center"
                      }
                    >
                      <div className="flex items-center space-x-2">
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
                    </div>
                    <div
                      className={
                        !item.dongcoxedien
                          ? "hidden"
                          : "h-[50px] md:w-[100%] lg:w-[50%] flex md:flex-col lg:flex-row md:items-start lg:items-center space-x-2"
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <Image
                          src={icon_dongcoxedien}
                          alt="tinhtrang"
                          className="h-[30px] w-[30px] object-contain"
                        />
                        <div className="flex item-center space-x-1">
                          <p>Động cơ:</p>{" "}
                          <p className="">{item.dongcoxedien}</p>
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        !item.thetich
                          ? "hidden"
                          : "h-[50px] md:w-[100%] lg:w-[50%] flex md:flex-col lg:flex-row md:items-start lg:items-center space-x-2"
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <Image
                          src={icon_thetich}
                          alt="tinhtrang"
                          className="h-[30px] w-[30px] object-contain"
                        />
                        <div className="flex item-center space-x-1">
                          <p>Thể tích:</p> <p className="">{item.thetich}</p>
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        !item.congsuat
                          ? "hidden"
                          : "h-[50px] md:w-[100%] lg:w-[50%] flex md:flex-col lg:flex-row md:items-start lg:items-center space-x-2"
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <Image
                          src={icon_congsuat}
                          alt="tinhtrang"
                          className="h-[30px] w-[30px] object-contain"
                        />
                        <div className="flex item-center space-x-1">
                          <p>Công suất:</p> <p className="">{item.congsuat}</p>
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        !item.cuagiat
                          ? "hidden"
                          : "h-[50px] md:w-[100%] lg:w-[50%] flex md:flex-col lg:flex-row md:items-start lg:items-center space-x-2"
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <Image
                          src={icon_cuagiat}
                          alt="tinhtrang"
                          className="h-[30px] w-[30px] object-contain"
                        />
                        <div className="flex item-center space-x-1">
                          <p>Cửa giặt:</p> <p className="">{item.cuagiat}</p>
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        !item.khoiluonggiat
                          ? "hidden"
                          : "h-[50px] md:w-[100%] lg:w-[50%] flex md:flex-col lg:flex-row md:items-start lg:items-center space-x-2"
                      }
                    >
                      <div className="flex items-center space-x-2">
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
                    </div>
                    <div
                      className={
                        !item.chogioitinh
                          ? "hidden"
                          : "h-[50px] md:w-[100%] lg:w-[50%] flex md:flex-col lg:flex-row md:items-start lg:items-center space-x-2"
                      }
                    >
                      <div className="flex items-center space-x-2">
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
                    </div>
                    <div
                      className={
                        !item.loainhaccu
                          ? "hidden"
                          : "h-[50px] md:w-[100%] lg:w-[50%] flex md:flex-col lg:flex-row md:items-start lg:items-center space-x-2"
                      }
                    >
                      <div className="flex items-center space-x-2">
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
                    </div>
                    <div
                      className={
                        !item.dongmay
                          ? "hidden"
                          : "h-[50px] md:w-[100%] lg:w-[50%] flex md:flex-col lg:flex-row md:items-start lg:items-center space-x-2"
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <Image
                          src={icon_dongmay}
                          alt="tinhtrang"
                          className="h-[30px] w-[30px] object-contain"
                        />
                        <p>Dòng máy: {item.dongmay}</p>
                      </div>
                    </div>
                    <div
                      className={
                        !item.mausac
                          ? "hidden"
                          : "h-[50px] md:w-[100%] lg:w-[50%] flex md:flex-col lg:flex-row md:items-start lg:items-center space-x-2"
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <Image
                          src={icon_mausac}
                          alt="tinhtrang"
                          className="h-[30px] w-[30px] object-contain"
                        />
                        <p className="uppercase">Màu sắc: {item.mausac}</p>
                      </div>
                    </div>
                    <div
                      className={
                        !item.ram
                          ? "hidden"
                          : "h-[50px] md:w-[100%] lg:w-[50%] flex md:flex-col lg:flex-row md:items-start lg:items-center space-x-2"
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <Image
                          src={icon_ram}
                          alt="tinhtrang"
                          className="h-[30px] w-[30px] object-contain"
                        />
                        <p className="uppercase">Ram: {item.ram}</p>
                      </div>
                    </div>
                    <div
                      className={
                        !item.dungluong && !item.ocung
                          ? "hidden"
                          : "h-[50px] md:w-[100%] lg:w-[50%] flex md:flex-col lg:flex-row md:items-start lg:items-center space-x-2"
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <Image
                          src={icon_rom}
                          alt="tinhtrang"
                          className="h-[30px] w-[30px] object-contain"
                        />
                        <p className="uppercase">
                          Bộ nhớ: {item.dungluong || item.ocung}
                        </p>
                      </div>
                    </div>
                    <div
                      className={
                        !item.cpu
                          ? "hidden"
                          : "h-[50px] md:w-[100%] lg:w-[50%] flex md:flex-col lg:flex-row md:items-start lg:items-center space-x-2"
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <Image
                          src={icon_cpu}
                          alt="tinhtrang"
                          className="h-[30px] w-[30px] object-contain"
                        />
                        <p>Vi xử lý: {item.cpu}</p>
                      </div>
                    </div>
                    <div
                      className={
                        !item.screensize
                          ? "hidden"
                          : "h-[50px] md:w-[100%] lg:w-[50%] flex md:flex-col lg:flex-row md:items-start lg:items-center space-x-2"
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <Image
                          src={icon_screensize}
                          alt="tinhtrang"
                          className="h-[30px] w-[30px] object-contain"
                        />
                        <p>Kích thước màn hình: {item.screensize}</p>
                      </div>
                    </div>
                    <div
                      className={
                        !item.displaycard
                          ? "hidden"
                          : "h-[50px] md:w-[100%] lg:w-[50%] flex md:flex-col lg:flex-row md:items-start lg:items-center space-x-2"
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <Image
                          src={icon_vga}
                          alt="tinhtrang"
                          className="h-[30px] w-[30px] object-contain"
                        />
                        <p>Card màn hình: {item.displaycard}</p>
                      </div>
                    </div>
                    <div
                      className={
                        !item.hopso
                          ? "hidden"
                          : "h-[50px] md:w-[100%] lg:w-[50%] flex md:flex-col lg:flex-row md:items-start lg:items-center space-x-2"
                      }
                    >
                      <div className="flex items-center space-x-2">
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
                    </div>
                    <div
                      className={
                        !item.namsanxuat
                          ? "hidden"
                          : "h-[50px] md:w-[100%] lg:w-[50%] flex md:flex-col lg:flex-row md:items-start lg:items-center space-x-2"
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <Image
                          src={icon_ngaysanxuat}
                          alt="tinhtrang"
                          className="h-[30px] w-[30px] object-contain"
                        />
                        <p>Năm sản xuất: {item.namsanxuat}</p>
                      </div>
                    </div>
                    <div
                      className={
                        !item.sokm
                          ? "hidden"
                          : "h-[50px] md:w-[100%] lg:w-[50%] flex md:flex-col lg:flex-row md:items-start lg:items-center space-x-2"
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <Image
                          src={icon_sokm}
                          alt="tinhtrang"
                          className="h-[30px] w-[30px] object-contain"
                        />
                        <p>Số KM: {item.sokm}</p>
                      </div>
                    </div>
                    <div
                      className={
                        !item.dungtich
                          ? "hidden"
                          : "h-[50px] md:w-[100%] lg:w-[50%] flex md:flex-col lg:flex-row md:items-start lg:items-center space-x-2"
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <Image
                          src={icon_dungtich}
                          alt="tinhtrang"
                          className="h-[30px] w-[30px] object-contain"
                        />
                        <p>Dung tích: {item.dungtich}</p>
                      </div>
                    </div>
                    <div
                      className={
                        item.nhienlieu == 0 ||
                        item.nhienlieu == 1 ||
                        item.nhienlieu == 2
                          ? "h-[50px] md:w-[100%] lg:w-[50%] flex md:flex-col lg:flex-row md:items-start lg:items-center space-x-2"
                          : "hidden"
                      }
                    >
                      <div className="flex items-center space-x-2">
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
                    </div>
                    <div
                      className={
                        !item.taitrong
                          ? "hidden"
                          : "h-[50px] md:w-[100%] lg:w-[50%] flex md:flex-col lg:flex-row md:items-start lg:items-center space-x-2"
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <Image
                          src={icon_taitrong}
                          alt="tinhtrang"
                          className="h-[30px] w-[30px] object-contain"
                        />
                        <p>Tải trọng: {item.taitrong}</p>
                      </div>
                    </div>
                    <div
                      className={
                        !item.sochongoi
                          ? "hidden"
                          : "h-[50px] md:w-[100%] lg:w-[50%] flex md:flex-col lg:flex-row md:items-start lg:items-center space-x-2"
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <Image
                          src={icon_sochongoi}
                          alt="tinhtrang"
                          className="h-[30px] w-[30px] object-contain"
                        />
                        <p>Chỗ ngồi: {item.sochongoi} chỗ</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
