"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import router from "next/router";
import { authMiddleware } from "@/utils/authMiddleware";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import left_back from "../../../assets/icon/left-arrow.png";
import more from "../../../assets/icon/more.png";
import icon_loading from "../../../assets/icon/loading.png";
import "react-phone-input-2/lib/style.css";
// toast thông báo
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  API_Antin,
  API_deleteTindang,
  API_getTindangbyIduser,
  API_Capnhat_trangthai_thanhtoan,
  API_update_tindang,
} from "@/service/userService";
import Danhmuc from "@/components/Danhmuc";
import { motion } from "framer-motion";
import { render } from "react-dom";
import { useMyContext } from "@/contexts/MyContext";
import Modal_comfirm_Huytin from "@/components/modal/Modal_comfirm_Huytin";
import Modal_TuchoiTindang from "@/components/modal/Modal_TuchoiTindang";
import Modal_comfirm_Thanhtoan from "@/components/modal/Modal_comfirm_Thanhtoan";

const { PhoneNumberUtil, PhoneNumberFormat } = require("google-libphonenumber");
const phoneUtil = PhoneNumberUtil.getInstance();
import jwt from "jsonwebtoken";
import { sign, verify, Secret } from "jsonwebtoken";
import Modal_chinhsuatindang from "@/components/modal/Modal_chinhsuatindang";
import axios from "axios";
import Link from "next/link";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  Timestamp,
  serverTimestamp,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../firebase.config";

