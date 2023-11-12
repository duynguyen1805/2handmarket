import React, { useEffect, useState } from "react";
import Head from "next/head";
import Danhmuc from "@/components/Danhmuc";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import item_danhmuc, {
  danhmuc,
  sub_danhmuc,
} from "../components/obj_data_raw/Danhmuc_raw";
import item_listkhoatruong, {
  truong,
  nganh,
} from "@/components/obj_data_raw/List_Khoatruong";
import icon_batdongsan from "../assets/icon/icon_batdongsan.png";
import icon_dodientu from "../assets/icon/icon_dodientu.png";
import icon_dodungcanhan from "../assets/icon/icon_dodungcanhan.png";
import icon_donoithat from "../assets/icon/icon_donoithat.png";
import icon_giaitri from "../assets/icon/icon_giaitri.png";
import icon_thucung from "../assets/icon/icon_thucung.png";
import icon_dienlanh from "../assets/icon/icon_tulanh.png";
import icon_xeco from "../assets/icon/icon_xeco.png";

import icon_oto from "../assets/icon/ic_xeco/icon_oto.svg";
import icon_xemay from "../assets/icon/ic_xeco/icon_xemay.svg";
import icon_xedap from "../assets/icon/ic_xeco/icon_xedap.svg";
import icon_xedien from "../assets/icon/ic_xeco/icon_xedien.svg";
import icon_xetai from "../assets/icon/ic_xeco/icon_xetai.svg";
import icon_phutung from "../assets/icon/ic_xeco/icon_phutung.svg";

import icon_dienthoai from "../assets/icon/ic_dodientu/icon_dienthoai.svg";
import icon_maytinhbang from "../assets/icon/ic_dodientu/icon_maytinhbang.svg";
import icon_laptop from "../assets/icon/ic_dodientu/icon_laptop.svg";
import icon_desktop from "../assets/icon/ic_dodientu/icon_desktop.svg";
import icon_smartwatch from "../assets/icon/ic_dodientu/icon_smartwatch.svg";
import icon_camera from "../assets/icon/ic_dodientu/icon_camera.svg";
import icon_phukien from "../assets/icon/ic_dodientu/icon_phukien.svg";
import icon_linhkien from "../assets/icon/ic_dodientu/icon_linhkien.svg";

import icon_bep from "../assets/icon/ic_donoithat/icon_bep.svg";
import icon_den from "../assets/icon/ic_donoithat/icon_den.svg";
import icon_dotrangtri from "../assets/icon/ic_donoithat/icon_dotrangtri.svg";
import icon_dungcubep from "../assets/icon/ic_donoithat/icon_dungcubep.svg";
import icon_giuong from "../assets/icon/ic_donoithat/icon_giuong.svg";
import icon_quat from "../assets/icon/ic_donoithat/icon_quat.svg";
import icon_tuke from "../assets/icon/ic_donoithat/icon_tuke.svg";
import icon_banghe from "../assets/icon/ic_donoithat/icon_banghe.svg";

import icon_dodungkhac from "../assets/icon/ic_dodungcanhan/icon_dodungkhac.svg";
import icon_dongho from "../assets/icon/ic_dodungcanhan/icon_dongho.svg";
import icon_giaydep from "../assets/icon/ic_dodungcanhan/icon_giaydep.svg";
import icon_nuochoa from "../assets/icon/ic_dodungcanhan/icon_nuochoa.svg";
import icon_quanao from "../assets/icon/ic_dodungcanhan/icon_quanao.svg";
import icon_tuixach from "../assets/icon/ic_dodungcanhan/icon_tuixach.svg";

import icon_amnhac from "../assets/icon/ic_giaitri_thethao/icon_amnhac.svg";
import icon_dothethao from "../assets/icon/ic_giaitri_thethao/icon_dothethao.svg";
import icon_game from "../assets/icon/ic_giaitri_thethao/icon_game.svg";
import icon_sach from "../assets/icon/ic_giaitri_thethao/icon_sach.svg";
import icon_sothichkhac from "../assets/icon/ic_giaitri_thethao/icon_sothichkhac.svg";

import icon_cakieng from "../assets/icon/ic_thucung/icon_cakieng.svg";
import icon_cho from "../assets/icon/ic_thucung/icon_cho.svg";
import icon_meo from "../assets/icon/ic_thucung/icon_meo.svg";
import icon_phukienthucan from "../assets/icon/ic_thucung/icon_phukienthucan.svg";

import icon_maygiat from "../assets/icon/ic_tulanhmaylanh/icon_maygiat.svg";
import icon_maylanh from "../assets/icon/ic_tulanhmaylanh/icon_maylanh.svg";
import icon_tulanh from "../assets/icon/ic_tulanhmaylanh/icon_tulanh.svg";
import Dangtin_oto from "@/components/dangtin/Dangtin_phuongtien/Dangtin_oto";

import img_chuachontindang from "../public/dangtin_empty.svg";
import addimg from "../assets/icon/addimg.png";

import { API_Dangtin } from "@/service/userService";
import Dangtin_xemay from "@/components/dangtin/Dangtin_phuongtien/Dangtin_xemay";
import Dangtin_xetai from "@/components/dangtin/Dangtin_phuongtien/Dangtin_xetai";
import Dangtin_xedien from "@/components/dangtin/Dangtin_phuongtien/Dangtin_xedien";
import Dangtin_xedap from "@/components/dangtin/Dangtin_phuongtien/Dangtin_xedap";
import Dangtin_phutung from "@/components/dangtin/Dangtin_phuongtien/Dangtin_phutung";
import Dangtin_dienthoai from "@/components/dangtin/Dangtin_dodientu/Dangtin_dienthoai";
import Dangtin_maytinhbang from "@/components/dangtin/Dangtin_dodientu/Dangtin_maytinhbang";
import Dangtin_laptop from "@/components/dangtin/Dangtin_dodientu/Dangtin_laptop";
import Dangtin_desktop from "@/components/dangtin/Dangtin_dodientu/Dangtin_desktop";
import Dangtin_mayanh from "@/components/dangtin/Dangtin_dodientu/Dangtin_mayanh";
import Dangtin_thietbideothongminh from "@/components/dangtin/Dangtin_dodientu/Dangtin_thietbideothongminh";
import Dangtin_loaiphukien from "@/components/dangtin/Dangtin_dodientu/Dangtin_loaiphukien";
import Dangtin_linhkien from "@/components/dangtin/Dangtin_dodientu/Dangtin_linhkien";
import Dangtin_banghe from "@/components/dangtin/Dangtin_donoithat/Dangtin_banghe";
import Dangtin_tuke from "@/components/dangtin/Dangtin_donoithat/Dangtin_tuke";
import Dangtin_giuongnem from "@/components/dangtin/Dangtin_donoithat/Dangtin_giuongnem";
import Dangtin_bep from "@/components/dangtin/Dangtin_donoithat/Dangtin_bep";
import Dangtin_dungcubep from "@/components/dangtin/Dangtin_donoithat/Dangtin_dungcubep";
import Dangtin_quat from "@/components/dangtin/Dangtin_donoithat/Dangtin_quat";
import Dangtin_den from "@/components/dangtin/Dangtin_donoithat/Dangtin_den";
import Dangtin_other from "@/components/dangtin/Dangtin_donoithat/Dangtin_other";
import Dangtin_tulanh from "@/components/dangtin/Dangtin_dienlanh/Dangtin_tulanh";
import Dangtin_maylanh from "@/components/dangtin/Dangtin_dienlanh/Dangtin_maylanh";
import Dangtin_maygiat from "@/components/dangtin/Dangtin_dienlanh/Dangtin_maygiat";
import Dangtin_docanhan from "@/components/dangtin/Dangtin_docanhan/Dangtin_docanhan";
import Dangtin_dogiaitri from "@/components/dangtin/Dangtin_dogiaitri/Dangtin_dogiaitri";
// toast thông báo
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button_thanhtoanMomo from "@/components/thanhtoan/Button_thanhtoanMomo";
import router from "next/router";
import jwt from "jsonwebtoken";
import { sign, verify, Secret } from "jsonwebtoken";
import Cookies from "js-cookie";
import { useMyContext } from "@/contexts/MyContext";

