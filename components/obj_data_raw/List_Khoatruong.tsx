export interface truong {
  key: number;
  label: string;
  type: string;
  nganh: nganh[];
}
export interface nganh {
  key: number;
  label: string;
  type: string;
}

const item_listkhoatruong: truong[] = [
  {
    key: 0,
    label: "Khoa Khoa học Chính trị",
    type: "khoahocchinhtri",
    nganh: [
      {
        key: 1,
        label: "Chính trị học",
        type: "chinhtrihoc",
      },
      {
        key: 2,
        label: "Giáo dục công dân",
        type: "giaoduccongdan",
      },
      {
        key: 3,
        label: "Triết học",
        type: "triethoc",
      },
    ],
  },
  {
    key: 1,
    label: "Khoa Khoa học Tự nhiên",
    type: "khoahoctunhien",
    nganh: [
      {
        key: 1,
        label: "Hóa dược",
        type: "hoaduoc",
      },
      {
        key: 2,
        label: "Hóa học",
        type: "hoahoc",
      },
      {
        key: 3,
        label: "Sinh học",
        type: "sinhhoc",
      },
      {
        key: 4,
        label: "Thống kê",
        type: "thongke",
      },
      {
        key: 5,
        label: "Toán ứng dụng",
        type: "toanungdung",
      },
      {
        key: 6,
        label: "Vật lý kỹ thuật",
        type: "vatlykythuat",
      },
    ],
  },
  {
    key: 2,
    label: "Khoa Khoa học Xã hội & Nhân văn",
    type: "khoahocxahoinhanvan",
    nganh: [
      {
        key: 1,
        label: "Thông tin - Thư viện",
        type: "thongtinthuvien",
      },
      {
        key: 2,
        label: "Văn học",
        type: "vanhoc",
      },
      {
        key: 3,
        label: "Việt Nam học - chuyên HDV du lịch",
        type: "vietnamhochdvdulich",
      },
      {
        key: 4,
        label: "Xã hội học",
        type: "xahoihoc",
      },
    ],
  },
  {
    key: 3,
    label: "Khoa Luật",
    type: "luat",
    nganh: [
      {
        key: 1,
        label: "Luật - Luật hành chính",
        type: "luathanhchinh",
      },
      {
        key: 2,
        label: "Luật - Luật thương mại",
        type: "luatthuongmai",
      },
      {
        key: 3,
        label: "Luật - Luật tư pháp",
        type: "luattuphap",
      },
    ],
  },
  {
    key: 4,
    label: "Khoa Môi trường & Tài nguyên thiên nhiên",
    type: "moitruongtainguyenthiennhien",
    nganh: [
      {
        key: 1,
        label: "Khoa học môi trường",
        type: "khoahocmoitruong",
      },
      {
        key: 2,
        label: "Kỹ thuật cấp thoát nước",
        type: "kythuatcapthoatnuoc",
      },
      {
        key: 3,
        label: "Kỹ thuật môi trường",
        type: "kythuatmoitruong",
      },
      {
        key: 4,
        label: "Quản lý tài nguyên & môi trường",
        type: "quanlytainguyenmoitruong",
      },
      {
        key: 5,
        label: "Quản lý đất đai",
        type: "quanlydatdai",
      },
    ],
  },
  {
    key: 5,
    label: "Khoa Ngoại ngữ",
    type: "ngoaingu",
    nganh: [
      {
        key: 1,
        label: "Ngôn ngữ Anh",
        type: "ngonnguanh",
      },
      {
        key: 2,
        label: "Ngôn ngữ Pháp",
        type: "ngonnguphap",
      },
      {
        key: 3,
        label: "Sư phạm Tiếng Anh",
        type: "suphamtienganh",
      },
      {
        key: 4,
        label: "Sư phạm Tiếng Pháp",
        type: "suphamtiengphap",
      },
    ],
  },
  {
    key: 6,
    label: "Khoa Phát triển Nông thôn",
    type: "phattriennongthon",
    nganh: [
      {
        key: 1,
        label: "Kinh doanh Nông nghiệp",
        type: "kinhdoanhnongnghiep",
      },
    ],
  },
  {
    key: 7,
    label: "Khoa Sư phạm",
    type: "supham",
    nganh: [
      {
        key: 1,
        label: "Giáo dục Tiểu học",
        type: "giaoductieuhoc",
      },
      {
        key: 2,
        label: "Sư phạm Hóa học",
        type: "suphamhoahoc",
      },
      {
        key: 3,
        label: "Sư phạm Lịch sử",
        type: "suphamlichsu",
      },
      {
        key: 4,
        label: "Sư phạm Ngữ văn",
        type: "suphamnguvan",
      },
      {
        key: 5,
        label: "Sư phạm Sinh học",
        type: "suphamsinhhoc",
      },
      {
        key: 6,
        label: "Sư phạm Tin học",
        type: "suphamtinhoc",
      },
      {
        key: 7,
        label: "Sư phạm Toán học",
        type: "suphamtoanhoc",
      },
      {
        key: 8,
        label: "Sư phạm Vật lý",
        type: "suphamvatly",
      },
      {
        key: 9,
        label: "Sư phạm Địa lý",
        type: "suphamdialy",
      },
    ],
  },
  {
    key: 8,
    label: "Trường Bách khoa",
    type: "bachkhoa",
    nganh: [
      {
        key: 1,
        label: "Công nghệ kỹ thuật hóa học",
        type: "congnghekythuathoahoc",
      },
      {
        key: 2,
        label: "Kỹ thuật cơ khí",
        type: "kythuatcokhi",
      },
      {
        key: 3,
        label: "Kỹ thuật cơ điện tử",
        type: "kythuatcodientu",
      },
      {
        key: 4,
        label: "Kỹ thuật máy tính",
        type: "kythuatmaytinh",
      },
      {
        key: 5,
        label: "Kỹ thuật vật liệu",
        type: "kythuatvatlieu",
      },
      {
        key: 6,
        label: "Kỹ thuật xây dựng",
        type: "kythuatxaydung",
      },
      {
        key: 7,
        label: "Kỹ thuật điện",
        type: "kythuatdien",
      },
      {
        key: 8,
        label: "Kỹ thuật điện tử - viễn thông",
        type: "kythuatdientuvienthong",
      },
      {
        key: 9,
        label: "Kỹ thuật điều khiển và tự động hóa",
        type: "dieukhientudonghoa",
      },
      {
        key: 10,
        label: "Logistics và Quản lý chuỗi cung ứng",
        type: "logistics",
      },
      {
        key: 11,
        label: "Quản lý công nghiệp",
        type: "quanlycongnghiep",
      },
    ],
  },
  {
    key: 9,
    label: "Trường Công nghệ Thông tin & Truyền thông",
    type: "congnghethongtin",
    nganh: [
      {
        key: 1,
        label: "An toàn thông tin",
        type: "antoanthongtin",
      },
      {
        key: 2,
        label: "Công nghệ thông tin",
        type: "congnghethongtin",
      },
      {
        key: 3,
        label: "Hệ thống thông tin",
        type: "hethongthongtin",
      },
      {
        key: 4,
        label: "Khoa học máy tính",
        type: "khoahocmaytinh",
      },
      {
        key: 5,
        label: "Kỹ thuật phần mềm",
        type: "kythuatphanmem",
      },
      {
        key: 6,
        label: "Mạng máy tính và truyền thông dữ liệu",
        type: "mangmaytinh",
      },
      {
        key: 7,
        label: "Truyền thông đa phương tiện",
        type: "truyenthongdaphuongtien",
      },
    ],
  },
  {
    key: 10,
    label: "Trường Kinh tế",
    type: "kinhte",
    nganh: [
      {
        key: 1,
        label: "Kế toán",
        type: "ketoan",
      },
      {
        key: 2,
        label: "Kiểm toán",
        type: "kiemtoan",
      },
      {
        key: 3,
        label: "Kinh doanh quốc tế",
        type: "kinhdoanhquocte",
      },
      {
        key: 4,
        label: "Kinh doanh thương mại",
        type: "kinhdoanhthuongmai",
      },
      {
        key: 5,
        label: "Kinh tế",
        type: "kinhte",
      },
      {
        key: 6,
        label: "Marketing",
        type: "marketing",
      },
      {
        key: 7,
        label: "Quản trị dịch vụ du lịch và lữ hành",
        type: "quantridichvudulich",
      },
      {
        key: 8,
        label: "Quản trị kinh doanh",
        type: "quantrikinhdoanh",
      },
      {
        key: 9,
        label: "Tài chính - Ngân hàng",
        type: "taichinhnganhang",
      },
    ],
  },
  {
    key: 11,
    label: "Trường Nông nghiệp",
    type: "nongnghiep",
    nganh: [
      {
        key: 1,
        label: "Bảo vệ thực vật",
        type: "baovethucvat",
      },
      {
        key: 2,
        label: "Chăn nuôi",
        type: "channuoi",
      },
      {
        key: 3,
        label: "Công nghệ rau hoa quả và cảnh quan",
        type: "congngherauhoaqua",
      },
      {
        key: 4,
        label: "Khoa học cây trồng",
        type: "khoahoccaytrong",
      },
      {
        key: 5,
        label: "Khoa học đất",
        type: "khoahocdat",
      },
      {
        key: 6,
        label: "Nông học",
        type: "nonghoc",
      },
      {
        key: 7,
        label: "Sinh học ứng dụng",
        type: "sinhhocungdung",
      },
      {
        key: 8,
        label: "Thú y",
        type: "thuy",
      },
    ],
  },
  {
    key: 12,
    label: "Trường Thủy sản",
    type: "thuysan",
    nganh: [
      {
        key: 1,
        label: "Bệnh học thủy sản",
        type: "benhhocthuysan",
      },
      {
        key: 2,
        label: "Công nghệ chế biến thủy sản",
        type: "congnghechebienthuysan",
      },
      {
        key: 3,
        label: "Nuôi trồng thủy sản",
        type: "nuoitrongthuysan",
      },
      {
        key: 4,
        label: "Quản lý thủy sản",
        type: "quanlythuysan",
      },
    ],
  },
];

export default item_listkhoatruong;
