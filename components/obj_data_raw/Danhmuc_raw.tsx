export interface danhmuc {
  key: number;
  label: string;
  type: string;
  link: string;
  sub_danhmuc: sub_danhmuc[];
}

export interface sub_danhmuc {
  key: number;
  label: string;
  type: string;
  link: string;
}

const item_danhmuc: danhmuc[] = [
  {
    key: 0,
    label: "Học tập",
    type: "hoctap",
    link: "/category/hoc-tap",
    sub_danhmuc: [
      {
        key: 1,
        label: "Giáo trình",
        type: "giaotrinh",
        link: "/category/hoc-tap",
      },
      {
        key: 2,
        label: "Sách tham khảo",
        type: "sachthamkhao",
        link: "/category/hoc-tap",
      },
      {
        key: 3,
        label: "Tài liệu, dụng cụ khác",
        type: "other_hoctap",
        link: "/category/hoc-tap",
      },
    ],
  },
  {
    key: 1,
    label: "Phương tiện",
    type: "phuongtien",
    link: "/category/phuong-tien",
    sub_danhmuc: [
      {
        key: 1,
        label: "Ô tô",
        type: "oto",
        link: "/category/phuong-tien/o-to",
      },
      {
        key: 2,
        label: "Xe máy",
        type: "xemay",
        link: "/category/phuong-tien/xe-may",
      },
      {
        key: 3,
        label: "Xe tải, xe ben",
        type: "xetai",
        link: "/category/phuong-tien/xe-tai",
      },
      {
        key: 4,
        label: "Xe điện",
        type: "xedien",
        link: "/category/phuong-tien/xe-dien",
      },
      {
        key: 5,
        label: "Xe đạp",
        type: "xedap",
        link: "/category/phuong-tien/xe-dap",
      },

      {
        key: 6,
        label: "Phụ tùng",
        type: "phutung",
        link: "/category/phuong-tien/phu-tung",
      },
    ],
  },
  {
    key: 2,
    label: "Đồ điện tử",
    type: "dodientu",
    link: "/category/do-dien-tu",
    sub_danhmuc: [
      {
        key: 1,
        label: "Điện thoại",
        type: "dienthoai",
        link: "/category/do-dien-tu/dien-thoai",
      },
      {
        key: 2,
        label: "Máy tính bảng",
        type: "maytinhbang",
        link: "/category/do-dien-tu/may-tinh-bang",
      },
      {
        key: 3,
        label: "Laptop",
        type: "laptop",
        link: "/category/do-dien-tu/lap-top",
      },
      {
        key: 4,
        label: "Desktop",
        type: "desktop",
        link: "/category/do-dien-tu/desktop",
      },
      {
        key: 5,
        label: "Máy ảnh, máy quay",
        type: "mayanh",
        link: "/category/do-dien-tu/may-anh",
      },
      {
        key: 6,
        label: "Thiết bị đeo thông minh",
        type: "thietbideothongminh",
        link: "/category/do-dien-tu/tb-deo-thong-minh",
      },
      {
        key: 7,
        label: "Phụ kiện (Màn hình, chuột,...)",
        type: "phukien",
        link: "/category/do-dien-tu/phu-kien",
      },
      {
        key: 8,
        label: "Linh kiện (Ram, card,...)",
        type: "linhkien",
        link: "/category/do-dien-tu/linh-kien",
      },
    ],
  },
  {
    key: 3,
    label: "Đồ gia dụng, nội thất",
    type: "donoithat",
    link: "/category/do-noi-that",
    sub_danhmuc: [
      {
        key: 1,
        label: "Bàn ghế",
        type: "banghe",
        link: "/category/do-noi-that",
      },
      {
        key: 2,
        label: "Tủ, kệ",
        type: "tuke",
        link: "/category/do-noi-that",
      },
      {
        key: 3,
        label: "Giường, nệm",
        type: "giuong",
        link: "/category/do-noi-that",
      },
      {
        key: 4,
        label: "Bếp, lò, đồ điện nhà bếp",
        type: "bep",
        link: "/category/do-noi-that",
      },
      {
        key: 5,
        label: "Dụng cụ nhà bếp",
        type: "dungcubep",
        link: "/category/do-noi-that",
      },
      {
        key: 6,
        label: "Quạt",
        type: "quat",
        link: "/category/do-noi-that",
      },
      {
        key: 7,
        label: "Đèn",
        type: "den",
        link: "/category/do-noi-that",
      },
      {
        key: 8,
        label: "Đồ khác",
        type: "other_donoithat",
        link: "/category/do-noi-that",
      },
    ],
  },
  {
    key: 4,
    label: "Điện lạnh",
    type: "dienlanh",
    link: "/category/dien-lanh",
    sub_danhmuc: [
      {
        key: 1,
        label: "Tủ lạnh",
        type: "tulanh",
        link: "/category/dien-lanh/tu-lanh",
      },
      {
        key: 2,
        label: "Máy giặt",
        type: "maygiat",
        link: "/category/dien-lanh/may-giat",
      },
      {
        key: 3,
        label: "Máy lạnh",
        type: "maylanh",
        link: "/category/dien-lanh/may-lanh",
      },
    ],
  },
  {
    key: 5,
    label: "Đồ dùng cá nhân",
    type: "dodungcanhan",
    link: "/category/do-dung-ca-nhan",
    sub_danhmuc: [
      {
        key: 1,
        label: "Quần áo",
        type: "quanao",
        link: "/category/do-dung-ca-nhan",
      },
      {
        key: 2,
        label: "Đồng hồ",
        type: "dongho",
        link: "/category/do-dung-ca-nhan",
      },
      {
        key: 3,
        label: "Giày dép",
        type: "giaydep",
        link: "/category/do-dung-ca-nhan",
      },
      {
        key: 4,
        label: "Nước hoa",
        type: "nuochoa",
        link: "/category/do-dung-ca-nhan",
      },
      {
        key: 5,
        label: "Balo, túi xách",
        type: "balo",
        link: "/category/do-dung-ca-nhan",
      },
      {
        key: 6,
        label: "Phụ kiện khác",
        type: "other_docanhan",
        link: "/category/do-dung-ca-nhan",
      },
    ],
  },
  {
    key: 6,
    label: "Giải trí, thể thao, sở thích",
    type: "dogiaitri",
    link: "/category/giai-tri",
    sub_danhmuc: [
      {
        key: 1,
        label: "Nhạc cụ",
        type: "nhaccu",
        link: "/category/giai-tri",
      },
      {
        key: 2,
        label: "Sách",
        type: "sach",
        link: "/category/giai-tri",
      },
      {
        key: 3,
        label: "Đồ thể thao",
        type: "dothethao",
        link: "/category/giai-tri",
      },
      {
        key: 4,
        label: "Thiết bị chơi game",
        type: "thietbichoigame",
        link: "/category/giai-tri",
      },
      {
        key: 5,
        label: "Sở thích khác",
        type: "other_dogiaitri",
        link: "/category/giai-tri",
      },
    ],
  },
  {
    key: 7,
    label: "Thú cưng",
    type: "thucung",
    link: "/category/thu-cung",
    sub_danhmuc: [
      {
        key: 1,
        label: "Chó",
        type: "cho",
        link: "/category/thu-cung",
      },
      {
        key: 2,
        label: "Mèo",
        type: "meo",
        link: "/category/thu-cung",
      },
      {
        key: 3,
        label: "Cá cảnh",
        type: "ca",
        link: "/category/thu-cung",
      },
      {
        key: 4,
        label: "Thú cưng khác, Phụ kiện, thức ăn",
        type: "other_thucung",
        link: "/category/thu-cung",
      },
    ],
  },
];

export default item_danhmuc;
