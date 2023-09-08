export interface laptop {
  key: number;
  label: string;
  type: string;
  dongmay: dongmay[];
}
export interface dongmay {
  key: number;
  type: string;
}

const item_list_laptop: laptop[] = [
  {
    key: 1,
    label: "Apple",
    type: "apple",
    dongmay: [
      { key: 1, type: "MacBook" },
      { key: 2, type: "MacBook Air" },
      { key: 3, type: "MacBook Air M1" },
      { key: 4, type: "MacBook Air M2" },
      { key: 5, type: "MacBook Pro" },
      { key: 6, type: "MacBook Pro M1" },
      { key: 7, type: "MacBook Pro M1 Touch Bar" },
      { key: 8, type: "MacBook Pro M2" },
      { key: 9, type: "MacBook Pro M2 Touch Bar" },
      { key: 10, type: "MacBook Pro Touch Bar" },
      { key: 11, type: "Dòng khác" },
    ],
  },
  {
    key: 2,
    label: "Asus",
    type: "asus",
    dongmay: [
      { key: 1, type: "A Series" },
      { key: 2, type: "ASUSPRO" },
      { key: 3, type: "B Series" },
      { key: 4, type: "BU series" },
      { key: 5, type: "ExpertBook" },
      { key: 6, type: "FX Series/ZX Series" },
      { key: 7, type: "G Series" },
      { key: 8, type: "K Series" },
      { key: 9, type: "N Series" },
      { key: 10, type: "ProArt Studiobook" },
      { key: 11, type: "PU Series" },
      { key: 12, type: "ROG Flow" },
      { key: 13, type: "ROG Strix Scar" },
      { key: 14, type: "S Series" },
      { key: 15, type: "Transformer Book" },
      { key: 16, type: "TUF Gaming" },
      { key: 17, type: "U Series" },
      { key: 18, type: "UL Series" },
      { key: 19, type: "VivoBook S Series" },
      { key: 20, type: "X Series" },
      { key: 21, type: "Zenbook Series" },
      { key: 22, type: "Dòng khác" },
    ],
  },
  {
    key: 3,
    label: "Hp",
    type: "hp",
    dongmay: [
      { key: 1, type: "Chromebook" },
      { key: 2, type: "Compaq" },
      { key: 3, type: "Detachable" },
      { key: 4, type: "Elitebook" },
      { key: 5, type: "Envy" },
      { key: 6, type: "MT series" },
      { key: 7, type: "Notebook" },
      { key: 8, type: "OMEN" },
      { key: 9, type: "Pavilion" },
      { key: 10, type: "ProBook" },
      { key: 11, type: "Spectre" },
      { key: 12, type: "Stream" },
      { key: 13, type: "ZBook" },
      { key: 14, type: "Dòng khác" },
    ],
  },

  {
    key: 4,
    label: "Dell",
    type: "dell",
    dongmay: [
      { key: 1, type: "Alienware" },
      { key: 2, type: "Chromebook" },
      { key: 3, type: "G Series" },
      { key: 4, type: "Inspiron" },
      { key: 5, type: "Latitude" },
      { key: 6, type: "Precision" },
      { key: 7, type: "Precision Mobile Workstations" },
      { key: 8, type: "Studio" },
      { key: 9, type: "Vostro" },
      { key: 10, type: "XPS" },
      { key: 11, type: "Dòng khác" },
    ],
  },
  {
    key: 5,
    label: "Lenovo",
    type: "lenovo",
    dongmay: [
      { key: 1, type: "Essential (B series)" },
      { key: 2, type: "Essential (G series)" },
      { key: 3, type: "IdeaPad" },
      { key: 4, type: "Legion Y Series" },
      { key: 5, type: "ThinkBook" },
      { key: 6, type: "ThinkPad" },
      { key: 7, type: "Yoga" },
      { key: 8, type: "Dòng khác" },
    ],
  },
  {
    key: 6,
    label: "MSI",
    type: "msi",
    dongmay: [
      { key: 1, type: "Bravo Series" },
      { key: 2, type: "CR Series" },
      { key: 3, type: "CX Series" },
      { key: 4, type: "GE Series" },
      { key: 5, type: "GF Series" },
      { key: 6, type: "GL Series" },
      { key: 7, type: "GP Series" },
      { key: 8, type: "GS Series" },
      { key: 9, type: "GT Series" },
      { key: 10, type: "GV Series" },
      { key: 11, type: "GX Series" },
      { key: 12, type: "Modern Series" },
      { key: 13, type: "PE Series" },
      { key: 14, type: "PL Series" },
      { key: 15, type: "W Series" },
      { key: 16, type: "Dòng khác" },
    ],
  },
  {
    key: 7,
    label: "Acer",
    type: "acer",
    dongmay: [
      { key: 1, type: "Aspire" },
      { key: 2, type: "Helios" },
      { key: 3, type: "Nitro 5" },
      { key: 4, type: "One" },
      { key: 5, type: "Predator" },
      { key: 6, type: "Swift" },
      { key: 7, type: "VX5" },
      { key: 8, type: "Dòng khác" },
    ],
  },
  {
    key: 8,
    label: "Samsung",
    type: "samsung",
    dongmay: [
      { key: 1, type: "Ativ Book 9" },
      { key: 2, type: "Chromebook" },
      { key: 3, type: "Galaxyboook" },
      { key: 4, type: "N-Series" },
      { key: 5, type: "Notebook 5" },
      { key: 6, type: "Notebook 7" },
      { key: 7, type: "Notebook 9" },
      { key: 8, type: "Notebook 9 Pro" },
      { key: 9, type: "P-Series" },
      { key: 10, type: "Q-Series" },
      { key: 11, type: "R-Series" },
      { key: 12, type: "Series 3" },
      { key: 13, type: "Series 4" },
      { key: 14, type: "Series 5" },
      { key: 15, type: "Series 6" },
      { key: 16, type: "Series 7" },
      { key: 17, type: "Series 9" },
      { key: 18, type: "Dòng khác" },
    ],
  },
  {
    key: 9,
    label: "Sony",
    type: "sony",
    dongmay: [
      { key: 1, type: "C Series" },
      { key: 2, type: "E Series" },
      { key: 3, type: "F Series" },
      { key: 4, type: "S Series" },
      { key: 5, type: "Vaio Series" },
      { key: 6, type: "Y Series" },
      { key: 7, type: "Z Series" },
      { key: 8, type: "Dòng khác" },
    ],
  },
  {
    key: 10,
    label: "Razer",
    type: "razer",
    dongmay: [
      { key: 1, type: "Blade Pro" },
      { key: 2, type: "Blade Stealth" },
      { key: 3, type: "Dòng khác" },
    ],
  },
  {
    key: 11,
    label: "LG",
    type: "lg",
    dongmay: [
      { key: 1, type: "Gram" },
      { key: 2, type: "Dòng khác" },
    ],
  },
  {
    key: 12,
    label: "Other",
    type: "Other",
    dongmay: [],
  },
];

export default item_list_laptop;
