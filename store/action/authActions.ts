// authActions.ts
import { Dispatch } from "redux";
import { API_login } from "../../service/userService";

export const loginSuccess = (user: any) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: user,
  };
};

export const loginFailure = (error: string) => {
  return {
    type: "LOGIN_FAILURE",
    payload: error,
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};

// Hành động async để xử lý việc đăng nhập
export const login = (username: string, password: string) => {
  return async (dispatch: Dispatch) => {
    try {
      // Gọi API hoặc thực hiện xác thực tài khoản tại đây
      const user = await API_login(username, password);

      // Nếu đăng nhập thành công, dispatch hành động loginSuccess
      dispatch(loginSuccess(user.user));
    } catch (error: any) {
      // Nếu có lỗi, dispatch hành động loginFailure
      dispatch(loginFailure(error));
    }
  };
};
