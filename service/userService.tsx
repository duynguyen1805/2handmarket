require("dotenv").config();
import axios from "../utils/axios";
// truy cập trên mobile thì thay localhost thành localhost (IP laptop)
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
// const BACKEND_URL = "http://192.168.1.58:4000";
// const BACKEND_URL = "http://localhost:4000";
// const BACKEND_URL = "https://twohandmarket-be.onrender.com";

export async function searchYoutube(searchString: string, page: number, pageSize: number) {
  try {
    const response = await axios.get(`${BACKEND_URL}/youtube-premium/songs`, {
      params: {
        searchString,
        page,
        pageSize,
      },
    });
    return response.data.songs;
  } catch (error) {
    console.error("Error fetching data from YouTube API", error);
    return [];
  }
  
}

export async function Search_tindang_header(
  keyword: string,
  soluong: number,
  pagehientai: number
) {
  try {
    const response = await axios.post(`${BACKEND_URL}/search-tindang-header`, {
      keyword: keyword,
      soluong: soluong,
      pagehientai: pagehientai,
    });
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("call Search_tindang_header không thành công");
  }
}

export async function Search_tindang_daduyet(
  keyword: string,
  typecollection: string
) {
  try {
    const response = await axios.post(`${BACKEND_URL}/search-tindang-daduyet`, {
      keyword: keyword,
      typecollection: typecollection,
    });
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("call Search_tindang_daduyet không thành công");
  }
}

export async function API_register(build_data: object) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/register-user`,
      build_data
    );
    const message = await response.data;
    return message;
  } catch (error) {
    console.error(error);
    throw new Error("Đăng ký không thành công");
  }
}

export async function API_login(account: string, password: string) {
  try {
    const response = await axios.post(`${BACKEND_URL}/login`, {
      account,
      password,
    });
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Đăng nhập không thành công");
  }
}

export async function API_check_account(account: string) {
  try {
    const response = await axios.post(`${BACKEND_URL}/check-account`, {
      account,
    });
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("API check account không thành công");
  }
}

// api khôi phục pass (quên pass)
export async function API_update_new_pass(object: any) {
  try {
    const response = await axios.put(
      `${BACKEND_URL}/update-new-password`,
      object
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi khi call API_updateUser");
  }
}

export async function API_Dangtin(
  id_user: any,
  type: string,
  item: object,
  token_req: any
) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/create-dang-tin/${id_user}-${type}`,
      item,
      {
        headers: {
          Authorization: `Bearer ${token_req}`,
        },
      }
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Thêm sản phẩm không thành công.");
  }
}

export async function API_get_thongbao(id: string) {
  try {
    const response = await axios.post(`${BACKEND_URL}/get-thong-bao`, {
      id,
    });
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("API_get_thongbao không thành công");
  }
}

export async function API_delete_thongbao(
  id_user: string,
  id_tindang: string,
  trangthaitin: number
) {
  try {
    const response = await axios.delete(
      `${BACKEND_URL}/delete-thong-bao/${id_user}/${id_tindang}/${trangthaitin}`
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("API_get_thongbao không thành công");
  }
}

//type: ALL or dienthoai, laptop,.... type ALL thì hang phải ALL và soluong: 0
//hang: ALL or apple, samsung,...
//soluong: 0(tatca)

export async function API_get_Dohoctap(
  // type: string, giaotrinh, sachthamkhao, other_hoctap
  // soluong: number,
  // trangthai: (neucan)
  build_data: object
) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/get-tin-dang-do-hoc-tap`,
      build_data
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi khi call API API_get_Dohoctap");
  }
}

export async function API_get_Dodientu(
  // typeDodientu: string,
  // soluong: number,
  // hang?: string,
  // chip?: string,
  // loaithietbideo?: string,
  // loaiphukien?: string,
  // loailinhkien?: string
  build_data: object
) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/get-tin-dang-do-dien-tu`,
      build_data
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi khi call API API_get_Dodientu");
  }
}

export async function API_get_Phuongtien(
  // typePhuongtien: string,
  // soluong: number,
  // hang?: string,
  // loaiphutung?: string
  build_data: object
) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/get-tin-dang-phuong-tien`,
      build_data
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi khi call API API_get_Dodientu");
  }
}

export async function API_get_Donoithat(
  // typeDonoithat: string,
  // soluong: number
  build_data: object
) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/get-tin-dang-do-noi-that`,
      build_data
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi khi call API API_get_Dodientu");
  }
}

export async function API_get_Dienlanh(
  // typeDienlanh: string,
  // soluong: number,
  // hang: string
  build_data: object
) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/get-tin-dang-dien-lanh`,
      build_data
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi khi call API API_get_Dodientu");
  }
}

export async function API_get_Docanhan(build_data: object) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/get-tin-dang-do-ca-nhan`,
      build_data
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi khi call API API_get_Dodientu");
  }
}

export async function API_get_Dogiaitri(build_data: object) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/get-tin-dang-do-giai-tri`,
      build_data
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi khi call API API_get_Dogiaitri");
  }
}

export async function API_get_Thucung(build_data: object) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/get-tin-dang-thu-cung`,
      build_data
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi khi call API API_get_Thucung");
  }
}

