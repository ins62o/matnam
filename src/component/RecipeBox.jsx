import React from "react";
import styled from "styled-components";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { GiCook } from "react-icons/gi";

export default function RecipeBox() {
  return (
    <Container>
      <div className="image-box">
        <FaRegHeart className="heart-icon" />
      </div>
      <div className="info-box">
        <div className="info-title">
          <b className="bold">[국·탕]</b> 맛좋은 된장국
        </div>
        <div className="info-heart">
          <div>
            <GiCook />
            요리고수
          </div>
          <div className="heart-box">
            <FaHeart className="icon" />
            <div className="heart-count">12</div>
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

  .image-box {
    width: 100%;
    height: 150px;
    border-radius: 10px;
    border: 1px solid var(--dark-gray);
    position: relative;
  }

  .heart-icon {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 5px;
    font-size: 1.3rem;
    color: var(--dark-gray);
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
  }
  .icon {
    margin-right: 3px;
    color: pink;
  }

  .heart-box {
    display: flex;
  }

  .heart-count {
    display: flex;
    align-items: center;
    color: red;
    font-size: 0.8rem;
  }

  .bold {
    font-weight: 700;
  }
`;
