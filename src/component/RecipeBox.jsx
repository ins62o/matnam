import React from "react";
import styled from "styled-components";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { GiCook } from "react-icons/gi";

export default function RecipeBox() {
  return (
    <Container>
      <div className="image-box"></div>
      <div className="recipe-info">
        <div className="profile-box">
          <div className="user-profile"></div>
        </div>
        <div className="info-box">
          <div className="heart-box">
            <FaRegHeart className="heart-icon" />
            <div className="heart-count">12명이 좋아해요</div>
          </div>
          <div className="recipe-name">
            <b className="bold">[ 국·탕 ]</b> 맛좋은 된장국
          </div>
          <div>요리제왕</div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  border-radius: 10px;
  height: 300px;
  box-shadow: var(--box-shadow);
  margin-bottom: 20px;

  .image-box {
    width: 100%;
    height: 70%;
    background-color: beige;
    border-radius: 10px 10px 0px 0px;
  }

  .recipe-info {
    display: flex;
    height: 30%;
  }

  .profile-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20%;
  }

  .info-box {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .user-profile {
    width: 50px;
    height: 50px;
    border: 1px solid var(--gray-400);
    border-radius: 50%;
  }

  .heart-box {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
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

  .bold {
    font-weight: 700;
  }

  .recipe-name {
    margin-bottom: 10px;
  }
`;
