import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import router from "next/router";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import "react-phone-input-2/lib/style.css";
// toast thông báo
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Dùng cho otp firebase
import { firebase, auth } from "../../firebase.config";
import { API_getUserbyID, API_updateUser } from "@/service/userService";
import Danhmuc from "@/components/Danhmuc";
import { motion } from "framer-motion";

const { PhoneNumberUtil, PhoneNumberFormat } = require("google-libphonenumber");
const phoneUtil = PhoneNumberUtil.getInstance();
import jwt from "jsonwebtoken";
import { sign, verify, Secret } from "jsonwebtoken";
import Cookies from "js-cookie";

interface infodetailProps {
  edit_info: string;
}

const Infodetail = ({ edit_info }: infodetailProps) => {
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [newpasswordMatch, setNewPasswordMatch] = useState(true);
  const [enablePW, setEnableInputPW] = useState(false);
  const [enableNewPW, setEnableInputPW_InputNewPW] = useState(false);
  const [updateInforUser, setUpdateInforUser] = useState(false);

  const [info_user, setinfo_user] = useState<any>();

  useEffect(() => {
    const fetchDataUser = async () => {
      //lấy thông tin người dùng
      const token: any = localStorage.getItem("token");
      const token_cookie: any = Cookies.get("jwt_token");
      const parse_token = JSON.parse(token);
      if (parse_token && token_cookie) {
        let jwt_key = "2handmarket_tdn" || process.env.JWT_SECRET;
        if (!jwt_key) {
          throw new Error(
            "JWT_SECRET is not defined in the environment variables."
          );
        }
        const jwt_secret: Secret = jwt_key;
        try {
          const decoded: any = jwt.verify(parse_token, jwt_secret);
          edit_info = decoded._id;
          if (decoded) {
            try {
              const response = await API_getUserbyID(edit_info);
              setinfo_user(response.User[0]);
              setName(response.User[0].name);
              setAccount(response.User[0].account);
              setAddress(response.User[0].address);
              setAvatar(response.User[0].img);
              setImgAvatar(response.User[0].img);
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          }
        } catch (error) {
          console.log("Lỗi decoded token: ", error);
          router.push("/account/login");
        }
      } else {
        router.push("/account/login");
      }
    };
    fetchDataUser();
  }, [edit_info]);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    // setPasswordMatch(event.target.value === confirmPassword);
  };
  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
    setPasswordMatch(event.target.value === password);
  };
  const handleNewPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewPassword(event.target.value);
    // setPasswordMatch(event.target.value === confirmPassword);
  };
  const handleConfirmNewPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmNewPassword(event.target.value);
    setNewPasswordMatch(event.target.value === newpassword);
  };
  const handleChangeAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccount(e.target.value);
  };
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };
  const ClickUpdate_enableInputPW = (status: any) => {
    {
      status === 0 && setEnableInputPW(true);
    }
    {
      status === 1 && setEnableInputPW_InputNewPW(true);
    }
    {
      status === 2 &&
        (setEnableInputPW(false), setEnableInputPW_InputNewPW(false));
    }
  };

  const [openoptionchangeavatar, setOpenOptionChangeAvatar] = useState(false);
  async function getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  const [img, setImgAvatar] = useState<any>(avatar);
  const handleFile = async (e: any) => {
    let file = e.target.files[0];
    if (file) {
      let base64 = await getBase64(file);
      let objectURL = URL.createObjectURL(file);
      setImgAvatar(base64);
      setAvatar(objectURL);
      console.log("check img: ", base64);
    }
    setOpenOptionChangeAvatar(false);
  };

  const hanldeUpdateInforUser = async () => {
    setUpdateInforUser(true);
    if (!name || !account || !address || !password) {
      toast.error("Vui lòng điền đủ thông tin !");
    } else {
      const response = await API_updateUser({
        account: account,
        password: password,
        name: name,
        address: address,
        newpassword: newpassword,
        img: img,
      });
      if (response.errCode === 0) {
        toast.success(response.message);
        window.location.reload();
      }
      if (response.errCode === 1) {
        toast.error(response.message);
        window.location.reload();
      }
      if (response.errCode === 2) {
        toast.error(response.message);
        window.location.reload();
      }
      if (response.errCode === 3) {
        toast.error(response.message);
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>Trang cá nhân</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon_2handmarket.png" />
      </Head>
      <div className="absolute h-auto w-full top-0 left-0">
        <Header />
      </div>
      {info_user && (
        <div className="h-auto min-h-screen w-[100%] bg-gray-100 lg:pt-[90px] md:pt-[115px] flex flex-col place-content-between">
          <div>
            {/* Điều hướng */}
            <div className="h-[50px] w-full flex items-center justify-center mt-2">
              <div className="h-full w-[960px] bg-white text-lg flex items-center p-1 rounded-lg shadow-md">
                <Danhmuc />
                <p className="h-full w-auto flex items-center ml-3">
                  Trang chủ / Cập nhật thông tin cá nhân
                </p>
              </div>
            </div>
            <div className="h-auto w-full mt-3 flex items-center justify-center">
              <div className="h-[690px] w-[960px] bg-white border rounded-lg p-5 flex flex-col items-center">
                <div className="flex items-center sm:space-x-2 md:space-x-0 sm:pr-16 md:pr-0 justify-center">
                  <p className="sm:text-base md:text-4xl font-medium mb-2">
                    THÔNG TIN TÀI KHOẢN
                  </p>
                </div>
                {/* hình đại diện */}
                <div className="h-[120px] w-full mb-2 flex items-center justify-center">
                  <div className="relative flex items-center">
                    <div
                      className="h-[120px] w-[120px] border-4 border-mauxanhtroi rounded-full bg-cover bg-no-repeat bg-center hover:opacity-60"
                      style={{
                        backgroundImage: `url(${avatar})`,
                      }}
                      onClick={() =>
                        setOpenOptionChangeAvatar(!openoptionchangeavatar)
                      }
                    ></div>
                    {openoptionchangeavatar && (
                      <div className="absolute h-[50px] w-[200px] px-2 left-32 bg-black rounded-md flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                        {info_user?.img == avatar && (
                          <p className="text-white">
                            Cập nhật ảnh đại diện
                            <input
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              type="file"
                              multiple
                              onChange={(e) => {
                                handleFile(e);
                              }}
                            />
                          </p>
                        )}
                        {info_user?.img !== avatar && (
                          <p
                            className="text-white"
                            onClick={() => window.location.reload()}
                          >
                            Hủy thay đổi
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="sm:text-sm md:text-base sm:w-full md:w-[400px] flex flex-col space-y-5 items-center">
                  <motion.input
                    initial={{ opacity: 0, x: 50 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.5 },
                    }}
                    exit={{ opacity: 0 }}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Họ và tên"
                    value={name}
                    onChange={handleChangeName}
                    className="border border-gray-300 rounded-md px-3 py-3 w-full focus:outline-none focus:border-blue-600"
                  />
                  <motion.input
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0, transition: { duration: 1 } }}
                    exit={{ opacity: 0 }}
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Địa chỉ"
                    value={address}
                    onChange={handleChangeAddress}
                    className="border border-gray-300 rounded-md px-3 py-3 w-full focus:outline-none focus:border-blue-600"
                  />
                  <motion.input
                    initial={{ opacity: 0, x: 50 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { duration: 1.5 },
                    }}
                    exit={{ opacity: 0 }}
                    type="text"
                    id="phonenumber"
                    name="phonenumber"
                    placeholder="Nhập số điện thoại"
                    disabled={true}
                    value={account}
                    onChange={handleChangeAccount}
                    className="border border-gray-300 rounded-md px-3 py-3 w-full focus:outline-none focus:border-blue-600"
                  />
                  {enablePW && !enableNewPW ? (
                    <>
                      <motion.input
                        initial={{ opacity: 0, x: 50 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          transition: { duration: 0.5 },
                        }}
                        exit={{ opacity: 0 }}
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Nhập mật khẩu hiện tại"
                        value={password}
                        onChange={handlePasswordChange}
                        className="border border-gray-300 rounded-md px-3 py-3 w-full focus:outline-none focus:border-blue-600"
                      />
                      <motion.input
                        initial={{ opacity: 0, x: 50 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          transition: { duration: 1 },
                        }}
                        exit={{ opacity: 0 }}
                        type="password"
                        id="Confirmpassword"
                        name="Confirmpassword"
                        placeholder="Nhập lại mật khẩu"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        className={
                          passwordMatch
                            ? "border border-gray-300 rounded-md px-3 py-3 w-full focus:outline-none focus:border-blue-600"
                            : "border border-red-600 rounded-md px-3 py-3 w-full focus:outline-none focus:border-red-600"
                        }
                      />
                      {!passwordMatch ? (
                        <p className="text-sm text-red-500">
                          Mật khẩu không trùng khớp
                        </p>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                  {enableNewPW ? (
                    <>
                      <motion.input
                        initial={{ opacity: 0, x: 50 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          transition: { duration: 0.5 },
                        }}
                        exit={{ opacity: 0 }}
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Nhập mật khẩu hiện tại"
                        value={password}
                        onChange={handlePasswordChange}
                        className="border border-gray-300 rounded-md px-3 py-3 w-full focus:outline-none focus:border-blue-600"
                      />
                      <motion.input
                        initial={{ opacity: 0, x: 50 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          transition: { duration: 1 },
                        }}
                        exit={{ opacity: 0 }}
                        type="password"
                        id="newpassword"
                        name="newpassword"
                        placeholder="Nhập mật khẩu Mới"
                        value={newpassword}
                        onChange={handleNewPasswordChange}
                        className="border border-gray-300 rounded-md px-3 py-3 w-full focus:outline-none focus:border-blue-600"
                      />
                      <motion.input
                        initial={{ opacity: 0, x: 50 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          transition: { duration: 1.5 },
                        }}
                        exit={{ opacity: 0 }}
                        type="password"
                        id="ConfirmNewpassword"
                        name="ConfirmNewpassword"
                        placeholder="Nhập lại mật khẩu Mới"
                        value={confirmNewPassword}
                        onChange={handleConfirmNewPasswordChange}
                        className={
                          newpasswordMatch
                            ? "border border-gray-300 rounded-md px-3 py-3 w-full focus:outline-none focus:border-blue-600"
                            : "border border-red-600 rounded-md px-3 py-3 w-full focus:outline-none focus:border-red-600"
                        }
                      />
                      {!passwordMatch ? (
                        <p className="text-sm text-red-500">
                          Mật khẩu không trùng khớp
                        </p>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                  {!enablePW &&
                    !enableNewPW &&
                    (info_user?.name !== name ||
                      info_user?.address !== address ||
                      info_user?.account !== account ||
                      info_user?.img !== avatar) && (
                      <div className="h-auto w-full space-y-3">
                        <button
                          type="submit"
                          className="h-[50px] w-full bg-blue-600 border border-blue-600 rounded-md text-white hover:opacity-90"
                          onClick={() => ClickUpdate_enableInputPW(0)}
                        >
                          Cập nhật
                        </button>
                        <div
                          className="h-[50px] w-full flex items-center justify-center bg-blue-600 border border-blue-600 rounded-md text-white hover:opacity-90"
                          onClick={() => window.location.reload()}
                        >
                          Hủy thay đổi
                        </div>
                      </div>
                    )}
                  {enablePW && !enableNewPW && (
                    <button
                      type="submit"
                      className="h-[50px] w-full bg-blue-600 border border-blue-600 rounded-md text-white hover:opacity-90"
                      onClick={hanldeUpdateInforUser}
                    >
                      Cập nhật
                    </button>
                  )}
                  {enableNewPW && (
                    <button
                      type="submit"
                      className="h-[50px] w-full bg-blue-600 border border-blue-600 rounded-md text-white hover:opacity-90"
                      onClick={hanldeUpdateInforUser}
                    >
                      Cập nhật mật khẩu
                    </button>
                  )}
                </div>
                {!enableNewPW ? (
                  <p
                    className="mt-5 text-lg font-thin text-blue-600 underline cursor-pointer"
                    onClick={() => ClickUpdate_enableInputPW(1)}
                  >
                    Thay đổi mật khẩu
                  </p>
                ) : (
                  <></>
                )}
                <span id="recaptcha-container"></span>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<infodetailProps> = async (
  context
) => {
  const { edit_info } = context.params as {
    edit_info: string;
  };

  return {
    props: {
      edit_info: edit_info as string,
    },
  };
};

export default Infodetail;
