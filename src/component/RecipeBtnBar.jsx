// 외부 - import
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { doc, updateDoc, collection, addDoc } from "firebase/firestore";

// 내부 - import
import { RecipeAtom } from "../Recoil/atom";
import { alertSweet } from "./../services/sweetalert";
import { db } from "../firebase";
import { userData } from "../Firebase/mypageFn";

export default function RecipeBtnBar({ next }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [recipe, setRecipe] = useRecoilState(RecipeAtom);
  const [page, setPage] = useState("");
  const email = localStorage.getItem("email");

  // 수정 & 작성 페이지 라우터 처리
  useEffect(() => {
    if (next === "1" && id) {
      setPage(`/RecipeWriteTwo/${id}`);
    } else if (next === "2" && id) {
      setPage(`/RecipeWriteThree/${id}`);
    } else {
      setPage(next === "1" ? "/RecipeWriteTwo" : "/RecipeWriteThree");
    }
  }, [next, id]);

  // 레시피 작성
  const createData = async () => {
    const myData = await userData(email);
    setRecipe((prev) => ({
      ...prev,
      writer: {
        nickname: myData.nickname,
        profile: myData.profile,
        email: myData.email,
      },
    }));
    await addDoc(collection(db, "recipe"), recipe)
      .then(() => {
        alertSweet("success", "레시피를 등록했습니다", "성공");
        navigate("/");
        setRecipe(initialRecipe);
      })
      .catch(() => {
        alertSweet("error", "레시피 작성에 오류가 발생했습니다.", "오류");
      });
  };

  // 레시피 수정
  const updataData = async (recipe, id) => {
    await updateDoc(doc(db, "recipe", id), recipe)
      .then(() => {
        navigate(`/RecipeDetail/${id}`);
        alertSweet("success", "레시피를 수정했습니다", "성공");
      })
      .catch(() => {
        alertSweet("error", "레시피 수정에 오류가 발생했습니다.", "오류");
      });
  };

  return (
    <Container>
      <button className="goBack Btn" onClick={() => navigate(-1)}>
        이전
      </button>
      {next === "3" ? (
        id ? (
          <button className="next Btn" onClick={() => updataData(recipe, id)}>
            수정
          </button>
        ) : (
          <button className="next Btn" onClick={createData}>
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

const initialRecipe = {
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
    email: localStorage.getItem("email"),
  },
  see: 0,
};
