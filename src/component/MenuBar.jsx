import React, { useState } from "react";
import styled from "styled-components";
import { IoHomeOutline, IoHomeSharp } from "react-icons/io5";
import { RiShoppingBagLine, RiShoppingBagFill } from "react-icons/ri";
import {
  FaArrowUp,
  FaRegUser,
  FaUserCircle,
  FaRegUserCircle,
} from "react-icons/fa";
import { FaPlus, FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function MenuBar() {
  const [menu, setMenu] = useState({
    home: true,
    shop: false,
    login: false,
  });

  const [toggle, setToggle] = useState(false);

  return (
    <MenuBox toggle={toggle.toString()}>
      <div className="iconBox">
        <IoHomeSharp className="menuBar-icon" />
        <div>홈</div>
      </div>
      <div className="iconBox">
        <RiShoppingBagLine className="menuBar-icon" />
        <div>쿡 쇼핑</div>
      </div>
      <div className="iconBox">
        <div className="icon-circle" onClick={() => setToggle(!toggle)}>
          {toggle ? (
            <FaAngleDown className="menuBar-icon white-icon" />
          ) : (
            <FaPlus className="menuBar-icon white-icon" />
          )}
        </div>
      </div>
      <div className="iconBox">
        <FaArrowUp className="menuBar-icon" />
        TOP
      </div>
      <div className="iconBox">
        <FaRegUser className="menuBar-icon" />
        로그인
      </div>
      <div className="sub-menuBox">
        <div className="sub-menu sub-menu-one">
          <div className="write-icon">📝</div>
          <div>레시피쓰기</div>
        </div>
        <div className="sub-menu">
          <div className="write-icon">📝</div>
          <div>쿡쇼핑쓰기</div>
        </div>
      </div>
    </MenuBox>
  );
}

const MenuBox = styled.div`
  position: fixed;
  bottom: 0;
  height: 60px;
  width: 100%;
  background-color: #fff;
  display: flex;
  z-index: 1;

  .iconBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 25%;
  }

  .menuBar-icon {
    font-size: 1.5rem;
    padding: 5px;
  }

  .icon-circle {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--point-color);
  }

  .white-icon {
    color: #fff;
    font-weight: 700;
  }

  .sub-menuBox {
    position: absolute;
    bottom: 65px;
    right: 96px;
    border: 1px solid black;
    border: 1px solid var(--dark-gray);
    display: flex;
    opacity: ${({ toggle }) => (toggle === "true" ? "1" : "0")};
    visibility: ${({ toggle }) => (toggle === "true" ? "visible" : "hidden")};
    border-radius: 10px;
    transition: all 0.5s ease 0s;
  }

  .sub-menu {
    height: 30px;
    display: flex;
    align-items: center;
    flex-direction: column;
    font-weight: 700;
    padding: 10px;
  }

  .sub-menu-one {
    border-right: 1px solid var(--dark-gray);
  }

  .write-icon {
    margin-bottom: 3px;
  }
`;
