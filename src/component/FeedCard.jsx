import React from "react";
import styled from "styled-components";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function FeedCard() {
  return (
    <Container>
      <div className="user-profile">
        <div className="user-image"></div>
        <div className="user-name">닉네임</div>
      </div>
      <div className="image-box">
        <div className="how-many">1/3</div>
      </div>
      <div className="icon-box">
        <div className="heart-icon">
          <FaHeart className="icon" />
          <div className="count">12명이 좋아해요</div>
        </div>
      </div>
      <Link to="/RecipeDetail/1">
        <div className="recipe-title">
          <div>
            <b className="bold">[ 국·탕 ]</b> 맛좋은 된장국 레시피 보러가기
          </div>
          <div>
            <FaAngleRight className="icon-right" />
          </div>
        </div>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  height: 60vh;
  margin-bottom: 30px;

  .user-profile {
    display: flex;
    margin-left: 10px;
  }

  .user-image {
    border: 1px solid var(--dark-gray);
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }

  .user-name {
    display: flex;
    align-items: center;
    margin-left: 5px;
  }

  .image-box {
    margin-top: 5px;
    border: 1px solid var(--dark-gray);
    height: 70%;
    position: relative;
  }

  .icon-box {
    display: flex;
    margin-top: 10px;
    font-size: 1.1rem;
    margin-left: 10px;
  }

  .heart-icon {
    display: flex;
    align-items: center;
  }

  .icon {
    margin-right: 5px;
    color: red;
    width: 20px;
    height: 20px;
  }

  .icon-right {
    margin-right: 5px;
  }

  .recipe-title {
    border: 1px solid var(--dark-gray);
    padding: 10px 0px 10px 10px;
    display: flex;
    justify-content: space-between;
    margin: 10px;
  }

  .count {
    font-size: 0.9rem;
    font-weight: 700;
  }

  .bold {
    font-weight: 700;
  }

  .how-many {
    position: absolute;
    top: 0;
    right: 0;
    margin: 7px;
    border-radius: 10px;
    background-color: var(--main-color);
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
  }
`;
