import React from "react";
import styled from "styled-components";
import RecipeCard from "../../component/RecipeCard";
import { useQuery } from "@tanstack/react-query";
import { likeRecipes } from "../../Firebase/firebaseFn";

export default function RecipeBest() {
  const { error, isLoading, data } = useQuery({
    queryKey: ["likeRecipe"],
    queryFn: likeRecipes,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Container>
        <div className="best-title"> 인기 레시피 TOP 3🏆</div>
        {data.slice(0, 3).map((data, index) => (
          <div className="card-container" key={data.id}>
            <div className={`rank-${index + 1} rank`}>{index + 1}</div>
            <div className="card-box">
              <RecipeCard color={index + 1} data={data} />
            </div>
          </div>
        ))}
      </Container>
    </>
  );
}

const Container = styled.div`
  margin: 15px 10px;

  .best-title {
    font-size: 1.2rem;
    font-weight: 700;
    margin: 20px 0px;
  }

  .card-container {
    display: flex;
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
    background-color: var(--main-color);
    font-weight: 700;
    position: absolute;
    top: -7px;
    left: -7px;
  }

  .rank-1 {
    background-color: var(--main-color);
  }

  .rank-2 {
    background-color: var(--gray-400);
  }

  .rank-3 {
    background-color: #826a5d;
  }
`;
