import React, { createContext, useContext, useState, ReactNode } from "react";
interface MyContextValue {
  // đếm số lượng filter đang áp dụng
  countfilter: number;
  count_filter: any;
  //trạng thái login và thông tin người dùng
  isLogin: boolean;
  setLogin: (isLogin: boolean) => void;
  // keyword search header
  keyword_search: string;
  setKeywordSearch: any;
  // đếm số tin nhắn chưa đọc
  countmessageunread: number;
  count_message_unread: any;
  // trạng thái loading router push
  isLoading: boolean;
  handle_setIsLoading: any;
  // lưu thông tin người dùng
  information_User: any;
  setInfoUser: (information_User: any) => void;
}
const MyContext = createContext<MyContextValue | undefined>(undefined);

//gọi hàm này ở các component khác để lưu hoặc truy xuất các biến, các hàm tương ứng
export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};
interface MyContextProviderProps {
  children: ReactNode;
}
//hàm chính.
export const MyContextProvider: React.FC<MyContextProviderProps> = ({
  children,
}) => {
  //Số lượng filter đang áp dụng
  const [countfilter, setCount_filter] = useState<number>(0);
  const count_filter = (countfilter: number) => {
    setCount_filter(countfilter);
  };
  //trạng thái login và thông tin người dùng
  const [isLogin, setisLogin] = useState<boolean>(false);
  const setLogin = (isLogin: boolean) => {
    setisLogin(isLogin);
  };
  //trạng thái login và thông tin người dùng
  const [keyword_search, setKeyword_search] = useState<string>("");
  const setKeywordSearch = (keyword_search: string) => {
    setKeyword_search(keyword_search);
  };
  //Số lượng filter đang áp dụng
  const [countmessageunread, setCount_Message_unread] = useState<number>(0);
  const count_message_unread = (countmessageunread: number) => {
    setCount_Message_unread(countmessageunread);
  };

  //lưu trạng thái loading router push
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handle_setIsLoading = (isLoading: boolean) => {
    setIsLoading(isLoading);
  };

  //lưu infor user
  const [information_User, setinformation_User] = useState<any>(null);
  const setInfoUser = (information_User: any) => {
    setinformation_User(information_User);
  };

  const contextValue: MyContextValue = {
    countfilter,
    count_filter,
    isLogin,
    setLogin,
    keyword_search,
    setKeywordSearch,
    countmessageunread,
    count_message_unread,
    isLoading,
    handle_setIsLoading,
    information_User,
    setInfoUser,
  };
  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};
