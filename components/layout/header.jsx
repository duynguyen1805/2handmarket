import React from "react";
import Image from "next/image";
export default function Header() {
  return (
    <main className="p-2">
      <section className="grid grid-cols-12 gap-0">
        <div className="col-span-4">
          <Image src={require("../../assets/img/logo.png")} alt="tpsoft-logo" />
        </div>
      </section>
    </main>
  );
}
