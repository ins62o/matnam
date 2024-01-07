import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LogoBar from "../../component/LogoBar";
import MenuBar from "../../component/MenuBar";
import { IoSearchOutline } from "react-icons/io5";
import FeedCard from "../../component/FeedCard";
import { useParams } from "react-router-dom";
import categorylist from "../../category";
import RecipeBox from "../../component/RecipeBox";
export default function RecipeFeed() {
  const { category } = useParams();
  const [name, setName] = useState("");
  useEffect(() => {
    const name = categorylist(category);
    setName(name);
  }, [category]);

  return (
    <>
      <LogoBar />
      <Container>
        <div className="search-box">
          <div>
            <IoSearchOutline className="search-icon" />
          </div>
          <input
            type="text"
            className="search-input"
            placeholder="오늘은 어떤 요리를 할까요?"
          />
        </div>
        <div className="main-title">
          맛남의 <b className="point">{name}</b> 레시피를 살펴보세요 !
        </div>
        <div className="card-box">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
      </Container>

      <MenuBar />
    </>
  );
}

const Container = styled.div`
  .search-box {
    display: flex;
    align-items: center;
    height: 40px;
    background-color: var(--hover-gray);
    border-radius: 10px;
    margin: 0px 10px;
  }

  .search-input {
    width: 80%;
    height: 100%;
    background-color: var(--hover-gray);
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0);
    outline: none;
    padding-left: 7px;
  }

  .search-icon {
    font-size: 1.3rem;
    margin-left: 7px;
    color: var(--dark-gray);
  }

  .main-title {
    text-align: center;
    margin: 20px 0px;
    font-weight: 700;
  }

  .point {
    font-size: 1.4rem;
  }

  .card-box {
    padding-bottom: 80px;
  }
`;
