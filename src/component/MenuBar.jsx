import React, { useState } from "react";
import styled from "styled-components";
import { IoHomeOutline, IoHomeSharp } from "react-icons/io5";
import { RiShoppingBagLine, RiShoppingBagFill } from "react-icons/ri";
import { animateScroll as scroll } from "react-scroll";
import {
  FaArrowUp,
  FaRegUser,
  FaUser,
  FaUserCircle,
  FaRegUserCircle,
  FaPlus,
  FaAngleDown,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { MenuStateAtom } from "../atom";
export default function MenuBar() {
  const [toggle, setToggle] = useState(false);
  const menuState = useRecoilValue(MenuStateAtom);
  const scrollToTop = () => {
    scroll.scrollToTop();
  };
  return (
    <MenuBox toggle={toggle.toString()}>
      <Link to="/" className="iconBox">
        {menuState.home ? (
          <IoHomeSharp className="menuBar-icon" />
        ) : (
          <IoHomeOutline className="menuBar-icon" />
        )}
        <div>홈</div>
      </Link>

      <Link to="/Shop" className="iconBox">
        {menuState.shop ? (
          <RiShoppingBagFill className="menuBar-icon" />
        ) : (
          <RiShoppingBagLine className="menuBar-icon" />
        )}

        <div>쿡 쇼핑</div>
      </Link>
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
        <FaArrowUp className="menuBar-icon" onClick={scrollToTop} />
        TOP
      </div>
      <Link to="/Login" className="iconBox">
        {menuState.Login ? (
          <FaUser className="menuBar-icon" />
        ) : (
          <FaRegUser className="menuBar-icon" />
        )}
        로그인
      </Link>

      <div className="subBox">
        <div className="sub-menuBox">
          <Link to="/RecipeWrite">
            <div className="sub-menu sub-menu-one">
              <div className="write-icon">📝</div>
              <div>레시피쓰기</div>
            </div>
          </Link>

          <div className="sub-menu">
            <div className="write-icon">📝</div>
            <div>쿡쇼핑쓰기</div>
          </div>
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
    border: 1px solid var(--dark-gray);
    display: flex;
    opacity: ${({ toggle }) => (toggle === "true" ? "1" : "0")};
    visibility: ${({ toggle }) => (toggle === "true" ? "visible" : "hidden")};
    border-radius: 10px;
    transition: all 0.5s ease 0s;
    background-color: #fff;
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

  .subBox {
    position: absolute;
    bottom: 60px;
    width: 100%;
    display: flex;
    justify-content: center;
    opacity: ${({ toggle }) => (toggle === "true" ? "1" : "0")};
    visibility: ${({ toggle }) => (toggle === "true" ? "visible" : "hidden")};
  }
`;
