import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';
import { IoIosCreate } from 'react-icons/io';
import { RxAvatar } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import WalletModal from "../Wallet/Wallet";
import "./nav.css";

const NavBar = ({isMobile}) => {
  const [isSticky, setIsSticky] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const [showWalletModal, setShowWalletModal] = useState(false);

  const handleCloseWalletModal = () => {
    setShowWalletModal(false);
  };



  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const handleShowWalletModal = () => {
    if (typeof window.ethereum === "undefined") {
      setShowWalletModal(false);
    } else {
      if (window.ethereum.selectedAddress) {
        setShowWalletModal(false);
      } else {
        setShowWalletModal(true);
      }
    }
  };
  
  

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const navClass = isMobile ? "fixed-top bg-dark" : (isSticky ? "fixed-top scrolled" : "");
  const logoSrc = isMobile ? "./Images/dragon.png" : "./Images/logo.png";

  return (
    <>
      <Navbar className={navClass} variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img src={logoSrc} alt="Logo" className="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" onClick={toggleMenu}>
            <FaBars className="text-light" />
          </Navbar.Toggle>
          <Navbar.Collapse id="navbar-nav" className={`justify-content-end ${showMenu ? "show" : ""}`}>
            <Nav>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/explore">Explore</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
              <Nav.Link>
                <div className="dropdown dropdown-primary">
                <button
                  type="button"
                  className="btn btn-pills dropdown-toggle p-0"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onClick={handleShowWalletModal}
            
                >
                  <RxAvatar
          
                    className="avatar rounded-pill avatar avatar-sm-sm"
                  />
                </button>
                  <div
                  className="dropdown-menu dd-menu dropdown-menu-end shadow border-0 mt-3 pb-3 pt-0 overflow-hidden rounded"
                  style={{ minWidth: 320 , height:300  }}
                >
                  <div className="position-relative">
                    <div className="pt-5 pb-3 bg-gradient-primary"></div>
                    <div className="px-3">
                      <div className="d-flex align-items-end mt-n5 mb-2">
                        <RxAvatar className="avatar  rounded-pill avatar avatar-sm-sm" />
                        <h6 className="text-light fw-bold mb-0 ms-1">
                          Calvin Carlo
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 ">
                  <Link
                      className="dropdown-item small px-3 py-2 border-bottom fw-semibold text-light d-flex align-items-center"
                      to="/create"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/create");
                      }}
                    >
                      <span className="mb-0 d-inline-block me-1">
                        <IoIosCreate/>
                      </span>{" "}
                      Create
                    </Link>
                    <Link
                            className="dropdown-item small px-3 py-2 border-bottom fw-semibold text-light d-flex align-items-center"
                            to="/profile"
                            onClick={(e) => {
                              e.preventDefault();
                              navigate("/profile");
                            }}
                    >
                      <span className="mb-0 d-inline-block me-1">
                        <i className="uil uil-user align-middle h6 mb-0 me-1"></i>
                      </span>{" "}
                      Profile
                    </Link>
                    <Link
                      className="dropdown-item px-3 py-2 border-bottom small fw-semibold text-light d-flex align-items-center"
                      to="/creator-profile-edit"
                      onClick={(e) => {
                        e.preventDefault();
                        setTimeout(() => {
                        }, 1000);
                        navigate("/creator-profile-edit");
                      }}
                    >
                      <span className="mb-0 d-inline-block me-1">
                        <i className="uil uil-cog align-middle h6 mb-0 me-1"></i>
                      </span>{" "}
                      Settings
                    </Link>
                    <Link
                      className="dropdown-item small px-3 py-2 border-bottom fw-semibold text-light d-flex align-items-center"
                      to="/lock-screen"
                      onClick={(e) => {
                        e.preventDefault();
                        setTimeout(() => {

                        }, 1000);
                        navigate("/lock-screen");
                      }}
                    >
                      <span className="mb-0 d-inline-block me-1">
                        <i className="uil uil-sign-out-alt align-middle h6 mb-0 me-1"></i>
                      </span>{" "}
                      Logout
                    </Link>
                  </div>
                </div>
           
              </div></Nav.Link>
       
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

 <WalletModal show={showWalletModal} handleClose={handleCloseWalletModal} />


   


    </>
  );
};

export default NavBar;
