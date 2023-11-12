import React, { useEffect, useState } from "react";
import Image from "next/image";
//import css file Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {
  API_deleteTindang,
  API_get_Dienlanh,
  API_get_Docanhan,
  API_get_Dodientu,
  API_get_Dogiaitri,
  API_get_Dohoctap,
  API_get_Donoithat,
  API_get_Phuongtien,
  API_get_Thucung,
  API_updateStatusTindang,
  Search_tindang_daduyet,
} from "@/service/userService";
// toast thông báo
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import ReactPaginate from "react-paginate";
// xem img
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

const DS_daduyet: React.FC<any> = ({
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
  const [active_tab_filter, setActiveTab] = useState<number>(2);
  const [pagehientai, setpagehientai] = useState<number>(1);
  const [totalpages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    setitemALL([]);
    setpagehientai(1);
    fetchDataProduct();
    setactive(null);
    setdataitem(null);
    setInputLydoantin(null);
  }, [selectoption, active_tab_filter]);
  useEffect(() => {
    setitemALL([]);
    fetchDataProduct();
    setactive(null);
    setdataitem(null);
  }, [pagehientai]);

  const fetchDataProduct = async () => {
    try {
      const build_data = {
        type: "ALL",
        soluong: 6,
        trangthai: active_tab_filter,
        pagehientai: pagehientai,
        role: "Admin",
      };
      if (selectoption === "hoctap") {
        const response = await API_get_Dohoctap(build_data);
        setitemALL(response.all_dohoctap);
        setTotalPages(response.totalpages);
      }
      if (selectoption === "dodientu") {
        const response = await API_get_Dodientu(build_data);
        setitemALL(response.all_dodientu);
        setTotalPages(response.totalpages);
      }
      if (selectoption === "phuongtien") {
        const response = await API_get_Phuongtien(build_data);
        setitemALL(response.all_phuongtien);
        setTotalPages(response.totalpages);
      }
      if (selectoption === "donoithat") {
        const response = await API_get_Donoithat(build_data);
        setitemALL(response.all_donoithat);
        setTotalPages(response.totalpages);
      }
      if (selectoption === "dienlanh") {
        const response = await API_get_Dienlanh(build_data);
        setitemALL(response.all_dienlanh);
        setTotalPages(response.totalpages);
      }
      if (selectoption === "dodungcanhan") {
        const response = await API_get_Docanhan(build_data);
        setitemALL(response.all_docanhan);
        setTotalPages(response.totalpages);
      }
      if (selectoption === "dogiaitri") {
        const response = await API_get_Dogiaitri(build_data);
        setitemALL(response.all_dogiaitri);
        setTotalPages(response.totalpages);
      }
      if (selectoption === "thucung") {
        const response = await API_get_Thucung(build_data);
        setitemALL(response.all_thucung);
        setTotalPages(response.totalpages);
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
          response.trangthai === 2 && toast.success("Tin đã được hiển thị lại");
        }
        {
          response.trangthai === 3 &&
            toast.success("Tin đã được ẩn do chưa phù hợp");
        }
        get_soluongtin_moicollection();
        fetchDataProduct();
        setdataitem(null);
      } else {
        toast.error("Cập nhật không thành công");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const listFilter = [
    { id: 2, name: "Tin hiển thị" },
    { id: 3, name: "Bị từ chối" },
    { id: 4, name: "Tin ẩn" },
  ];
  const [keyword, setKeyword] = useState<string>("");
  const handleSearch = async () => {
    try {
      if (keyword !== "") {
        const response = await Search_tindang_daduyet(keyword, selectoption);
        // console.log("check response: ", response);
        setitemALL(response.resultSearch);
      } else {
        setpagehientai(1);
        fetchDataProduct();
      }
    } catch (error) {
      console.log("Lỗi handleSearch: ", error);
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const handlePageClick = (event: any) => {
    const selected = event.selected + 1;
    setpagehientai(selected);
  };

  const handleXoatindang = async (type: string, id: string) => {
    const token_req: any = localStorage.getItem("token_req");
    try {
      const response = await API_deleteTindang(type, id, token_req);
      if (response) {
        {
          response.errCode === 0 &&
            toast.success(response.message) &&
            fetchDataProduct();
        }
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
      <div className="relative w-[40%] h-full flex flex-col space-y-1">
        <div className="min-h-[50px] w-full flex items-center">
          {listFilter &&
            listFilter.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className={`${
                    active_tab_filter === item.id && "border-b-4 "
                  } h-[40px] w-[150px] text-lg flex items-center justify-center border-mauxanhtroi cursor-pointer hover:border-b-2`}
                  onClick={() => setActiveTab(item.id)}
                >
                  {item.name}
                </div>
              );
            })}
        </div>
        {/* call api search tin đã đăng theo tiêu đề, id */}
        <div className="min-h-[50px] w-full px-3 flex flex-row">
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-full w-[85%] px-2 border-y border-l border-gray-300 rounded-tl-md rounded-bl-md outline-none"
            placeholder="Tìm kiếm theo tiêu đề hoặc id tin đăng"
          />
          <button
            className="text-black w-[15%] h-full bg-[#e9ecef] text-lg cursor-pointer rounded-tr-[10px] rounded-br-[10px] border-y border-r border-gray-300 outline-none hover:bg-gray-200"
            onClick={() => handleSearch()}
          >
            Tìm
          </button>
        </div>
        <div className="w-full h-auto flex-grow p-2 overflow-y-auto overflow-x-hidden">
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
              let time: any =
                item.trangthai == 3 ? item.updatedAt : item.ngayduyettin;
              const thoigiandadang: string = tinhthoigiandadang(time);

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
                  // className="h-[160px] w-full p-1 mt-3 flex border border-gray-400 shadow-md rounded-md cursor-pointer"
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
        <div className="h-auto w-full mt-1">
          <ReactPaginate
            forcePage={pagehientai - 1}
            breakLabel="..."
            nextLabel="Sau >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            pageCount={totalpages}
            previousLabel="< Trước"
            renderOnZeroPageCount={null}
            //css
            pageClassName="h-full w-[35px] flex items-center justify-center text-lg border border-blue-500 text-blue-500"
            pageLinkClassName="page-link"
            previousClassName="h-full w-[100px] bg-gray-50 rounded-l-md border-2 border-blue-500 flex items-center justify-center text-lg text-blue-500 cursor-pointer"
            previousLinkClassName="page-link"
            nextClassName="h-full w-[100px] bg-gray-50 rounded-r-md border-2 border-blue-500 flex items-center justify-center text-lg text-blue-500 cursor-pointer"
            nextLinkClassName="page-link"
            breakClassName="h-full w-[35px] flex items-center justify-center border border-blue-500 text-blue-500"
            breakLinkClassName="page-link"
            containerClassName="h-[40px] flex items-center justify-center space-x-2"
            activeClassName="bg-blue-500 text-white"
          />
        </div>
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
                      className="h-[500px] w-[500px] flex justify-center"
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
            {item && item.trangthai !== 2 && (
              <p className="h-auto max-h-[60px] w-full overflow-hidden text-xl text-center text-red-500 font-bold">
                Lý do ẩn tin: {item.lydoantin}
              </p>
            )}
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
          </div>
          {/* Ẩn tin */}
          <div className="h-auto w-auto sticky bottom-0">
            <div className="relative h-[50px] w-full flex">
              {(item.trangthai == 3 || item.trangthai == 4) && (
                <div
                  className="h-full w-[100%] bg-red-500 text-xl text-white cursor-pointer rounded-md hover:bg-red-600 flex items-center justify-center"
                  onClick={() => handleXoatindang(item.type, item._id)}
                >
                  <p>Xóa tin</p>
                </div>
              )}
              {item.trangthai == 2 && (
                <div
                  className="h-full w-[100%] bg-red-500 text-xl text-white cursor-pointer rounded-md hover:bg-red-600 flex items-center justify-center"
                  onClick={() => Openlidotuchoi()}
                >
                  <p>Ẩn tin</p>
                </div>
              )}
              {openlidotuchoi && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.3, delay: 0.1 },
                  }}
                  exit={{ opacity: 0, y: -50, transition: { duration: 0.3 } }}
                  className="absolute bottom-[60px] h-[315px] w-[490px] bg-white border border-gray-500 rounded-md shadow-lg"
                >
                  <div className="font-bold px-2 py-3 bg-red-500 text-white flex items-center place-content-between">
                    <p>Lý do từ chối</p>
                    <div
                      className="h-full w-auto text-2xl px-2 cursor-pointer"
                      onClick={() => Openlidotuchoi()}
                    >
                      ✖
                    </div>
                  </div>
                  <textarea
                    className="min-h-[200px] max-h-[200px] w-full p-1 border-t border-gray-400 outline-none"
                    value={inputLydoantin}
                    onChange={handleChangeLydoantin}
                    placeholder="Nhập lý do từ chối duyệt bài đăng này."
                  ></textarea>
                  <div className="w-full flex items-center justify-end px-2">
                    <button
                      disabled={!inputLydoantin}
                      className={`px-4 py-2 border border-gray-300 bg-gray-200 hover:bg-gray-300 rounded-md cursor-pointer`}
                      onClick={() => handleUpdateStatusTindang()}
                    >
                      Xác nhận
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DS_daduyet;
