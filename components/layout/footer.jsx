import React from "react";
export default function Footer() {
  return (
    <footer className="fixed left-0 bottom-0 w-full flex justify-center shadow-xl border-t-[1px] border-[#ddd] py-2">
      <span className="font-medium">
        Copyright © {new Date().getFullYear()} by{" "}
        <a href="https://tpsoftct.vn">TPSoft</a>
      </span>
    </footer>
  );
}
