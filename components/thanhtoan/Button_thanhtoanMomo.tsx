import React, { useEffect, useState } from "react";
import axios from "axios";
import crypto from "crypto";
import router from "next/router";

const Button_thanhtoanMomo = () => {
  const [itemnangcap, setitemnangcap] = useState<any>();
  useEffect(() => {
    //lấy tin đăng cần nâng cấp
    const Items = localStorage.getItem("itemNangcap");
    if (Items) {
      setitemnangcap(JSON.parse(Items));
    }
  }, []);
  const date = new Date().getTime();
  //private
  const accessKey = "klm05TvNBzhg7h7j";
  const secretKey = "at67qH6mk8w5Y1nAyMoYKMWACiEi2bsa";
  const partnerCode = "MOMOBKUN20180529";
  //public
  const partnerName = "2handmarket";
  const requestType = "captureWallet";
  const ipnUrl = "http://localhost:4000/admin/phanhoiMomo"; //momo returnInfo khi user thanh toan thanh cong
  const orderId = date;
  const amount = 10000;
  const lang = "vi";
  const autoCapture = true;
  const orderInfo = `Tiêu đề tin: ${itemnangcap?.tieude}`;
  const requestId = date + "id";
  const extraData = "";
  // const redirectUrl = `http://localhost:3000/account/quan-ly-tin/${datainforUser?._id}`;
  const redirectUrl = window.location.href; // Lấy đường dẫn URL hiện tại
  // Tạo HMAC signature
  const rawData = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
  const hmac = crypto.createHmac("sha256", secretKey);
  hmac.update(rawData);
  const signature = hmac.digest("hex");

  const [isLoading, setIsLoading] = useState(false);
  const handleClick_thanhtoan = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/thanhtoanmomo", {
        partnerCode: partnerCode,
        partnerName: partnerName,
        requestType: requestType,
        ipnUrl: ipnUrl,
        redirectUrl: redirectUrl,
        orderId: orderId,
        amount: amount,
        lang: lang,
        autoCapture: autoCapture,
        orderInfo: orderInfo,
        requestId: requestId,
        extraData: extraData,
        signature: signature,
      });
      if (response) {
        // console.log("check fetch thanh toan momo: ", response.data);
        const data: any = response.data;
        router.push(data.payUrl);
        // const newTab = window.open(data.payUrl, "_blank");
        // if (newTab) {
        //   newTab.focus(); // Nhảy qua tab mới
        // } else {
        //   alert(
        //     "Trình duyệt đã chặn việc mở tab mới. Vui lòng kiểm tra cài đặt trình duyệt của bạn."
        //   );
        // }
      } else {
        console.error("Error:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <button
      className="h-[45px] w-full px-2 bg-mauxanhtroi rounded-md text-xl text-white flex items-center justify-center hover:opacity-90"
      onClick={() => handleClick_thanhtoan()}
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : "Thanh toán Momo"}
    </button>
  );
};

export default Button_thanhtoanMomo;
