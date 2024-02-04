import React from "react";
import styled from "styled-components";
import Logo from "../asset/Logo.webp";
import { Link } from "react-router-dom";
export default function LogoBar() {
  return (
    <LogoBox>
      <Link to="/">
        <img src={Logo} alt="로고" />
      </Link>
    </LogoBox>
  );
}

const LogoBox = styled.div`
  height: 60px;
  text-align: center;
  padding: 10px 0px;

  img {
    height: 100%;
  }
`;
