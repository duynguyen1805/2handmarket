import React, { useEffect, useState } from "react";
import { auth } from "../firebase.config";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  Timestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase.config";

type DataInfor = {
  _id: string;
  name: string;
  account: string;
  address: string;
  role: string;
  avatar: string;
};
function ChatRoom() {
  const [datainforUser, setdatainforUser] = useState<DataInfor>();
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<any>([]);
  const conversationID = "abc"; // id_room tạo chung giữa 2 id người dùng
  const id_nguoigui = "64d733a8df7d5a5bec4959bf";
  const id_nguoinhan = "64d8b6b18be6c50bd2c8ea85";
  // Sắp xếp id_nguoigui và id_nguoinhan theo thứ tự bảng chữ cái
  // Tạo id_room bằng cách kết hợp hai id đã sắp xếp
  const sortedIds = [id_nguoigui, id_nguoinhan].sort();
  const id_room = sortedIds.join("_");

  useEffect(() => {
    // lấy thông tin người đăng nhập hiện tại từ localStorage
    const storedItems = localStorage.getItem("inforUser");
    if (storedItems) {
      setdatainforUser(JSON.parse(storedItems));
    }
    // nhận tin nhắn mới
    const messagesCollectionRef = collection(
      doc(db, "conversations", id_room),
      "messages"
    );
    const messagesQuery = query(
      messagesCollectionRef,
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const newMessages: any = [];
      snapshot.forEach((doc) => {
        newMessages.push(doc.data());
      });
      setMessages(newMessages);
    });

    return () => {
      // ngừng lắng nghe khi component bị unmount
      unsubscribe();
    };
  }, []);

  const sendMessage = async () => {
    if (messageText.trim() !== "") {
      try {
        const messageData = {
          sender: datainforUser?._id,
          text: messageText,
          timestamp: Timestamp.now(),
        };
        // Create a reference to the "conversations" collection
        const conversationsRef = collection(db, "conversations");
        // Create a new conversation document if it doesn't exist, or get the existing one
        const conversationDocRef = doc(conversationsRef, id_room);
        // Create a reference to the "messages" subcollection within the conversation document
        const messagesCollectionRef = collection(
          conversationDocRef,
          "messages"
        );

        // Add the messageData to the "messages" subcollection
        await addDoc(messagesCollectionRef, messageData);
        console.log("Message sent successfully!");
      } catch (e) {
        console.error("Error sending message: ", e);
      }
      setMessageText("");
    }
  };

  return (
    <div>
      <div>
        {messages.map((message: any, index: number) => (
          <div key={index}>
            <strong>{message.sender}: </strong>
            {message.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={messageText}
        placeholder="Message"
        onChange={(e) => setMessageText(e.target.value)}
        className="m-5 p-2 h-[50px] w-[250px] border outline-none"
      />
      <button
        className="border h-[50px] px-3 bg-gray-300"
        onClick={sendMessage}
      >
        Send Message
      </button>
    </div>
  );
}

export default ChatRoom;
