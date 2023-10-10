import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import router from "next/router";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import "react-phone-input-2/lib/style.css";
// toast thông báo
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { API_getUserbyID } from "@/service/userService";
import { motion } from "framer-motion";
import { useMyContext } from "@/contexts/MyContext";
import Message from "@/components/Message";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  Timestamp,
  query,
  where,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../../../firebase.config";
import jwt from "jsonwebtoken";
import { sign, verify, Secret } from "jsonwebtoken";
import Cookies from "js-cookie";
import icon_more from "../../../assets/icon/more.png";
import Image from "next/image";

interface infodetailProps {
  id_user: string;
  current_user_name: any;
  id_receiver: any;
  name_receiver: any;
}
const Tin_nhan = ({
  id_user,
  current_user_name,
  id_receiver,
  name_receiver,
}: infodetailProps) => {
  const [datainforUser_current, setdatainforUser_current] = useState<any>();
  const [conversationMembers, setConversationMembers] = useState<any>([]); // ds từng nhắn tin
  const [selectedUser, setSelectedUser] = useState(id_receiver);
  const [selectedUserName, setSelectedUserName] = useState(name_receiver);
  const [selectedAvatar, setSelectedAvatar] = useState<any>();
  useEffect(() => {
    //lấy thông tin người dùng Đăng nhập
    const token: any = localStorage.getItem("token");
    const token_cookie: any = Cookies.get("jwt_token");
    const parse_token = JSON.parse(token);
    if (parse_token && token_cookie) {
      let jwt_key = "2handmarket_tdn" || process.env.JWT_SECRET;
      if (!jwt_key) {
        throw new Error(
          "JWT_SECRET is not defined in the environment variables."
        );
      }
      const jwt_secret: Secret = jwt_key;
      try {
        const decoded: any = jwt.verify(parse_token, jwt_secret);
        id_user = decoded._id;
        setdatainforUser_current(decoded);
      } catch (error) {
        console.log("Lỗi decoded token: ", error);
        setdatainforUser_current(null);
        router.push("/account/login");
      }
    } else {
      router.push("/account/login");
    }
  }, []);
  useEffect(() => {
    const fetch_inforuserbyID = async () => {
      try {
        const response = await API_getUserbyID(id_receiver);
        setSelectedAvatar(response.User[0].img);
      } catch (error) {
        console.log("error get inforuser by id, ", error);
      }
    };
    if (id_receiver) {
      fetch_inforuserbyID();
    }
  }, []);

  useEffect(() => {
    if (id_user) {
      const listUserChatCollectionRef = collection(
        db,
        "list_user_chat",
        id_user,
        "list_chatting"
      );
      const Listchat_Query = query(
        listUserChatCollectionRef,
        orderBy("timestamp", "desc")
      );
      const unsubscribe = onSnapshot(Listchat_Query, async (snapshot) => {
        const listchat: any = [];
        // Mảng chứa tất cả các promises của get_latestMessage. do snapshot.forEach có thể hoàn thành trước khi lấy latestMsg
        const latestMessagePromises: any = [];
        snapshot.forEach((doc) => {
          const list_chat = doc.data();
          listchat.push(list_chat);
          const iduser_receiver = list_chat.userID;
          const sortedIds = [id_user, iduser_receiver].sort();
          const conversationID = sortedIds.join("_");
          latestMessagePromises.push(get_latestMessage(conversationID));
        });
        // cho tất cả các promises hoàn thành
        const latestMessages = await Promise.all(latestMessagePromises);
        // latestMessage cho từng list_chat
        for (let i = 0; i < listchat.length; i++) {
          listchat[i].latestMessage = latestMessages[i] || "";
        }
        setConversationMembers(listchat);
        console.log("check listchat: ", listchat);
      });
      return () => {
        unsubscribe();
      };
    }
  }, [id_user]);

  const get_latestMessage = async (conversationID: string) => {
    if (conversationID) {
      let messagesCollectionRef = collection(
        db,
        "conversations",
        conversationID,
        "messages"
      );
      let messagesQuery = query(
        messagesCollectionRef,
        orderBy("timestamp", "desc"),
        limit(1) // Lấy tin nhắn mới nhất
      );
      const messagesSnapshot = await getDocs(messagesQuery);
      if (!messagesSnapshot.empty) {
        const latestMessage = messagesSnapshot.docs[0].data().text;
        return latestMessage;
      }
    }
    return "";
  };

  const handleSelect_receiver = (value: any) => {
    setSelectedUser(value.userID);
    setSelectedUserName(value.userName);
    setSelectedAvatar(value.avatar);
  };

  const [isOpen_delete_msg, setOpen_delete_msg] = useState(false);
  const [select, setselect] = useState<any>(null);
  const handleClick_more = (iduser: any) => {
    if (iduser == select) {
      setOpen_delete_msg(!isOpen_delete_msg);
    } else {
      setOpen_delete_msg(true);
    }
    setselect(iduser);
  };

  const handle_Delete_chat = async (id_user_receiver: string) => {
    // xóa như vậy thì cả 2 bên đều bị xóa mất tin nhắn
    // let sortedIds = [id_user, id_user_receiver].sort();
    // let conversationID = sortedIds.join("_");
    // try {
    //   const conversationRef = doc(db, "conversations", conversationID);
    //   await deleteDoc(conversationRef);
    //   console.log("Đoạn chat đã được xóa.");
    // } catch (error) {
    //   console.log("Lỗi deleting document: ", error);
    // }
    // => xóa trong danh sách list_chatting
    try {
      const listUserChatCollectionRef = collection(
        doc(db, "list_user_chat", id_user),
        "list_chatting"
      );
      const documentRef = doc(listUserChatCollectionRef, id_user_receiver);
      await deleteDoc(documentRef);
      setSelectedUser(undefined);
      console.log("Đoạn chat đã được xóa.");
    } catch (error) {
      console.log("Lỗi deleting document: ", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen relative">
      <Head>
        <title>Tin nhắn</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon_2handmarket.png" />
      </Head>
      <div className="absolute h-auto w-full top-0 left-0">
        <Header />
      </div>
      <div className="min-h-screen h-auto w-full bg-gray-100 lg:pt-[90px] md:pt-[115px] sm:pt-[50px] flex flex-col place-content-between">
        <div className="h-auto w-full flex items-center justify-center">
          <div className="sm:h-[705px] sm:min-h-[705px] md:h-[784px] max-h-[2500px] lg:w-[990px] sm:w-full flex border lg:rounded-lg bg-white">
            {/* display medium */}
            <div className="sm:hidden md:block h-full w-[35%] border-r border-gray-400 overflow-auto">
              {conversationMembers &&
                conversationMembers.map((receiver: any, index: number) => {
                  return (
                    <div
                      key={index}
                      onClick={() => handleSelect_receiver(receiver)}
                      // disabled={receiver.userID === selectedUser}
                      className="h-[90px] w-full flex items-center space-x-1 px-1 border-b border-gray-300 cursor-pointer"
                    >
                      <div
                        className="h-[60px] w-[60px] min-w-[60px] mr-1 bg-cover bg-no-repeat bg-center rounded-full"
                        style={{
                          backgroundImage: `url(${receiver.avatar})`,
                        }}
                      ></div>
                      <div className="h-[60px] lg:w-[265px] md:min-w-[200px] md:w-full md:max-w-full flex place-content-between">
                        <div>
                          <div className="h-[30px] font-bold text-lg flex items-center">
                            {receiver.userName}
                          </div>
                          <div
                            className={`${
                              receiver.seen == false ? "font-bold" : "font-thin"
                            } h-[30px] flex items-center overflow-hidden`}
                          >
                            {receiver.latestMessage != ""
                              ? receiver.latestMessage
                              : `${receiver.userName} đã gửi một ảnh.`}
                          </div>
                        </div>
                        <div
                          className="relative h-[25px]"
                          onClick={() => handleClick_more(receiver.userID)}
                        >
                          <Image
                            src={icon_more}
                            alt=""
                            className="h-[20px] w-[20px] cursor-pointer"
                          />
                          {isOpen_delete_msg && select == receiver.userID && (
                            <motion.div
                              className="absolute h-auto w-[100px] right-6 top-[-5px] bg-gray-100 border rounded-md shadow-md z-10"
                              initial={{ opacity: 0 }}
                              animate={{
                                opacity: 1,
                                transition: { duration: 0.4 },
                              }}
                              exit={{
                                opacity: 0,
                              }}
                            >
                              <p
                                className="h-[40px] w-full text-base flex items-center justify-center cursor-pointer rounded-md hover:bg-gray-200"
                                onClick={() =>
                                  handle_Delete_chat(receiver.userID)
                                }
                              >
                                Xóa chat
                              </p>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="sm:hidden md:block h-full w-[65%]">
              {selectedUser && (
                <Message
                  id_current_user={id_user}
                  userName_current={datainforUser_current?.name}
                  avatar_current_user={datainforUser_current?.avatar}
                  id_receiver={selectedUser}
                  userName_receiver={selectedUserName}
                  avatar_receiver={selectedAvatar}
                />
              )}
            </div>
            {/* display mobile */}
            <div className="md:hidden h-full w-full border-r border-gray-400 overflow-auto">
              {conversationMembers &&
                conversationMembers.map((receiver: any, index: number) => {
                  return (
                    <button
                      key={index}
                      onClick={() => handleSelect_receiver(receiver)}
                      disabled={receiver.userID === selectedUser}
                      className="h-[90px] w-full flex items-center space-x-1 px-1 border-b border-gray-300 cursor-pointer"
                    >
                      <div
                        className="h-[60px] w-[60px] mr-1 bg-cover bg-no-repeat bg-center rounded-full"
                        style={{
                          backgroundImage: `url(${receiver.avatar})`,
                        }}
                      ></div>
                      <div className="h-[60px] lg:w-[265px]">
                        <div className="h-[30px] font-bold flex items-center">
                          {receiver.userName}
                        </div>
                        <div
                          className={`${
                            receiver.seen == false && "font-bold"
                          } h-[30px] flex items-center overflow-hidden`}
                        >
                          {receiver.latestMessage != ""
                            ? receiver.latestMessage
                            : `${receiver.userName} đã gửi một ảnh.`}
                        </div>
                      </div>
                    </button>
                  );
                })}
            </div>
            {selectedUser && (
              <div className="md:hidden h-full w-full">
                <Message
                  id_current_user={id_user}
                  userName_current={datainforUser_current?.name}
                  avatar_current_user={datainforUser_current?.avatar}
                  id_receiver={selectedUser}
                  userName_receiver={selectedUserName}
                  avatar_receiver={selectedAvatar}
                  setSelectedUser={setSelectedUser}
                />
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

// truyen id user
export const getServerSideProps: GetServerSideProps<infodetailProps> = async (
  context
) => {
  const { id_user } = context.params as {
    id_user: string;
  };

  const { current_user_name, id_receiver, name_receiver } = context.query;

  return {
    props: {
      id_user: id_user as string,
      current_user_name: current_user_name || null,
      id_receiver: id_receiver || null,
      name_receiver: name_receiver || null,
    },
  };
};

export default Tin_nhan;