export async function API_getTindangbyId(type: string | null, id: string) {
  //type: dienthoai, laptop, ..., xemay, oto,...
  try {
    const response = await axios.post(`${BACKEND_URL}/get-tin-dang-by-id`, {
      type,
      id,
    });
    const data = await response.data;
    return data; //data.TableTypes
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi khi call API_getTindangbyId");
  }
}

export async function API_getAllUser(token_req: any) {
  try {
    const response = await axios.get(`${BACKEND_URL}/admin/get-user`, {
      headers: {
        Authorization: `Bearer ${token_req}`,
      },
    });
    const data = await response.data.users;
    return data; //data.TableTypes
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi khi call API_getAllUser");
  }
}

export async function API_getUserbyID(id: string, token_req: any) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/get-user-by-id`,
      {
        id,
      },
      {
        headers: {
          Authorization: `Bearer ${token_req}`,
        },
      }
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi khi call API_getUserbyID");
  }
}

export async function API_updateUser(object: any, token_req: any) {
  try {
    const response = await axios.put(`${BACKEND_URL}/update-user`, object, {
      headers: {
        Authorization: `Bearer ${token_req}`,
      },
    });
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi khi call API_updateUser");
  }
}

export async function API_deleteUser(id: any, token_req: any) {
  try {
    const response = await axios.delete(
      `${BACKEND_URL}/admin/delete-user/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token_req}`,
        },
      }
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi khi call API_deleteUser");
  }
}

export async function API_deleteTindang(type: string, id: any, token_req: any) {
  try {
    const response = await axios.delete(
      `${BACKEND_URL}/admin/delete-tindang/${type}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token_req}`,
        },
      }
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi khi call API_deleteProduct");
  }
}

export async function API_getAllcollection_quangcao(pagehientai: number) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/get-all-collection-quang-cao`,
      {
        pagehientai: pagehientai,
      }
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(
      "Lỗi khi call API_getAllcollection_quangcao userService: ",
      error
    );
  }
}

export async function API_getAllcollection(pagehientai: number) {
  try {
    const response = await axios.post(`${BACKEND_URL}/get-all-collection`, {
      pagehientai: pagehientai,
    });
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Lỗi khi call API_getAllcollection userService: ", error);
  }
}

export async function API_get_soluongtin_Allcollection() {
  try {
    const response = await axios.get(`${BACKEND_URL}/get-all-soluongtin`);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi khi call API_get_soluongtin_Allcollection");
  }
}

export async function API_getTindangbyIduser(id: string) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/get-tin-dang-by-id-user`,
      {
        id,
      }
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi khi call API_getUserbyID");
  }
}

export async function API_update_tindang(
  idTindang: any,
  type: string,
  build_data_capnhat_tindang: object,
  token_req: any
) {
  try {
    const response = await axios.put(
      `${BACKEND_URL}/update-chi-tiet-tin-dang/${idTindang}-${type}`,
      build_data_capnhat_tindang,
      {
        headers: {
          Authorization: `Bearer ${token_req}`,
        },
      }
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Cập nhật tin đăng không thành công.");
  }
}

export async function API_updateStatusTindang(
  // id: string,
  // typecollection: string
  build_data: object,
  token_req: any
) {
  try {
    const response = await axios.put(
      `${BACKEND_URL}/admin/update-status-tindang`,
      build_data,
      {
        headers: {
          Authorization: `Bearer ${token_req}`,
        },
      }
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi khi call API_updateStatusOrder");
  }
}

export async function API_Antin(
  // id: string,
  // typecollection: string
  build_data: object,
  token_req: any
) {
  try {
    const response = await axios.put(
      `${BACKEND_URL}/update-status-antin-by-user`,
      build_data,
      {
        headers: {
          Authorization: `Bearer ${token_req}`,
        },
      }
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi khi call API_Antin");
  }
}
export async function API_Capnhat_trangthai_thanhtoan(
  // id: string,
  // type: string; xemay, dienthoai
  build_data: object,
  token_req: any
) {
  try {
    const response = await axios.put(
      `${BACKEND_URL}/update-status-thanhtoan`,
      build_data,
      {
        headers: {
          Authorization: `Bearer ${token_req}`,
        },
      }
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi khi call API_Capnhat_trangthai_thanhtoan");
  }
}

export async function API_search_user(value: string, token_req: any) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/admin/get-infor-user`,
      {
        value: value,
      },
      {
        headers: {
          Authorization: `Bearer ${token_req}`,
        },
      }
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi khi call API_search_user");
  }
}

export async function API_searchLichsu_qc_tindang(
  value: string,
  token_req: any
) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/admin/search-lich-su-quang-cao`,
      {
        value: value,
      },
      {
        headers: {
          Authorization: `Bearer ${token_req}`,
        },
      }
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi khi call API_getLichsu_qc_tindang");
  }
}

export async function API_getLichsu_qc_byDate(
  thoigian_ngaybatdau: string | any,
  token_req: any
) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/admin/get-lich-su-qc-by-month`,
      { thoigian: thoigian_ngaybatdau },
      {
        headers: {
          Authorization: `Bearer ${token_req}`,
        },
      }
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi khi call API_getHistoryOrderbyDate");
  }
}
