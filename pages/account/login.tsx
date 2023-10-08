import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import router from "next/router";
import React, { useState, KeyboardEvent } from "react";
import { API_login } from "../../service/userService";
import Image from "next/image";
import left_back from "../../assets/icon/left-arrow.png";
import eye from "../../assets/icon/eye.png";
import eye_lash from "../../assets/icon/eyelash.png";

// toast thông báo
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMyContext } from "@/contexts/MyContext";
import Link from "next/link";

const Login = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [view_password, setview_password] = useState(true);
  //lấy các biến, hàm trong context ra sử dụng.
  const { isLogin, setLogin, information_User, setInfoUser } = useMyContext();

  async function handleClickLogin() {
    if (!account && !password) {
      toast.error("Nhập thiếu thông tin. Kiểm tra lại.");
    } else {
      const data = await API_login(account, password);
      if (data.errCode === 0) {
        // Lưu thông tin người dùng vào context
        setLogin(true);
        setInfoUser({
          _id: data.user._id,
          name: data.user.name,
          account: data.user.account,
          address: data.user.address,
          role: data.user.role,
          createdAt: data.user.createdAt,
        });

        const inforUser = {
          _id: data.user._id,
          name: data.user.name,
          account: data.user.account,
          address: data.user.address,
          role: data.user.role,
          avatar: data.user.img,
          createdAt: data.user.createdAt,
        };

        // Lưu thông tin người dùng và token vào localStorage hoặc cookie
        // localStorage.setItem("inforUser", JSON.stringify(inforUser));
        localStorage.setItem("token", JSON.stringify(data.access_token));

        // Chuyển hướng đến trang admin hoặc user tùy vào roleId
        if (data.user.role === "Admin") {
          router.push("/admin/adminDashboard");
        } else {
          router.push("/");
        }
        toast.success(data.message);
      }
      if (data.errCode === 1) {
        toast.error(data.message);
      }
      if (data.errCode === 2) {
        toast.error(data.message);
      }
      if (data.errCode === 3) {
        toast.error(data.message);
      }
    }
  }
  const resetpassword = () => {
    router.push("/account/resetpassword");
  };
  const clickRegister = () => {
    router.push("/account/register");
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleClickLogin();
    }
  };
  const goBack = () => {
    router.back();
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>Đăng nhập</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon_2handmarket.png" />
      </Head>
      <div className="absolute h-auto w-full top-0 left-0">
        <Header />
      </div>
      <div className="h-auto min-h-screen w-[100%] lg:pt-[90px] md:pt-[125px] bg-gray-100 flex flex-col place-content-between">
        <div>
          <div className="h-[50px] sm:w-[100%] lg:w-[75%] lg:mx-[13%] sm:p-1 md:p-5 border lg:rounded-lg bg-white flex items-center text-lg">
            <div className="h-full w-[40px] flex items-center" onClick={goBack}>
              <Image
                src={left_back}
                alt="icon"
                className="h-[25px] w-[25px] cursor-pointer"
              />
            </div>
            <Link
              href="/"
              className="cursor-pointer hover:text-green-600 sm:text-base md:text-lg"
            >
              Trang chủ /
            </Link>
            <p className="ml-2 sm:text-base md:text-lg">Đăng nhập</p>
          </div>
          <div className="h-auto sm:w-[90%] md:w-[75%] sm:mx-[5%] md:mx-[13%] mt-3 border rounded-lg bg-white">
            <div className="sm:h-[460px] md:h-[560px] w-[100%] p-5 md:pt-[100px] flex flex-col items-center">
              <p className="text-4xl font-medium mb-10">ĐĂNG NHẬP</p>
              <div className="sm:w-full md:w-[400px] flex flex-col space-y-6 items-center">
                <input
                  type="text"
                  inputMode="numeric"
                  id="username"
                  name="username"
                  placeholder="Số điện thoại"
                  className="border border-gray-300 rounded-md px-3 py-3 w-full focus:outline-none focus:border-blue-600"
                  value={account}
                  onChange={(e) => {
                    setAccount(e.target.value);
                  }}
                  onKeyDown={handleKeyDown}
                />
                <div className="relative h-auto w-full flex flex-row">
                  <input
                    type={view_password ? "password" : "text"}
                    id="password"
                    name="password"
                    placeholder="Mật khẩu của bạn"
                    className="border border-gray-300 rounded-md px-3 py-3 w-full pr-[60px] focus:outline-none focus:border-blue-600"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    onKeyDown={handleKeyDown}
                  />
                  <div className="absolute right-0 top-0 h-full w-[50px] flex items-center justify-center">
                    <Image
                      src={view_password ? eye_lash : eye}
                      alt=""
                      className="h-[25px] w-[25px]"
                      onClick={() => setview_password(!view_password)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="h-[50px] w-full bg-blue-500 border border-blue-500 rounded-md text-white hover:opacity-90"
                  onClick={handleClickLogin}
                >
                  Đăng nhập
                </button>

                <p
                  className="font-medium text-base cursor-pointer hover:text-blue-600 hover:underline"
                  onClick={resetpassword}
                >
                  Quên mật khẩu
                </p>
                <div className="text-lg font-thin">
                  Bạn chưa có tài khoản, hãy{" "}
                  <Link
                    href="/account/register"
                    className="text-blue-600 underline"
                  >
                    <p
                      className="text-blue-600 underline"
                      onClick={clickRegister}
                    >
                      Đăng kí tại đây
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
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

export default Login;
