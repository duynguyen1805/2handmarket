import React from "react";
import Header from "./header.jsx";
import Footer from "./footer.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
