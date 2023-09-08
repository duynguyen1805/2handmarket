import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import router from "next/router";
import React, { useState } from "react";
import Image from "next/image";
import left_back from "../../assets/icon/left-arrow.png";
const resetpassword = () => {
  const [sendCodeConf, setsendCode] = useState(false);
  const sendCode = () => {
    setsendCode(!sendCodeConf);
  };
  const goBack = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>Đặt lại mật khẩu</title>
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
          <a href="/" className="cursor-pointer hover:text-green-600">
            Trang chủ /
          </a>
          <p className="ml-2">Đặt lại mật khẩu</p>
        </div>
        <div className="h-auto sm:w-[90%] md:w-[75%] sm:mx-[5%] md:mx-[13%] mt-3 border rounded-lg bg-white">
          <div className="sm:h-[440px] md:h-[560px] w-[100%] p-5 md:pt-[100px] flex flex-col items-center">
            <p className="sm:text-2xl md:text-4xl font-medium mb-10">
              KHÔI PHỤC TÀI KHOẢN
            </p>
            <div className="sm:w-full md:w-[400px] flex flex-col space-y-6 items-center">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Nhập số điện thoại"
                className="border border-gray-300 rounded-md px-3 py-3 w-full focus:outline-none focus:border-green-600"
              />
              {!sendCodeConf ? (
                <></>
              ) : (
                <div className="flex">
                  <input
                    type="text"
                    id="code"
                    name="code"
                    placeholder="Nhập mã Xác nhận"
                    className="border border-gray-300 rounded-l-md px-3 pr-20 py-3 w-full focus:outline-none focus:border-green-600"
                  />
                  <a
                    href="/"
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
                  onClick={sendCode}
                >
                  Gửi mã xác nhận
                </button>
              ) : (
                <button
                  type="submit"
                  className="h-[50px] w-full bg-green-600 border border-green-600 rounded-md text-white hover:opacity-90"
                  onClick={sendCode}
                >
                  Khôi phục
                </button>
              )}

              <p className="text-lg font-thin">
                Bạn đã có tài khoản, hãy{" "}
                <a href="/account/login" className="text-blue-600 underline">
                  Đăng nhập tại đây
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default resetpassword;
