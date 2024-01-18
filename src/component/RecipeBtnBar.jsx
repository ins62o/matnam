import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilValue, useRecoilCallback } from "recoil";
import { categoryAtom, RecipeAtom } from "../Recoil/atom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { alertSweet } from "../services/sweetalert";

export default function RecipeBtnBar({ next }) {
  const navigate = useNavigate();
  const category = useRecoilValue(categoryAtom);
  const recipe = useRecoilValue(RecipeAtom);
  const [page, setPage] = useState("");
  const currentDate = new Date();
  const formattedDate = `${String(currentDate.getFullYear()).slice(
    -2
  )}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(
    currentDate.getDate()
  ).padStart(2, "0")} ${String(currentDate.getHours()).padStart(
    2,
    "0"
  )}:${String(currentDate.getMinutes()).padStart(2, "0")}`;

  useEffect(() => {
    if (next == "1") setPage("/RecipeWriteTwo");
    if (next == "2") setPage("/RecipeWriteThree");
  }, [next]);

  const createData = useRecoilCallback(({ snapshot, set }) => async () => {
    try {
      const docRef = await addDoc(collection(db, "recipe"), recipe);
      const updatedData = {
        id: docRef.id,
        date: formattedDate,
      };
      await updateDoc(docRef, updatedData);

      // Recoil 상태 초기화
      await snapshot.retain();
      await set(categoryAtom, {});
      await set(RecipeAtom, {
        title: "",
        categoryName: "",
        ingredients: [],
        cookTip: "",
        cookStep: [],
        heart: {
          count: 0,
          heartState: false,
        },
        writer: {
          nickname: localStorage.getItem("nickname"),
          profile: localStorage.getItem("profile"),
        },
        see: 0,
      });

      alertSweet("success", "레시피를 등록했습니다", "성공");
      navigate("/");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  });

  return (
    <Container>
      <button className="goBack Btn" onClick={() => navigate(-1)}>
        이전
      </button>
      {next === "3" ? (
        <button className="next Btn" onClick={createData}>
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
