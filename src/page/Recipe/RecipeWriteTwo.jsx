import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import RecipeBar from "../../component/RecipeBar";
import RecipeBtnBar from "./../../component/RecipeBtnBar";

export default function RecipeWriteTwo() {
  const [ingredients, setIngredients] = useState([{ id: 1 }]);
  const downRef = useRef();

  useEffect(() => {
    downRef.current.scrollIntoView({ behavior: "smooth" });
  }, [ingredients]);

  const handleAddIngredient = () => {
    setIngredients((prevIngredients) => [
      ...prevIngredients,
      { id: prevIngredients.length + 1 },
    ]);
  };

  const handleRemoveIngredient = (id) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient.id !== id)
    );
  };

  return (
    <>
      <RecipeBar level={50} />
      <Container>
        <div className="title">재료 등록</div>
        <div className="box-container">
          {ingredients.map((ingredient) => (
            <div key={ingredient.id} className="box">
              <div className="button-box">
                <button
                  className="minus"
                  onClick={() => handleRemoveIngredient(ingredient.id)}
                >
                  -
                </button>
              </div>
              <div className="input-box">
                <input
                  type="text"
                  className="inputStyle what-food"
                  placeholder="재료"
                />
                <input
                  type="text"
                  className="inputStyle cm"
                  placeholder="용량"
                />
              </div>
            </div>
          ))}
          <div ref={downRef}></div>

          <div className="plus">
            <button className="plusbtn" onClick={handleAddIngredient}>
              +
            </button>
          </div>
        </div>
      </Container>
      <RecipeBtnBar next={"RecipeWriteThree"} />
    </>
  );
}

const Container = styled.div`
  .box-container {
    overflow: auto;
    height: 60vh;
  }
  .title {
    margin-top: 30px;
    padding: 10px;
    font-size: 1.1rem;
    font-weight: 700;
  }

  .box {
    height: 35px;
    display: flex;
    margin: 10px 10px 20px 10px;
  }

  .button-box {
    width: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .input-box {
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .minus {
    width: 30px;
    height: 30px;
    border: 1px dashed black;
    border-radius: 50%;
  }

  .inputStyle {
    height: 100%;
    margin-left: 10px;
    border-radius: 10px;
    padding-left: 10px;
    border: 1px solid var(--dark-gray);
    outline: none;
  }

  .what-food {
    width: 70%;
  }

  .cm {
    width: 30%;
  }

  .inputStyle:focus {
    border: 1px solid var(--main-color);
  }

  .plus {
    text-align: center;
  }

  .plusbtn {
    width: 30px;
    height: 30px;
    border: 1px dashed black;
    border-radius: 50%;
  }
`;