interface infodetailProps {
  id_user: string;
}
const Quanly_tindang = ({ id_user }: infodetailProps) => {
  //history_order: là id của User
  const [tindang, setTindang] = useState<any[] | null>(null);
  const allowedRoles = ["Admin", "Client"];
  const checkRoleMiddleware = authMiddleware(allowedRoles);
  const { handle_setIsLoading, setInfoUser, information_User } = useMyContext();
  const [datainforUser, setdatainforUser] = useState<any>(information_User);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  // check login, lấy infor current user
  useEffect(() => {
    checkPermission();
  }, [router]);
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
        // gán id_user = id current user
        id_user = decoded._id;
        setInfoUser(decoded);
        setdatainforUser(decoded);
        setHasPermission(true);
      } catch (error) {
        console.log("Lỗi decoded token: ", error);
        setInfoUser(null);
        setdatainforUser(null);
        setHasPermission(false);
        router.push("/account/login");
      }
    } else {
      // check session login google
      try {
        const response = await axios.post(`/api/check_permission`);
        const data = await response.data;
        if (data.hasPermission) {
          id_user = data.session.user._id;
          setHasPermission(true);
          setdatainforUser(data.session.user);
        } else {
          router.push("/account/login");
        }
      } catch (error) {
        console.error("Error checking permission:", error);
        router.push("/account/login");
      }
    }
  };

  const [orderId, set_orderId] = useState<string | any>();
  // router?.query ? router.query.orderId : undefined
  const [transId, set_transId] = useState<string | any>();
  // router?.query ? router.query.transId : undefined
  const [orderInfo, set_orderInfo] = useState<string | any>();
  // router?.query ? router.query.orderInfo : undefined
  useEffect(() => {
    const resultCode = router.query.resultCode;
    const orderId = router.query.orderId;
    const transId = router.query.transId;
    const orderInfo = router.query.orderInfo;
    set_orderId(orderId);
    set_orderInfo(orderInfo);
    set_transId(transId);
    if (orderId && transId && orderInfo) {
      if (resultCode === "0") {
        // gọi hàm cập nhật trangthaithanhtoan
        fetch_update_trangthaithanhtoan();
      }
    }
  }, [information_User != null]);

  const [trangthaithanhtoan, settrangthaithanhtoan] = useState<number>();
  const fetch_update_trangthaithanhtoan = async () => {
    let token_req: any = `"${
      datainforUser?.token_gg_encoded
        ? datainforUser?.token_gg_encoded
        : localStorage.getItem("token_req")
    }"`;
    // lấy thông tin tin đăng cần cập nhật trạng thái thanh toán
    let getitem: any = localStorage.getItem("itemNangcap");
    let itemNangcap = JSON.parse(getitem);
    try {
      const response = await API_Capnhat_trangthai_thanhtoan(
        {
          id: itemNangcap?._id,
          typeTindang: itemNangcap?.type,
        },
        token_req
      );
      // trường hợp thành công
      if (response.trangthaithanhtoan == 1) {
        settrangthaithanhtoan(response.trangthaithanhtoan);
        localStorage.removeItem("itemNangcap");
        // sửa lại link url để tránh lỗi thanhtoan liên tục nhiều tin. vì redirectUrl cho momo location.href
        router.push(`/account/quan-ly-tin/${id_user}`);
      }
      // console.log("check response: ", response);
    } catch (error) {
      console.error("Error fetching data:", error);
      sendMessage();
    }
  };
  const messageText = `Đã thanh toán MoMo nhưng chưa cập nhật. OrderID: ${orderId}, Mã giao dịch: ${transId}, Tiêu đề tin: ${orderInfo}`;
  // gửi tin nhắn đến Admin khi api_thanhtoan bị lỗi
  const sendMessage = async () => {
    //tạo id_room giữa 2 user
    const sortedIds = [id_user, "64d733a8df7d5a5bec4959bf"].sort();
    const conversationID = sortedIds.join("_"); //id_room
    if (messageText.trim() !== "") {
      try {
        const messageData = {
          sender: id_user,
          userName: datainforUser?.name
            ? datainforUser?.name
            : information_User?.name,
          text: messageText,
          img: [],
          timestamp: serverTimestamp(),
        };
        // tạo tham chiếu tới collection "messages"
        const messagesCollectionRef = collection(
          doc(db, "conversations", conversationID),
          "messages"
        );
        // setMessageText("");
        // setImg_arr([]);
        // setReviewImg_arr([]);
        // thêm messageData vào collection con "messages"
        await addDoc(messagesCollectionRef, messageData);
        toast.error(
          "Tạm thời bị lỗi khi cập nhật Tin ưu tiên. Đã nhắn tin cho Admin xử lý sớm nhất."
        );
        // tham chiếu tới document conversationID, tạo infor 2 user cho dễ biết
        const conversationDocRef = doc(db, "conversations", conversationID);
        // check tồn tại
        const conversationDocSnapshot = await getDoc(conversationDocRef);
        if (!conversationDocSnapshot.exists()) {
          // chưa có thì tạo members, kèm trạng thái đã xem tin nhắn hay chưa.
          const newConversationData = {
            members: [
              {
                userID: datainforUser?._id,
                userName: datainforUser?.name,
              },
              {
                userID: "64d733a8df7d5a5bec4959bf",
                userName: "Admin",
              },
            ],
          };
          await setDoc(conversationDocRef, newConversationData);
        }

        //------- tạo tham chiếu tới subcollection "list_userchat" của người dùng hiện tại
        const listUserChatCollectionRef = collection(
          doc(db, "list_user_chat", datainforUser?._id),
          "list_chatting"
        );
        // tham chiếu document mới cho người dùng hiện tại trong "list_userchat"
        const currentUserDocRef = doc(
          listUserChatCollectionRef,
          "64d733a8df7d5a5bec4959bf"
        );
        const updateData_receiver: any = {
          timestamp: serverTimestamp(),
        };
        // check xem document đã tồn tại chưa
        const currentUserDocSnapshot = await getDoc(currentUserDocRef);
        if (currentUserDocSnapshot.exists()) {
          // document tồn tại, thì kiểm tra các trường có thay đổi hay không
          const currentData = currentUserDocSnapshot.data();
          // check các trường userName và avatar có thay đổi không
          if (currentData.userName !== "Admin") {
            updateData_receiver.userName = "Admin";
          }
          // if (currentData.avatar !== avatar_receiver) {
          //   updateData_receiver.avatar = avatar_receiver;
          // }
          updateData_receiver.seen = true;

          // updateDoc để cập nhật thông tin
          await updateDoc(currentUserDocRef, updateData_receiver);
        } else {
          const currentUserData = {
            userID: "64d733a8df7d5a5bec4959bf",
            userName: "Admin",
            avatar: [],
            timestamp: serverTimestamp(),
            seen: true,
          };
          await setDoc(currentUserDocRef, currentUserData);
        }
        //---------- tạo tham chiếu tới subcollection "list_userchat" của người dùng nhận (receiver)
        const receiverUserChatCollectionRef = collection(
          doc(db, "list_user_chat", "64d733a8df7d5a5bec4959bf"),
          "list_chatting"
        );
        // tạo document mới cho người dùng nhận (receiver) trong "list_userchat"
        const receiverUserDocRef = doc(
          receiverUserChatCollectionRef,
          datainforUser?._id
        );
        const updateData_current_user: any = {
          timestamp: serverTimestamp(),
        };
        // check xem document đã tồn tại chưa
        const receiverUserDocSnapshot = await getDoc(receiverUserDocRef);
        if (receiverUserDocSnapshot.exists()) {
          // document tồn tại, thì kiểm tra các trường có thay đổi hay không
          const currentData = receiverUserDocSnapshot.data();
          // check các trường userName và avatar có thay đổi không
          if (currentData.userName !== datainforUser?.name) {
            updateData_current_user.userName = datainforUser?.name;
          }
          // if (currentData.avatar !== avatar_current_user) {
          //   updateData_current_user.avatar = avatar_current_user;
          // }
          updateData_current_user.seen = false;

          // updateDoc để cập nhật thông tin
          await updateDoc(receiverUserDocRef, updateData_current_user);
        } else {
          const receiverUserData = {
            userID: datainforUser?._id,
            userName: datainforUser?.name,
            avatar: datainforUser?.img,
            timestamp: serverTimestamp(),
            seen: false,
          };
          await setDoc(receiverUserDocRef, receiverUserData);
        }
      } catch (e) {
        console.error("Error sending message: ", e);
      }
    }
  };

  useEffect(() => {
    fetchdata_tindang_user();
  }, [trangthaithanhtoan]);
  const fetchdata_tindang_user = async () => {
    try {
      const response = await API_getTindangbyIduser(id_user);
      //sort tất cả theo thời gian mới nhất
      let sort_response = response.tindang
        .slice()
        .sort(
          (a: any, b: any) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      setTindang(sort_response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const goBack = () => {
    router.back();
  };
  const listFilter = [
    { id: 2, name: "Đang hiển thị" },
    { id: 1, name: "Đợi duyệt" },
    { id: 3, name: "Bị từ chối" },
    { id: 4, name: "Tin ẩn" },
  ];
  const [isOpen, setIsOpen] = useState<number | null>(2);
  const [openfilter_mobile, setopenFilter_mobile] = useState(false);
  const [title_filter, setTitle_filter] = useState<any>(listFilter[0].name);
  const filteredList =
    isOpen === -1
      ? tindang
      : isOpen === 2
      ? tindang
          ?.filter((item: any) => item.trangthai === isOpen)
          .sort((a, b) => (a.trangthaithanhtoan === 1 ? -1 : 1))
      : tindang?.filter((item: any) => item.trangthai === isOpen);

  const handleClickfilted = (key: any) => {
    fetchdata_tindang_user();
    setIsOpen(key);
  };
  const handleClickfilted_mobile = (key: any, name: any) => {
    fetchdata_tindang_user();
    setIsOpen(key);
    setTitle_filter(name);
  };
  const clickTindang = async (type: string, id: string) => {
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
  const handleXoatindang = async (type: string, id: string) => {
    let token_req: any = `"${
      datainforUser?.token_gg_encoded
        ? datainforUser?.token_gg_encoded
        : localStorage.getItem("token_req")
    }"`;
    try {
      const response = await API_deleteTindang(type, id, token_req);
      if (response) {
        {
          response.errCode === 0 &&
            toast.success(response.message) &&
            fetchdata_tindang_user();
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [isopenModalAntin, setOpenModalLydoAntin] = useState(false);
  const [isopenModalHuytin, setOpenModalHuytin] = useState(false);
  const [isopenModalChinhsua, setOpenModalChinhsua] = useState(false);
  const [isopenModalnangcapTinuutien, setOpenModalnangcapTinuutien] =
    useState(false);
  const [type, setType] = useState<any>();
  const [idTindang, setIdTindang] = useState<any>();
  const [img_arr, setImg_arr] = useState<any>([]);
  const [reviewImg_arr, setReviewImg_arr] = useState<any>([]);
  const [inputTieude, setInputTieude] = useState("");
  const [inputMota, setInputMota] = useState("");
  const [giaban_muamoi, setGiaban_muamoi] = useState<number | any>();
  const [giaban, setGiaban] = useState<number | any>();

  const handlebutton_huytin = (type: string, id: string) => {
    setOpenModalHuytin(!isopenModalHuytin);
    setType(type);
    setIdTindang(id);
  };
  const handlebutton_chinhsua = (item: any) => {
    setOpenModalChinhsua(!isopenModalChinhsua);
    setType(item.type);
    setIdTindang(item._id);
    setImg_arr(item.img);
    setInputTieude(item.tieude);
    setInputMota(item.mota);
    setGiaban_muamoi(item?.new_pur_price);
    setGiaban(item.price);
  };
  const handlebutton_antin = (type: string, id: string) => {
    setOpenlidotuchoi(!openlidotuchoi);
    setType(type);
    setIdTindang(id);
  };
  const handlebutton_hienthilai = (type: string, id: string) => {
    build_data_antin = {
      id: id,
      typeTindang: type,
      lydoantin: null,
    };
    setTimeout(() => {
      handleUpdateStatus_Antin();
    }, 1000);
  };
  const handlebutton_daban = (type: string, id: string) => {
    build_data_antin = {
      id: id,
      typeTindang: type,
      lydoantin: "ĐÃ BÁN",
    };
    setTimeout(() => {
      handleUpdateStatus_Antin();
    }, 1000);
  };
  const handlebutton_nangcapTinuutien = (item: any) => {
    const itemJSON = JSON.stringify(item);
    localStorage.setItem("itemNangcap", itemJSON);
    setOpenModalnangcapTinuutien(!isopenModalnangcapTinuutien);
  };

  const [openlidotuchoi, setOpenlidotuchoi] = useState(false);
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
  var build_data_antin = {
    id: idTindang,
    typeTindang: type,
    lydoantin: inputLydoantin,
  };
  const handleUpdateStatus_Antin = async () => {
    let token_req: any = `"${
      datainforUser?.token_gg_encoded
        ? datainforUser?.token_gg_encoded
        : localStorage.getItem("token_req")
    }"`;
    try {
      const response = await API_Antin(build_data_antin, token_req);
      if (response.errCode === 0) {
        {
          response.trangthai === 2 && toast.success("Tin đã được Hiển thị lại");
        }
        {
          response.trangthai === 4 &&
            response.lydoantin !== "ĐÃ BÁN" &&
            toast.success("Tin đã được Ẩn") &&
            Openlidotuchoi();
        }
        {
          response.trangthai === 4 &&
            response.lydoantin == "ĐÃ BÁN" &&
            toast.success("Tin đã được Ẩn, lý do ĐÃ BÁN");
        }

        fetchdata_tindang_user();
      } else {
        toast.error("Cập nhật không thành công");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  var build_data_capnhat_tindang = {
    img: img_arr,
    tieude: inputTieude,
    mota: inputMota,
    giaban_muamoi: giaban_muamoi,
    giaban: giaban,
  };
  const handle_update_tindang = async () => {
    let token_req: any = `"${
      datainforUser?.token_gg_encoded
        ? datainforUser?.token_gg_encoded
        : localStorage.getItem("token_req")
    }"`;
    try {
      const response = await API_update_tindang(
        idTindang,
        type,
        build_data_capnhat_tindang,
        token_req
      );
      if (response && response.errCode == 0) {
        toast.success(response.message);
        setOpenModalChinhsua(false);
        fetchdata_tindang_user();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [openMore, setopenMore] = useState(false);
  const [itemselect, setitemselect] = useState<any>(null);
  const handle_More = (id_item: any) => {
    if (id_item == itemselect) {
      setopenMore(!openMore);
    } else {
      setopenMore(true);
    }
    setitemselect(id_item);
  };

  return (
    <div className="bg-gray-100 min-h-screen relative">
      <Head>
        <title>Quản lý tin đăng</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon_2handmarket.png" />
      </Head>
      <Header />
      <div className="h-auto sm:min-h-[calc(100vh-50px)] md:min-h-[calc(100vh-125px)] lg:min-h-[calc(100vh-80px)] w-full bg-gray-100 sm:pb-[60px] md:pb-0 flex flex-col place-content-between">
        <div>
          {/* Điều hướng */}
          <div className="h-[60px] w-full flex items-center justify-center mt-1">
            <div className="h-full lg:w-[960px] sm:w-full bg-white sm:text-lg md:text-xl flex items-center p-1 rounded-lg shadow-md">
              <Danhmuc />
              <div className="h-full w-auto flex items-center ml-3 space-x-1">
                <Link
                  href="/"
                  className="cursor-pointer hover:text-mauxanhtroi"
                >
                  Trang chủ
                </Link>{" "}
                <p>/ Quản lý tin</p>
              </div>
            </div>
          </div>
          <div className="h-auto w-full flex items-center justify-center mt-2">
            <div className="h-auto lg:w-[960px] sm:w-full mt-2 px-2 border rounded-lg bg-white">
              {/* display medium */}
              <div className="sm:hidden md:flex h-auto min-h-[570px] w-[100%] px-1 py-5 flex-col items-center">
                <div className="flex items-center space-x-5 pr-16">
                  <div className="md:hidden h-[40px] w-[40px]" onClick={goBack}>
                    <Image
                      src={left_back}
                      alt="icon"
                      className="h-[25px] w-[25px] cursor-pointer"
                      // onClick={handleClickUser}
                    />
                  </div>

                  <motion.p
                    initial={{ opacity: 0, x: 20 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { duration: 1, delay: 0.2 },
                    }}
                    className="uppercase sm:text-lg md:text-3xl font-medium mb-2"
                  >
                    Quản lý tin đăng
                  </motion.p>
                </div>
                <div className="h-auto w-full">
                  <p className="lg:text-xl">
                    * Tin được duyệt sẽ hiển thị tối đa 30 ngày.
                  </p>
                  <p className="lg:text-xl">
                    * Tin bị từ chối hoặc được ẩn sẽ bị xóa sau 3 ngày
                  </p>
                  <p className="text-red-500 lg:text-xl">
                    * Đẩy tin ưu tiên trong 7 ngày với 10.000đ
                  </p>
                </div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.5, delay: 0.2 },
                  }}
                  className="h-[50px] w-full mb-2 flex"
                >
                  {listFilter &&
                    listFilter.map((item_listFilter: any) => {
                      return (
                        <div
                          key={item_listFilter.id}
                          className={
                            isOpen !== item_listFilter.id
                              ? `h-full min-w-[150px] flex items-center justify-center text-xl hover:border-b-2 hover:border-blue-600 cursor-pointer`
                              : `h-full min-w-[150px] flex items-center justify-center text-xl border-b-4 border-blue-600 cursor-pointer`
                          }
                          onClick={() => handleClickfilted(item_listFilter.id)}
                        >
                          {item_listFilter.name}
                        </div>
                      );
                    })}
                </motion.div>
                {filteredList == null && (
                  <div className="h-[50px] w-full text-2xl flex items-center justify-center space-x-2">
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
                {filteredList && filteredList.length == 0 && (
                  <div className="h-[50px] w-full text-2xl flex items-center justify-center space-x-2">
                    <p className="">
                      Danh mục hiện tại không có tin đăng nào hiển thị !
                    </p>
                  </div>
                )}
                {filteredList &&
                  filteredList.length !== 0 &&
                  filteredList.map((item: any, index: number) => {
                    const originalDate = new Date(item.updatedAt);
                    const day = originalDate.getDate();
                    const month = originalDate.getMonth() + 1;
                    const year = originalDate.getFullYear();
                    const formattedDate_tindang_doiduyet = `${
                      day < 10 ? "0" : ""
                    }${day}-${month < 10 ? "0" : ""}${month}-${year}`;

                    function tinhthoigiandadang(time: Date): string {
                      const timehientai: Date = new Date();
                      const ngaytao: Date = new Date(time);
                      const thoigiandadang: number =
                        timehientai.getTime() - ngaytao.getTime();

                      // Tính thời gian còn lại (30 ngày - thoigiandadang)
                      const thoigianconlai: number =
                        30 * 24 * 60 * 60 * 1000 - thoigiandadang;

                      if (thoigianconlai <= 0) {
                        // Tin đã tồn tại trên 30 ngày
                        return "Hết hạn";
                      } else if (thoigianconlai < 60000) {
                        // Dưới 1 phút còn lại
                        return `${Math.floor(thoigianconlai / 1000)} giây`;
                      } else if (thoigianconlai < 3600000) {
                        // Dưới 1 giờ còn lại
                        const minutes: number = Math.floor(
                          thoigianconlai / 60000
                        );
                        return `${minutes} phút`;
                      } else if (thoigianconlai < 86400000) {
                        // Dưới 1 ngày còn lại
                        const hours: number = Math.floor(
                          thoigianconlai / 3600000
                        );
                        return `${hours} giờ`;
                      } else {
                        // Trên 1 ngày còn lại
                        const days: number = Math.floor(
                          thoigianconlai / 86400000
                        );
                        return `${days} ngày`;
                      }
                    }
                    let time: any =
                      item.trangthai == 1 || item.trangthai == 3
                        ? item.updatedAt
                        : item.ngayduyettin;
                    const thoigiandadang: string = tinhthoigiandadang(time);

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.3, delay: 0.1 },
                        }}
                        exit={{
                          opacity: 0,
                          y: -50,
                          transition: { duration: 0.3 },
                        }}
                        className="h-[160px] w-full p-1 mt-3 flex border border-gray-400 shadow-md rounded-md cursor-pointer overflow-auto"
                      >
                        <div
                          className="h-[150px] w-[150px] flex justify-center"
                          onClick={() => clickTindang(item.type, item._id)}
                        >
                          <div
                            className="h-full w-full bg-center bg-contain bg-no-repeat"
                            style={{ backgroundImage: `url(${item.img[0]})` }}
                          ></div>
                        </div>
                        <div className="w-[780px] flex items-center place-content-between">
                          <div
                            className="h-full lg:w-[500px] md:w-[330px] md:min-w-[330px] px-2"
                            onClick={() => clickTindang(item.type, item._id)}
                          >
                            <div className="h-[50%] w-full">
                              <p className="h-auto max-h-[60px] w-full text-lg pb-1 overflow-hidden">
                                {item.tieude}{" "}
                              </p>
                              <p className="h-[40px] w-full font-bold text-red-500">
                                {item.price.toLocaleString("vi-VN")} đ
                              </p>
                            </div>
                            <div className="h-[50%] w-full flex items-end pb-3">
                              <div>
                                {isOpen !== 1 && (
                                  <p className="h-[30px] w-full text-lg">
                                    Thời gian còn lại: {thoigiandadang}
                                  </p>
                                )}
                                {isOpen == 1 && (
                                  <p className="h-[30px] w-full text-lg">
                                    Ngày đăng: {formattedDate_tindang_doiduyet}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div
                            className={`${
                              isOpen && isOpen === 3 && "hidden"
                            } h-full w-[300px] flex items-end justify-end`}
                          >
                            {isOpen === 1 && (
                              <div className="h-auto w-auto flex flex-col space-y-2">
                                <div
                                  className={`h-auto w-auto px-5 py-1 border border-gray-500 hover:bg-gray-300 rounded-md flex items-center justify-center text-lg`}
                                  onClick={() => handlebutton_chinhsua(item)}
                                >
                                  Chỉnh sửa
                                </div>
                                <div
                                  className={`h-auto w-auto px-5 py-1 border border-red-500 hover:bg-red-500 hover:text-white rounded-md flex items-center justify-center text-lg`}
                                  onClick={() =>
                                    handlebutton_huytin(item.type, item._id)
                                  }
                                >
                                  Hủy tin
                                </div>
                              </div>
                            )}
                            {isOpen === 2 && (
                              <div
                                className={`h-full w-full flex items-center`}
                              >
                                <div className="h-full w-[50%] flex items-end">
                                  <button
                                    disabled={item.trangthaithanhtoan == 1}
                                    className={`${
                                      item.trangthaithanhtoan == 1
                                        ? "bg-mauxanhtroi text-white"
                                        : ""
                                    } h-[40px] py-1 w-[140px] border border-mauxanhtroi hover:bg-mauxanhtroi hover:text-white rounded-md flex items-center justify-center text-lg`}
                                    onClick={() =>
                                      handlebutton_nangcapTinuutien(item)
                                    }
                                  >
                                    {item.trangthaithanhtoan == 1
                                      ? "Tin ưu tiên"
                                      : "Đẩy tin"}
                                  </button>
                                </div>
                                <div className="h-full w-[50%] flex flex-col place-content-between">
                                  <button
                                    className={`h-[40px] py-1 w-[140px] border border-gray-500 hover:bg-gray-200 rounded-md flex items-center justify-center text-lg`}
                                    onClick={() =>
                                      handlebutton_antin(item.type, item._id)
                                    }
                                  >
                                    Ẩn tin
                                  </button>
                                  <button
                                    className={`h-[40px] py-1 w-[140px] border border-gray-500 hover:bg-red-500 hover:text-white rounded-md flex items-center justify-center text-lg`}
                                    onClick={() =>
                                      handlebutton_huytin(item.type, item._id)
                                    }
                                  >
                                    Xóa tin
                                  </button>
                                  <button
                                    className="h-[40px] py-1 w-[140px] text-lg border border-gray-500 rounded-md hover:text-white hover:bg-mauxanhtroi"
                                    onClick={() =>
                                      handlebutton_daban(item.type, item._id)
                                    }
                                  >
                                    Đã bán
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                          {isOpen === 3 && (
                            <div className={`h-full w-[350px]`}>
                              <div className="h-full w-full border border-red-500 rounded-md break-words whitespace-pre-wrap">
                                <p className="w-full text-center bg-red-500 py-1 text-white">
                                  Lý do từ chối
                                </p>
                                <p className="p-1">{item.lydoantin}</p>
                              </div>
                            </div>
                          )}
                          {isOpen === 4 && (
                            <div className={`h-full w-[350px]`}>
                              <div className="h-[65%] w-full border border-red-500 rounded-md break-words whitespace-pre-wrap overflow-auto">
                                <p className="w-full text-center bg-red-500 py-1 text-white">
                                  Lý do ẩn tin
                                </p>
                                <p className="p-1">{item.lydoantin}</p>
                              </div>
                              <div className="h-[35%] w-full py-2">
                                <div
                                  className="border border-mauxanhtroi rounded-md h-full w-full flex items-center justify-center text-lg hover:bg-mauxanhtroi hover:text-white"
                                  onClick={() =>
                                    handlebutton_hienthilai(item.type, item._id)
                                  }
                                >
                                  Hiển thị lại
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
              {/* display mobile */}
              <div className="md:hidden h-auto w-full min-h-[570px] flex flex-col items-center py-2">
                <div className="flex items-center justify-center h-full w-full">
                  <div
                    className="md:hidden h-[40px] w-[40px] mt-1"
                    onClick={goBack}
                  >
                    <Image
                      src={left_back}
                      alt="icon"
                      className="h-[25px] w-[25px] cursor-pointer"
                      // onClick={handleClickUser}
                    />
                  </div>

                  <motion.p
                    initial={{ opacity: 0, x: 20 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { duration: 1, delay: 0.2 },
                    }}
                    className="uppercase sm:text-lg md:text-3xl font-medium mb-2"
                  >
                    Quản lý tin đăng
                  </motion.p>
                </div>
                <div className="h-auto w-full">
                  <p>* Tin được duyệt sẽ hiển thị tối đa 30 ngày.</p>
                  <p>* Tin bị từ chối hoặc được ẩn sẽ bị xóa sau 3 ngày</p>
                  <p className="text-red-500">
                    * Đẩy tin ưu tiên trong 7 ngày với 10.000đ
                  </p>
                </div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.5, delay: 0.2 },
                  }}
                  className="h-[40px] w-full flex mt-2"
                >
                  <div
                    className="relative h-full w-[150px] outline-none flex items-center justify-center border border-mauxanhtroi rounded-md"
                    onClick={() => setopenFilter_mobile(!openfilter_mobile)}
                  >
                    <p className="text-lg cursor-pointer">{title_filter}</p>
                    <svg
                      className={`w-4 h-4 ml-2 transition-transform duration-200 transform ${
                        openfilter_mobile ? "rotate-180" : ""
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
                    {openfilter_mobile && (
                      <div className="absolute top-10 left-0 h-auto w-[150px] border border-gray-400 rounded-md bg-white">
                        {listFilter &&
                          listFilter.map((item_listFilter: any) => {
                            return (
                              <div
                                key={item_listFilter.id}
                                onClick={() =>
                                  handleClickfilted_mobile(
                                    item_listFilter.id,
                                    item_listFilter.name
                                  )
                                }
                                className="px-2 py-1 cursor-pointer hover:bg-gray-200"
                              >
                                {item_listFilter.name}
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </div>
                </motion.div>
                {filteredList &&
                  filteredList.length !== 0 &&
                  filteredList.map((item: any, index: number) => {
                    const originalDate = new Date(item.updatedAt);
                    const day = originalDate.getDate();
                    const month = originalDate.getMonth() + 1;
                    const year = originalDate.getFullYear();
                    const formattedDate_tindang_doiduyet = `${
                      day < 10 ? "0" : ""
                    }${day}-${month < 10 ? "0" : ""}${month}-${year}`;

                    function tinhthoigiandadang(time: Date): string {
                      const timehientai: Date = new Date();
                      const ngaytao: Date = new Date(time);
                      const thoigiandadang: number =
                        timehientai.getTime() - ngaytao.getTime();

                      // Tính thời gian còn lại (30 ngày - thoigiandadang)
                      const thoigianconlai: number =
                        30 * 24 * 60 * 60 * 1000 - thoigiandadang;

                      if (thoigianconlai <= 0) {
                        // Tin đã tồn tại trên 30 ngày
                        return "Hết hạn";
                      } else if (thoigianconlai < 60000) {
                        // Dưới 1 phút còn lại
                        return `${Math.floor(thoigianconlai / 1000)} giây`;
                      } else if (thoigianconlai < 3600000) {
                        // Dưới 1 giờ còn lại
                        const minutes: number = Math.floor(
                          thoigianconlai / 60000
                        );
                        return `${minutes} phút`;
                      } else if (thoigianconlai < 86400000) {
                        // Dưới 1 ngày còn lại
                        const hours: number = Math.floor(
                          thoigianconlai / 3600000
                        );
                        return `${hours} giờ`;
                      } else {
                        // Trên 1 ngày còn lại
                        const days: number = Math.floor(
                          thoigianconlai / 86400000
                        );
                        return `${days} ngày`;
                      }
                    }
                    let time: any =
                      item.trangthai == 1 || item.trangthai == 3
                        ? item.updatedAt
                        : item.ngayduyettin;
                    const thoigiandadang: string = tinhthoigiandadang(time);
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.3, delay: 0.1 },
                        }}
                        exit={{
                          opacity: 0,
                          y: -50,
                          transition: { duration: 0.3 },
                        }}
                        className="h-[142px] w-full p-1 mt-3 flex space-x-2 border border-gray-400 shadow-md rounded-md cursor-pointer overflow-auto"
                      >
                        <div
                          className="h-full w-[100px] max-w-[100px] flex justify-center"
                          onClick={() => clickTindang(item.type, item._id)}
                        >
                          <div
                            className="h-full w-full bg-center bg-contain bg-no-repeat"
                            style={{ backgroundImage: `url(${item.img[0]})` }}
                          ></div>
                        </div>
                        <div className="h-full w-full overflow-hidden">
                          <div className="h-[60px] w-full flex">
                            <p
                              className="h-full w-full"
                              onClick={() => clickTindang(item.type, item._id)}
                            >
                              {item.tieude}
                            </p>
                            <div className="relative">
                              {item.trangthai !== 3 && (
                                <Image
                                  src={more}
                                  alt=""
                                  className="h-[20px] w-[20px] mt-2"
                                  onClick={() => handle_More(item._id)}
                                />
                              )}

                              {item.trangthai == 2 &&
                                itemselect == item._id &&
                                openMore && (
                                  <div className="absolute h-auto w-[100px] bg-white border border-gray-400 rounded-md top-0 right-6">
                                    <div
                                      className="h-auto w-full text-center px-2 py-1 rounded-t-md hover:bg-gray-200"
                                      onClick={() =>
                                        handlebutton_antin(item.type, item._id)
                                      }
                                    >
                                      Ẩn tin
                                    </div>
                                    <div
                                      className="h-auto w-full text-center px-2 py-1 hover:bg-gray-200"
                                      onClick={() =>
                                        handlebutton_huytin(item.type, item._id)
                                      }
                                    >
                                      Xóa tin
                                    </div>
                                    <button
                                      disabled={item.trangthaithanhtoan == 1}
                                      className={` ${
                                        item.trangthaithanhtoan == 1
                                          ? "bg-mauxanhtroi text-white"
                                          : "hover:bg-gray-200"
                                      } h-auto w-full text-center px-2 py-1 `}
                                      onClick={() =>
                                        handlebutton_nangcapTinuutien(item)
                                      }
                                    >
                                      {item.trangthaithanhtoan == 1
                                        ? "Tin ưu tiên"
                                        : "Đẩy tin"}
                                    </button>
                                    <div
                                      className="h-auto w-full text-center px-2 py-1 rounded-b-md hover:bg-gray-200"
                                      onClick={() =>
                                        handlebutton_daban(item.type, item._id)
                                      }
                                    >
                                      Đã bán
                                    </div>
                                  </div>
                                )}
                              {item.trangthai == 1 &&
                                itemselect == item._id &&
                                openMore && (
                                  <div className="absolute h-auto w-[100px] bg-white border border-gray-400 rounded-md top-0 right-6">
                                    <div
                                      className="h-auto w-full text-center px-2 py-1 rounded-md hover:bg-gray-200"
                                      onClick={() =>
                                        handlebutton_huytin(item.type, item._id)
                                      }
                                    >
                                      Hủy tin
                                    </div>
                                  </div>
                                )}
                              {item.trangthai == 4 &&
                                itemselect == item._id &&
                                openMore && (
                                  <div className="absolute h-auto w-[100px] bg-white border border-gray-400 rounded-md top-0 right-6">
                                    <div
                                      className="h-auto w-full text-center px-2 py-1 rounded-md hover:bg-gray-200"
                                      onClick={() =>
                                        handlebutton_hienthilai(
                                          item.type,
                                          item._id
                                        )
                                      }
                                    >
                                      Hiển thị lại
                                    </div>
                                  </div>
                                )}
                            </div>
                          </div>
                          <div
                            className="h-[80px] w-full overflow-hidden"
                            onClick={() => clickTindang(item.type, item._id)}
                          >
                            {item.trangthai == 4 || item.trangthai == 3 ? (
                              <div className="h-full w-full overflow-hidden">
                                <p className="h-[20px] w-full font-bold text-red-500">
                                  {item.price.toLocaleString("vi-VN")} đ
                                </p>
                                <p className="h-[50px] text-red-500 flex items-center">
                                  Lý do: {item.lydoantin}
                                </p>
                              </div>
                            ) : (
                              <>
                                <p className="h-[35px] w-full font-bold text-red-500">
                                  {item.price.toLocaleString("vi-VN")} đ
                                </p>
                                <p className="h-[35px] w-full">
                                  {isOpen !== 1 && (
                                    <p className="h-[30px] w-full">
                                      Thời gian còn lại: {thoigiandadang}
                                    </p>
                                  )}
                                  {isOpen == 1 && (
                                    <p className="h-[30px] w-full">
                                      Ngày đăng:{" "}
                                      {formattedDate_tindang_doiduyet}
                                    </p>
                                  )}
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>

      <Modal_comfirm_Thanhtoan
        isopenModalnangcapTinuutien={isopenModalnangcapTinuutien}
        setOpenModalnangcapTinuutien={setOpenModalnangcapTinuutien}
        // handlebutton_nangcapTinuutien={() =>
        //   handlebutton_nangcapTinuutien()
        // }
      />
      <Modal_comfirm_Huytin
        isopenModalHuytin={isopenModalHuytin}
        setOpenModalHuytin={setOpenModalHuytin}
        handlebutton_huytin={() => handleXoatindang(type, idTindang)}
      />
      <Modal_chinhsuatindang
        isopenModalChinhsua={isopenModalChinhsua}
        setOpenModalChinhsua={setOpenModalChinhsua}
        type={type}
        idTindang={idTindang}
        img_arr={img_arr}
        setImg_arr={setImg_arr}
        inputTieude={inputTieude}
        setInputTieude={setInputTieude}
        inputMota={inputMota}
        setInputMota={setInputMota}
        giaban_muamoi={giaban_muamoi}
        setGiaban_muamoi={setGiaban_muamoi}
        giaban={giaban}
        setGiaban={setGiaban}
        handle_update_tindang={() => handle_update_tindang()}
      />
      <Modal_TuchoiTindang
        inputLydoantin={inputLydoantin}
        handleChangeLydoantin={handleChangeLydoantin}
        handleUpdateStatusTindang={() => handleUpdateStatus_Antin()}
        openlidotuchoi={openlidotuchoi}
        Openlidotuchoi={Openlidotuchoi}
      />
    </div>
  );
};

// truyen id user
export const getServerSideProps: GetServerSideProps<infodetailProps> = async (
  context
) => {
  const { id_user } = context.params as {
    id_user: string;
  };

  return {
    props: {
      id_user: id_user as string,
    },
  };
};

export default Quanly_tindang;
