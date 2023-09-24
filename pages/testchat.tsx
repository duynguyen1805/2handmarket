import React, { useEffect, useState } from "react";
import io from "socket.io-client";
type DataInfor = {
  _id: string;
  name: string;
  account: string;
  address: string;
  role: string;
  avatar: string;
};
const Chat = () => {
  const [datainforUser, setdatainforUser] = useState<DataInfor>();
  useEffect(() => {
    //lấy thông tin người đăng nhập hiện tại
    const storedItems = localStorage.getItem("inforUser");
    if (storedItems) {
      setdatainforUser(JSON.parse(storedItems));
    }
  }, []);

  const [message, setMessage] = useState("");
  const socket = io("http://localhost:4000");

  const id_nguoigui = "64d733a8df7d5a5bec4959bf";
  const id_nguoinhan = "64d8b6b18be6c50bd2c8ea85";
  // Sắp xếp id_nguoigui và id_nguoinhan theo thứ tự bảng chữ cái
  // Tạo id_room bằng cách kết hợp hai id đã sắp xếp
  const sortedIds = [id_nguoigui, id_nguoinhan].sort();
  const id_room = sortedIds.join("_");

  const handleTaoRoom = () => {
    // Click vào người nhận => tạo 1 room giữa 2 người id_room = id_nguoigui + id_nguoinhan
    socket.emit("id_room", id_room);
  };

  socket.on("chat_message", (message) => {
    // Xử lý tin nhắn được gửi đến từ server và hiển thị nó trên giao diện
    console.log(`Nhận tin nhắn: ${message}`);
  });

  // Khi người dùng gửi tin nhắn
  const handleSendMessage = () => {
    socket.emit("chat_message", {
      id_room: id_room,
      message: message,
    });
  };

  return (
    <div>
      <button
        className="border h-[50px] px-3 bg-gray-300"
        onClick={handleTaoRoom}
      >
        Tạo Phòng
      </button>
      <input
        type="text"
        value={message}
        placeholder="message"
        onChange={(e) => setMessage(e.target.value)}
        className="m-5 p-2 h-[50px] w-[250px] border outline-none"
      />
      <button
        className="border h-[50px] px-3 bg-gray-300"
        onClick={handleSendMessage}
      >
        Send tin nhắn
      </button>
    </div>
  );
};

export default Chat;
