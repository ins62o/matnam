import React from "react";
import styled from "styled-components";
import RecipeCard from "../../component/RecipeCard";

export default function RecipeBest() {
  return (
    <>
      <Container>
        <div className="best-title"> 인기 레시피 TOP 3🏆</div>
        <div className="card-container">
          <div className="rank-one rank">1</div>
          <div className="card-box">
            <RecipeCard color={"var(--point-color)"} />
          </div>
        </div>

        <div className="card-container">
          <div className="rank-two rank">2</div>
          <div className="card-box">
            <RecipeCard color={"silver"} />
          </div>
        </div>

        <div className="card-container">
          <div className="rank-three rank">3</div>
          <div className="card-box">
            <RecipeCard color={"#826a5d"} />
          </div>
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  margin: 15px 10px;

  .best-title {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 10px;
  }

  .card-container {
    display: flex;
    margin-bottom: 10px;
    position: relative;
  }

  .card-box {
    width: 100%;
  }

  .rank {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: var(--point-color);
    font-weight: 700;
    position: absolute;
    top: -7px;
    left: -7px;
  }

  .rank-one {
    background-color: var(--point-color);
  }

  .rank-two {
    background-color: silver;
  }

  .rank-three {
    background-color: #826a5d;
  }
`;
