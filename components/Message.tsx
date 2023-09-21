import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import addimg from "../assets/icon/addimg.png";
import send_message from "../assets/icon/send-message.png";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  Timestamp,
  serverTimestamp,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase.config";
import Gallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import router from "next/router";

const Message = ({
  id_current_user,
  userName_current,
  avatar_current_user,
  id_receiver,
  userName_receiver,
  avatar_receiver,
}: any) => {
  const [datainforUser_local, setdatainforUser_local] = useState<any>();
  useEffect(() => {
    //lấy thông tin người dùng Đăng nhập
    const storedItems = localStorage.getItem("inforUser");
    if (storedItems) {
      setdatainforUser_local(JSON.parse(storedItems));
    }
  }, []);
  // xử lý chọn ảnh
  async function getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  const [img_arr, setImg_arr] = useState<any>([]);
  const [reviewImg_arr, setReviewImg_arr] = useState<any>([]);
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
  const handleCloseButton_Img = (indexToRemove: number) => {
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

  const [messageText, setMessageText] = useState<string>(""); //msg nhập ở input
  const [messages, setMessages] = useState<any>([]);
  //tạo id_room giữa 2 user
  const sortedIds = [id_current_user, id_receiver].sort();
  const conversationID = sortedIds.join("_"); //id_room
  useEffect(() => {
    if (id_receiver) {
      // nhận tin nhắn mới
      const messagesCollectionRef = collection(
        doc(db, "conversations", conversationID),
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
        unsubscribe(); // ngừng lắng nghe khi component bị unmount
      };
    }
  }, [id_receiver]);

  const sendMessage = async () => {
    if (messageText.trim() !== "" || messageText !== "" || img_arr.length > 0) {
      try {
        const messageData = {
          sender: id_current_user,
          userName: userName_current,
          text: messageText,
          img: img_arr,
          timestamp: serverTimestamp(),
        };
        // tạo tham chiếu tới collection "messages"
        const messagesCollectionRef = collection(
          doc(db, "conversations", conversationID),
          "messages"
        );
        setMessageText("");
        setImg_arr([]);
        setReviewImg_arr([]);
        // thêm messageData vào collection con "messages"
        await addDoc(messagesCollectionRef, messageData);
        // tham chiếu tới document conversationID, tạo infor 2 user cho dễ biết
        const conversationDocRef = doc(db, "conversations", conversationID);
        // check tồn tại
        const conversationDocSnapshot = await getDoc(conversationDocRef);
        if (!conversationDocSnapshot.exists()) {
          // chưa có thì tạo members
          const newConversationData = {
            members: [
              {
                userID: id_current_user,
                userName: userName_current,
              },
              {
                userID: id_receiver,
                userName: userName_receiver,
              },
            ],
          };
          await setDoc(conversationDocRef, newConversationData);
        }
        // tạo tham chiếu tới subcollection "list_userchat" của người dùng hiện tại
        const listUserChatCollectionRef = collection(
          doc(db, "list_user_chat", id_current_user),
          "list_chatting"
        );
        // tham chiếu document mới cho người dùng hiện tại trong "list_userchat"
        const currentUserDocRef = doc(listUserChatCollectionRef, id_receiver);
        const updateData_receiver: any = {
          timestamp: serverTimestamp(),
        };
        // check xem document đã tồn tại chưa
        const currentUserDocSnapshot = await getDoc(currentUserDocRef);
        if (currentUserDocSnapshot.exists()) {
          // document tồn tại, thì kiểm tra các trường có thay đổi hay không
          const currentData = currentUserDocSnapshot.data();
          // check các trường userName và avatar có thay đổi không
          if (currentData.userName !== userName_receiver) {
            updateData_receiver.userName = userName_receiver;
          }
          if (currentData.avatar !== avatar_receiver) {
            updateData_receiver.avatar = avatar_receiver;
          }
          // updateDoc để cập nhật thông tin
          await updateDoc(currentUserDocRef, updateData_receiver);
        } else {
          const currentUserData = {
            userID: id_receiver,
            userName: userName_receiver,
            avatar: avatar_receiver,
            timestamp: serverTimestamp(),
          };
          await setDoc(currentUserDocRef, currentUserData);
        }
        // tạo tham chiếu tới subcollection "list_userchat" của người dùng nhận (receiver)
        const receiverUserChatCollectionRef = collection(
          doc(db, "list_user_chat", id_receiver),
          "list_chatting"
        );
        // tạo document mới cho người dùng nhận (receiver) trong "list_userchat"
        const receiverUserDocRef = doc(
          receiverUserChatCollectionRef,
          id_current_user
        );
        const updateData_current_user: any = {
          timestamp: serverTimestamp(),
        };
        // check xem document đã tồn tại chưa
        const receiverUserDocSnapshot = await getDoc(receiverUserDocRef);
        if (receiverUserDocSnapshot.exists()) {
          // document tồn tại, thì kiểm tra các trường có thay đổi hay không
          const currentData = receiverUserDocSnapshot.data();
          // check các trường userName và avatar có thay đổi không
          if (currentData.userName !== userName_current) {
            updateData_receiver.userName = userName_current;
          }
          if (currentData.avatar !== avatar_current_user) {
            updateData_receiver.avatar = avatar_current_user;
          }
          // updateDoc để cập nhật thông tin
          await updateDoc(receiverUserDocRef, updateData_current_user);
        } else {
          const receiverUserData = {
            userID: id_current_user,
            userName: userName_current,
            avatar: avatar_current_user,
            timestamp: serverTimestamp(),
          };
          await setDoc(receiverUserDocRef, receiverUserData);
        }
      } catch (e) {
        console.error("Error sending message: ", e);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  // cuộn xuống dưới khi có tin nhắn mới
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectImg, setselectImg] = useState<any>();
  const handleOpenImg = (img: any) => {
    setIsOpen(true);
    setselectImg(img);
  };
  const images: any = [
    {
      original: selectImg,
      thumbnail: selectImg,
      onCloseRequest: () => setIsOpen(false),
      isFullscreen: true,
    },
  ];

  return (
    <>
      <div className="h-[90px] w-full flex items-center space-x-2 px-2 border-b border-gray-300 cursor-pointer">
        <div
          className="h-[60px] w-[60px] mr-1 bg-cover bg-no-repeat bg-center rounded-full"
          style={{
            backgroundImage: `url(${avatar_receiver})`,
          }}
          onClick={() => router.push(`/account/trang-ca-nhan/${id_receiver}`)}
        ></div>
        <div className="h-[60px] w-auto max-w-full overflow-x-hidden">
          <div
            className="h-[30px] w-full font-bold flex items-center"
            onClick={() => router.push(`/account/trang-ca-nhan/${id_receiver}`)}
          >
            {userName_receiver}
          </div>
          <div className="h-[30px] w-full flex items-center space-x-2">
            <span className="h-[10px] w-[10px] bg-green-500 rounded-full"></span>
            <p>Trạng thái truy cập</p>
          </div>
        </div>
      </div>
      <div className="relative h-[708px] w-full">
        <div
          ref={chatContainerRef}
          className="h-[730px] w-full px-2 py-1 mb-1 overflow-auto"
        >
          {messages &&
            messages.map((message: any, index: number) => {
              let firebaseTimestamp = message?.timestamp;
              const date = new Date(firebaseTimestamp?.seconds * 1000);
              const hours = date.getHours();
              const minutes = date.getMinutes();
              const dayOfWeek = date.getDay(); // 0 là CN
              const dayOfMonth = date.getDate();
              const month = date.getMonth() + 1; // tháng từ 0
              const year = date.getFullYear();
              const formattedDate = `${getDayName(
                dayOfWeek
              )}, ${dayOfMonth}/${month} - ${hours}:${minutes}`;
              function getDayName(day: any) {
                const daysOfWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
                return daysOfWeek[day];
              }
              return (
                <div key={index} className="h-auto w-full">
                  {message && message.text !== "" && (
                    <div
                      className={`${
                        message.sender == id_current_user && `justify-end`
                      } min-h-[45px] w-full flex items-center`}
                    >
                      <div
                        className={`${
                          message.sender == id_current_user
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                        } min-h-[40px] w-auto max-w-[50%] px-4 py-1 my-1 flex items-center rounded-3xl relative group`}
                      >
                        <div
                          className={`${
                            message.sender == id_current_user
                              ? "left-[-130px]"
                              : "right-[-130px]"
                          } absolute bg-gray-400 text-white h-[34px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100`}
                        >
                          {formattedDate}
                        </div>
                        {message.text}
                      </div>
                    </div>
                  )}
                  {message &&
                    message?.img?.map((img: any, index: number) => {
                      // images.push({
                      //   original: img,
                      //   thumbnail: img,
                      //   onCloseRequest: () => setIsOpen(false),
                      //   isFullscreen: true,
                      // });
                      return (
                        <div
                          key={index}
                          className={`${
                            message.sender == id_current_user && `justify-end`
                          } h-auto w-full flex items-center`}
                        >
                          <div
                            className={`${
                              message.sender == id_current_user
                                ? "border bg-gray-200"
                                : "border bg-gray-200"
                            } min-h-[268px] h-auto w-auto min-w-[202px] max-h-[268px] max-w-[50%] my-1 bg-center bg-contain bg-no-repeat flex items-center rounded-3xl relative group `}
                            style={{ backgroundImage: `url(${img})` }}
                            onClick={() => handleOpenImg(img)}
                          >
                            <div
                              className={`${
                                message.sender == id_current_user
                                  ? "left-[-130px]"
                                  : "right-[-130px]"
                              } absolute bg-gray-400 text-white h-[34px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100`}
                            >
                              {formattedDate}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              );
            })}
        </div>
        <div className="absolute top-[632px] h-auto w-full ml-1 flex flex-wrap gap-[5px]">
          {reviewImg_arr !== null && reviewImg_arr !== "" ? (
            reviewImg_arr?.map((item_img: any, index: number) => {
              return (
                <div
                  key={index}
                  className="h-[100px] w-[97px] flex items-center justify-center relative bg-white"
                >
                  <div
                    className="h-full w-full bg-center bg-contain bg-no-repeat border border-blue-400"
                    style={{ backgroundImage: `url(${item_img})` }}
                  ></div>
                  <button
                    className="absolute z-10 h-[24px] w-[24px] top-[-7px] right-[-10px] p-1 bg-black text-white rounded-full text-xs"
                    onClick={() => handleCloseButton_Img(index)}
                  >
                    X
                  </button>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
        <div className="h-[50px] w-full flex items-center">
          <input
            placeholder="Nhập tin nhắn ..."
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-full w-[522px] border-y border-l border-gray-400 rounded-l-full text-lg outline-none px-3 ml-1 resize-none"
          />
          <div className="relative h-full w-[60px] flex items-center justify-center mr-1 rounded-r-full border-y border-r border-gray-400">
            <Image src={addimg} alt="add img" className="h-[32px] w-[32px]" />
            <input
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              type="file"
              multiple
              onChange={(e) => {
                handleFile(e);
              }}
            />
          </div>
          <button
            className="h-full w-[60px] flex items-center justify-center rounded-br-md hover:opacity-75"
            disabled={messageText == "" && img_arr.length == 0}
            onClick={sendMessage}
          >
            <Image
              src={send_message}
              alt="send message"
              className="h-[30px] w-[30px]"
            />
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center h-full w-full bg-black">
          <button
            className="absolute top-2 right-6 text-white text-2xl"
            onClick={() => setIsOpen(false)}
          >
            &times;
          </button>
          <Gallery
            items={images}
            // showNav={true}
            // lazyLoad={true}
            // autoPlay={false}
            // startIndex={0}
          />
        </div>
      )}
    </>
  );
};

export default Message;
