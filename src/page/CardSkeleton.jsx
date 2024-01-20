import React from "react";
import styled from "styled-components";
import { FaHeart, FaRegEye } from "react-icons/fa";

export default function CardSkeleton() {
  return (
    <Container>
      <div className="cardBox">
        <div className="image-box"></div>
        <div className="info-box">
          <div className="heart-box">
            <div className="heart-count"></div>
          </div>
          <div className="title-box"></div>
          <div className="write">
            <div className="profile-image"></div>
            <div className="nick-name"></div>
          </div>
        </div>
        <div className="see-box">
          <div>
            <FaRegEye />
          </div>
          <div className="see-count"></div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  margin-bottom: 10px;

  .info-box {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .profile-image {
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 3px;
    overflow: hidden;
    position: relative;
  }
  .cardBox {
    border: 1px solid ${({ color }) => color || "var(--gray-400)"};
    height: 80px;
    border-radius: 10px;
    box-shadow: var(--box-shadow);
    padding: 10px;
    display: flex;
    position: relative;
    overflow: hidden;
    position: relative;
  }

  .nick-name {
    font-size: 0.9rem;
    width: 60px;
    height: 20px;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    overflow: hidden;
    position: relative;
  }

  .title-box {
    display: flex;
    align-items: center;
    font-weight: 700;
    width: 100%;
    height: 20px;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    overflow: hidden;
    position: relative;
  }

  .image-box {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 10px;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    overflow: hidden;
    position: relative;
  }

  .main-image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .write {
    display: flex;
    align-items: center;
    font-weight: 700;
  }

  .heart-box {
    display: flex;
    align-items: center;
    width: 100%;
    height: 20px;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    overflow: hidden;
    position: relative;
  }

  .see-box {
    display: flex;
    font-weight: 700;
    position: absolute;
    right: 0;
    top: 0;
    margin: 10px;
    color: var(--gray-700);
  }

  .write-icon {
    margin-right: 3px;
  }

  .see-count {
    font-size: 0.9rem;
    margin-left: 2px;
  }

  .heart-icon {
    margin-right: 5px;
    width: 20px;
    height: 20px;
    color: red;
  }

  .heart-count {
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 0.8rem;
  }

  @keyframes loading {
    0% {
      transform: translateX(0);
    }
    50%,
    100% {
      transform: translateX(460px);
    }
  }
`;
