// 외부 - import
import React, { useRef } from "react";
import styled from "styled-components";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

// 내부 - import
import MenuBar from "../component/MenuBar";
import { usersAtom } from "../Recoil/atom";
import { checkSignup } from "../hooks/action/checkSignUp";

export default function SignUp() {
  const [users, setUsers] = useRecoilState(usersAtom);
  const navigate = useNavigate();
  const idRef = useRef();
  const pwRef = useRef();
  const pwcheckRef = useRef();
  const nicknameRef = useRef();

  // 엔터키 Keydown 이벤트 적용
  const handleEnter = (e) => {
    if (e.key === "Enter") SignUphandle();
  };

  // 유저 회원가입
  const SignUphandle = () => {
    checkSignup(
      idRef,
      pwRef,
      pwcheckRef,
      nicknameRef,
      navigate,
      users,
      setUsers
    );
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
            onKeyDown={handleEnter}
          />
          <div className="inputTitle">아이디</div>
          <input
            type="text"
            className="inputStyle"
            ref={idRef}
            placeholder="이메일을 적어주세요."
            onKeyDown={handleEnter}
          />

          <div className="inputTitle">패스워드</div>
          <input
            type="password"
            className="inputStyle"
            ref={pwRef}
            placeholder="패스워드를 적어주세요."
            onKeyDown={handleEnter}
          />

          <div className="inputTitle">패스워드 확인</div>
          <input
            type="password"
            className="inputStyle"
            ref={pwcheckRef}
            placeholder="한번 더 입력해주세요."
            onKeyDown={handleEnter}
          />
        </div>
        <div className="btn-box">
          <button className="OKBtn" onClick={SignUphandle}>
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
    background-color: var(--main-color);
    color: black;
    font-weight: 700;
  }
`;
