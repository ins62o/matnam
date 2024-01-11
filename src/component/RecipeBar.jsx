import React from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import Logo from "../asset/LogoIcon.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { levelAtom } from "../atom";

export default function RecipeBar({ level }) {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="titleBar">
        <Link to="/">
          <img src={Logo} alt="로고" className="logo" />
        </Link>
        <div>레시피작성</div>
        <div>
          <FaTimes className="icon-fa" onClick={() => navigate(-1)} />
        </div>
      </div>
      <div className="level-boxes">
        <div>레시피 정보</div>
        <div>재료 등록</div>
        <div>조리 방법</div>
      </div>
      <progress className="level-pro" max="100" value={level}></progress>
    </Container>
  );
}

const Container = styled.div`
  height: 60px;
  .titleBar {
    padding: 10px;
    font-size: 1.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .logo {
    height: 30px;
    margin-left: 10px;
  }

  .icon-fa {
    margin-right: 10px;
    font-size: 1.5rem;
    cursor: pointer;
  }

  .level-boxes {
    display: flex;
    justify-content: space-between;
    margin: 0px 10px;
    font-weight: 700;
  }

  .level-pro {
    width: 100%;
    margin-top: 10px;
    padding: 0px 10px;
  }
  progress {
    appearance: none;
  }

  ::-webkit-progress-bar {
    background-color: var(--hover-gray);
    border-radius: 10px;
  }

  ::-webkit-progress-value {
    background-color: var(--main-color);
    border-radius: 10px;
    transition: all 0.4s ease 0s;
  }
`;
