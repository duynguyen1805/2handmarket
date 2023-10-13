import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import { API_register } from "@/service/userService";
// toast thông báo
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Image from "next/image";
import icon_user_128px from "../../assets/icon/user_128px.png";

interface ModalProps {
  isopen: boolean;
  onClose: () => void;
}
interface typeRole {
  label: string;
  type: string;
}
const role_arr: typeRole[] = [
  {
    label: "Quản trị",
    type: "Admin",
  },
  {
    label: "Khách hàng",
    type: "Client",
  },
];

const ModalComponent: React.FC<ModalProps> = ({ isopen, onClose }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [role, setRole] = useState("");
  const [response, setResponse] = useState<any>();

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
  const handlesetRole = (r: any) => {
    setRole(r);
  };
  const hanldeRegister = async () => {
    try {
      const data = await API_register(
        account,
        password,
        name,
        address,
        role,
        img
      );
      setResponse(data.errCode);
      {
        data.errCode === 0
          ? toast.success(data.message)
          : toast.error(data.message);
      }
    } catch (error) {
      toast.error("Lỗi APi register");
    }
  };

  useEffect(() => {
    if (response === 0) {
      onClose(); // Gọi onClose để đóng Modal
    }
  }, [response, onClose]);

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

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-30 flex items-center justify-center">
      <div className="modal-overlay absolute inset-0 bg-gray-900 opacity-20" />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.3, delay: 0.1 },
        }}
        exit={{ opacity: 0, y: -50, transition: { duration: 0.3 } }}
        className="modal-container bg-white h-auto w-[600px] rounded-lg shadow-lg z-50 overflow-y-auto"
      >
        <div className="modal-content">
          <div className="modal-header font-bold px-2 py-3 bg-mauxanhtroi text-white flex items-center place-content-between">
            <h3 className="text-lg font-semibold text-white">Tạo người dùng</h3>
            <button
              className="modal-close-btn text-white px-2 py-1 "
              onClick={onClose}
            >
              ✖
            </button>
          </div>
          <div className="modal-body">
            <div className="h-[650px] w-[100%] p-5 flex flex-col items-center">
              <p className="text-4xl font-medium mt-3">ĐĂNG KÝ TÀI KHOẢN</p>
              {/* hình đại diện */}
              <div className="h-[220px] sm:w-full md:w-[350px] flex items-center justify-start">
                <div className="relative flex items-center">
                  <div
                    className="h-[100px] w-[100px] border-2 border-mauxanhtroi rounded-full flex items-center justify-center bg-cover bg-no-repeat bg-center hover:opacity-60"
                    style={{
                      backgroundImage: `url(${avatar})`,
                    }}
                  >
                    {!avatar && (
                      <Image
                        src={icon_user_128px}
                        alt=""
                        className="h-[50px] w-[50px]"
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
              <div className="w-[500px] flex flex-col space-y-5 items-center">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Họ và tên"
                  value={name}
                  onChange={handleChangeName}
                  className="border-b border-gray-400 px-3 py-3 w-full focus:outline-none focus:border-mauxanhtroi"
                />
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Địa chỉ"
                  value={address}
                  onChange={handleChangeAddress}
                  className="border-b border-gray-400 px-3 py-3 w-full focus:outline-none focus:border-mauxanhtroi"
                />
                <input
                  type="text"
                  id="phonenumber"
                  name="phonenumber"
                  placeholder="Nhập số điện thoại"
                  value={account}
                  onChange={handleChangeAccount}
                  className="border-b border-gray-400 px-3 py-3 w-full focus:outline-none focus:border-mauxanhtroi"
                />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={handlePasswordChange}
                  className="border-b border-gray-400 px-3 py-3 w-full focus:outline-none focus:border-mauxanhtroi"
                />
                <div className="flex w-full space-x-1">
                  <input
                    type="password"
                    id="Confirmpassword"
                    name="Confirmpassword"
                    placeholder="Nhập lại mật khẩu"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className={
                      passwordMatch
                        ? "w-[70%] border-b border-gray-400 px-3 py-3 focus:outline-none focus:border-mauxanhtroi"
                        : "w-[70%] border border-red-600 rounded-md px-3 py-3 focus:outline-none focus:border-red-600"
                    }
                  />
                  <select
                    className="w-[30%] text-[black] text-base pl-2.5 border-b outline-none bg-transparent"
                    onChange={(e) => {
                      const selected = e.target.value;
                      handlesetRole(selected);
                    }}
                  >
                    <option selected hidden></option>
                    {role_arr.map((type, index) => {
                      return (
                        <option key={index} value={type.type} className="">
                          {type.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
                {!passwordMatch ? (
                  <p className="text-sm text-red-500">
                    Mật khẩu không trùng khớp
                  </p>
                ) : (
                  <></>
                )}

                <button
                  type="submit"
                  className="h-[50px] w-full bg-mauxanhtroi border border-mauxanhtroi rounded-md text-white hover:opacity-90"
                  onClick={hanldeRegister}
                >
                  Đăng ký
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default ModalComponent;
