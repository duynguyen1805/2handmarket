export interface phukien {
  key: number;
  label: string;
  type: string;
  link: string;
}

const item_list_phukien: phukien[] = [
  {
    key: 1,
    label: "Màn hình",
    type: "manhinh",
    link: "/bat-dong-san",
  },
  {
    key: 2,
    label: "Bàn phím",
    type: "banphim",
    link: "/bat-dong-san",
  },
  {
    key: 3,
    label: "Chuột, pad",
    type: "chuot",
    link: "/bat-dong-san",
  },
  {
    key: 4,
    label: "Tai nghe",
    type: "tainghe",
    link: "/phuong-tien",
  },
  {
    key: 5,
    label: "Sạc, cáp",
    type: "capsac",
    link: "/phuong-tien",
  },
  {
    key: 6,
    label: "Other",
    type: "other",
    link: "/phuong-tien",
  },
];

export default item_list_phukien;
