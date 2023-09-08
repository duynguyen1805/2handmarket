// authMiddleware.tsx

import { NextApiResponse, NextApiRequest } from "next";

// Middleware xác thực và phân quyền
export const authMiddleware = (allowedRoles: string[]) => {
  return (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    const userInfo = localStorage.getItem("inforUser"); // Lấy thông tin người dùng từ Local Storage

    if (!userInfo) {
      // Người dùng chưa đăng nhập, chuyển hướng hoặc hiển thị thông báo lỗi
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    // Kiểm tra vai trò của người dùng
    const userRole = JSON.parse(userInfo).role; // Giả sử role được lưu trong trường "role"

    if (!allowedRoles.includes(userRole)) {
      // Người dùng không có quyền truy cập, chuyển hướng hoặc hiển thị thông báo lỗi
      res.status(403).json({ error: "Forbidden" });
      return;
    }

    // Người dùng có quyền truy cập, tiếp tục xử lý yêu cầu
    next();
  };
};
