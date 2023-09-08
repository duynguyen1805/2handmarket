export interface camera {
  key: number;
  label: string;
  type: string;
  link: string;
}

const item_list_camera: camera[] = [
  {
    key: 1,
    label: "Canon",
    type: "canon",
    link: "/bat-dong-san",
  },
  {
    key: 2,
    label: "Nikon",
    type: "nikon",
    link: "/bat-dong-san",
  },
  {
    key: 3,
    label: "Sony",
    type: "sony",
    link: "/phuong-tien",
  },
  {
    key: 4,
    label: "Fujifilm",
    type: "fujifilm",
    link: "/phuong-tien",
  },
  {
    key: 5,
    label: "Khác",
    type: "other",
    link: "/phuong-tien",
  },
];

export default item_list_camera;
