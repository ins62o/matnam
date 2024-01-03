import React from "react";
import styled from "styled-components";
import Logo from "../asset/Logo.png";
export default function LogoBar() {
  return (
    <LogoBox>
      <img src={Logo} alt="로고" />
    </LogoBox>
  );
}

const LogoBox = styled.div`
  height: 60px;
  margin-bottom: 30px;

  img {
    height: 100%;
  }
`;
