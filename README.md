CHƯA LÀM: (
-- authoritation tối ưu hơn
-- responsive giao diện
)
Backend: (
(1) -- tin đăng tối đa 30 ngày, kể từ ngày duyệt
(2) -- tin đăng bị từ chối, xóa sau 3 ngày
(3) -- tin do người dùng ẩn, xóa sau 3 ngày
(2),(3) -- lưu timestamp riêng không liên quan 30 ngày
)

error: (
-- Product.tsx {
-- line 19 - 24: push có type.
-- bên [code_product].tsx getServerSideProps báo lỗi 500 khi f5 lại page. Còn chuyển hướng tới thì ok.

-- [code_product].tsx line 150: hardcode lấy từng img. chưa lấy được bằng .map (api.img >>> ["img", "img_1", "img_2"] nhưng map thì undefine)
}
)

<img src=objectURL>
<div style={{ backgroundImage: `url(${base64})` }}></div>
