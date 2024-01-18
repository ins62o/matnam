import React from "react";
import styled from "styled-components";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import RecipeBox from "./../../component/RecipeBox";
import { getAllRecipes } from "../../Firebase/firebaseFn";
import { useQuery } from "react-query";

export default function RecipeNew() {
  const { isLoading, error, data } = useQuery(["NewRecipe"], getAllRecipes, {
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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
        {data.slice(0, 1).map((item) => (
          <RecipeBox item={item} key={item.id} />
        ))}
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
    color: var(--gray-700);
    display: flex;
    align-items: center;
  }
`;
