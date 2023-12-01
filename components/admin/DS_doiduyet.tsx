import React, { useEffect, useState } from "react";
import Image from "next/image";
//import css file Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {
  API_get_Dienlanh,
  API_get_Docanhan,
  API_get_Dodientu,
  API_get_Dogiaitri,
  API_get_Dohoctap,
  API_get_Donoithat,
  API_get_Phuongtien,
  API_get_Thucung,
  API_updateStatusTindang,
} from "@/service/userService";
// toast thông báo
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import Modal_TuchoiTindang from "../modal/Modal_TuchoiTindang";
// xem img
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Link from "next/link";

const DS_doiduyet: React.FC<any> = ({
  selectoption,
  get_soluongtin_moicollection,
}) => {
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
  const [itemALL, setitemALL] = useState<any[]>([]);

  useEffect(() => {
    setitemALL([]);
    fetchDataProduct();
    setactive(null);
    setdataitem(null);
  }, [selectoption]);
  const fetchDataProduct = async () => {
    try {
      const build_data = {
        type: "ALL",
        trangthai: 1,
        role: "Admin",
      };
      if (selectoption === "hoctap") {
        const response = await API_get_Dohoctap(build_data);
        let sort_response = response.all_dohoctap
          .slice()
          .sort(
            (a: any, b: any) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        setitemALL(sort_response);
      }
      if (selectoption === "dodientu") {
        const response = await API_get_Dodientu(build_data);
        let sort_response = response.all_dodientu
          .slice()
          .sort(
            (a: any, b: any) =>
              new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          );
        setitemALL(sort_response);
      }
      if (selectoption === "phuongtien") {
        const response = await API_get_Phuongtien(build_data);
        let sort_response = response.all_phuongtien
          .slice()
          .sort(
            (a: any, b: any) =>
              new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          );
        setitemALL(sort_response);
      }
      if (selectoption === "donoithat") {
        const response = await API_get_Donoithat(build_data);
        let sort_response = response.all_donoithat
          .slice()
          .sort(
            (a: any, b: any) =>
              new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          );
        setitemALL(sort_response);
      }
      if (selectoption === "dienlanh") {
        const response = await API_get_Dienlanh(build_data);
        let sort_response = response.all_dienlanh
          .slice()
          .sort(
            (a: any, b: any) =>
              new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          );
        setitemALL(sort_response);
      }
      if (selectoption === "dodungcanhan") {
        const response = await API_get_Docanhan(build_data);
        let sort_response = response.all_docanhan
          .slice()
          .sort(
            (a: any, b: any) =>
              new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          );
        setitemALL(sort_response);
      }
      if (selectoption === "dogiaitri") {
        const response = await API_get_Dogiaitri(build_data);
        let sort_response = response.all_dogiaitri
          .slice()
          .sort(
            (a: any, b: any) =>
              new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          );
        setitemALL(sort_response);
      }
      if (selectoption === "thucung") {
        const response = await API_get_Thucung(build_data);
        let sort_response = response.all_thucung
          .slice()
          .sort(
            (a: any, b: any) =>
              new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          );
        setitemALL(sort_response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [item, setdataitem] = useState<any>();
  const [img_arr, setImg_arr] = useState<any>([]);
  const [active, setactive] = useState<number | null>(null);
  const [openlidotuchoi, setOpenlidotuchoi] = useState(false);
  const setData = (index: number, item: any) => {
    if (active === index) {
      setactive(null);
      setdataitem(null);
      setImg_arr([]);
      setOpenlidotuchoi(false);
      setInputLydoantin(null);
    } else {
      setactive(index);
      setdataitem(item);
      setImg_arr(item.img);
      setOpenlidotuchoi(false);
      setInputLydoantin(null);
    }
  };
  const [inputLydoantin, setInputLydoantin] = useState<any>();
  const handleChangeLydoantin = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newValue = event.target.value;
    if (newValue.length <= 1500) {
      const updatedValue = newValue.replace(/\n/g, "\n"); // Thêm ký tự \n vào thay vì /n
      setInputLydoantin(updatedValue);
    }
  };
  const Openlidotuchoi = () => {
    setOpenlidotuchoi(!openlidotuchoi);
    setInputLydoantin(null);
  };
  const build_data_update_trangthai = {
    id: item?._id,
    typecollection: selectoption,
    lydoantin: inputLydoantin,
  };
  const handleUpdateStatusTindang = async () => {
    const token_req: any = localStorage.getItem("token_req");
    try {
      const response = await API_updateStatusTindang(
        build_data_update_trangthai,
        token_req
      );
      if (response.errCode === 0) {
        {
          response.trangthai === 2 && toast.success("Tin đã được duyệt");
        }
        {
          response.trangthai === 3 &&
            toast.success("Tin đã được ẩn do chưa phù hợp") &&
            Openlidotuchoi();
        }
        get_soluongtin_moicollection();
        fetchDataProduct();
        setactive(null);
        setdataitem(null);
      } else {
        toast.error("Cập nhật không thành công");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
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
    <div className="flex sm:h-auto md:h-full sm:w-full sm:pt-5 sm:bg-gray-100 md:bg-white md:pt-0">
      <Lightbox
        open={isOpen_img}
        close={() => setIsOpen_img(false)}
        plugins={[Zoom]}
        slides={img_tindang}
        index={index_img_select}
      />
      {/* display medium */}
      <div className="w-[40%] h-auto p-2 overflow-auto">
        {itemALL.length === 0 && (
          <div className="h-auto w-full">
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
              className="w-full text-2xl text-center"
            >
              Không có tin đăng nào cần được Duyệt.
            </motion.p>
          </div>
        )}

        {itemALL &&
          itemALL.map((item: any, index: number) => {
            //handle thời gian đã đăng
            function tinhthoigiandadang(time: Date): string {
              const timehientai: Date = new Date();
              const ngaytao: Date = new Date(time);
              const thoigiandadang: number =
                timehientai.getTime() - ngaytao.getTime();

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
            const thoigiandadang: string = tinhthoigiandadang(item.updatedAt);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.3, delay: 0.1 },
                }}
                exit={{ opacity: 0, y: -50, transition: { duration: 0.3 } }}
                whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
                className={`h-[100px] w-full p-1 mt-3 flex border border-gray-400 shadow-md rounded-md cursor-pointer ${
                  index === active ? "bg-gray-100 border-mauxanhtroi" : ""
                }`}
                onClick={() => setData(index, item)}
              >
                <div className="h-[90px] min-w-[60px] flex justify-center">
                  <div
                    className="h-full w-full bg-center bg-contain bg-no-repeat"
                    style={{ backgroundImage: `url(${item.img[0]})` }}
                  ></div>
                </div>
                <div className="h-full w-auto max-w-full px-2">
                  <div className="h-[50%] w-full">
                    <p className="h-auto max-h-[30px] w-full text-lg pb-1 overflow-hidden">
                      {item.tieude}
                    </p>
                    <p className="h-[30px] w-full font-bold text-red-500">
                      {item.price.toLocaleString("vi-VN")} đ
                    </p>
                  </div>
                  <div className="h-[50%] w-full flex items-end pb-3">
                    <div>
                      <p className="h-[20px] w-full text-lg">
                        Đăng tin: {thoigiandadang}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
      </div>
      {item && (
        <div className="w-[60%] h-auto px-2 pt-2 overflow-auto">
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
                        className="h-full w-full bg-center bg-contain bg-no-repeat"
                        style={{ backgroundImage: `url(${item})` }}
                        onClick={() => handle_click_img_tindang(index)}
                      ></div>
                    </div>
                  );
                })}
            </Slider>
          </div>
          <div className="h-auto w-full px-2 py-2">
            <p className="h-auto max-h-[60px] w-full overflow-hidden text-xl font-bold">
              {item.tieude}
            </p>
            <div className="h-[60px] w-full flex flex-col items-start justify-center my-2">
              {item.new_pur_price && (
                <p className="h-full w-auto text-lg flex items-center font-bold text-red-500">
                  Giá mua mới: {item.new_pur_price?.toLocaleString("vi-VN")} đ
                </p>
              )}
              <p className="h-full w-auto text-lg flex items-center font-bold text-red-500">
                Giá bán lại: {item.price?.toLocaleString("vi-VN")} đ
              </p>
            </div>
            {/* mô tả sản phẩm */}
            <p className="w-full font-bold mb-2">Mô tả chi tiết</p>
            <div className="h-auto w-full overflow-hidden">
              <pre className="h-auto w-full break-words whitespace-pre-wrap font-mono">
                {item.mota}
              </pre>
            </div>
            {/* thông số kỹ thuật */}
            <div
              hidden={
                item.type === "cho" || item.type === "meo" || item.type === "ca"
              }
              className="w-full font-bold mt-5"
            >
              Thông số kỹ thuật
            </div>
            <div className="h-auto max-h-[250px] w-[100%] flex flex-wrap">
              <div
                hidden={
                  item.type === "cho" ||
                  item.type === "meo" ||
                  item.type === "ca" ||
                  item.type === "other_thucung"
                }
                className="h-[50px] w-[50%] flex items-center space-x-2"
              >
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
                <div className="flex item-center space-x-1">
                  <p>Loại xe:</p>{" "}
                  <p className="">
                    {(item.loaixedap === "xedapthethao" && "Xe đạp thể thao") ||
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
                <div className="flex item-center space-x-1">
                  <p>Loại sản phẩm:</p>{" "}
                  <p className="">
                    {(item.chogioitinh === 0 && "Đồ nữ") ||
                      (item.chogioitinh === 1 && "Đồ nam") ||
                      (item.chogioitinh === 2 && "Cả nam và nữ")}
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
                <p>Dòng máy: {item.dongmay}</p>
              </div>
              <div
                className={
                  !item.mausac
                    ? "hidden"
                    : "h-[50px] w-[50%] flex items-center space-x-2"
                }
              >
                <p className="uppercase">Màu sắc: {item.mausac}</p>
              </div>
              <div
                className={
                  !item.ram
                    ? "hidden"
                    : "h-[50px] w-[50%] flex items-center space-x-2"
                }
              >
                <p className="uppercase">Ram: {item.ram}</p>
              </div>
              <div
                className={
                  !item.dungluong && !item.ocung
                    ? "hidden"
                    : "h-[50px] w-[50%] flex items-center space-x-2"
                }
              >
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
                <p>Vi xử lý: {item.cpu}</p>
              </div>
              <div
                className={
                  !item.screensize
                    ? "hidden"
                    : "h-[50px] w-[50%] flex items-center space-x-2"
                }
              >
                <p>Kích thước màn hình: {item.screensize}</p>
              </div>
              <div
                className={
                  !item.displaycard
                    ? "hidden"
                    : "h-[50px] w-[50%] flex items-center space-x-2"
                }
              >
                <p>Card màn hình: {item.displaycard}</p>
              </div>
              <div
                className={
                  !item.hopso
                    ? "hidden"
                    : "h-[50px] w-[50%] flex items-center space-x-2"
                }
              >
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
                <p>Năm sản xuất: {item.namsanxuat}</p>
              </div>
              <div
                className={
                  !item.sokm
                    ? "hidden"
                    : "h-[50px] w-[50%] flex items-center space-x-2"
                }
              >
                <p>Số KM: {item.sokm}</p>
              </div>
              <div
                className={
                  !item.dungtich
                    ? "hidden"
                    : "h-[50px] w-[50%] flex items-center space-x-2"
                }
              >
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
                <p>Tải trọng: {item.taitrong}</p>
              </div>
              <div
                className={
                  !item.sochongoi
                    ? "hidden"
                    : "h-[50px] w-[50%] flex items-center space-x-2"
                }
              >
                <p>Số chỗ ngồi: {item.sochongoi} chỗ</p>
              </div>
            </div>
            <span className="w-full font-bold mt-3">Thông tin người dùng</span>
            <div className="w-full mt-1 flex flex-col space-y-1">
              <span>Họ tên: {item.infor_user.name}</span>
              <span>Địa chỉ: {item.infor_user.address}</span>

              <Link
                href={`/account/trang-ca-nhan/${item.infor_user._id}`}
                className="flex items-center space-x-1"
                target="_blank"
              >
                <span>id:</span>
                <span className="hover:text-mauxanhtroi">
                  {item.infor_user._id}
                </span>
              </Link>
            </div>
          </div>
          <div className="h-[60px] w-full flex sticky bottom-0">
            <div
              className="h-full w-[50%] bg-red-500 text-xl text-white cursor-pointer rounded-l-md hover:bg-red-600 flex items-center justify-center"
              onClick={() => setOpenlidotuchoi(!openlidotuchoi)}
            >
              Từ chối
            </div>
            <div
              className="h-full w-[50%] bg-green-500 text-xl text-white cursor-pointer rounded-r-md hover:bg-green-600 flex items-center justify-center"
              onClick={() => handleUpdateStatusTindang()}
            >
              Duyệt bài
            </div>
          </div>
        </div>
      )}
      <Modal_TuchoiTindang
        inputLydoantin={inputLydoantin}
        handleChangeLydoantin={handleChangeLydoantin}
        handleUpdateStatusTindang={() => handleUpdateStatusTindang()}
        openlidotuchoi={openlidotuchoi}
        Openlidotuchoi={Openlidotuchoi}
      />
    </div>
  );
};

export default DS_doiduyet;
