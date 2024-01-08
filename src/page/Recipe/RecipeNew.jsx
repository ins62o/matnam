import React from "react";
import styled from "styled-components";
import { FaAngleRight } from "react-icons/fa6";
import RecipeBox from "../../component/RecipeBox";
import { Link } from "react-router-dom";
export default function RecipeNew() {
  return (
    <Container>
      <div className="new-title">
        <div className="title">방금 나온 신상 레시피🎉</div>
        <Link to="/recipeFeed/1">
          <div className="all">
            전체 보기
            <FaAngleRight />
          </div>
        </Link>
      </div>
      <div className="Box">
        <RecipeBox />
        <RecipeBox />
      </div>
    </Container>
  );
}

const Container = styled.div`
  margin: 15px 10px;

  .new-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .title {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 10px;
  }

  .all {
    color: gray;
    display: flex;
    align-items: center;
  }

  .Box {
    display: flex;
    justify-content: center;
  }

  .more-card {
    padding: 20px 0px;
    text-align: center;
    display: flex;
    justify-content: center;
    color: gray;
  }
`;
