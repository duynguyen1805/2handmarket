import React from "react";

const Footer = () => {
  return (
    <div className=" h-auto sm:w-[100%] bg-gray-100">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 md:gap-10">
          <div className="sm:h-auto md:h-[300px] lg:ml-[25%] sm:mx-[1%] md:ml-[5%] sm:pt-1 md:pt-5">
            <div className="sm:text-base md:text-xl font-bold md:mb-4">
              HỆ THỐNG CỬA HÀNG
            </div>
            <div className="sm:text-base md:text-xl">Khu vực Cần Thơ</div>
            <div className="sm:text-base md:text-xl sm:mb-1 md:mb-4">
              123, đường 3/2, Ninh Kiều, Cần Thơ
            </div>
            <div className="sm:text-base md:text-xl">
              Số điện thoại: 0907497517
            </div>
            <div className="sm:text-base md:text-xl">Email: info@gmail.com</div>
          </div>
          <div className=" h-auto lg:ml-[25%] sm:mx-[1%] sm:pt-1 md:ml-[5%] md:pt-5">
            <div className="sm:text-base md:text-xl font-bold md:mb-4">
              HỖ TRỢ KHÁCH HÀNG
            </div>
            <div className="sm:text-base md:text-xl">
              CHÍNH SÁCH & QUY ĐỊNH CHUNG
            </div>
            <div className="sm:text-base md:text-xl">
              QUY ĐỊNH VÀ HÌNH THỨC THANH TOÁN
            </div>
            <div className="sm:text-base md:text-xl">
              CHÍNH SÁCH BẢO MẬT THÔNG TIN
            </div>
            <div className="sm:text-base md:text-xl">
              CHÍNH SÁCH VẬN CHUYỂN VÀ GIAO NHẬN
            </div>
            <div className="sm:text-base md:text-xl">
              CHÍNH SÁCH TRẢ HÀNG - HOÀN TIỀN
            </div>
          </div>
          <div className="md:h-[300px] lg:ml-[25%] sm:mx-[1%] md:ml-[5%] sm:pt-1 md:pt-5">
            <div className="sm:text-base md:text-xl font-bold md:mb-4">
              TỔNG ĐÀI HỖ TRỢ
            </div>
            <div className="w-full flex space-x-5">
              <div>
                <div>MUA HÀNG</div>
                <div className="text-xl font-bold text-green-600 md:mb-2">
                  0907497517
                </div>
              </div>
              <div>
                <div>GÓP Ý - KHIẾU NẠI</div>
                <div className="text-xl font-bold text-green-600 md:mb-2">
                  0907497517
                </div>
              </div>
            </div>
            <div>PHƯƠNG THỨC THANH TOÁN</div>
            <div className="h-[60px] w-[150px] bg-[url('../public/thanhtoan.png')] bg-cover bg-no-repeat border rounded-lg sm:ml-0 sm:scale-75 md:scale-100 lg:ml-8"></div>
            <div className="md:hidden h-[80px] w-[100%]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
