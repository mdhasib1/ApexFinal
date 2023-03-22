import React from "react";
import Header from "../header/Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main style={{ minHeight: "100vh", padding: "1rem",background:'#fff' }}>
        {children}
      </main>
    </>
  );
};

export default Layout;
