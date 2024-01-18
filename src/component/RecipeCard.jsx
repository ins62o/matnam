import React, { useEffect } from "react";
import styled from "styled-components";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { collection, getDocs, where, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
export default function RecipeCard({ color }) {
  const getData = async () => {
    const recipesQuery = query(
      collection(db, "recipe"),
      orderBy("date", "desc")
    );
    let snapshot = await getDocs(recipesQuery);

    snapshot.forEach((doc) => {});
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Container color={color}>
      <div className="cardBox">
        <div className="image-box"></div>
        <div className="info-box">
          <div className="heart-box">
            <FaRegHeart className="heart-icon" />
            <div className="heart-count">16명이 좋아해요</div>
          </div>
          <div className="title-box">
            <div className="tag"> 국·탕 </div>
            <div>맛좋은 된장국</div>
          </div>
          <div className="write">
            <div className="profile-image"></div>
            <div className="nick-name">닉네임</div>
          </div>
        </div>
        <div className="see-box">
          <div>
            <FaRegEye />
          </div>
          <div className="see-count">12</div>
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
