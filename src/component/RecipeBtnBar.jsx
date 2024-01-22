import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { RecipeAtom, RecipeEditAtom } from "../Recoil/atom";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { createData } from "../Firebase/actionFn";
import { alertSweet } from "./../services/sweetalert";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function RecipeBtnBar({ next }) {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useRecoilState(RecipeAtom);
  const [recipeEdit, setRecipeEdit] = useRecoilState(RecipeEditAtom);
  const [page, setPage] = useState("");
  const { id } = useParams();

  useEffect(() => {
    if (next === "1" && id) {
      setPage(`/RecipeEditTwo/${id}`);
    } else if (next === "2" && id) {
      setPage(`/RecipeEditThree/${id}`);
    } else {
      setPage(next === "1" ? "/RecipeWriteTwo" : "/RecipeWriteThree");
    }
  }, [next]);

  const updataData = async (recipe, id) => {
    try {
      await updateDoc(doc(db, "recipe", id), recipe);
      navigate(`/RecipeDetail/${id}`);
      alertSweet("success", "레시피를 수정했습니다", "성공");
    } catch (e) {
      alertSweet("error", "레시피 수정에 오류가 발생했습니다.", "오류");
    }
  };

  const createRecipe = () => {
    try {
      createData(recipe);
      navigate("/");
      alertSweet("success", "레시피를 등록했습니다", "성공");
      setRecipe({
        title: "",
        categoryName: "",
        ingredients: [],
        cookTip: "",
        cookStep: [{ info: "", imageUrl: "" }],
        date: new Date(),
        heart: [],
        writer: {
          nickname: localStorage.getItem("nickname"),
          profile: localStorage.getItem("profile"),
        },
        see: 0,
      });
    } catch (e) {
      alertSweet("error", "레시피 작성에 오류가 발생했습니다.", "오류");
    }
  };

  return (
    <Container>
      <button className="goBack Btn" onClick={() => navigate(-1)}>
        이전
      </button>
      {next === "3" ? (
        id ? (
          <button
            className="next Btn"
            onClick={() => updataData(recipeEdit, id)}
          >
            수정
          </button>
        ) : (
          <button className="next Btn" onClick={createRecipe}>
            작성
          </button>
        )
      ) : (
        <Link to={page}>
          <button className="next Btn">다음</button>
        </Link>
      )}
    </Container>
  );
}

const Container = styled.div`
  max-width: 480px;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  margin-bottom: 10px;

  .Btn {
    width: 40%;
    padding: 15px;
    border-radius: 10px;
  }

  .goBack {
    background-color: var(--gray-300);
    margin-right: 10px;
  }

  .next {
    background-color: var(--main-color);
  }
`;
