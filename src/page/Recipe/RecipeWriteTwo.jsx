import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import RecipeBar from "../../component/RecipeBar";
import RecipeBtnBar from "./../../component/RecipeBtnBar";
import { useRecoilState } from "recoil";
import { RecipeAtom } from "../../Recoil/atom";
import { GoXCircle } from "react-icons/go";

export default function RecipeWriteTwo() {
  const [recipe, setRecipe] = useRecoilState(RecipeAtom);
  const ingredRef = useRef("");

  const handleAddIngredient = () => {
    setRecipe((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ingredRef.current.value],
    }));
    ingredRef.current.value = "";
  };

  // 엔터키 Keydown 이벤트 적용
  const handleEnter = (e) => {
    if (e.key === "Enter") handleAddIngredient();
  };

  const handleRemoveIngredient = (index) => {
    setRecipe((prev) => {
      const updatedIngredients = [...prev.ingredients];
      updatedIngredients.splice(index, 1);
      return {
        ...prev,
        ingredients: updatedIngredients,
      };
    });
  };

  return (
    <>
      <Container>
        <RecipeBar level={50} />
        <div className="title">재료 등록</div>
        <div className="input-box">
          <input
            type="text"
            placeholder="재료를 입력해주세요"
            className="ingre-input"
            ref={ingredRef}
            onKeyDown={handleEnter}
          />
          <button className="ingreAdd" onClick={handleAddIngredient}>
            추가
          </button>
        </div>

        <div className="ingre-box">
          <div className="ingre-title">{recipe.title} 재료 리스트</div>
          {recipe.ingredients.map((data, index) => (
            <div className="ingre-list" key={index}>
              <div className="one-box">
                <div className="ingre-rank">{index + 1}</div>
              </div>
              <div className="two-box">
                <div className="ingre-info">{data}</div>
              </div>
              <div className="three-box">
                <GoXCircle
                  className="goX"
                  onClick={() => handleRemoveIngredient(index)}
                />
              </div>
            </div>
          ))}
        </div>

        <RecipeBtnBar next={"2"} recipe={recipe} />
      </Container>
    </>
  );
}

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  .box-container {
    overflow: auto;
    height: 60vh;
  }

  .ingredient-box {
    display: flex;
  }

  .one-box {
    width: 30%;
    display: flex;
    justify-content: flex-end;
    margin-right: 10px;
  }

  .two-box {
    width: 60%;
    display: flex;
    align-items: center;
  }

  .three-box {
    width: 10%;
    display: flex;
    align-items: center;
  }

  .goX {
    font-size: 1.3rem;
    cursor: pointer;
  }
  .title {
    padding: 10px;
    font-size: 1.2rem;
    font-weight: 700;
    margin: 90px 10px 0px 10px;
  }

  .ingre-box {
    box-shadow: var(--box-shadow);
    background-color: var(--gray-200);
    border-radius: 10px;
    padding: 20px;
    margin: 10px;
  }

  .ingre-title {
    text-align: center;
    font-size: 1.3rem;
    font-weight: 700;
  }

  .ingre-input {
    border-bottom: 1px solid var(--gray-700);
    outline: none;
    padding: 10px;
    margin: 10px;
    width: 50%;
    font-weight: 700;
  }

  .ingre-input::placeholder {
    font-weight: 400;
  }

  .ingreAdd {
    padding: 10px;
    background-color: var(--main-color);
    border-radius: 10px;
  }

  .ingre-list {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  .ingre-rank {
    background-color: var(--sub-color);
    width: 20px;
    height: 20px;
    padding: 5px;
    font-weight: 700;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ingre-info {
    font-weight: 700;
  }

  .input-box {
    text-align: center;
  }
`;
