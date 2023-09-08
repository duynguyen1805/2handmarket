import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { API_register } from "@/service/userService";
import Head from "next/head";
import router from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import left_back from "../../assets/icon/left-arrow.png";
import "react-phone-input-2/lib/style.css";
// toast thông báo
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Dùng cho otp firebase
import { firebase, auth } from "../../firebase.config";

const { PhoneNumberUtil, PhoneNumberFormat } = require("google-libphonenumber");
const phoneUtil = PhoneNumberUtil.getInstance();

const register = () => {
  const [sendCodeConf, setsendCode] = useState(false);
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [otp, setOTP] = useState("");
  const [result_sendOTP, setresult_sendOTP] = useState<any>();

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
  const handleChangeAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccount(e.target.value);
  };
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const sendOTP = async () => {
    if (!name || !account || !address || !password) {
      toast.error("Vui lòng điền đủ thông tin !");
    } else {
      try {
        //format 090XXX >>>> +8490XXX
        const phoneNumber = phoneUtil.parseAndKeepRawInput(account, "VN");
        const formattedAccount = phoneUtil.format(
          phoneNumber,
          PhoneNumberFormat.E164
        );

        let verify = new firebase.auth.RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
          }
        );

        auth.signInWithPhoneNumber(formattedAccount, verify).then((result) => {
          setresult_sendOTP(result);
          setsendCode(true);
          toast.success("Đã gửi OTP. Vui lòng kiểm tra SMS");
        });
      } catch (error) {
        console.error(error);
        toast.error("Có lỗi từ hệ thống. Vui lòng Đăng ký sau !");
      }
    }
  };

  const hanldeRegister = async () => {
    try {
      const confirmationResult = await result_sendOTP.confirm(otp);
      if (confirmationResult) {
        let role: string = "Client";
        const data = await API_register(account, password, name, address, role);
        toast.success(data.message);
        router.push("/account/login");
      } else {
        toast.error("OTP không khớp. Vui lòng kiểm tra lại.");
      }
    } catch (error) {
      toast.error("OTP không khớp. Vui lòng kiểm tra lại.");
    }
  };

  const goBack = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>Đăng ký tài khoản</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="h-[100%] w-[100%] bg-gray-50 pt-3">
        <div className="h-[50px] sm:w-[100%] lg:w-[75%] lg:mx-[13%] sm:p-1 md:p-5 border lg:rounded-lg bg-white flex items-center text-lg">
          <div className="h-full w-[40px] flex items-center" onClick={goBack}>
            <Image
              src={left_back}
              alt="icon"
              className="h-[25px] w-[25px] cursor-pointer"
              // onClick={handleClickUser}
            />
          </div>
          <a
            href="/"
            className="cursor-pointer hover:text-green-600 sm:text-base md:text-lg"
          >
            Trang chủ /
          </a>
          <p className="ml-2 sm:text-base md:text-lg">Đăng ký</p>
        </div>
        <div className="h-auto sm:w-[90%] md:w-[75%] sm:mx-[5%] md:mx-[13%] mt-3 border rounded-lg bg-white">
          <div className="h-[570px] w-[100%] p-5 flex flex-col items-center">
            <p className="sm:text-2xl md:text-4xl font-medium mb-5">
              ĐĂNG KÝ TÀI KHOẢN
            </p>
            <div className="sm:w-full md:w-[400px] flex flex-col space-y-5 items-center">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Họ và tên"
                value={name}
                onChange={handleChangeName}
                className="border border-gray-300 rounded-md px-3 py-3 w-full focus:outline-none focus:border-green-600"
              />
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Địa chỉ"
                value={address}
                onChange={handleChangeAddress}
                className="border border-gray-300 rounded-md px-3 py-3 w-full focus:outline-none focus:border-green-600"
              />
              <input
                type="text"
                inputMode="numeric"
                id="phonenumber"
                name="phonenumber"
                placeholder="Nhập số điện thoại"
                value={account}
                onChange={handleChangeAccount}
                className="border border-gray-300 rounded-md px-3 py-3 w-full focus:outline-none focus:border-green-600"
              />
              {!sendCodeConf ? (
                <>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={handlePasswordChange}
                    className="border border-gray-300 rounded-md px-3 py-3 w-full focus:outline-none focus:border-green-600"
                  />
                  <input
                    type="password"
                    id="Confirmpassword"
                    name="Confirmpassword"
                    placeholder="Nhập lại mật khẩu"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className={
                      passwordMatch
                        ? "border border-gray-300 rounded-md px-3 py-3 w-full focus:outline-none focus:border-green-600"
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

              {!sendCodeConf ? (
                <></>
              ) : (
                <div className="flex">
                  <input
                    type="text"
                    id="code"
                    name="code"
                    placeholder="Nhập mã xác nhận"
                    onChange={(e) => {
                      setOTP(e.target.value);
                    }}
                    className="border border-gray-300 rounded-l-md px-3 pr-20 py-3 w-full focus:outline-none focus:border-green-600"
                  />
                  <a
                    onClick={sendOTP}
                    className="cursor-pointer border h-[52px] w-[120px] flex items-center justify-center rounded-r-md"
                  >
                    Gửi lại mã
                  </a>
                </div>
              )}
              {!sendCodeConf ? (
                <button
                  type="submit"
                  className="h-[50px] w-full bg-green-600 border border-green-600 rounded-md text-white hover:opacity-90"
                  onClick={sendOTP}
                >
                  Gửi mã xác nhận
                </button>
              ) : (
                <button
                  type="submit"
                  className="h-[50px] w-full bg-green-600 border border-green-600 rounded-md text-white hover:opacity-90"
                  onClick={hanldeRegister}
                >
                  Đăng ký
                </button>
              )}
              <p className="text-lg font-thin">
                Bạn đã có tài khoản, hãy{" "}
                <a href="/account/login" className="text-blue-600 underline">
                  Đăng nhập tại đây
                </a>
                <span id="recaptcha-container"></span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
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
    </>
  );
};

export default register;
