import React from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { categoryAtom } from "../atom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function RecipeBtnBar({ next }) {
  const navigate = useNavigate();

  const category = useRecoilValue(categoryAtom);
  const data = () => {
    const trueKeys = Object.keys(category).filter(
      (key) => category[key] === true
    );
    if (trueKeys.length > 1) {
      alert("카테고리를 하나만 선택해주세요!");
    } else {
      console.log(trueKeys.join(""));
    }
  };

  return (
    <Container>
      <button className="goBack Btn" onClick={() => navigate(-1)}>
        이전
      </button>
      <Link to={`/${next}`}>
        <button className="next Btn">다음</button>
      </Link>
    </Container>
  );
}

const Container = styled.div`
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
    background-color: var(--dark-gray);
    margin-right: 10px;
  }

  .next {
    background-color: var(--point-color);
  }
`;
