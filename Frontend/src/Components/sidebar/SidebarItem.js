import React, { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { NavLink } from "react-router-dom";
import styled from "styled-components";


const activeLink = ({ isActive }) => (isActive ? "activet" : "link");
const activeSublink = ({ isActive }) => (isActive ? "activet" : "link");

const SidebarItemContainer = styled.div`
  margin-bottom: 10px;
  .sidebar-item {
    padding: 10px 15px;
    border-radius: 5px;
    transition: background-color 0.15s;
    &:hover {
      background-color: #eee;
    }
  }
  .sidebar-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    text-decoration: none;

    span {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: ${(props) => (props.isOpen ? "bold" : "normal")};
      color: ${(props) => (props.isOpen ? "#fff" : "#ccc")};
      text-decoration: none;
    }
  }
  .icon {
    font-size: 20px;
    color: ${(props) => (props.isOpen ? "#fff" : "#ccc")};
    transition: color 0.3s;
  }
  .arrow-icon {
    color: ${(props) => (props.isOpen ? "#000" : "#000")};
    transition: transform 0.3s;
    transform: ${(props) =>
      props.expandMenu ? "rotate(90deg)" : "rotate(0deg)"};
  }

  a.link {
    text-decoration: none;
}

a.activet {
  background-color: #fff;
  color: #000;
  text-decoration: none;
}

.activet {
  background-color: #fff;
  color: #333;
}

a.link.activet .icon,
a.link.activet .sit {
  color: #333;
}

  
  .sidebar-content {
    overflow: hidden;
    max-height: ${(props) => (props.expandMenu ? "1000px" : "0px")};
    transition: max-height 0.3s ease-in-out;
  }
`;


const SidebarItem = ({ item, isOpen }) => {
  const [expandMenu, setExpandMenu] = useState(false);

  if (item.childrens) {
    return (
      <SidebarItemContainer isOpen={isOpen} expandMenu={expandMenu}>
        <div
          className={
            expandMenu
              ? "sidebar-item s-parent open"
              : "sidebar-item s-parent"
          }
        >
          <div className="sidebar-title">
            <span>
              {item.icon && <div className="icon">{item.icon}</div>}
              {isOpen && <div>{item.title}</div>}
            </span>
            <MdKeyboardArrowRight
              size={25}
              className="arrow-icon"
              onClick={() => setExpandMenu(!expandMenu)}
            />
          </div>
          <div className="sidebar-content">
            {item.childrens.map((child, index) => {
              return (
                <div key={index} className="s-child">
                  <NavLink to={child.path} className={activeSublink} >
                    <div className="sidebar-item">
                      <div className="sidebar-title">
                        <span className="sit">
                          {child.icon && (
                            <div className="icon">{child.icon}</div>
                          )}
                          {isOpen && <div>{child.title}</div>}
                        </span>
                      </div>
                    </div>
                  </NavLink>
                </div>
              );
            })}
          </div>
        </div>
      </SidebarItemContainer>
    );
  } else {
    return (
      <SidebarItemContainer isOpen={isOpen}>
        <NavLink to={item.path} className={activeLink}
         activeClassName="activet"
        >
          <div className="sidebar-item s-parent">
            <div className="sidebar-title">
              <span>
                {item.icon && <div className="icon">{item.icon}</div>}
                {isOpen && <div>{item.title}</div>}
              </span>
            </div>
          </div>
        </NavLink>
      </SidebarItemContainer>
    );
  }
};


export default SidebarItem;
