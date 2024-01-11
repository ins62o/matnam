import React, { useState, useRef } from "react";
import styled from "styled-components";
import MenuBar from "../component/MenuBar";
import { FaChevronLeft } from "react-icons/fa";
import { Toast } from "../sweetalert";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  // 선언
  const navigate = useNavigate();
  // 회원가입 데이터 Ref
  const nicknameRef = useRef();
  const idRef = useRef();
  const pwRef = useRef();
  const pwcheckRef = useRef();
  // 회원가입 체크
  const checkSignUp = () => {
    if (
      2 > nicknameRef.current.value.length ||
      6 < nicknameRef.current.value.length
    ) {
      nicknameRef.current.focus();
      Toast.fire({
        icon: "error",
        title: "2~6글자 사이로 설정해주세요",
      });
    } else if (!idRef.current.value.includes("@")) {
      idRef.current.focus();
      Toast.fire({
        icon: "error",
        title: "이메일형식으로 적어주세요",
      });
    } else if (pwRef.current.value.length < 6) {
      pwRef.current.focus();
      Toast.fire({
        icon: "error",
        title: "6자 이상의 패스워드를 설정해주세요",
      });
    } else if (pwRef.current.value !== pwcheckRef.current.value) {
      pwcheckRef.current.focus();
      Toast.fire({
        icon: "error",
        title: "패스워드가 일치하지 않습니다",
      });
    } else {
      Toast.fire({
        icon: "success",
        title: "회원가입을 축하합니다.",
      });
      nicknameRef.current.value = "";
      idRef.current.value = "";
      navigate("/Login");
    }
  };

  return (
    <>
      <Container>
        <div className="HeaderBar">
          <FaChevronLeft
            className="goBack-icon"
            onClick={() => {
              navigate(-1);
            }}
          />
        </div>
        <div>
          <h1 className="title">
            쉽고 빠르게 <b className="bold">회원가입</b>
          </h1>
        </div>

        <div className="inputBox">
          <div className="inputTitle">닉네임</div>
          <input
            type="text"
            className="inputStyle"
            ref={nicknameRef}
            placeholder="사용하실 닉네임을 입력해주세요."
          />
          <div className="inputTitle">아이디</div>
          <input
            type="text"
            className="inputStyle"
            ref={idRef}
            placeholder="이메일을 적어주세요."
          />

          <div className="inputTitle">패스워드</div>
          <input
            type="password"
            className="inputStyle"
            ref={pwRef}
            placeholder="패스워드를 적어주세요."
          />

          <div className="inputTitle">패스워드 확인</div>
          <input
            type="password"
            className="inputStyle"
            ref={pwcheckRef}
            placeholder="한번 더 입력해주세요."
          />
        </div>
        <div className="btn-box">
          <button className="OKBtn" onClick={checkSignUp}>
            확인
          </button>
        </div>
        <MenuBar />
      </Container>
    </>
  );
}

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  .HeaderBar {
    height: 50px;
    display: flex;
    align-items: center;
  }

  .goBack-icon {
    margin-left: 10px;
    font-size: 1.2rem;
    width: 30px;
    cursor: pointer;
  }
  .title {
    padding: 40px;
    text-align: center;
    font-size: 1.5rem;
  }

  .bold {
    font-weight: 700;
  }

  .inputTitle {
    width: 310px;
    padding-left: 5px;
  }

  .inputBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 10px 0px 0px;
    font-weight: 700;
  }

  .inputStyle {
    width: 300px;
    height: 10px;
    padding: 15px 10px 10px 5px;
    border: none;
    border-bottom: 1px solid var(--gray-400);
    outline: none;
    transition: all 0.4s ease 0s;
    margin-bottom: 20px;
  }

  .inputStyle::placeholder {
    font-weight: 400;
  }

  .btn-box {
    display: flex;
    justify-content: center;
  }

  .OKBtn {
    display: flex;
    padding: 15px;
    width: 300px;
    justify-content: center;
    border-radius: 10px;
    margin-top: 20px;
    background-color: var(--sub-color);
    color: black;
    font-weight: 700;
  }
`;
