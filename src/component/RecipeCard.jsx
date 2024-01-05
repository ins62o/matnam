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
            <GiCook className="write-icon" />
            요리고수
          </div>
          <div className="heart-box">
            <FaHeart className="heart-icon" />
            <div className="heart-count">16</div>
          </div>
        </div>
        <div className="check-heart">
          <FaRegHeart />
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .info-box {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .cardBox {
    border: 1px solid ${({ color }) => color || "pink"};
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
  }

  .heart-box {
    display: flex;
    align-items: center;
  }

  .write-icon {
    margin-right: 3px;
  }

  .heart-icon {
    margin-right: 3px;
    color: pink;
  }

  .check-heart {
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px;
    font-size: 1.3rem;
  }

  .heart-count {
    color: red;
    font-size: 0.8rem;
  }
`;
