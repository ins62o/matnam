/* eslint-disable */
import React, { useEffect, useRef } from "react";
import MenuBar from "../component/MenuBar";
import styled from "styled-components";
import Logo from "../asset/Logo.png";
import { useNavigate, Link } from "react-router-dom";
import { MenuStateAtom } from "../atom";
import { useRecoilState } from "recoil";
import { Toast } from "../sweetalert";
import { FcGoogle } from "react-icons/fc";
import { showToast } from "../sweetalert";
import { FaX } from "react-icons/fa6";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export default function Login() {
  const [menu, setMenu] = useRecoilState(MenuStateAtom);
  const navigate = useNavigate();
  const idRef = useRef();
  const pwRef = useRef();

  // 하단 메뉴바 상태 관리 - useEffect
  useEffect(() => {
    setMenu((prev) => ({
      ...prev,
      Login: true,
    }));
    return () => {
      setMenu((prev) => ({
        ...prev,
        Login: false,
      }));
    };
  }, [menu.Login]);

  // 로그인 처리 함수 - loginhandle
  const loginhandle = () => {
    const idValue = idRef.current.value;
    const pwValue = pwRef.current.value;

    if (idValue.length === 0) {
      showToast("error", "아이디를 입력하세요", idRef);
    } else if (pwValue.length === 0) {
      showToast("error", "패스워드를 입력하세요", pwRef);
    } else {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, idValue, pwValue)
        .then((userCredential) => {
          const user = userCredential.user;
          localStorage.setItem("accessToken", user.accessToken);
          localStorage.setItem("nickname", user.displayName);
          localStorage.setItem("profile", user.photoURL);
          showToast("success", `${user.displayName} 님 환영합니다.`);
          navigate("/");
        })
        .catch(() => {
          showToast("error", "맛남의 공간 회원이 아닙니다.", idRef);
        });
    }
  };

  // 구글 로그인 처리 함수 - googleLogin
  const googleLogin = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        localStorage.setItem("accessToken", user.accessToken);
        localStorage.setItem("nickname", user.displayName);
        localStorage.setItem("profile", user.photoURL);
        showToast("success", `${user.displayName} 님 환영합니다.`);
        navigate("/");
      })
      .catch(() => {
        showToast("error", "맛남의 공간 회원이 아닙니다.");
      });
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
              ref={idRef}
            />
            <input
              type="password"
              className="inputStyle"
              placeholder="비밀번호"
              ref={pwRef}
            />
            <button className="Login Btn" onClick={loginhandle}>
              로그인
            </button>
            <button className="googleLogin Btn" onClick={googleLogin}>
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