const Dang_tin = () => {
  // lấy para trả về từ momo khi thanh toán thành công
  useEffect(() => {
    const { resultCode } = router.query;
    // console.log("resultCode:", resultCode);
  }, []);

  const [keyDanhmuc, setkeyDanhmuc] = useState<number>(0);
  const chitiet_danhmuc: sub_danhmuc[] = item_danhmuc[keyDanhmuc].sub_danhmuc;
  const [keyTruong, setkeyTruong] = useState<number>(0);
  const chitiet_nganh: nganh[] = item_listkhoatruong[keyTruong].nganh;
  const [openDanhmuc, setopenDanhmuc] = useState(false);
  const [openDanhmucChitiet, setopenDanhmucChitiet] = useState(false);
  // chọn danh mục
  const [titleDanhmuc, settitleDanhmuc] = useState("");
  const [typeDanhmuc, settypeDanhmuc] = useState(""); //batdongsan, phuongtien,...
  // chọn danh mục chi tiết
  const [titleDanhmucChitiet, settitleDanhmucChitiet] = useState("");
  const [typeDanhmucChitiet, settypeDanhmucChitiet] = useState("");
  // chọn tình trạng (0: dasudung, 1: dasudung(dasuachua), 2: moi)
  const [tinhtrang, setTinhtrang] = useState<number>(0);
  // chon hangxe
  const [typeHang, settypeHang] = useState();
  const [dongxe, setdongxe] = useState();
  const [loaixemay, setLoaixemay] = useState(); //xeso, xetayga, xetaycon
  const [loaixedien, setLoaixedien] = useState(); //xedapdien, xemaydien
  const [dongcoxedien, setDongcoxedien] = useState(); // 200w -> 1000w
  const [loaixedap, setLoaixedap] = useState(); // xedapphothong, xedapthethao, xedaptreem
  const [loaiphutung, setLoaiphutung] = useState(); //phutungxemay, phutungoto
  const [dungtich, setDungtich] = useState(); // dung tich
  const [namsanxuat, setNamsanxuat] = useState<number | any>(); // chon namsanxuat
  const [hopso, setHopso] = useState<number>(0); // chọn hopso (0: sotudong, 1: sosan, 2: bantudong)
  const [nhienlieu, setNhienlieu] = useState<number>(0); // chọn nhienlieu (0: xang, 1: dau, 2: dien)
  const [sochongoi, setChongoi] = useState(); // chon chongoi
  const [mausac, setMausac] = useState(); // chon mausac
  const [bienso, setBienso] = useState(); // chon bienso
  const [sokm, setKM] = useState<number>(0); // chon KM
  const [taitrong, setTaitrong] = useState();
  // chon dodientu
  const [dongmay, setdongmay] = useState();
  const [dungluong, setDungluong] = useState(); // chon dungluong 8GB -> 1T
  const [ram, setRam] = useState(); // chon dungluong 8GB -> 1T
  const [kichthuocmanhinh, setKichthuocmanhinh] = useState(); // kích thước màn hình
  const [sim, setSim] = useState<number>(0); // hỗ trợ sim (0, 1)
  const [loaiocung, setLoaiocung] = useState("SSD"); // hdd, ssd
  const [loaiCardmanhinh, setCardmanhinh] = useState(); // onboard, amd, nvidia
  const [chip, setChip] = useState(); // intel core ...
  const [loaimayanh, setLoaimayanh] = useState("mayanh"); // 0: mayanh, 1:mayquay, 2:other
  const [loaithietbideo, setloaithietbideo] = useState("donghothongminh"); // 0: donghothongminh, 1:vongtaythongminh, 2:other
  const [loaiphukien, setloaiphukien] = useState(); // (manhinh, banphim, chuot, capsac, tainghe, khac)
  const [loailinhkien, setloailinhkien] = useState("linhkienmaytinh"); // 0: lienkienmaytinh, 1:linhkiendienthoai, 2:other
  // chon donoithat
  const [loaichitiet, setloaichitiet] = useState(); //ghevanphong, tuquanao,....
  // chon dienlanh
  const [thetich, setthetich] = useState(); // dưới 100 lít, ....
  const [congsuat, setcongsuat] = useState(); // 1 hp, ....
  const [khoiluonggiat, setkhoiluonggiat] = useState(); // x kg, ....
  const [cuagiat, setcuagiat] = useState(); // cửa trước, cửa trên
  // cho docanhan
  const [chogioitinh, setchogioitinh] = useState<number>(1); // 1:chonu, 2:chonam, 3:chocahai
  // cho dogiaitri
  const [loainhaccu, setloainhaccu] = useState(); // guitar, piano,...
  // chon giaban
  const [giaban_muamoi, setGiaban_muamoi] = useState<number | any>();
  const [giaban, setGiaban] = useState<number | any>();
  const [label_giaban_muamoi, setlabel_Giaban_muamoi] = useState<
    string | any
  >();
  const [label_giaban, setlabel_Giaban] = useState<string | any>();

  const setSelectDanhmuc = (item: danhmuc) => {
    settitleDanhmuc(item.label);
    settypeDanhmuc(item.type);
    setkeyDanhmuc(item.key);
    setopenDanhmuc(!openDanhmuc);
    //set lại chi tiết danh muc
    settitleDanhmucChitiet("");
    settypeDanhmucChitiet("");
    // console.log("check key: ", item.key);
    // console.log("check chitiet_danhmuc: ", chitiet_danhmuc);
  };
  const setSelectDanhmucChitiet = (item: sub_danhmuc) => {
    settitleDanhmucChitiet(item.label);
    settypeDanhmucChitiet(item.type);
    setopenDanhmucChitiet(!openDanhmucChitiet);
    console.log("check key: ", item.key);
    console.log("check type: ", item.type);
  };

  const [openKhoaTruong, setopenKhoaTruong] = useState<boolean>(false);
  const [titleKhoaTruong, settitleKhoaTruong] = useState<any>();
  const [KhoaTruong, setKhoaTruong] = useState<any>();
  const handleopenKhoaTruong = () => {
    setopenKhoaTruong(!openKhoaTruong);
    setopenNganh(false);
    // setErr_miss_input(false);
  };
  const setSelectTruongKhoa = (item: truong) => {
    settitleKhoaTruong(item.label);
    setKhoaTruong(item.type);
    setkeyTruong(item.key);
    setopenKhoaTruong(false);
  };
  const [openNganh, setopenNganh] = useState<boolean>(false);
  const [titleNganh, settitleNganh] = useState<any>();
  const [Nganh, setNganh] = useState<any>();
  const handleopenNganh = () => {
    setopenNganh(!openNganh);
    setopenKhoaTruong(false);
  };
  const setSelectNganh = (item: any) => {
    settitleNganh(item.label);
    setNganh(item.type);
    setopenNganh(false);
  };

  async function getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  const [img_arr, setImg_arr] = useState<any>([]);
  const [reviewImg_arr, setReviewImg_arr] = useState<any>([]);
  const handleFile = async (e: any) => {
    //login handle multiple file (lưu 3 ảnh chung 1 trường img)
    //chọn 1 lượt, ko chọn thêm từng ảnh.
    let files = e.target.files;
    let fileArray = Array.from(files);

    let base64Array: any = [];
    let objectURLArray: any = [];

    for (let i = 0; i < fileArray.length; i++) {
      let file: any = fileArray[i];
      //check loại file
      if (!file.type.startsWith("image/")) {
        toast.error(`File ${file.name} không phải là ảnh.`);
        continue; // bỏ qua file không phải là ảnh
      }
      let base64 = await getBase64(file);
      let objectURL = URL.createObjectURL(file);
      base64Array.push(base64);
      objectURLArray.push(objectURL);
    }
    setImg_arr((prevImg_arr: any) => [...prevImg_arr, ...base64Array]);
    setReviewImg_arr((prevReviewImg_arr: any) => [
      ...prevReviewImg_arr,
      ...objectURLArray,
    ]);
  };
  // Xóa ảnh
  const handleCloseButtonClick = (indexToRemove: number) => {
    setReviewImg_arr((prevReviewImg_arr: any) => {
      const updatedReviewImg_arr = [...prevReviewImg_arr];
      updatedReviewImg_arr.splice(indexToRemove, 1); // Xóa phần tử tại indexToRemove
      return updatedReviewImg_arr;
    });
    setImg_arr((prevImg_arr: any) => {
      const updatedImg_arr = [...prevImg_arr];
      updatedImg_arr.splice(indexToRemove, 1); // Xóa phần tử tại indexToRemove
      return updatedImg_arr;
    });
  };
  const [inputTieude, setInputTieude] = useState("");
  const [demkitutieude, setDemkituTieude] = useState(0);
  const [inputMota, setInputMota] = useState("");
  const [demkitumota, setDemkituMota] = useState(0);
  const handleChangeTieude = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (newValue.length <= 50) {
      setInputTieude(newValue);
      setDemkituTieude(newValue.length);
    }
  };
  const handleChangeMota = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    if (newValue.length <= 1500) {
      const updatedValue = newValue.replace(/\n/g, "\n"); // Thêm ký tự \n vào thay vì /n
      setInputMota(updatedValue);
      setDemkituMota(updatedValue.length);
    }
  };
  const build_data_hoctap = {
    tieude: inputTieude,
    mota: inputMota,
    type: typeDanhmucChitiet,
    tinhtrang: tinhtrang,
    new_pur_price: giaban_muamoi,
    price: giaban,
    img: img_arr,
    truong: KhoaTruong, //neu la giaotrinh
    nganh: Nganh,
  };
  const build_data_dienthoai = {
    tieude: inputTieude,
    type: typeDanhmucChitiet,
    new_pur_price: giaban_muamoi,
    price: giaban,
    hang: typeHang,
    dongmay: dongmay,
    tinhtrang: tinhtrang,
    ram: ram,
    dungluong: dungluong,
    mausac: mausac,
    mota: inputMota,
    img: img_arr,
  };
  const build_data_maytinhbang = {
    tieude: inputTieude,
    type: typeDanhmucChitiet,
    new_pur_price: giaban_muamoi,
    price: giaban,
    hang: typeHang,
    dongmay: dongmay,
    tinhtrang: tinhtrang,
    ram: ram,
    dungluong: dungluong,
    mausac: mausac,
    sim: sim,
    screensize: kichthuocmanhinh,
    mota: inputMota,
    img: img_arr,
  };
  const build_data_laptop = {
    tieude: inputTieude,
    type: typeDanhmucChitiet,
    new_pur_price: giaban_muamoi,
    price: giaban,
    hang: typeHang,
    dongmay: dongmay,
    tinhtrang: tinhtrang,
    ram: ram,
    cpu: chip,
    ocung: dungluong,
    loaiocung: loaiocung,
    screensize: kichthuocmanhinh,
    displaycard: loaiCardmanhinh,
    mota: inputMota,
    img: img_arr,
  };
  const build_data_desktop = {
    tieude: inputTieude,
    type: typeDanhmucChitiet,
    new_pur_price: giaban_muamoi,
    price: giaban,
    tinhtrang: tinhtrang,
    ram: ram,
    cpu: chip,
    ocung: dungluong,
    loaiocung: loaiocung,
    screensize: kichthuocmanhinh,
    displaycard: loaiCardmanhinh,
    mota: inputMota,
    img: img_arr,
  };
  const build_data_mayanh = {
    tieude: inputTieude,
    type: typeDanhmucChitiet,
    new_pur_price: giaban_muamoi,
    price: giaban,
    hang: typeHang,
    tinhtrang: tinhtrang,
    loaimayanh: loaimayanh,
    mota: inputMota,
    img: img_arr,
  };
  const build_data_thietbideothongminh = {
    tieude: inputTieude,
    type: typeDanhmucChitiet,
    new_pur_price: giaban_muamoi,
    price: giaban,
    tinhtrang: tinhtrang,
    loaithietbideo: loaithietbideo,
    mota: inputMota,
    img: img_arr,
  };
  const build_data_phukien = {
    tieude: inputTieude,
    type: typeDanhmucChitiet,
    new_pur_price: giaban_muamoi,
    price: giaban,
    tinhtrang: tinhtrang,
    loaiphukien: loaiphukien,
    mota: inputMota,
    img: img_arr,
  };
  const build_data_linhkien = {
    tieude: inputTieude,
    type: typeDanhmucChitiet,
    new_pur_price: giaban_muamoi,
    price: giaban,
    tinhtrang: tinhtrang,
    loailinhkien: loailinhkien,
    mota: inputMota,
    img: img_arr,
  };
  const build_data_oto = {
    tieude: inputTieude,
    type: typeDanhmucChitiet,
    new_pur_price: giaban_muamoi,
    price: giaban,
    hang: typeHang,
    dongxe: dongxe,
    tinhtrang: tinhtrang,
    mausac: mausac,
    namsanxuat: namsanxuat,
    hopso: hopso,
    nhienlieu: nhienlieu,
    sochongoi: sochongoi,
    bienso: bienso,
    sokm: sokm,
    mota: inputMota,
    img: img_arr,
  };
  const build_data_xemay = {
    tieude: inputTieude,
    type: typeDanhmucChitiet,
    new_pur_price: giaban_muamoi,
    price: giaban,
    hang: typeHang,
    dongxe: dongxe,
    tinhtrang: tinhtrang,
    mausac: mausac,
    namsanxuat: namsanxuat,
    loaixemay: loaixemay,
    dungtich: dungtich,
    bienso: bienso,
    sokm: sokm,
    mota: inputMota,
    img: img_arr,
  };
  const build_data_xetai = {
    tieude: inputTieude,
    type: typeDanhmucChitiet,
    new_pur_price: giaban_muamoi,
    price: giaban,
    hang: typeHang,
    tinhtrang: tinhtrang,
    taitrong: taitrong,
    nhienlieu: nhienlieu,
    namsanxuat: namsanxuat,
    mausac: mausac,
    bienso: bienso,
    sokm: sokm,
    mota: inputMota,
    img: img_arr,
  };
  const build_data_xedien = {
    tieude: inputTieude,
    type: typeDanhmucChitiet,
    new_pur_price: giaban_muamoi,
    price: giaban,
    tinhtrang: tinhtrang,
    loaixedien: loaixedien,
    dongcoxedien: dongcoxedien,
    mausac: mausac,
    mota: inputMota,
    img: img_arr,
  };
  const build_data_xedap = {
    tieude: inputTieude,
    type: typeDanhmucChitiet,
    new_pur_price: giaban_muamoi,
    price: giaban,
    tinhtrang: tinhtrang,
    loaixedap: loaixedap,
    mausac: mausac,
    mota: inputMota,
    img: img_arr,
  };
  const build_data_phutung = {
    tieude: inputTieude,
    type: typeDanhmucChitiet,
    new_pur_price: giaban_muamoi,
    price: giaban,
    tinhtrang: tinhtrang,
    loaiphutung: loaiphutung,
    mota: inputMota,
    img: img_arr,
  };
  const build_data_donoithat = {
    tieude: inputTieude,
    type: typeDanhmucChitiet,
    new_pur_price: giaban_muamoi,
    price: giaban,
    tinhtrang: tinhtrang,
    loaichitiet: loaichitiet,
    mota: inputMota,
    img: img_arr,
  };
  const build_data_maylanh = {
    tieude: inputTieude,
    type: typeDanhmucChitiet,
    new_pur_price: giaban_muamoi,
    hang: typeHang,
    price: giaban,
    tinhtrang: tinhtrang,
    congsuat: congsuat,
    mota: inputMota,
    img: img_arr,
  };
  const build_data_tulanh = {
    tieude: inputTieude,
    type: typeDanhmucChitiet,
    new_pur_price: giaban_muamoi,
    hang: typeHang,
    price: giaban,
    tinhtrang: tinhtrang,
    thetich: thetich,
    mota: inputMota,
    img: img_arr,
  };
  const build_data_maygiat = {
    tieude: inputTieude,
    type: typeDanhmucChitiet,
    new_pur_price: giaban_muamoi,
    hang: typeHang,
    price: giaban,
    tinhtrang: tinhtrang,
    cuagiat: cuagiat,
    khoiluonggiat: khoiluonggiat,
    mota: inputMota,
    img: img_arr,
  };
  const build_data_docanhan = {
    tieude: inputTieude,
    type: typeDanhmucChitiet,
    new_pur_price: giaban_muamoi,
    price: giaban,
    tinhtrang: tinhtrang,
    chogioitinh: chogioitinh,
    mota: inputMota,
    img: img_arr,
  };
  const build_data_dogiaitri = {
    tieude: inputTieude,
    type: typeDanhmucChitiet,
    new_pur_price: giaban_muamoi,
    price: giaban,
    tinhtrang: tinhtrang,
    loainhaccu: loainhaccu,
    mota: inputMota,
    img: img_arr,
  };
  const build_data_thucung = {
    tieude: inputTieude,
    type: typeDanhmucChitiet,
    new_pur_price: giaban_muamoi,
    price: giaban,
    mota: inputMota,
    img: img_arr,
  };
  const resetState = () => {
    setkeyDanhmuc(0);
    setkeyTruong(0);
    setopenDanhmuc(false);
    setopenDanhmucChitiet(false);
    settitleDanhmuc("");
    settypeDanhmuc("");
    settitleDanhmucChitiet("");
    settypeDanhmucChitiet("");
    setTinhtrang(0);
    settitleKhoaTruong(undefined);
    setKhoaTruong(undefined);
    settypeHang(undefined);
    setdongxe(undefined);
    setLoaixemay(undefined);
    setLoaixedien(undefined);
    setDongcoxedien(undefined);
    setLoaixedap(undefined);
    setLoaiphutung(undefined);
    setDungtich(undefined);
    setNamsanxuat(undefined);
    setHopso(0);
    setNhienlieu(0);
    setChongoi(undefined);
    setMausac(undefined);
    setBienso(undefined);
    setKM(0);
    setTaitrong(undefined);
    setdongmay(undefined);
    setDungluong(undefined);
    setRam(undefined);
    setKichthuocmanhinh(undefined);
    setSim(0);
    setLoaiocung("SSD");
    setCardmanhinh(undefined);
    setChip(undefined);
    setLoaimayanh("mayanh");
    setloaithietbideo("donghothongminh");
    setloaiphukien(undefined);
    setloailinhkien("linhkienmaytinh");
    setloaichitiet(undefined);
    setthetich(undefined);
    setcongsuat(undefined);
    setkhoiluonggiat(undefined);
    setcuagiat(undefined);
    setchogioitinh(0);
    setloainhaccu(undefined);
    setGiaban_muamoi(undefined);
    setGiaban(0);
    setImg_arr([]);
    setReviewImg_arr([]);
    setInputTieude("");
    setDemkituTieude(0);
    setInputMota("");
    setDemkituMota(0);
  };

  const handleChange_giaban_muamoi = (e: any) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const numericValue = parseInt(rawValue, 10);
    if (!isNaN(numericValue)) {
      setGiaban_muamoi(numericValue);
      setlabel_Giaban_muamoi(numericValue.toLocaleString("vi-VN"));
    } else {
      setGiaban_muamoi(undefined);
      setlabel_Giaban_muamoi(undefined);
    }
  };

  const handleChange_giaban = (e: any) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const numericValue = parseInt(rawValue, 10);
    if (!isNaN(numericValue)) {
      setGiaban(numericValue);
      setlabel_Giaban(numericValue.toLocaleString("vi-VN"));
    } else {
      setGiaban(undefined);
      setlabel_Giaban(undefined);
    }
  };

  type DataInfor = {
    _id: string;
    name: string;
    account: string;
    address: string;
    role: string;
  };
  const [datainforUser, setdatainforUser] = useState<any>();
  // const [err_miss_input, setErr_miss_input] = useState<boolean>(false);
  // const [token_cookie, setToken_cookie] = useState<any>();
  // useEffect(() => {
  //   const fetchToken = async () => {
  //     const token_cookie = Cookies.get("jwt_token");
  //     if (token_cookie) {
  //       setToken_cookie(token_cookie);
  //     }
  //   };
  //   fetchToken();
  // }, []);

  useEffect(() => {
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
        setdatainforUser(decoded);
      } catch (error) {
        console.log("Lỗi decoded token: ", error);
        setdatainforUser(null);
      }
    } else {
      router.push("/account/login");
    }
  }, []);

  const Dangtin = async () => {
    const token_req: any = localStorage.getItem("token_req");
    if (typeDanhmuc === "hoctap" && typeDanhmucChitiet == "giaotrinh") {
      if (
        KhoaTruong &&
        Nganh &&
        giaban &&
        inputTieude &&
        inputMota &&
        img_arr.length > 0
      ) {
        const response = await API_Dangtin(
          datainforUser?._id,
          typeDanhmuc,
          build_data_hoctap,
          token_req
        );
        if (response.errCode === 0) {
          toast.success("Đã gửi Tin đăng. Đợi kiểm duyệt !");
          resetState();
        }
      } else {
        toast.error("Vui lòng điền đủ thông tin có dấu (*)");
        // setErr_miss_input(true);
      }
    }
    if (typeDanhmuc === "hoctap" && typeDanhmucChitiet == "sachthamkhao") {
      if (giaban && inputTieude && inputMota && img_arr.length > 0) {
        const response = await API_Dangtin(
          datainforUser?._id,
          typeDanhmuc,
          build_data_hoctap,
          token_req
        );
        if (response.errCode === 0) {
          toast.success("Đã gửi Tin đăng. Đợi kiểm duyệt !");
          resetState();
        }
      } else {
        toast.error("Vui lòng điền đủ thông tin có dấu (*)");
        // setErr_miss_input(true);
      }
    }
    if (typeDanhmucChitiet === "dienthoai") {
      if (
        typeHang &&
        mausac &&
        giaban &&
        inputTieude &&
        inputMota &&
        img_arr.length > 0
      ) {
        const response = await API_Dangtin(
          datainforUser?._id,
          typeDanhmuc,
          build_data_dienthoai,
          token_req
        );
        if (response.errCode === 0) {
          toast.success("Đã gửi Tin đăng. Đợi kiểm duyệt !");
          resetState();
        }
      } else {
        toast.error("Vui lòng điền đủ thông tin có dấu (*)");
      }
    }
    if (typeDanhmucChitiet === "maytinhbang") {
      if (
        typeHang &&
        mausac &&
        giaban &&
        inputTieude &&
        inputMota &&
        img_arr.length > 0
      ) {
        const response = await API_Dangtin(
          datainforUser?._id,
          typeDanhmuc,
          build_data_maytinhbang,
          token_req
        );
        if (response.errCode === 0) {
          toast.success("Đã gửi Tin đăng. Đợi kiểm duyệt !");
          resetState();
        }
      } else {
        toast.error("Vui lòng điền đủ thông tin có dấu (*)");
      }
    }
    if (typeDanhmucChitiet === "laptop") {
      if (
        typeHang &&
        giaban &&
        inputTieude &&
        inputMota &&
        img_arr.length > 0
      ) {
        const response = await API_Dangtin(
          datainforUser?._id,
          typeDanhmuc,
          build_data_laptop,
          token_req
        );
        if (response.errCode === 0) {
          toast.success("Đã gửi Tin đăng. Đợi kiểm duyệt !");
          resetState();
        }
      } else {
        toast.error("Vui lòng điền đủ thông tin có dấu (*)");
      }
    }
    if (typeDanhmucChitiet === "desktop") {
      if (giaban && inputTieude && inputMota && img_arr.length > 0) {
        const response = await API_Dangtin(
          datainforUser?._id,
          typeDanhmuc,
          build_data_desktop,
          token_req
        );
        if (response.errCode === 0) {
          toast.success("Đã gửi Tin đăng. Đợi kiểm duyệt !");
          resetState();
        }
      } else {
        toast.error("Vui lòng điền đủ thông tin có dấu (*)");
      }
    }
    if (typeDanhmucChitiet === "mayanh") {
      if (
        typeHang &&
        giaban &&
        inputTieude &&
        inputMota &&
        img_arr.length > 0
      ) {
        const response = await API_Dangtin(
          datainforUser?._id,
          typeDanhmuc,
          build_data_mayanh,
          token_req
        );
        if (response.errCode === 0) {
          toast.success("Đã gửi Tin đăng. Đợi kiểm duyệt !");
          resetState();
        }
      } else {
        toast.error("Vui lòng điền đủ thông tin có dấu (*)");
      }
    }
    if (typeDanhmucChitiet === "thietbideothongminh") {
      if (giaban && inputTieude && inputMota && img_arr.length > 0) {
        const response = await API_Dangtin(
          datainforUser?._id,
          typeDanhmuc,
          build_data_thietbideothongminh,
          token_req
        );
        if (response.errCode === 0) {
          toast.success("Đã gửi Tin đăng. Đợi kiểm duyệt !");
          resetState();
        }
      } else {
        toast.error("Vui lòng điền đủ thông tin có dấu (*)");
      }
    }
    if (typeDanhmucChitiet === "phukien") {
      if (
        loaiphukien &&
        giaban &&
        inputTieude &&
        inputMota &&
        img_arr.length > 0
      ) {
        const response = await API_Dangtin(
          datainforUser?._id,
          typeDanhmuc,
          build_data_phukien,
          token_req
        );
        if (response.errCode === 0) {
          toast.success("Đã gửi Tin đăng. Đợi kiểm duyệt !");
          resetState();
        }
      } else {
        toast.error("Vui lòng điền đủ thông tin có dấu (*)");
      }
    }
    if (typeDanhmucChitiet === "linhkien") {
      if (
        loailinhkien &&
        giaban &&
        inputTieude &&
        inputMota &&
        img_arr.length > 0
      ) {
        const response = await API_Dangtin(
          datainforUser?._id,
          typeDanhmuc,
          build_data_linhkien,
          token_req
        );
        if (response.errCode === 0) {
          toast.success("Đã gửi Tin đăng. Đợi kiểm duyệt !");
          resetState();
        }
      } else {
        toast.error("Vui lòng điền đủ thông tin có dấu (*)");
      }
    }
    if (typeDanhmucChitiet === "oto") {
      if (
        typeHang &&
        namsanxuat &&
        sokm &&
        giaban &&
        inputTieude &&
        inputMota &&
        img_arr.length > 0
      ) {
        const response = await API_Dangtin(
          datainforUser?._id,
          typeDanhmuc,
          build_data_oto,
          token_req
        );
        if (response.errCode === 0) {
          toast.success("Đã gửi Tin đăng. Đợi kiểm duyệt !");
          resetState();
        }
      } else {
        toast.error("Vui lòng điền đủ thông tin có dấu (*)");
      }
    }
    if (typeDanhmucChitiet === "xemay") {
      if (
        typeHang &&
        namsanxuat &&
        sokm &&
        loaixemay &&
        giaban &&
        inputTieude &&
        inputMota &&
        img_arr.length > 0
      ) {
        const response = await API_Dangtin(
          datainforUser?._id,
          typeDanhmuc,
          build_data_xemay,
          token_req
        );
        if (response.errCode === 0) {
          toast.success("Đã gửi Tin đăng. Đợi kiểm duyệt !");
          resetState();
        }
      } else {
        toast.error("Thiếu thông tin bắt buộc xe máy. Vui lòng kiểm tra lại.");
      }
    }
    if (typeDanhmucChitiet === "xetai") {
      if (
        typeHang &&
        taitrong &&
        namsanxuat &&
        sokm &&
        giaban &&
        inputTieude &&
        inputMota &&
        img_arr.length > 0
      ) {
        const response = await API_Dangtin(
          datainforUser?._id,
          typeDanhmuc,
          build_data_xetai,
          token_req
        );
        if (response.errCode === 0) {
          toast.success("Đã gửi Tin đăng. Đợi kiểm duyệt !");
          resetState();
        }
      } else {
        toast.error("Vui lòng điền đủ thông tin có dấu (*)");
      }
    }
    if (typeDanhmucChitiet === "xedien") {
      if (
        loaixedien &&
        giaban &&
        inputTieude &&
        inputMota &&
        img_arr.length > 0
      ) {
        const response = await API_Dangtin(
          datainforUser?._id,
          typeDanhmuc,
          build_data_xedien,
          token_req
        );
        if (response.errCode === 0) {
          toast.success("Đã gửi Tin đăng. Đợi kiểm duyệt !");
          resetState();
        }
      } else {
        toast.error("Vui lòng điền đủ thông tin có dấu (*)");
      }
    }
    if (typeDanhmucChitiet === "xedap") {
      if (
        loaixedap &&
        giaban &&
        inputTieude &&
        inputMota &&
        img_arr.length > 0
      ) {
        const response = await API_Dangtin(
          datainforUser?._id,
          typeDanhmuc,
          build_data_xedap,
          token_req
        );
        if (response.errCode === 0) {
          toast.success("Đã gửi Tin đăng. Đợi kiểm duyệt !");
          resetState();
        }
      } else {
        toast.error("Vui lòng điền đủ thông tin có dấu (*)");
      }
    }
    if (typeDanhmucChitiet === "phutung") {
      if (
        loaiphutung &&
        giaban &&
        inputTieude &&
        inputMota &&
        img_arr.length > 0
      ) {
        const response = await API_Dangtin(
          datainforUser?._id,
          typeDanhmuc,
          build_data_phutung,
          token_req
        );
        if (response.errCode === 0) {
          toast.success("Đã gửi Tin đăng. Đợi kiểm duyệt !");
          resetState();
        }
      } else {
        toast.error("Vui lòng điền đủ thông tin có dấu (*)");
      }
    }
    if (typeDanhmuc === "donoithat") {
      if (
        loaichitiet &&
        giaban &&
        inputTieude &&
        inputMota &&
        img_arr.length > 0
      ) {
        const response = await API_Dangtin(
          datainforUser?._id,
          typeDanhmuc,
          build_data_donoithat,
          token_req
        );
        if (response.errCode === 0) {
          toast.success("Đã gửi Tin đăng. Đợi kiểm duyệt !");
          resetState();
        }
      } else {
        toast.error("Vui lòng điền đủ thông tin có dấu (*)");
      }
    }
    if (typeDanhmucChitiet === "tulanh") {
      if (
        typeHang &&
        thetich &&
        giaban &&
        inputTieude &&
        inputMota &&
        img_arr.length > 0
      ) {
        const response = await API_Dangtin(
          datainforUser?._id,
          typeDanhmuc,
          build_data_tulanh,
          token_req
        );
        if (response.errCode === 0) {
          toast.success("Đã gửi Tin đăng. Đợi kiểm duyệt !");
          resetState();
        }
      } else {
        toast.error("Vui lòng điền đủ thông tin có dấu (*)");
      }
    }
    if (typeDanhmucChitiet === "maylanh") {
      if (
        typeHang &&
        congsuat &&
        giaban &&
        inputTieude &&
        inputMota &&
        img_arr.length > 0
      ) {
        const response = await API_Dangtin(
          datainforUser?._id,
          typeDanhmuc,
          build_data_maylanh,
          token_req
        );
        if (response.errCode === 0) {
          toast.success("Đã gửi Tin đăng. Đợi kiểm duyệt !");
          resetState();
        }
      } else {
        toast.error("Vui lòng điền đủ thông tin có dấu (*)");
      }
    }
    if (typeDanhmucChitiet === "maygiat") {
      if (
        typeHang &&
        giaban &&
        inputTieude &&
        inputMota &&
        img_arr.length > 0
      ) {
        const response = await API_Dangtin(
          datainforUser?._id,
          typeDanhmuc,
          build_data_maygiat,
          token_req
        );
        if (response.errCode === 0) {
          toast.success("Đã gửi Tin đăng. Đợi kiểm duyệt !");
          resetState();
        }
      } else {
        toast.error("Vui lòng điền đủ thông tin có dấu (*)");
      }
    }
    if (typeDanhmuc === "dodungcanhan") {
      if (
        chogioitinh &&
        giaban &&
        inputTieude &&
        inputMota &&
        img_arr.length > 0
      ) {
        const response = await API_Dangtin(
          datainforUser?._id,
          typeDanhmuc,
          build_data_docanhan,
          token_req
        );
        if (response.errCode === 0) {
          toast.success("Đã gửi Tin đăng. Đợi kiểm duyệt !");
          resetState();
        }
      } else {
        toast.error("Vui lòng điền đủ thông tin có dấu (*)");
      }
    }
    if (typeDanhmuc === "dogiaitri") {
      if (giaban && inputTieude && inputMota && img_arr.length > 0) {
        const response = await API_Dangtin(
          datainforUser?._id,
          typeDanhmuc,
          build_data_dogiaitri,
          token_req
        );
        if (response.errCode === 0) {
          toast.success("Đã gửi Tin đăng. Đợi kiểm duyệt !");
          resetState();
        }
      } else {
        toast.error("Vui lòng điền đủ thông tin có dấu (*)");
      }
    }
    if (typeDanhmuc === "thucung") {
      if (giaban && inputTieude && inputMota && img_arr.length > 0) {
        const response = await API_Dangtin(
          datainforUser?._id,
          typeDanhmuc,
          build_data_thucung,
          token_req
        );
        if (response.errCode === 0) {
          toast.success("Đã gửi Tin đăng. Đợi kiểm duyệt !");
          resetState();
        }
      } else {
        toast.error("Vui lòng điền đủ thông tin có dấu (*)");
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>2Hand Market - Đăng tin</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon_2handmarket.png" />
      </Head>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="absolute h-auto w-full top-0 left-0">
        <Header />
      </div>
      <div className="h-auto min-h-screen w-[100%] lg:pt-[80px] md:pt-[115px] sm:pt-[60px] bg-gray-100 flex flex-col place-content-between">
        <div>
          {/* Điều hướng */}
          <div className="h-[60px] w-full flex items-center justify-center mt-2">
            <div className="h-full w-[960px] bg-white sm:text-lg md:text-xl flex items-center p-1 rounded-lg shadow-md">
              <Danhmuc />
              <p className="h-full w-auto flex items-center ml-3">
                Trang chủ / Đăng tin
              </p>
            </div>
          </div>
          <div className="h-auto w-full flex items-center justify-center my-3">
            <div className="bg-white shadow-sm h-auto min-h-[570px] w-auto sm:w-full lg:max-w-[960px] pb-5">
              <div className=" p-2 py-3 w-full flex place-content-between items-center">
                <p className="text-xl font-bold">
                  Đăng tin sản phẩm bạn muốn bán
                </p>
              </div>
              <div className="h-auto w-full flex sm:flex-col md:items-center lg:flex-row lg:items-start">
                <div className="h-full sm:w-full md:w-[320px] px-2 space-y-2">
                  <div className="flex">
                    <p className="text-lg font-bold">Hình ảnh sản phẩm</p>
                    <p className="text-red-500 text-xl ml-1">*</p>
                  </div>
                  <div className="lg:h-[230px] sm:h-[130px] w-full border border-dotted border-blue-500">
                    <div className="h-full w-full relative overflow-hidden">
                      <input
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                          handleFile(e);
                        }}
                      />
                      <button className="h-full w-full bg-gray-100 text-white text-lg cursor-pointer">
                        <div className="h-full w-full flex flex-col items-center justify-center space-y-5">
                          <Image
                            src={addimg}
                            alt="icon"
                            className="w-[32px] h-[32px] scale-150"
                          />
                          <p className="text-black font-thin">
                            Tải ảnh lên từ 1 đến 5 ảnh sản phẩm
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>
                  {/* review img */}
                  <div className="h-auto w-full flex flex-wrap gap-[5px]">
                    {reviewImg_arr !== null && reviewImg_arr !== "" ? (
                      reviewImg_arr?.map((item_img: any, index: number) => {
                        return (
                          <div
                            key={index}
                            className="h-[100px] w-[97px] flex items-center justify-center relative"
                          >
                            <div
                              className="h-full w-full bg-center bg-contain bg-no-repeat border border-blue-400"
                              style={{ backgroundImage: `url(${item_img})` }}
                            ></div>
                            <button
                              className="absolute z-10 h-[24px] w-[24px] top-[-7px] right-[-10px] p-1 bg-black text-white rounded-full text-xs"
                              onClick={() => handleCloseButtonClick(index)}
                            >
                              X
                            </button>

                            <div
                              className={
                                index === 0
                                  ? `h-[25px] w-full bg-black opacity-80 text-white flex items-center justify-center absolute z-10 bottom-[1px]`
                                  : ""
                              }
                            >
                              {index === 0 ? `Ảnh bìa` : ``}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="h-auto sm:w-full md:w-[640px] px-2 space-y-3">
                  {/* chọn danh mục */}
                  <div className="relative">
                    <div className="mb-2 px-1 flex">
                      <p className="">Danh mục Tin đăng</p>
                      <p className="text-red-500 ml-1">*</p>
                    </div>
                    <div
                      onClick={() => setopenDanhmuc(!openDanhmuc)}
                      className={`h-[45px] w-full bg-white border border-gray-400 rounded-md outline-none p-2 flex mr-2 cursor-pointer ${
                        openDanhmuc ? "border-blue-700" : ""
                      }`}
                    >
                      {typeDanhmuc && (
                        <Image
                          src={
                            typeDanhmuc == "hoctap"
                              ? icon_sach
                              : "" || typeDanhmuc == "phuongtien"
                              ? icon_xeco
                              : "" || typeDanhmuc == "dodientu"
                              ? icon_dodientu
                              : "" || typeDanhmuc == "donoithat"
                              ? icon_donoithat
                              : "" || typeDanhmuc == "dienlanh"
                              ? icon_dienlanh
                              : "" || typeDanhmuc == "dodungcanhan"
                              ? icon_dodungcanhan
                              : "" || typeDanhmuc == "dogiaitri"
                              ? icon_giaitri
                              : "" || typeDanhmuc == "thucung"
                              ? icon_thucung
                              : ""
                          }
                          alt="icon"
                          className="w-[24px] h-[24px] mr-2"
                        />
                      )}
                      {titleDanhmuc}
                    </div>
                    {openDanhmuc && (
                      <div className="absolute z-20 mt-1 h-auto w-full bg-white border border-gray-400 shadow-lg">
                        {item_danhmuc &&
                          item_danhmuc.map((item: danhmuc) => {
                            return (
                              <div
                                key={item.key}
                                className="h-[40px] w-full hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                                onClick={() => setSelectDanhmuc(item)}
                              >
                                <Image
                                  src={
                                    item.key === 0
                                      ? icon_sach
                                      : "" || item.key === 1
                                      ? icon_xeco
                                      : "" || item.key === 2
                                      ? icon_dodientu
                                      : "" || item.key === 3
                                      ? icon_donoithat
                                      : "" || item.key === 4
                                      ? icon_dienlanh
                                      : "" || item.key === 5
                                      ? icon_dodungcanhan
                                      : "" || item.key === 6
                                      ? icon_giaitri
                                      : "" || item.key === 7
                                      ? icon_thucung
                                      : ""
                                  }
                                  alt="icon"
                                  className="w-[24px] h-[24px] mr-2"
                                />
                                {item.label}
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </div>

                  {/* chọn chi tiết danh mục */}
                  <div hidden={!typeDanhmuc} className="relative">
                    <div className="mb-1 px-1 flex">
                      <p>Loại</p>
                      <p className="text-red-500 ml-1">*</p>
                    </div>
                    <div
                      onClick={() => setopenDanhmucChitiet(!openDanhmucChitiet)}
                      className={`h-[45px] w-full bg-white border border-gray-400 rounded-md outline-none p-2 flex mr-2 cursor-pointer ${
                        openDanhmucChitiet ? "border-blue-700" : ""
                      }`}
                    >
                      {typeDanhmuc &&
                        typeDanhmuc === "phuongtien" &&
                        typeDanhmucChitiet && (
                          <Image
                            src={
                              typeDanhmucChitiet == "oto"
                                ? icon_oto
                                : "" || typeDanhmucChitiet == "xemay"
                                ? icon_xemay
                                : "" || typeDanhmucChitiet == "xetai"
                                ? icon_xetai
                                : "" || typeDanhmucChitiet == "xedien"
                                ? icon_xedien
                                : "" || typeDanhmucChitiet == "xedap"
                                ? icon_xedap
                                : "" || typeDanhmucChitiet == "phutung"
                                ? icon_phutung
                                : ""
                            }
                            alt="icon"
                            className="w-[32px] h-[32px] mr-2"
                          />
                        )}
                      {typeDanhmuc &&
                        typeDanhmuc === "dodientu" &&
                        typeDanhmucChitiet && (
                          <Image
                            src={
                              typeDanhmucChitiet == "dienthoai"
                                ? icon_dienthoai
                                : "" || typeDanhmucChitiet == "maytinhbang"
                                ? icon_maytinhbang
                                : "" || typeDanhmucChitiet == "laptop"
                                ? icon_laptop
                                : "" || typeDanhmucChitiet == "desktop"
                                ? icon_desktop
                                : "" ||
                                  typeDanhmucChitiet == "thietbideothongminh"
                                ? icon_smartwatch
                                : "" || typeDanhmucChitiet == "mayanh"
                                ? icon_camera
                                : "" || typeDanhmucChitiet == "phukien"
                                ? icon_phukien
                                : "" || typeDanhmucChitiet == "linhkien"
                                ? icon_linhkien
                                : ""
                            }
                            alt="icon"
                            className="w-[32px] h-[32px] mr-2"
                          />
                        )}
                      {typeDanhmuc &&
                        typeDanhmuc === "donoithat" &&
                        typeDanhmucChitiet && (
                          <Image
                            src={
                              typeDanhmucChitiet == "banghe"
                                ? icon_banghe
                                : "" || typeDanhmucChitiet == "tuke"
                                ? icon_tuke
                                : "" || typeDanhmucChitiet == "giuong"
                                ? icon_giuong
                                : "" || typeDanhmucChitiet == "bep"
                                ? icon_bep
                                : "" || typeDanhmucChitiet == "dungcubep"
                                ? icon_dungcubep
                                : "" || typeDanhmucChitiet == "quat"
                                ? icon_quat
                                : "" || typeDanhmucChitiet == "den"
                                ? icon_den
                                : "" || typeDanhmucChitiet == "other_donoithat"
                                ? icon_dotrangtri
                                : ""
                            }
                            alt="icon"
                            className="w-[32px] h-[32px] mr-2"
                          />
                        )}
                      {typeDanhmuc &&
                        typeDanhmuc === "dienlanh" &&
                        typeDanhmucChitiet && (
                          <Image
                            src={
                              typeDanhmucChitiet == "tulanh"
                                ? icon_tulanh
                                : "" || typeDanhmucChitiet == "maygiat"
                                ? icon_maygiat
                                : "" || typeDanhmucChitiet == "maylanh"
                                ? icon_maylanh
                                : ""
                            }
                            alt="icon"
                            className="w-[32px] h-[32px] mr-2"
                          />
                        )}
                      {typeDanhmuc &&
                        typeDanhmuc === "dodungcanhan" &&
                        typeDanhmucChitiet && (
                          <Image
                            src={
                              typeDanhmucChitiet == "quanao"
                                ? icon_quanao
                                : "" || typeDanhmucChitiet == "dongho"
                                ? icon_dongho
                                : "" || typeDanhmucChitiet == "giaydep"
                                ? icon_giaydep
                                : "" || typeDanhmucChitiet == "nuochoa"
                                ? icon_nuochoa
                                : "" || typeDanhmucChitiet == "balo"
                                ? icon_tuixach
                                : "" || typeDanhmucChitiet == "other_docanhan"
                                ? icon_dodungkhac
                                : ""
                            }
                            alt="icon"
                            className="w-[32px] h-[32px] mr-2"
                          />
                        )}
                      {typeDanhmuc &&
                        typeDanhmuc === "dogiaitri" &&
                        typeDanhmucChitiet && (
                          <Image
                            src={
                              typeDanhmucChitiet == "nhaccu"
                                ? icon_amnhac
                                : "" || typeDanhmucChitiet == "sach"
                                ? icon_sach
                                : "" || typeDanhmucChitiet == "dothethao"
                                ? icon_dothethao
                                : "" || typeDanhmucChitiet == "thietbichoigame"
                                ? icon_game
                                : "" || typeDanhmucChitiet == "other_dogiaitri"
                                ? icon_sothichkhac
                                : ""
                            }
                            alt="icon"
                            className="w-[32px] h-[32px] mr-2"
                          />
                        )}
                      {typeDanhmuc &&
                        typeDanhmuc === "thucung" &&
                        typeDanhmucChitiet && (
                          <Image
                            src={
                              typeDanhmucChitiet == "cho"
                                ? icon_cho
                                : "" || typeDanhmucChitiet == "meo"
                                ? icon_meo
                                : "" || typeDanhmucChitiet == "ca"
                                ? icon_cakieng
                                : "" || typeDanhmucChitiet == "other_thucung"
                                ? icon_phukienthucan
                                : ""
                            }
                            alt="icon"
                            className="w-[32px] h-[32px] mr-2"
                          />
                        )}
                      {titleDanhmucChitiet}
                    </div>
                    {openDanhmucChitiet && (
                      <div className="absolute z-10 mt-1 h-auto w-full bg-white border border-gray-400 shadow-lg">
                        {chitiet_danhmuc &&
                          chitiet_danhmuc.map((item: sub_danhmuc) => {
                            return (
                              <div
                                key={item.key}
                                className="h-[40px] w-full hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                                onClick={() => setSelectDanhmucChitiet(item)}
                              >
                                {typeDanhmuc &&
                                  typeDanhmuc === "phuongtien" && (
                                    <Image
                                      src={
                                        item.type == "oto"
                                          ? icon_oto
                                          : "" || item.type == "xemay"
                                          ? icon_xemay
                                          : "" || item.type == "xetai"
                                          ? icon_xetai
                                          : "" || item.type == "xedien"
                                          ? icon_xedien
                                          : "" || item.type == "xedap"
                                          ? icon_xedap
                                          : "" || item.type == "phutung"
                                          ? icon_phutung
                                          : ""
                                      }
                                      alt="icon"
                                      className="w-[32px] h-[32px] mr-2"
                                    />
                                  )}
                                {typeDanhmuc && typeDanhmuc === "dodientu" && (
                                  <Image
                                    src={
                                      item.type == "dienthoai"
                                        ? icon_dienthoai
                                        : "" || item.type == "maytinhbang"
                                        ? icon_maytinhbang
                                        : "" || item.type == "laptop"
                                        ? icon_laptop
                                        : "" || item.type == "desktop"
                                        ? icon_desktop
                                        : "" ||
                                          item.type == "thietbideothongminh"
                                        ? icon_smartwatch
                                        : "" || item.type == "mayanh"
                                        ? icon_camera
                                        : "" || item.type == "phukien"
                                        ? icon_phukien
                                        : "" || item.type == "linhkien"
                                        ? icon_linhkien
                                        : ""
                                    }
                                    alt="icon"
                                    className="w-[32px] h-[32px] mr-2"
                                  />
                                )}
                                {typeDanhmuc && typeDanhmuc === "donoithat" && (
                                  <Image
                                    src={
                                      item.type == "banghe"
                                        ? icon_banghe
                                        : "" || item.type == "tuke"
                                        ? icon_tuke
                                        : "" || item.type == "giuong"
                                        ? icon_giuong
                                        : "" || item.type == "bep"
                                        ? icon_bep
                                        : "" || item.type == "dungcubep"
                                        ? icon_dungcubep
                                        : "" || item.type == "quat"
                                        ? icon_quat
                                        : "" || item.type == "den"
                                        ? icon_den
                                        : "" || item.type == "other_donoithat"
                                        ? icon_dotrangtri
                                        : ""
                                    }
                                    alt="icon"
                                    className="w-[32px] h-[32px] mr-2"
                                  />
                                )}
                                {typeDanhmuc && typeDanhmuc === "dienlanh" && (
                                  <Image
                                    src={
                                      item.type == "tulanh"
                                        ? icon_tulanh
                                        : "" || item.type == "maygiat"
                                        ? icon_maygiat
                                        : "" || item.type == "maylanh"
                                        ? icon_maylanh
                                        : ""
                                    }
                                    alt="icon"
                                    className="w-[32px] h-[32px] mr-2"
                                  />
                                )}
                                {typeDanhmuc &&
                                  typeDanhmuc === "dodungcanhan" && (
                                    <Image
                                      src={
                                        item.type == "quanao"
                                          ? icon_quanao
                                          : "" || item.type == "dongho"
                                          ? icon_dongho
                                          : "" || item.type == "giaydep"
                                          ? icon_giaydep
                                          : "" || item.type == "nuochoa"
                                          ? icon_nuochoa
                                          : "" || item.type == "balo"
                                          ? icon_tuixach
                                          : "" || item.type == "other_docanhan"
                                          ? icon_dodungkhac
                                          : ""
                                      }
                                      alt="icon"
                                      className="w-[32px] h-[32px] mr-2"
                                    />
                                  )}
                                {typeDanhmuc && typeDanhmuc === "dogiaitri" && (
                                  <Image
                                    src={
                                      item.type == "nhaccu"
                                        ? icon_amnhac
                                        : "" || item.type == "sach"
                                        ? icon_sach
                                        : "" || item.type == "dothethao"
                                        ? icon_dothethao
                                        : "" || item.type == "thietbichoigame"
                                        ? icon_game
                                        : "" || item.type == "other_dogiaitri"
                                        ? icon_sothichkhac
                                        : ""
                                    }
                                    alt="icon"
                                    className="w-[32px] h-[32px] mr-2"
                                  />
                                )}
                                {typeDanhmuc && typeDanhmuc === "thucung" && (
                                  <Image
                                    src={
                                      item.type == "cho"
                                        ? icon_cho
                                        : "" || item.type == "meo"
                                        ? icon_meo
                                        : "" || item.type == "ca"
                                        ? icon_cakieng
                                        : "" || item.type == "other_thucung"
                                        ? icon_phukienthucan
                                        : ""
                                    }
                                    alt="icon"
                                    className="w-[32px] h-[32px] mr-2"
                                  />
                                )}
                                {item.label}
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </div>

                  {/* tình trạng từng sản phẩm */}
                  {typeDanhmucChitiet &&
                    typeDanhmuc !== "dodientu" &&
                    typeDanhmuc !== "thucung" && (
                      <>
                        <p className="text-lg font-bold pt-3">
                          Thông tin chi tiết
                        </p>
                        <div className="h-[65px] w-full">
                          <div className="h-[30px] px-1 flex">
                            <p>Tình trạng</p>
                            <p className="text-red-500 ml-1">*</p>
                          </div>
                          <div className="flex item-center space-x-3">
                            <button
                              onClick={() => setTinhtrang(0)}
                              className={`h-[35px] w-[100px] border border-mauxanhtroi text-mauxanhtroi hover:opacity-80 rounded-full ${
                                tinhtrang === 0
                                  ? "bg-mauxanhtroi text-white"
                                  : ""
                              }`}
                            >
                              Đã sử dụng
                            </button>
                            <button
                              onClick={() => setTinhtrang(1)}
                              className={`h-[35px] w-[100px] border border-mauxanhtroi text-mauxanhtroi hover:opacity-80 rounded-full ${
                                tinhtrang === 1
                                  ? "bg-mauxanhtroi text-white"
                                  : ""
                              }`}
                            >
                              Mới
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  {typeDanhmucChitiet && typeDanhmuc == "dodientu" && (
                    <>
                      <p className="text-lg font-bold pt-3">
                        Thông tin chi tiết
                      </p>
                      <div className="h-[65px] w-full">
                        <div className="h-[30px] px-1 flex">
                          <p>Tình trạng</p>
                          <p className="text-red-500 ml-1">*</p>
                        </div>
                        <div className="flex item-center space-x-3">
                          <button
                            onClick={() => setTinhtrang(0)}
                            className={`h-[35px] w-auto px-3 border border-mauxanhtroi text-mauxanhtroi hover:opacity-80 rounded-full ${
                              tinhtrang === 0 ? "bg-mauxanhtroi text-white" : ""
                            }`}
                          >
                            Đã sử dụng (chưa sửa chữa)
                          </button>
                          <button
                            onClick={() => setTinhtrang(1)}
                            className={`h-[35px] w-auto px-3 border border-mauxanhtroi text-mauxanhtroi hover:opacity-80 rounded-full ${
                              tinhtrang === 1 ? "bg-mauxanhtroi text-white" : ""
                            }`}
                          >
                            Đã sử dụng (có sửa chữa)
                          </button>
                          <button
                            onClick={() => setTinhtrang(2)}
                            className={`h-[35px] w-auto px-3 border border-mauxanhtroi text-mauxanhtroi hover:opacity-80 rounded-full ${
                              tinhtrang === 2 ? "bg-mauxanhtroi text-white" : ""
                            }`}
                          >
                            Mới
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                  {/* cho hoc tap */}
                  {typeDanhmucChitiet && typeDanhmucChitiet === "giaotrinh" && (
                    <div>
                      <div className="relative mb-3">
                        <div className="mb-1 px-1 flex">
                          <p>Khoa / Trường</p>
                          <p className="text-red-500 ml-1 mr-5">*</p>
                        </div>
                        <div
                          onClick={() => handleopenKhoaTruong()}
                          className={`h-[45px] w-full bg-white border border-gray-400 rounded-md outline-none p-2 flex mr-2 cursor-pointer ${
                            openKhoaTruong ? "border-blue-700" : ""
                          }`}
                        >
                          {titleKhoaTruong}
                        </div>
                        {openKhoaTruong && (
                          <div className="absolute z-20 mt-1 h-[250px] w-full bg-white border border-gray-400 shadow-lg overflow-auto">
                            {item_listkhoatruong &&
                              item_listkhoatruong.map((item: truong) => {
                                return (
                                  <div
                                    key={item.key}
                                    className="h-[40px] w-full hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                                    onClick={() => setSelectTruongKhoa(item)}
                                  >
                                    {item.label}
                                  </div>
                                );
                              })}
                          </div>
                        )}
                      </div>
                      <div className="relative">
                        <div className="mb-1 px-1 flex">
                          <p>Ngành</p>
                          <p className="text-red-500 ml-1 mr-5">*</p>
                        </div>
                        <div
                          onClick={() => handleopenNganh()}
                          className={`h-[45px] w-full bg-white border border-gray-400 rounded-md outline-none p-2 flex mr-2 cursor-pointer ${
                            openNganh ? "border-blue-700" : ""
                          }`}
                        >
                          {titleNganh}
                        </div>
                        {openNganh && (
                          <div className="absolute z-20 mt-1 h-auto max-h-[250px] w-full bg-white border border-gray-400 shadow-lg overflow-auto">
                            {chitiet_nganh &&
                              chitiet_nganh.map((item: nganh) => {
                                return (
                                  <div
                                    key={item.key}
                                    className="h-[40px] w-full hover:bg-gray-200 flex items-center px-2 cursor-pointer"
                                    onClick={() => setSelectNganh(item)}
                                  >
                                    {item.label}
                                  </div>
                                );
                              })}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* cho phuongtien */}
                  {typeDanhmucChitiet && typeDanhmucChitiet === "oto" && (
                    <Dangtin_oto
                      settypeHang={settypeHang}
                      dongxe={dongxe}
                      setdongxe={setdongxe}
                      setNamsanxuat={setNamsanxuat}
                      hopso={hopso}
                      setHopso={setHopso}
                      nhienlieu={nhienlieu}
                      setNhienlieu={setNhienlieu}
                      setChongoi={setChongoi}
                      setMausac={setMausac}
                      setBienso={setBienso}
                      setKM={setKM}
                      setGiaban={setGiaban}
                    />
                  )}
                  {typeDanhmucChitiet && typeDanhmucChitiet === "xemay" && (
                    <Dangtin_xemay
                      settypeHang={settypeHang}
                      dongxe={dongxe}
                      setdongxe={setdongxe}
                      setLoaixemay={setLoaixemay}
                      setNamsanxuat={setNamsanxuat}
                      setDungtich={setDungtich}
                      setMausac={setMausac}
                      setBienso={setBienso}
                      setKM={setKM}
                      setGiaban={setGiaban}
                    />
                  )}
                  {typeDanhmucChitiet && typeDanhmucChitiet === "xetai" && (
                    <Dangtin_xetai
                      settypeHang={settypeHang}
                      setNamsanxuat={setNamsanxuat}
                      setTaitrong={setTaitrong}
                      nhienlieu={nhienlieu}
                      setNhienlieu={setNhienlieu}
                      setMausac={setMausac}
                      setBienso={setBienso}
                      setKM={setKM}
                      setGiaban={setGiaban}
                    />
                  )}
                  {typeDanhmucChitiet && typeDanhmucChitiet === "xedien" && (
                    <Dangtin_xedien
                      setLoaixedien={setLoaixedien}
                      setMausac={setMausac}
                      setGiaban={setGiaban}
                      setDongcoxedien={setDongcoxedien}
                    />
                  )}
                  {typeDanhmucChitiet && typeDanhmucChitiet === "xedap" && (
                    <Dangtin_xedap
                      setLoaixedap={setLoaixedap}
                      setMausac={setMausac}
                      setGiaban={setGiaban}
                    />
                  )}
                  {typeDanhmucChitiet && typeDanhmucChitiet === "phutung" && (
                    <Dangtin_phutung
                      setLoaiphutung={setLoaiphutung}
                      setGiaban={setGiaban}
                    />
                  )}
                  {/* cho dodientu */}
                  {typeDanhmucChitiet && typeDanhmucChitiet === "dienthoai" && (
                    <Dangtin_dienthoai
                      settypeHang={settypeHang}
                      dongmay={dongmay}
                      setdongmay={setdongmay}
                      mausac={mausac}
                      setMausac={setMausac}
                      dungluong={dungluong}
                      setDungluong={setDungluong}
                      ram={ram}
                      setRam={setRam}
                      setGiaban={setGiaban}
                    />
                  )}
                  {typeDanhmucChitiet &&
                    typeDanhmucChitiet === "maytinhbang" && (
                      <Dangtin_maytinhbang
                        settypeHang={settypeHang}
                        dongmay={dongmay}
                        setdongmay={setdongmay}
                        mausac={mausac}
                        setMausac={setMausac}
                        dungluong={dungluong}
                        setDungluong={setDungluong}
                        ram={ram}
                        setRam={setRam}
                        kichthuocmanhinh={kichthuocmanhinh}
                        setKichthuocmanhinh={setKichthuocmanhinh}
                        sim={sim}
                        setSim={setSim}
                        setGiaban={setGiaban}
                      />
                    )}
                  {typeDanhmucChitiet && typeDanhmucChitiet === "laptop" && (
                    <Dangtin_laptop
                      settypeHang={settypeHang}
                      dongmay={dongmay}
                      setdongmay={setdongmay}
                      dungluong={dungluong}
                      setDungluong={setDungluong}
                      ram={ram}
                      setRam={setRam}
                      kichthuocmanhinh={kichthuocmanhinh}
                      setKichthuocmanhinh={setKichthuocmanhinh}
                      loaiocung={loaiocung}
                      setLoaiocung={setLoaiocung}
                      loaiCardmanhinh={loaiCardmanhinh}
                      setCardmanhinh={setCardmanhinh}
                      chip={chip}
                      setChip={setChip}
                      setGiaban={setGiaban}
                    />
                  )}
                  {typeDanhmucChitiet && typeDanhmucChitiet === "desktop" && (
                    <Dangtin_desktop
                      dungluong={dungluong}
                      setDungluong={setDungluong}
                      ram={ram}
                      setRam={setRam}
                      kichthuocmanhinh={kichthuocmanhinh}
                      setKichthuocmanhinh={setKichthuocmanhinh}
                      loaiocung={loaiocung}
                      setLoaiocung={setLoaiocung}
                      loaiCardmanhinh={loaiCardmanhinh}
                      setCardmanhinh={setCardmanhinh}
                      chip={chip}
                      setChip={setChip}
                      setGiaban={setGiaban}
                    />
                  )}
                  {typeDanhmucChitiet && typeDanhmucChitiet === "mayanh" && (
                    <Dangtin_mayanh
                      settypeHang={settypeHang}
                      loaimayanh={loaimayanh}
                      setLoaimayanh={setLoaimayanh}
                      setGiaban={setGiaban}
                    />
                  )}
                  {typeDanhmucChitiet &&
                    typeDanhmucChitiet === "thietbideothongminh" && (
                      <Dangtin_thietbideothongminh
                        loaithietbideo={loaithietbideo}
                        setloaithietbideo={setloaithietbideo}
                        setGiaban={setGiaban}
                      />
                    )}
                  {typeDanhmucChitiet && typeDanhmucChitiet === "phukien" && (
                    <Dangtin_loaiphukien
                      setloaiphukien={setloaiphukien}
                      setGiaban={setGiaban}
                    />
                  )}
                  {typeDanhmucChitiet && typeDanhmucChitiet === "linhkien" && (
                    <Dangtin_linhkien
                      loailinhkien={loailinhkien}
                      setloailinhkien={setloailinhkien}
                      setGiaban={setGiaban}
                    />
                  )}
                  {/* cho donoithat */}
                  {typeDanhmucChitiet && typeDanhmucChitiet === "banghe" && (
                    <Dangtin_banghe
                      setloaichitiet={setloaichitiet}
                      setGiaban={setGiaban}
                    />
                  )}
                  {typeDanhmucChitiet && typeDanhmucChitiet === "tuke" && (
                    <Dangtin_tuke
                      setloaichitiet={setloaichitiet}
                      setGiaban={setGiaban}
                    />
                  )}
                  {typeDanhmucChitiet && typeDanhmucChitiet === "giuong" && (
                    <Dangtin_giuongnem
                      setloaichitiet={setloaichitiet}
                      setGiaban={setGiaban}
                    />
                  )}
                  {typeDanhmucChitiet && typeDanhmucChitiet === "bep" && (
                    <Dangtin_bep
                      setloaichitiet={setloaichitiet}
                      setGiaban={setGiaban}
                    />
                  )}
                  {typeDanhmucChitiet && typeDanhmucChitiet === "dungcubep" && (
                    <Dangtin_dungcubep
                      setloaichitiet={setloaichitiet}
                      setGiaban={setGiaban}
                    />
                  )}
                  {typeDanhmucChitiet && typeDanhmucChitiet === "quat" && (
                    <Dangtin_quat
                      setloaichitiet={setloaichitiet}
                      setGiaban={setGiaban}
                    />
                  )}
                  {typeDanhmucChitiet && typeDanhmucChitiet === "den" && (
                    <Dangtin_den
                      setloaichitiet={setloaichitiet}
                      setGiaban={setGiaban}
                    />
                  )}
                  {typeDanhmucChitiet &&
                    typeDanhmucChitiet === "other" &&
                    typeDanhmuc === "donoithat" && (
                      <Dangtin_other setGiaban={setGiaban} />
                    )}
                  {/* cho dienlanh */}
                  {typeDanhmucChitiet && typeDanhmucChitiet === "tulanh" && (
                    <Dangtin_tulanh
                      settypeHang={settypeHang}
                      setthetich={setthetich}
                      setGiaban={setGiaban}
                    />
                  )}
                  {typeDanhmucChitiet && typeDanhmucChitiet === "maylanh" && (
                    <Dangtin_maylanh
                      settypeHang={settypeHang}
                      setcongsuat={setcongsuat}
                      setGiaban={setGiaban}
                    />
                  )}
                  {typeDanhmucChitiet && typeDanhmucChitiet === "maygiat" && (
                    <Dangtin_maygiat
                      settypeHang={settypeHang}
                      setkhoiluonggiat={setkhoiluonggiat}
                      setcuagiat={setcuagiat}
                      setGiaban={setGiaban}
                    />
                  )}
                  {/* cho docanhan */}
                  {typeDanhmucChitiet && typeDanhmuc === "dodungcanhan" && (
                    <Dangtin_docanhan
                      setchogioitinh={setchogioitinh}
                      setGiaban={setGiaban}
                    />
                  )}
                  {/* cho dogiatri */}
                  {typeDanhmucChitiet && typeDanhmuc === "dogiaitri" && (
                    <Dangtin_dogiaitri
                      type={typeDanhmucChitiet}
                      setloainhaccu={setloainhaccu}
                      setGiaban={setGiaban}
                    />
                  )}
                  {/* cho thucung */}
                  {typeDanhmucChitiet && typeDanhmuc === "thucung" && (
                    <Dangtin_dogiaitri setGiaban={setGiaban} />
                  )}
                  {/* tieude tin dang & mota chitiet */}
                  {typeDanhmucChitiet && (
                    <>
                      <p className="text-lg font-bold">
                        Tiêu đề tin đăng & Mô tả chi tiết
                      </p>
                      <div>
                        <div className="mb-1 px-1 flex">
                          <p>Tiêu đề tin đăng</p>
                          <p className="text-red-500 ml-1 mr-5">*</p>
                          <p className="font-thin">{demkitutieude}/50 kí tự</p>
                        </div>
                        <input
                          type="text"
                          value={inputTieude}
                          onChange={handleChangeTieude}
                          placeholder="Tiêu đề tin đăng"
                          className="h-[45px] w-full rounded-md border border-gray-400 outline-none px-2"
                        />
                      </div>
                      <div>
                        <div className="mb-1 px-1 flex">
                          <p>Mô tả chi tiết</p>
                          <p className="text-red-500 ml-1 mr-5">*</p>
                          <p className="font-thin">{demkitumota}/1500 kí tự</p>
                        </div>
                        <textarea
                          value={inputMota}
                          onChange={handleChangeMota}
                          className="h-auto min-h-[150px] w-full rounded-md border border-gray-400 outline-none px-2 py-2"
                          placeholder={
                            (typeDanhmucChitiet == "cho" ||
                            typeDanhmucChitiet == "meo" ||
                            typeDanhmucChitiet == "ca"
                              ? "Mô tả tính cách, sở thích, ăn uống, lịch sử bệnh, tiêm ngừa,..."
                              : "Mô tả chi tiết sản phẩm") ||
                            (typeDanhmucChitiet == "other_thucung"
                              ? "Phụ kiện, thức ăn: Mô tả công dụng, chức năng, hướng dẫn sử dụng, dành cho thú cưng nào,..."
                              : "Mô tả chi tiết sản phẩm")
                          }
                        />
                      </div>
                      <div>
                        <div className="mb-1 px-1 flex">
                          <p>Giá mua mới</p>
                        </div>
                        <input
                          type="text"
                          min={0}
                          value={label_giaban_muamoi}
                          placeholder="Giá mua mới (vnđ)"
                          className="h-[45px] w-full rounded-md border border-gray-400 outline-none px-2"
                          onChange={(e) => handleChange_giaban_muamoi(e)}
                        />
                      </div>
                      <div>
                        <div className="mb-1 px-1 flex">
                          <p>Giá bán lại</p>
                          <p className="text-red-500 ml-1">*</p>
                        </div>
                        <input
                          type="text"
                          min={0}
                          value={label_giaban}
                          placeholder="Giá bán lại sản phẩm (vnđ)"
                          className="h-[45px] w-full rounded-md border border-gray-400 outline-none px-2"
                          onChange={(e) => handleChange_giaban(e)}
                        />
                      </div>
                      <div className="flex items-center justify-center cursor-pointer">
                        <div
                          onClick={() => Dangtin()}
                          className="h-[45px] w-full bg-mauxanhtroi rounded-md text-xl text-white flex items-center justify-center hover:opacity-90"
                        >
                          Đăng tin
                        </div>
                      </div>
                    </>
                  )}

                  {!typeDanhmuc && (
                    <div className="w-full flex justify-center">
                      <div>
                        <Image
                          src={img_chuachontindang}
                          alt="chưa chọn danh mục"
                          className="h-[300px] w-[400px]"
                        />
                        <p className="font-bold text-center">
                          Chọn “danh mục tin đăng” để đăng tin
                        </p>
                      </div>
                    </div>
                  )}
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

export default Dang_tin;
