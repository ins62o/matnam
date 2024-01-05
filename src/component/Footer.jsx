import React from "react";
import styled from "styled-components";
import { FaReact, FaAws } from "react-icons/fa";
import { SiSpringboot } from "react-icons/si";
import Logo from "../asset/Logo.png";
export default function Footer() {
  return (
    <Container>
      <div className="Footer-box">
        <h1 className="Footer-title">
          <img src={Logo} alt="로고" />
        </h1>
        <div className="made-by">Made by 김광현 정인성</div>
        <div className="icon-box">
          <div className="box">
            <FaReact className="icon-react" />
          </div>
          <div className="box">
            <SiSpringboot className="icon-springboot" />
          </div>
          <div className="box">
            <FaAws className="icon-aws" />
          </div>
        </div>
        <div className="copyright">
          Copyright 2024. 맛남의공간 all rights reserved.
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  background-color: var(--hover-gray);
  width: 100%;
  .Footer-box {
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 20px;
    padding: 10px 0px;
  }

  .made-by {
    color: gray;
    line-height: 2.5;
    margin: 5px 0;
  }

  .icon-box {
    display: flex;
  }

  .box {
    border: 1px solid var(--dark-gray);
    border-radius: 100%;
    width: 50px;
    height: 50px;
    margin: 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-react {
    font-size: 1.5rem;
    color: skyblue;
  }

  .icon-springboot {
    font-size: 1.5rem;
    color: green;
  }

  .icon-aws {
    font-size: 1.5rem;
    color: #ffa500;
  }

  .copyright {
    padding: 15px 0;
  }
`;
