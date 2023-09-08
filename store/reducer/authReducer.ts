// authReducer.ts
interface AuthState {
  isLoggedIn: boolean;
  user: null | User; // User là một interface đại diện cho thông tin người dùng đã đăng nhập
  error: string | null;
}

interface User {
  id: string;
  username: string;
  email: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  error: null,
};

const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
