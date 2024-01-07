import React from "react";
import styled from "styled-components";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";

export default function FeedCard() {
  return (
    <Container>
      <div className="user-profile">
        <div className="user-image"></div>
        <div className="user-name">닉네임</div>
      </div>
      <div className="image-box">
        <div className="how-many">1 / 3</div>
      </div>
      <div className="icon-box">
        <div className="heart-icon">
          <FaHeart className="icon" />
          <div className="count">12</div>
        </div>
      </div>
      <div className="recipe-title">
        <div>
          <b className="bold">[레시피]</b> 맛좋은 된장국
        </div>
        <div>
          <FaAngleRight className="icon-right" />
        </div>
      </div>
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
    margin-top: 5px;
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
  }

  .icon-right {
    margin-right: 5px;
  }

  .recipe-title {
    border: 1px solid var(--dark-gray);
    padding: 10px 0px 10px 10px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
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
    padding: 7px;
    margin: 7px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
  }
`;
