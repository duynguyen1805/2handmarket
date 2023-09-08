import { API_getHistoryOrderbyDate } from "@/service/userService";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../language_datepicker/vi";

const Dashboard = () => {
  const [dataFilter, setDataFilter] = useState<any>();
  const [datatime, setDatatime] = useState<any>();
  const [price_total, setPriceTotal] = useState<number>(0);

  const handleGetTime = async (date: any) => {
    //formatedDate: Sun Jun 18 2023 00:00:00 GMT+0700 (Indochina Time) >>> 1687021200000
    //DatePicker đã format sẵn 00:00:00 >>> new Date() bình thường cần format thành 00:00:00
    const datetoSetDatePicker = new Date(date).getTime();
    setDatatime(datetoSetDatePicker);

    //formated Date để gọi API (ex: 5/2023)
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Lưu ý: Tháng bắt đầu từ 0 (0 - 11)
    const day = date.getDate();
    const formatedDate = `${month}/${year}`; // MM/yyyy
    // console.log("Check date picker: ", formatedDate);
    try {
      const response = await API_getHistoryOrderbyDate(formatedDate);
      if (response.errCode === 0) {
        setDataFilter(response.History);
        let total = 0;
        for (let i = 0; i < response.History.length; i++) {
          total += response.History[i].price_total;
          setPriceTotal(total);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [keysearch, setKeywordSearch] = useState<any>("");
  const [filterSearch, setfilterSearch] = useState<any>();

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setKeywordSearch(value);
    const Search = dataFilter?.filter(
      (item: any) =>
        item.name_User.toLowerCase().includes(value.toLowerCase()) ||
        item.account_User.toLowerCase().includes(value.toLowerCase())
    );
    setfilterSearch(Search);
  };

  return (
    <div className="h-full w-full">
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
        <input
          type="text"
          className="md:h-full h-[50px] w-full sm:px-3 md:px-0 text-lg border-b border-gray-500 outline-none"
          placeholder="Tìm kiếm theo Tên hoặt SĐT"
          onChange={handleChangeSearch}
        />
      </div>

      <table className="sm:hidden md:block border-collapse h-[40px] w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="pt-1 w-[1%] text-xl border border-black">
              Ngày đặt
            </th>
            <th className="pt-1 w-[5%] text-xl border border-black">
              Người đặt
            </th>
            <th className="pt-1 w-[2%] text-xl border border-black">SĐT</th>
            <th className="pt-1 w-[10%] text-xl border border-black">
              Địa chỉ
            </th>
            <th className="pt-1 w-[30%] text-xl border border-black">
              Tên sản phẩm
            </th>
            <th className="pt-1 w-[10%] text-xl border border-black">
              Tổng giá
            </th>
          </tr>
        </thead>
        <tbody>
          {dataFilter &&
            keysearch === "" &&
            dataFilter.map((item_order: any, index: any) => {
              return (
                <tr key={index}>
                  <td className="pt-1 px-2 border text-lg border-black">
                    {item_order.time_order}
                  </td>
                  <td className="pt-1 px-2 border text-lg border-black">
                    {item_order.name_User}
                  </td>
                  <td className="pt-1 px-1 border text-lg text-center border-black">
                    {item_order.account_User}
                  </td>
                  <td className="pt-1 px-1 border border-black">
                    {item_order.address_User}
                  </td>
                  <td className="px-1 border border-black">
                    {item_order &&
                      item_order.cartItems.map((name_order: any) => {
                        return (
                          <div className="h-auto min-h-[40px] w-[100%] text-lg flex">
                            <p className="h-auto w-[20%] min-w-[150px] font-bold flex border-r border-black">
                              SL: {name_order.is_sold} /
                              <p className="font-medium"> {name_order.unit}</p>
                            </p>
                            <p className="h-auto w-[80%] px-2">
                              {name_order.name}
                            </p>
                          </div>
                        );
                      })}
                  </td>
                  <td className="pt-1 px-1 border border-black">
                    <p className="flex items-center justify-center text-lg">
                      {item_order.price_total.toLocaleString("vi-VI")} đ
                    </p>
                  </td>
                </tr>
              );
            })}
          {filterSearch &&
            keysearch !== "" &&
            filterSearch.map((item_order: any, index: any) => {
              return (
                <tr key={index}>
                  <td className="pt-1 px-2 border text-lg border-black">
                    {item_order.time_order}
                  </td>
                  <td className="pt-1 px-2 border text-lg border-black">
                    {item_order.name_User}
                  </td>
                  <td className="pt-1 px-1 border text-lg text-center border-black">
                    {item_order.account_User}
                  </td>
                  <td className="pt-1 px-1 border border-black">
                    {item_order.address_User}
                  </td>
                  <td className="px-1 border border-black">
                    {item_order &&
                      item_order.cartItems.map((name_order: any) => {
                        return (
                          <div className="h-auto min-h-[40px] w-[100%] text-lg flex">
                            <p className="h-auto w-[20%] min-w-[150px] font-bold flex border-r border-black">
                              SL: {name_order.is_sold} /
                              <p className="font-medium"> {name_order.unit}</p>
                            </p>
                            <p className="h-auto w-[80%] px-2">
                              {name_order.name}
                            </p>
                          </div>
                        );
                      })}
                  </td>
                  <td className="pt-1 px-1 border border-black">
                    <p className="flex items-center justify-center text-lg">
                      {item_order.price_total.toLocaleString("vi-VI")} đ
                    </p>
                  </td>
                </tr>
              );
            })}
        </tbody>
        <div className="h-[60px] w-full px-5 text-xl flex items-center justify-end border-x border-b border-gray-600">
          Tổng doanh thu: {price_total.toLocaleString("VI-vi")}đ
        </div>
      </table>
      <div className="md:hidden mx-3 space-y-3 mb-3">
        <div className="h-auto w-full text-2xl flex items-center justify-start">
          Doanh thu tháng: {price_total.toLocaleString("VI-vi")}đ
        </div>
        {dataFilter &&
          keysearch === "" &&
          dataFilter.map((item_order: any, index: any) => {
            return (
              <div
                key={index}
                className="h-auto bg-white rounded-lg shadow-xl mb-3"
              >
                <div className="px-3 py-2 flex flex-col space-y-1">
                  <p className="font-bold text-lg">
                    {item_order.name_User} | {item_order.account_User}
                  </p>
                  <p className="font-thin">{item_order.address_User}</p>
                  <p className="font-thin">Ngày đặt: {item_order.time_order}</p>
                  <p className="font-bold text-lg">Đặt: </p>
                  <div className="h-auto font-thin">
                    {item_order.cartItems &&
                      item_order.cartItems.map((item_order: any) => {
                        return (
                          <div className="flex border-b border-gray-500">
                            <p className="min-w-[30%] font-medium">
                              {item_order.is_sold} {item_order.unit}
                            </p>
                            <p>{item_order.name}</p>
                          </div>
                        );
                      })}
                  </div>
                  <p className="font-bold text-lg pt-1">
                    Tổng giá: {item_order.price_total.toLocaleString("VI-vi")}đ
                  </p>
                </div>
              </div>
            );
          })}
        {filterSearch &&
          keysearch !== "" &&
          filterSearch.map((item_order: any, index: any) => {
            return (
              <div key={index} className="h-auto bg-white rounded-lg shadow-xl">
                <div className="px-3 py-2 flex flex-col space-y-1">
                  <p className="font-bold text-xl">
                    {item_order.name_User} | {item_order.account_User}
                  </p>
                  <p className="font-thin text-lg">{item_order.address_User}</p>
                  <p className="font-thin text-lg">
                    Ngày đặt: {item_order.time_order}
                  </p>
                  <p className="font-bold text-lg">Đặt: </p>
                  <div className="h-auto font-thin text-lg">
                    {item_order.cartItems &&
                      item_order.cartItems.map((item_order: any) => {
                        return (
                          <div className="flex border-b border-gray-500">
                            <p className="min-w-[30%] font-medium">
                              {item_order.is_sold} {item_order.unit}
                            </p>
                            <p>{item_order.name}</p>
                          </div>
                        );
                      })}
                  </div>
                  <p className="font-bold text-xl py-1">
                    Tổng giá: {item_order.price_total.toLocaleString("VI-vi")}đ
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Dashboard;
