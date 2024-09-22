// 외부 - import
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { FcGoogle } from "react-icons/fc";
import { FaX } from "react-icons/fa6";

// 내부 - import
import MenuBar from "../component/MenuBar";
import Logo from "../asset/Logo.webp";
import { MenuStateAtom, usersAtom } from "../Recoil/atom";
import { changeMenu } from "./../hooks/action/changeMenu";
import { localLogin, SaveLocalData } from "../hooks/action/loginLocal";
import { DBUserCheck, googleLogin } from "../hooks/action/loginGoogle";
import { CheckValidate } from "../hooks/action/checkSignUp";
import { showToast } from "../services/sweetalert";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export default function Login() {
  const navigate = useNavigate();
  const [menu, setMenu] = useRecoilState(MenuStateAtom);
  const users = useRecoilValue(usersAtom);
  const id = useRef();
  const pw = useRef();

  useEffect(() => {
    changeMenu("Login", true, setMenu);
    return () => {
      changeMenu("Login", false, setMenu);
    };
  }, [menu.Login, setMenu]);

  const handleEnter = (e) => {
    if (e.key === "Enter") localLoginHandle();
  };

  const localLoginHandle = async () => {
    // 1. 로그인 유효성 검사
    CheckValidate(id, pw);

    // 2. 사용자 로그인
    const user = await localLogin(id, pw);

    // 3. 페이지 전환 및 토스트 알림
    if (user) {
      navigate("/");
      showToast("success", `${user.displayName} 님 환영합니다.`);
    }
  };

  const googleLoginhandle = async () => {
    try {
      // 1. 구글 로그인 시도
      const user = await googleLogin();

      // 2. DB 유저 정보 확인
      const IsExisting = await DBUserCheck(user);
      let nickname = user.displayName;

      // 3. 기존 유저가 아니라면 새로운 유저 정보 추가
      if (!IsExisting) {
        await addDoc(collection(db, "users"), {
          ...users,
          email: user.email,
          nickname: user.displayName,
          profile: user.photoURL,
        });
      }

      // 4. 로컬 스토리지 저장, 페이지 이동, 토스트 알림
      await SaveLocalData(user);
      navigate("/");
      showToast("success", `${nickname}님 환영합니다.`);
    } catch (error) {
      console.error("로그인 처리 중 에러 발생:", error);
    }
  };

  return (
    <>
      <Container>
        <div className="HeaderBar">
          <FaX
            className="OutIcon"
            onClick={() => {
              navigate(-1);
            }}
          />
        </div>
        <div className="LoginMainBox">
          <div className="imageBox">
            <img src={Logo} alt="로고" />
          </div>
          <div className="inputBox">
            <input
              type="text"
              className="inputStyle"
              placeholder="아이디"
              ref={id}
              onKeyDown={handleEnter}
            />
            <input
              type="password"
              className="inputStyle"
              placeholder="비밀번호"
              ref={pw}
              onKeyDown={handleEnter}
            />
            <button className="Login Btn" onClick={localLoginHandle}>
              로그인
            </button>
            <button className="googleLogin Btn" onClick={googleLoginhandle}>
              <FcGoogle className="google" />
              구글 로그인
            </button>
            <Link to="/SignUP">
              <div className="signUpInfo"> 맛남의 공간 회원가입</div>
            </Link>
          </div>
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

  .OutIcon {
    font-size: 1.2rem;
    margin-left: 15px;
    cursor: pointer;
  }

  .LoginMainBox {
    height: 100%;
  }

  .imageBox {
    display: flex;
    justify-content: center;
    padding: 40px;
  }

  .inputBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: 700;
  }

  .inputStyle {
    width: 300px;
    height: 20px;
    padding: 10px;
    border: 1px solid var(--gray-400);
    border-radius: 10px;
    outline: none;
    transition: all 0.4s ease 0s;
    margin-bottom: 10px;
  }

  .Btn {
    padding: 15px;
    border: none;
    border-radius: 10px;
    width: 322px;
    margin: 10px;
    color: black;
  }
  .Login {
    background-color: var(--main-color);
  }

  .googleLogin {
    background-color: var(--gray-300);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .google {
    width: 30px;
  }

  .signUpInfo {
    margin: 15px;
    font-weight: 700;
    color: var(--gray-900);
  }
`;
