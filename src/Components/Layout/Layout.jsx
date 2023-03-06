import React from "react";
import Footer from "../Footer/Footer.jsx";
import NavBar from "../Navbar/Navbar.jsx";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <div>
        {children}
      </div>
      <Footer/>
    </>
  );
};

export default Layout;
