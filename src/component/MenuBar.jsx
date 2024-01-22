import React, { useState } from "react";
import styled from "styled-components";
import { IoHomeOutline, IoHomeSharp } from "react-icons/io5";
import { IoNewspaperOutline, IoNewspaper } from "react-icons/io5";
import { animateScroll as scroll } from "react-scroll";
import {
  FaArrowUp,
  FaRegUser,
  FaUser,
  FaUserCircle,
  FaRegUserCircle,
  FaPlus,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { MenuStateAtom } from "../Recoil/atom";
export default function MenuBar() {
  const menuState = useRecoilValue(MenuStateAtom);
  const Token = localStorage.getItem("accessToken");

  // TOP 버튼
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <MenuBox>
      <Link to="/" className="iconBox">
        {menuState.home ? (
          <IoHomeSharp className="menuBar-icon" />
        ) : (
          <IoHomeOutline className="menuBar-icon" />
        )}
        <div>홈</div>
      </Link>
      <Link to="/recipeFeed/1" className="iconBox">
        {menuState.feed ? (
          <IoNewspaper className="menuBar-icon" />
        ) : (
          <IoNewspaperOutline className="menuBar-icon" />
        )}
        <div>피드</div>
      </Link>
      <div className="iconBox">
        <Link to="/RecipeWrite">
          <div className="icon-circle">
            <FaPlus className="menuBar-icon white-icon" />
          </div>
        </Link>
      </div>
      <div className="iconBox">
        <FaArrowUp className="menuBar-icon" onClick={scrollToTop} />
        TOP
      </div>
      {Token ? (
        <Link to="/mypage" className="iconBox">
          {menuState.mypage ? (
            <FaUserCircle className="menuBar-icon" />
          ) : (
            <FaRegUserCircle className="menuBar-icon" />
          )}
          마이페이지
        </Link>
      ) : (
        <Link to="/Login" className="iconBox">
          {menuState.Login ? (
            <FaUser className="menuBar-icon" />
          ) : (
            <FaRegUser className="menuBar-icon" />
          )}
          로그인
        </Link>
      )}
    </MenuBox>
  );
}

const MenuBox = styled.div`
  max-width: 480px;
  position: fixed;
  bottom: 0;
  height: 60px;
  width: 100%;
  background-color: #fff;
  display: flex;
  z-index: 1;
  font-weight: 700;

  .iconBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 25%;
    cursor: pointer;
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
    background-color: var(--main-color);
  }

  .white-icon {
    color: #fff;
    font-weight: 700;
  }

  .sub-menuBox {
    display: flex;
    border-radius: 10px;
    transition: all 0.5s ease 0s;
    background-color: #fff;
    box-shadow: var(--box-shadow);
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
    border-right: 1px solid var(--gray-300);
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
  }
`;
