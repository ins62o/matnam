import React from "react";
import { useRecoilState } from "recoil";

import styled from "styled-components";
import { RecipeAtom } from "../Recoil/atom";

export default function Category({ title, icon, categoryName }) {
  const [recipe, setRecipe] = useRecoilState(RecipeAtom);

  const handleMenuClick = (categoryName) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      categoryName,
    }));
  };
  return (
    <Container
      className={categoryName === `${title}` ? "Onmenu-box" : "menu-box"}
      onClick={() => handleMenuClick(title)}
    >
      <div className="menu-icon">{icon}</div>
      <div className="menu-name">{title}</div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 25%;
  border: 1px solid var(--gray-400);
  margin: 5px;
  border-radius: 10px;
  cursor: pointer;

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
`;
