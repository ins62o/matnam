import React from "react";
import styled from "styled-components";
import Logo from "../asset/Logo.webp";

export default function Loading() {
  return (
    <LoadingBox>
      <div className="imageBox">
        <img src={Logo} alt="로고" />
        <div className="title">
          <div>잠시만 기다려주세요</div>
        </div>
      </div>
    </LoadingBox>
  );
}

const LoadingBox = styled.div`
  background-color: var(--gray-200);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .imageBox {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .title {
    margin-top: 10px;
    font-size: 1.2rem;
    font-weight: 700;
    display: flex;
  }
`;
