import {
  API_deleteUser,
  API_getAllUser,
  API_search_user,
} from "@/service/userService";
import React, { useEffect, useState } from "react";
// toast thông báo
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal_addnew_user from "../modal/Modal_addnew_user";
import router from "next/router";
import { useMyContext } from "@/contexts/MyContext";

const ManageUser = () => {
  const { handle_setIsLoading } = useMyContext();
  const [users, setUser] = useState<any>();
  const [isOpenAddnew, setOpenAddnew] = useState(false);

  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = async () => {
    const token_req: any = localStorage.getItem("token_req");
    try {
      const response = await API_getAllUser(token_req);
      setUser(response);
      console.log("check response: ", response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDeleteUser = async (id: string) => {
    const token_req: any = localStorage.getItem("token_req");
    try {
      const response = await API_deleteUser(id, token_req);
      {
        response && response.errCode === 0
          ? toast.success("Xóa thành công.") && getAllUser()
          : toast.error("Không thành công, thử lại sau");
      }
    } catch (error) {
      console.error("Error fetching API delete:", error);
    }
  };

  function toggleAddnew() {
    setOpenAddnew(!isOpenAddnew);
    getAllUser();
  }

  const handle_push_trangcanhan = async (id: string) => {
    try {
      handle_setIsLoading(true);
      await router.push(`/account/trang-ca-nhan/${id}`);
      handle_setIsLoading(false);
    } catch (error) {
      console.error("Error navigating:", error);
      handle_setIsLoading(false);
    }
  };

  const [value_change, setvalue_change] = useState<string>("");
  const handleSearch = async () => {
    let token_req: any = localStorage.getItem("token_req");
    try {
      const response = await API_search_user(value_change, token_req);
      setUser(response.resultSearch);
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
        <div className="md:h-[50px] h-auto w-full mb-2 md:flex place-content-between ">
          <button
            className="sm:hidden md:block h-[50px] w-[150px] bg-mauxanhtroi text-white rounded-lg hover:opacity-80 cursor-pointer"
            onClick={toggleAddnew}
          >
            Tạo người dùng
          </button>
          <div className="h-auto w-[500px] flex items-center">
            <input
              type="text"
              value={value_change}
              className="md:h-full h-[50px] w-full sm:px-3 md:px-1 text-lg border-l border-y border-gray-500 rounded-l-lg outline-none"
              placeholder="Tìm kiếm theo Tên, số điện thoại, email"
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
        </div>

        <table className="sm:hidden md:block border-collapse h-[40px] w-full table-auto">
          <thead className="bg-gray-100 w-[100%]">
            <tr>
              <th className="pt-1 w-[10%] text-xl border border-black">
                Họ tên
              </th>
              <th className="pt-1 w-[6%] text-xl border border-black">SĐT</th>
              <th className="pt-1 w-[30%] text-xl border border-black">
                Địa chỉ
              </th>
              <th className="pt-1 w-[6%] text-xl border border-black">
                Ngày tham gia
              </th>
              <th className="pt-1 w-[8%] text-xl border border-black">
                Vai trò
              </th>
              <th className="pt-1 w-[20%] text-xl border border-black">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((item: any, index: any) => {
                const timestamp = item.createdAt; // timestamp = 2023-05-17T05:08:29.812
                const date = new Date(timestamp);
                const year = date.getFullYear();
                const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
                const day = date.getDate();
                const formattedDate = `${day}/${month}/${year}`;

                return (
                  <tr key={index}>
                    <td className="pt-1 pl-2 border border-black">
                      {item.name}
                    </td>
                    <td className="pt-1 pl-2 border border-black">
                      {item.account}
                    </td>
                    <td className="pt-1 pl-2 border border-black">
                      {item.address ? item.address : item.email}
                    </td>
                    <td className="pt-1 pl-2 border border-black">
                      {formattedDate}
                    </td>
                    <td className="pt-1 pl-2 border border-black">
                      {item.role == "Admin" ? "Quản trị viên" : "Người dùng"}
                    </td>
                    <td className="pt-1 px-2 border border-black">
                      <div className="flex items-center justify-center space-x-6 mb-1">
                        <button
                          className=" bg-mauxanhtroi text-white font-bold rounded-md px-2 py-2 hover:opacity-80"
                          // onClick={() =>
                          //   router.push(`/account/trang-ca-nhan/${item._id}`)
                          // }
                          onClick={() => handle_push_trangcanhan(item._id)}
                        >
                          Trang cá nhân
                        </button>
                        <button
                          className=" bg-red-500 text-white font-bold rounded-md px-2 py-2 hover:opacity-80 "
                          onClick={() => {
                            handleDeleteUser(item._id);
                          }}
                        >
                          Xóa tài khoản
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        {/* display mobile */}
        {/* <button
          className="md:hidden h-[50px] w-[150px] mx-3 my-3 bg-green-500 text-white rounded-lg hover:opacity-80 cursor-pointer"
          onClick={toggleAddnew}
        >
          Tạo người dùng
        </button>
        {users &&
          users.map((item: any, index: any) => {
            const timestamp = item.createdAt; // timestamp = 2023-05-17T05:08:29.812
            const date = new Date(timestamp);
            const year = date.getFullYear();
            const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
            const day = date.getDate();
            const formattedDate = `${day}/${month}/${year}`;

            return (
              <div key={index} className="md:hidden mb-5 shadow-lg mx-3">
                <div className="h-auto bg-white rounded-lg">
                  <div className="px-3 py-2 flex flex-col space-y-1">
                    <p className="font-bold text-lg">
                      {item.name} | {item.account}
                    </p>
                    <p className="font-thin">Đ/c: {item.address}</p>
                    <p className="flex items-center place-content-between">
                      <p className="text-lg">
                        Vai trò:{" "}
                        {item.role == "Admin" ? "Quản trị" : "Khách hàng"}{" "}
                      </p>
                      |<p className="font-thin">Tham gia: {formattedDate}</p>
                    </p>
                    <div className="flex space-x-3 items-center">
                      <button
                        className="bg-green-500 text-white rounded-full h-8 w-32 hover:opacity-80"
                        // onClick={() => toggleModalEdit(item)}
                      >
                        Lịch sử mua
                      </button>

                      <button
                        className="bg-red-500 text-white rounded-full h-8 w-24 hover:opacity-80"
                        // onClick={() => {
                        //   handleDeleteProduct(item.type, item._id);
                        // }}
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })} */}
        {isOpenAddnew && (
          <Modal_addnew_user
            isopen={isOpenAddnew}
            onClose={() => toggleAddnew()}
          />
        )}
      </div>
    </>
  );
};

export default ManageUser;
