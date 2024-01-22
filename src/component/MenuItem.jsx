import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { RecipeAtom } from "../Recoil/atom";

export default function MenuItem({ icon, categoryName }) {
  const [recipe, setRecipe] = useRecoilState(RecipeAtom);
  const handleMenuClick = (categoryName) => {
    setRecipe((prev) => ({
      ...prev,
      categoryName,
    }));
  };
  return (
    <Container>
      <div
        className={
          recipe.categoryName == "메인반찬" ? "Onmenu-box" : "menu-box"
        }
        onClick={() => handleMenuClick("메인반찬")}
      >
        <div className="menu-icon">{icon}</div>
        <div className="menu-name">{categoryName}</div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .Onmenu-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 25%;
    border: 1px solid var(--gray-400);
    margin: 5px;
    border-radius: 10px;
    background-color: var(--gray-400);
  }

  .menu-icon {
    font-size: 1.5rem;
  }

  .menu-name {
    margin-top: 5px;
    font-weight: 700;
  }

  .menu-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 25%;
    border: 1px solid var(--gray-400);
    margin: 5px;
    border-radius: 10px;
    cursor: pointer;
  }
`;
