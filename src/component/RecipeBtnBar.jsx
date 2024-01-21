import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { RecipeAtom } from "../Recoil/atom";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { createData } from "../Firebase/actionFn";
import { alertSweet } from "./../services/sweetalert";

export default function RecipeBtnBar({ next }) {
  const navigate = useNavigate();
  const [recipe, setrecipe] = useRecoilState(RecipeAtom);
  const [page, setPage] = useState("");

  useEffect(() => {
    if (next == "1") setPage("/RecipeWriteTwo");
    if (next == "2") setPage("/RecipeWriteThree");
  }, [next]);

  const createRecipe = () => {
    try {
      createData(recipe);
      navigate("/");
      alertSweet("success", "레시피를 등록했습니다", "성공");
      setrecipe({
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
        <button className="next Btn" onClick={createRecipe}>
          작성
        </button>
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
