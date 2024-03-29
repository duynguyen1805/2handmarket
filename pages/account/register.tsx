import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { API_register } from "@/service/userService";
import Head from "next/head";
import router from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import left_back from "../../assets/icon/left-arrow.png";
import eye from "../../assets/icon/eye.png";
import eye_lash from "../../assets/icon/eyelash.png";
import icon_user_128px from "../../assets/icon/user_128px.png";
import "react-phone-input-2/lib/style.css";
// toast thông báo
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Dùng cho otp firebase
import { firebase, auth } from "../../firebase.config";
import Link from "next/link";

const { PhoneNumberUtil, PhoneNumberFormat } = require("google-libphonenumber");
const phoneUtil = PhoneNumberUtil.getInstance();

const Register = () => {
  const [sendCodeConf, setsendCode] = useState(false);
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [otp, setOTP] = useState("");
  const [result_sendOTP, setresult_sendOTP] = useState<any>();
  const [view_password, setview_password] = useState(true);
  const [view_confirm_password, setconfirm_password] = useState(true);
  const [isvalid_phonenumber, setisvalid_phonenumber] = useState<
    boolean | null
  >(null);
  const [isvalid_pwd, setisvalid_pwd] = useState<boolean | null>(null);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    // setPasswordMatch(event.target.value === confirmPassword);
    const length_pwd = event.target.value;
    if (length_pwd.length < 8) {
      setisvalid_pwd(false);
    } else {
      setisvalid_pwd(true);
    }
  };
  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
    setPasswordMatch(event.target.value === password);
  };
  const handleChangeAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccount(e.target.value);
    const regex_phonenumber = /^0\d{9}$/;
    const isPhoneNumberValid = regex_phonenumber.test(e.target.value);
    setisvalid_phonenumber(isPhoneNumberValid);
  };
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const sendOTP = async () => {
    if (
      !name ||
      !account ||
      !address ||
      !password ||
      !confirmPassword ||
      !img ||
      !isvalid_phonenumber
    ) {
      toast.error("Vui lòng điền đủ và chính xác thông tin !");
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
        let build_data = {
          account: account,
          password: password,
          name: name,
          address: address,
          role: "Client",
          img: img,
        };
        const data = await API_register(build_data);
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

  const [avatar, setAvatar] = useState<any>();
  const [img, setImgAvatar] = useState<any>();

  async function getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleFile = async (e: any) => {
    let file = e.target.files[0];
    if (file) {
      let base64 = await getBase64(file);
      let objectURL = URL.createObjectURL(file);
      setImgAvatar(base64);
      setAvatar(objectURL);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen relative">
      <Head>
        <title>Đăng ký tài khoản</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon_2handmarket.png" />
      </Head>
      <Header />
      <div className="h-auto md:min-h-[calc(100vh-125px)] lg:min-h-[calc(100vh-90px)] w-[100%] lg:pt-[0px] md:pt-[0px] bg-gray-100 flex flex-col place-content-between">
        <div>
          <div className="h-[50px] sm:w-[100%] lg:w-[75%] lg:mx-[13%] sm:p-1 md:p-5 border lg:rounded-lg bg-white flex items-center text-lg">
            <div className="h-full w-[40px] flex items-center" onClick={goBack}>
              <Image
                src={left_back}
                alt="icon"
                className="h-[25px] w-[25px] cursor-pointer"
                // onClick={handleClickUser}
              />
            </div>
            <Link
              href="/"
              className="cursor-pointer hover:text-mauxanhtroi sm:text-base md:text-lg"
            >
              Trang chủ /
            </Link>
            <p className="ml-2 sm:text-base md:text-lg">Đăng ký</p>
          </div>
          <div className="h-auto sm:w-[90%] md:w-[75%] sm:mx-[5%] md:mx-[13%] mt-3 border rounded-lg bg-white">
            <div className="min-h-[690px] w-[100%] p-5 flex flex-col items-center">
              <p className="sm:text-2xl md:text-4xl font-medium mb-2">
                ĐĂNG KÝ TÀI KHOẢN
              </p>
              {/* hình đại diện */}
              <div className="h-[120px] sm:w-full md:w-[350px] mb-2 flex items-center justify-start">
                <div className="relative flex items-center">
                  <div
                    className="h-[120px] w-[120px] border-4 border-mauxanhtroi rounded-full flex items-center justify-center bg-cover bg-no-repeat bg-center hover:opacity-60"
                    style={{
                      backgroundImage: `url(${avatar})`,
                    }}
                  >
                    {!avatar && (
                      <Image
                        src={icon_user_128px}
                        alt=""
                        className="h-[60px] w-[60px]"
                      />
                    )}
                  </div>
                  <div className="absolute h-[50px] w-[220px] px-2 left-32 border border-mauxanhtroi text-mauxanhtroi rounded-md flex items-center justify-center hover:bg-blue-500 hover:text-white cursor-pointer">
                    <p className="">
                      Đặt ảnh đại diện
                      <input
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        type="file"
                        multiple
                        onChange={(e) => {
                          handleFile(e);
                        }}
                      />
                    </p>
                  </div>
                </div>
              </div>
              <div className="sm:w-full md:w-[400px] flex flex-col space-y-5 items-center">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Họ và tên"
                  value={name}
                  onChange={handleChangeName}
                  className="border border-gray-300 rounded-md px-3 py-3 w-full focus:outline-none focus:border-mauxanhtroi"
                />
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Địa chỉ"
                  value={address}
                  onChange={handleChangeAddress}
                  className="border border-gray-300 rounded-md px-3 py-3 w-full focus:outline-none focus:border-mauxanhtroi"
                />
                <input
                  type="text"
                  inputMode="numeric"
                  id="phonenumber"
                  name="phonenumber"
                  placeholder="Nhập số điện thoại"
                  value={account}
                  onChange={handleChangeAccount}
                  className="border border-gray-300 rounded-md px-3 py-3 w-full focus:outline-none focus:border-mauxanhtroi"
                />
                {isvalid_phonenumber == false && (
                  <p className="text-red-500 text-sm">
                    Số điện thoại không hợp lệ. Vui lòng kiểm tra lại.
                  </p>
                )}

                {!sendCodeConf ? (
                  <>
                    <div className="relative h-auto w-full flex flex-row">
                      <input
                        type={view_password ? "password" : "text"}
                        id="password"
                        name="password"
                        placeholder="Nhập mật khẩu"
                        value={password}
                        onChange={handlePasswordChange}
                        className="border border-gray-300 rounded-md px-3 py-3 w-full pr-[60px] focus:outline-none focus:border-mauxanhtroi"
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
                    {isvalid_pwd == false && (
                      <p className="text-red-500 text-sm">
                        Mật khẩu phải có từ 8 ký tự.
                      </p>
                    )}
                    <div className="relative h-auto w-full flex flex-row">
                      <input
                        type={view_confirm_password ? "password" : "text"}
                        id="Confirmpassword"
                        name="Confirmpassword"
                        placeholder="Nhập lại mật khẩu"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        className={
                          passwordMatch
                            ? "border border-gray-300 rounded-md px-3 py-3 w-full focus:outline-none focus:border-mauxanhtroi"
                            : "border border-red-600 rounded-md px-3 py-3 w-full focus:outline-none focus:border-red-600"
                        }
                      />
                      <div className="absolute right-0 top-0 h-full w-[50px] flex items-center justify-center">
                        <Image
                          src={view_confirm_password ? eye_lash : eye}
                          alt=""
                          className="h-[25px] w-[25px]"
                          onClick={() =>
                            setconfirm_password(!view_confirm_password)
                          }
                        />
                      </div>
                    </div>

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
                      className="border border-gray-300 rounded-l-md px-3 pr-20 py-3 w-full focus:outline-none focus:border-mauxanhtroi"
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
                    className="h-[50px] w-full bg-mauxanhtroi border border-mauxanhtroi rounded-md text-white hover:opacity-90"
                    onClick={sendOTP}
                  >
                    Gửi mã xác nhận
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="h-[50px] w-full bg-mauxanhtroi border border-mauxanhtroi rounded-md text-white hover:opacity-90"
                    onClick={hanldeRegister}
                  >
                    Đăng ký
                  </button>
                )}
                <p className="text-lg font-thin">
                  Bạn đã có tài khoản, hãy{" "}
                  <Link
                    href="/account/login"
                    className="text-blue-600 underline"
                  >
                    Đăng nhập tại đây
                  </Link>
                  <span id="recaptcha-container"></span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Register;
