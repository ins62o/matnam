import React from "react";
import styled from "styled-components";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { GiCook } from "react-icons/gi";
export default function RecipeCard({ color }) {
  return (
    <Container color={color}>
      <div className="cardBox">
        <div className="image-box"></div>
        <div className="info-box">
          <div>
            <b className="tag">[ 국·탕 ]</b> 맛좋은 된장국
          </div>
          <div className="write">
            <div className="profile-image"></div>
            <div>닉네임</div>
          </div>
          <div className="heart-box">
            <FaRegHeart className="heart-icon" />
            <div className="heart-count">16명이 좋아해요</div>
          </div>
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
    border: 1px solid var(--dark-gray);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 3px;
  }
  .cardBox {
    border: 1px solid ${({ color }) => color || "var(--dark-gray)"};
    height: 80px;
    border-radius: 10px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.05), 4px 12px 36px rgba(0, 0, 0, 0.05);
    padding: 10px;
    display: flex;
  }

  .image-box {
    border: 1px solid var(--dark-gray);
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .tag {
    font-weight: 700;
  }

  .write {
    display: flex;
    align-items: center;
  }

  .heart-box {
    display: flex;
    align-items: center;
  }

  .write-icon {
    margin-right: 3px;
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
`;
