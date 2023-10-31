import {
  API_getLichsu_qc_byDate,
  API_searchLichsu_qc_tindang,
} from "@/service/userService";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../language_datepicker/vi";
import Image from "next/image";
import icon_copy from "../../assets/icon/copy.png";
import icon_copying from "../../assets/icon/copying.png";
import icon_expand from "../../assets/icon/expand-arrows.png";

import router from "next/router";

const Quangcao = () => {
  const [lichsu_qc, setLichsu_qc] = useState<any[]>([]);
  const [datatime, setDatatime] = useState<any>();
  const [price_total, setPriceTotal] = useState<number>(0);

  // useEffect(() => {
  //   const fetchdata = async () => {
  //     let token_req: any = localStorage.getItem("token_req");
  //     try {
  //       const response = await API_getLichsu_qc_tindang(token_req);
  //       console.log("Check response: ", response);
  //       setLichsu_qc(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchdata();
  // }, []);

  const handleGetTime = async (date: any) => {
    setvalue_change("");
    //formatedDate: Sun Jun 18 2023 00:00:00 GMT+0700 (Indochina Time) >>> 1687021200000
    //DatePicker đã format sẵn 00:00:00 >>> new Date() bình thường cần format thành 00:00:00
    const datetoSetDatePicker = new Date(date).getTime();
    setDatatime(datetoSetDatePicker);

    //formated Date để gọi API (ex: 5/2023)
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Lưu ý: Tháng bắt đầu từ 0 (0 - 11)
    const day = date.getDate();
    const formatedDate: string = `${month}/${year}`; // MM/yyyy
    // console.log("Check date picker: ", formatedDate);
    const token_req: any = localStorage.getItem("token_req");
    try {
      const response = await API_getLichsu_qc_byDate(formatedDate, token_req);
      if (response.errCode === 0) {
        setLichsu_qc(response.History);
        if (response.History.length == 0) {
          setPriceTotal(0);
        } else {
          let total = 0;
          for (let i = 0; i < response.History.length; i++) {
            total += 10000;
            setPriceTotal(total);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [copied, setCopied] = useState(false);
  const [index_copied, set_index_copied] = useState<number>(0);
  const handle_copyID_tindang = (id_tindang: string, index: number) => {
    const textToCopy = id_tindang;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopied(true);
        set_index_copied(index);
        setTimeout(() => setCopied(false), 1000);
      })
      .catch((error) => {
        console.error("Lỗi khi sao chép:", error);
      });
  };

  const [value_change, setvalue_change] = useState<string>("");
  const handleSearch = async () => {
    setDatatime(undefined);
    setPriceTotal(0);
    let token_req: any = localStorage.getItem("token_req");
    try {
      const response = await API_searchLichsu_qc_tindang(
        value_change,
        token_req
      );
      setLichsu_qc(response.resultSearch);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="h-auto w-full">
        <div className="md:h-[50px] h-auto w-full mb-3 md:flex">
          <DatePicker
            locale="vi"
            selected={datatime}
            showMonthYearPicker
            dateFormat="MM/yyyy"
            className="h-[50px] w-full md:w-[250px] py-2 bg-gray-100 outline-none border-gray-300 border-2 rounded-md text-center text-xl"
            placeholderText="Tháng Năm"
            onChange={(date: Date) => handleGetTime(date)}
          ></DatePicker>
          <div className="h-auto w-full flex items-center">
            <input
              type="text"
              value={value_change}
              className="md:h-full h-[50px] w-full sm:px-3 md:px-1 text-lg border-l border-y border-gray-500 rounded-l-lg outline-none"
              placeholder="Tìm kiếm theo Tiêu đề, người đăng"
              onChange={(e) => setvalue_change(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              disabled={value_change == ""}
              className="h-full w-[60px] border-r border-y border-gray-500 rounded-r-lg bg-gray-300"
              onClick={handleSearch}
            >
              Tìm
            </button>
          </div>

          <div className="h-[50px] w-full py-2 text-2xl flex items-center justify-end space-x-2">
            <span>Tổng tiền:</span>
            <span className="text-red-500">
              {price_total.toLocaleString("vi-VI")}
            </span>
            <span>vnđ</span>
          </div>
        </div>

        <table className="sm:hidden md:block border-collapse h-10 w-full table-auto">
          <thead className="bg-gray-100 w-[100%]">
            <tr className="w-full">
              <th className="py-2 w-[2%] text-xl border border-black">STT</th>
              <th className="py-2 w-[2%] text-xl border border-black">ID</th>
              <th className="py-2 w-[6%] text-xl border border-black">Loại</th>
              <th className="py-2 w-[30%] text-xl border border-black">
                Tiêu đề
              </th>
              <th className="py-2 w-[10%] text-xl border border-black">
                Người đăng
              </th>
              <th className="py-2 w-[8%] text-xl border border-black">
                Ngày bắt đầu
              </th>
              <th className="py-2 w-[8%] text-xl border border-black">
                Ngày kết thúc
              </th>
              <th className="py-2 w-[6%] text-xl border border-black">
                Đơn giá
              </th>
            </tr>
          </thead>
          <tbody>
            {lichsu_qc &&
              lichsu_qc.map((item: any, index: number) => {
                return (
                  <tr key={index}>
                    <td className="py-2 pl-2 border border-black">
                      {index + 1}
                    </td>
                    <td className="p-2 border border-black">
                      <Image
                        src={
                          copied == true && index_copied == index
                            ? icon_copying
                            : icon_copy
                        }
                        alt=""
                        className="h-[28px] min-w-[28px] cursor-pointer"
                        onClick={() => {
                          const newTab: any = window.open(
                            `/products/${item.id_tindang}?type=${item.type}`,
                            "_blank"
                          );
                          newTab.focus();
                        }}
                      />
                    </td>
                    <td className="py-2 pl-2 border border-black">
                      {item.type}
                    </td>
                    <td className="py-2 pl-2 border border-black overflow-hidden">
                      {item.tieude}
                    </td>
                    <td className="py-2 pl-2 px-2 border border-black">
                      <div className="h-auto w-full flex items-center place-content-between">
                        <span>{item.name_user}</span>
                        <Image
                          src={icon_expand}
                          alt=""
                          className="h-[24px] w-[24px] min-w-[24px] cursor-pointer"
                          onClick={() => {
                            const newTab: any = window.open(
                              `/account/trang-ca-nhan/${item.id_user}`,
                              "_blank"
                            );
                            newTab.focus();
                          }}
                        />
                      </div>
                    </td>
                    <td className="py-2 pl-2 border border-black">
                      {item.thoigian &&
                        item.thoigian.map((item: any, index: number) => {
                          return (
                            <span
                              key={index}
                              className="break-before-column"
                              style={{ display: "block" }}
                            >
                              {item.ngaybatdau}
                            </span>
                          );
                        })}
                    </td>
                    <td className="py-2 pl-2 border border-black">
                      {item.thoigian &&
                        item.thoigian.map((item: any, index: number) => {
                          return (
                            <span
                              key={index}
                              className="break-before-column"
                              style={{ display: "block" }}
                            >
                              {item.ngayketthuc}
                            </span>
                          );
                        })}
                    </td>
                    <td className="py-2 pl-2 text-center border border-black">
                      10.000 vnđ
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Quangcao;
