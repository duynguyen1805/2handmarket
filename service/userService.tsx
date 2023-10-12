require("dotenv").config();
import axios from "../utils/axios";
// truy cập trên mobile thì thay localhost thành localhost (IP laptop)
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
// const BACKEND_URL = "http://localhost:4000";
// const BACKEND_URL = "https://twohandmarket-be.onrender.com";

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

export async function API_register(
  account: string,
  password: string,
  name: string,
  address: string,
  role: string
) {
  try {
    const response = await axios.post(`${BACKEND_URL}/register-user`, {
      account,
      password,
      name,
      address,
      role,
    });
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
    const response = await axios.post(`${BACKEND_URL}/admin/get-user`, {
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

// lấy typeSP (name: Phân bón, type: phanbon, content: noidung đầu trang mỗi loại sản phẩm)
export async function API_getTypeSP_content(type: string) {
  try {
    const response = await axios.post(
      // "${BACKEND_URL}/get-type-product",
      `${BACKEND_URL}/get-type-product`,
      { type }
    );
    const data = await response.data.typeProduct;
    return data; // [{}]
  } catch (error) {
    console.error(error);
    throw new Error("Lỗi khi call API_getTypeSP_content");
  }
}

export async function API_Order(
  id_User: string,
  name_User: string,
  account_User: string,
  address_User: string,
  cartItems: any,
  total: number,
  formatedDate: string
) {
  try {
    const response = await axios.post(`${BACKEND_URL}/create-order`, {
      id_User: id_User,
      name_User: name_User,
      account_User: account_User,
      address_User: address_User,
      cartItems: cartItems,
      price_total: total,
      time_order: formatedDate,
    });
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Thêm sản phẩm không thành công.");
  }
}

export async function API_getAllcollection() {
  try {
    const response = await axios.get(`${BACKEND_URL}/get-all-collection`);
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
