import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useQueryClient } from "react-query";

export default function RecipeBox({ item, getData }) {
  const nickname = localStorage.getItem("nickname");
  const [heart, setHeart] = useState(false);
  const client = useQueryClient;

  useEffect(() => {
    setHeart(item.heart.includes(nickname));
  }, [item, nickname]);

  return (
    <Container>
      <div key={item.id}>
        <Link to={`/RecipeDetail/${item.id}`}>
          <div className="image-box">
            <img
              src={item.cookStep[0].imageUrl}
              alt="메인사진"
              className="main-image"
            />
          </div>
        </Link>

        <div className="content-box">
          <div className="tag-name-box">
            <div className="tag">{item.categoryName}</div>
            <div className="see-box">
              <div>
                <FaRegEye />
              </div>
              <div className="see-count">{item.see}</div>
            </div>
          </div>
          <div className="heart-see-box">
            <div className="heart-box">
              {heart ? (
                <FaHeart className="heart-icon" />
              ) : (
                <FaRegHeart className="heart-icon" />
              )}

              <div className="heart-count">
                {item.heart.length}명이 좋아해요
              </div>
            </div>
            <div className="namebox">
              <div className="userprofile">
                <img
                  src={item.writer.profile}
                  alt="프로필 사진"
                  className="user-profile"
                />
              </div>
              <div className="user-name">{item.writer.nickname}</div>
            </div>
          </div>
          <div className="recipe-title">{item.title}</div>
          <Link to={`/RecipeDetail/${item.id}`}>
            <div className="recipe-btn"> {item.title} 레시피 보러가기 </div>
          </Link>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  box-shadow: var(--box-shadow);
  border-radius: 10px;
  height: 400px;
  padding: 10px;
  margin-bottom: 20px;

  .image-box {
    border-radius: 10px;
    height: 200px;
    border: 1px solid var(--gray-400);
  }

  .content-box {
    height: 200px;
    font-weight: 700;
    margin-top: 10px;
  }

  .tag-name-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .namebox {
    display: flex;
    align-items: center;
  }

  .tag {
    background-color: var(--main-color);
    padding: 7px;
    border-radius: 10px;
    font-size: 0.9rem;
  }

  .userprofile {
    width: 20px;
    height: 20px;
    border: 1px solid var(--gray-400);
    border-radius: 50%;
    margin-right: 3px;
  }

  .user-profile {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .recipe-title {
    font-size: 1.4rem;
    padding: 20px 0px 0px 7px;
  }

  .heart-box {
    display: flex;
  }

  .heart-see-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
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

  .see-box {
    display: flex;
    font-weight: 700;
    color: var(--gray-700);
  }

  .see-count {
    font-size: 0.9rem;
    margin-left: 2px;
  }

  .recipe-btn {
    border-radius: 10px;
    background-color: var(--gray-300);
    padding: 15px;
    margin-top: 20px;
    text-align: center;
  }

  .main-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`;
