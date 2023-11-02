import React, { useState } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import Image from "next/image";
import addimg from "../../assets/icon/addimg.png";
import { API_update_tindang } from "@/service/userService";
// toast thông báo
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ModalProps {
  isopenModalChinhsua: boolean;
  setOpenModalChinhsua: any;
  type: any;
  idTindang: any;
  img_arr: any;
  setImg_arr: any;
  inputTieude: any;
  setInputTieude: any;
  inputMota: any;
  setInputMota: any;
  giaban_muamoi: any;
  setGiaban_muamoi: any;
  giaban: any;
  setGiaban: any;
  handle_update_tindang: any;
}

const ModalComponent: React.FC<ModalProps> = ({
  isopenModalChinhsua,
  setOpenModalChinhsua,
  type,
  idTindang,
  img_arr,
  setImg_arr,
  inputTieude,
  setInputTieude,
  inputMota,
  setInputMota,
  giaban_muamoi,
  setGiaban_muamoi,
  giaban,
  setGiaban,
  handle_update_tindang,
}) => {
  if (!isopenModalChinhsua) return null;
  //   const handleClick_Capnhat = async () => {
  //     let token_req: any = localStorage.getItem("token_req");
  //     let item = {
  //       img: img_arr,
  //       tieude: inputTieude,
  //       mota: inputMota,
  //       giaban_muamoi: giaban_muamoi,
  //       giaban: giaban,
  //     };
  //     try {
  //       const response = await API_update_tindang(
  //         idTindang,
  //         type,
  //         item,
  //         token_req
  //       );
  //       if (response && response.errCode == 0) {
  //         toast.success(response.message);
  //         setOpenModalChinhsua(false);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  async function getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  const [reviewImg_arr_modal, setReviewImg_arr] = useState<any>([]);
  const handleFile = async (e: any) => {
    //login handle multiple file (lưu 3 ảnh chung 1 trường img)
    //chọn 1 lượt, ko chọn thêm từng ảnh.
    let files = e.target.files;
    let fileArray = Array.from(files);

    let base64Array: any = [];
    let objectURLArray: any = [];

    for (let i = 0; i < fileArray.length; i++) {
      let file: any = fileArray[i];
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

  const [demkitutieude, setDemkituTieude] = useState(0);
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

  const handleChange_giaban_muamoi = (e: any) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const numericValue = parseInt(rawValue, 10);
    if (!isNaN(numericValue)) {
      setGiaban_muamoi(numericValue);
    } else {
      setGiaban_muamoi(undefined);
    }
  };
  const handleChange_giaban = (e: any) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const numericValue = parseInt(rawValue, 10);
    if (!isNaN(numericValue)) {
      setGiaban(numericValue);
    } else {
      setGiaban(undefined);
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
        className="modal-container bg-white h-auto w-[700px] max-w-[700px] mx-auto rounded-lg shadow-lg z-50 overflow-y-auto"
      >
        <div className="modal-content w-full">
          <div className="modal-header font-bold px-2 py-3 bg-mauxanhtroi text-white flex items-center place-content-between">
            <h3 className="text-lg font-semibold text-white">
              Chỉnh sửa Tin đăng
            </h3>
            <button
              className="modal-close-btn text-white px-2 py-1 "
              onClick={() => setOpenModalChinhsua(false)}
            >
              ✖
            </button>
          </div>
          <div className="modal-body">
            <div className="h-auto w-full flex flex-col items-center justify-center">
              <div className="h-full sm:w-full px-2 space-y-2 mt-2">
                <div className="flex">
                  <p className="text-lg font-bold">Hình ảnh sản phẩm</p>
                  <p className="text-red-500 text-xl ml-1">*</p>
                </div>
                <div className="h-[100px] w-full border border-dotted border-blue-500">
                  <div className="h-full w-full relative overflow-hidden">
                    <input
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      type="file"
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
                  {img_arr !== null && img_arr !== "" ? (
                    img_arr?.map((item_img: any, index: number) => {
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
            </div>
            <div className="h-auto w-auto px-5">
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
                />
              </div>
              <div>
                <div className="mb-1 px-1 flex">
                  <p>Giá mua mới</p>
                </div>
                <input
                  type="text"
                  min={0}
                  value={giaban_muamoi?.toLocaleString("vi-VN")}
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
                  value={giaban?.toLocaleString("vi-VN")}
                  placeholder="Giá bán lại sản phẩm (vnđ)"
                  className="h-[45px] w-full rounded-md border border-gray-400 outline-none px-2"
                  onChange={(e) => handleChange_giaban(e)}
                />
              </div>
            </div>

            <div className="h-[60px] w-full flex items-center justify-end px-2 space-x-3">
              <button
                className={`px-4 py-2 border border-gray-300 bg-gray-200 hover:bg-mauxanhtroi hover:text-white rounded-md cursor-pointer`}
                onClick={() => handle_update_tindang()}
              >
                Cập nhật
              </button>
              <button
                className={`px-4 py-2 border border-gray-300 bg-gray-200 hover:bg-gray-300 rounded-md cursor-pointer`}
                onClick={() => setOpenModalChinhsua(false)}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default ModalComponent;
