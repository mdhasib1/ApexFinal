import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import menu from "../../data/sidebar";
import SidebarItem from "./SidebarItem";

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: ${(props) => (props.isOpen ? "220px" : "80px")};
  background-color: #50089d;
  color: #fff;
  transition: width 0.6s;
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 10px;
  background-color: #680acc;
  height: 80px;
`;

const Logo = styled.img`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  cursor: pointer;
`;

const Bars = styled(HiMenuAlt3)`
  font-size: 30px;
  color: #fff;
  cursor: pointer;
  margin-left: ${(props) => (props.isOpen ? "120px" : "2")};
  transition: margin-left 0.6s;
`;

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="layout">
      <SidebarContainer isOpen={isOpen}>
        <TopSection>
          <Logo src='./dragon.png' alt="logo" width={50} isOpen={isOpen} onClick={goHome} />
          <Bars onClick={toggle} isOpen={isOpen} />
        </TopSection>
        {menu.map((item, index) => {
          return <SidebarItem key={index} item={item} isOpen={isOpen} />;
        })}
      </SidebarContainer>
      <main style={{ paddingLeft: isOpen ? "220px" : "80px", transition: "padding-left 0.2s" }}>
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
