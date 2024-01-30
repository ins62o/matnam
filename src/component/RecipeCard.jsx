import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function RecipeCard({ color, data }) {
  // color : 1등 , 2등 ,3등 border 색상 , data : RecipeNew 에서 받아온 레시피 데이터값
  const [heart, setHeart] = useState(false);
  const email = localStorage.getItem("email");
  if (color == 1) color = "var(--main-color)";
  if (color == 2) color = "var(--gray-400)";
  if (color == 3) color = "#826a5d;";

  // 카드박스 - 좋아요 처리
  useEffect(() => {
    setHeart(data.heart.includes(email));
  }, [data, email]);

  return (
    <Container color={color}>
      <Link to={`/RecipeDetail/${data.id}`}>
        <div className="cardBox">
          <div className="image-box">
            <img
              src={data.cookStep[0].imageUrl}
              className="main-image"
              alt="이미지"
            />
          </div>

          <div className="info-box">
            <div className="heart-box">
              {heart ? (
                <FaHeart className="heart-icon" />
              ) : (
                <FaRegHeart className="heart-icon" />
              )}
              <div className="heart-count">
                {data.heart.length}명이 좋아해요
              </div>
            </div>
            <div className="title-box">
              <div className="tag"> {data.categoryName}</div>
              <div>{data.title}</div>
            </div>
            <div className="write">
              <div className="profile-image">
                <img
                  src={data.writer.profile}
                  alt="프로필"
                  className="main-image"
                />
              </div>
              <div className="nick-name">{data.writer.nickname}</div>
            </div>
          </div>
          <div className="see-box">
            <div>
              <FaRegEye />
            </div>
            <div className="see-count">{data.see}</div>
          </div>
        </div>
      </Link>
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
    border: 1px solid var(--gray-400);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 3px;
  }
  .cardBox {
    border: 1px solid ${({ color }) => color || "var(--gray-400)"};
    height: 80px;
    border-radius: 10px;
    box-shadow: var(--box-shadow);
    padding: 10px;
    display: flex;
    position: relative;
  }

  .nick-name {
    font-size: 0.9rem;
  }

  .title-box {
    display: flex;
    align-items: center;
    font-weight: 700;
  }

  .image-box {
    border: 1px solid var(--gray-400);
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .tag {
    background-color: var(--main-color);
    border-radius: 10px;
    margin-right: 5px;
    padding: 7px;
    font-size: 0.9rem;
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
`;
