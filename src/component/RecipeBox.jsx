import React from "react";
import styled from "styled-components";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { GiCook } from "react-icons/gi";

export default function RecipeBox() {
  return (
    <Container>
      <div className="image-box"></div>
      <div className="info-box">
        <div className="heart-box">
          <FaHeart className="icon" />
          <div className="heart-count">12명이 좋아해요</div>
        </div>
        <div className="info-title">
          <b className="bold">[국·탕]</b> 맛좋은 된장국
        </div>
        <div className="info-heart">
          <div className="user">
            <div className="profile-image"></div>
            <div>닉네임</div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  border: 1px solid var(--dark-gray);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.05), 4px 12px 36px rgba(0, 0, 0, 0.05);
  padding: 10px;
  margin-right: 10px;
  width: 50%;

  .image-box {
    border-radius: 10px;
    border: 1px solid var(--dark-gray);
    position: relative;
    height: 150px;
  }

  .profile-image {
    border: 1px solid var(--dark-gray);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 3px;
  }

  .user {
    display: flex;
    align-items: center;
  }

  .info-box {
    margin-top: 10px;
  }

  .info-title {
    margin-bottom: 10px;
  }

  .info-heart {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .icon {
    margin-right: 5px;
    color: red;
    width: 20px;
    height: 20px;
  }

  .heart-box {
    display: flex;
    margin-bottom: 10px;
  }

  .heart-count {
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 0.8rem;
  }

  .bold {
    font-weight: 700;
  }
`;
