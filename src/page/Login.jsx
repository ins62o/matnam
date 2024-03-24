// 외부 - import
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { FcGoogle } from "react-icons/fc";
import { FaX } from "react-icons/fa6";
import { collection, addDoc } from "firebase/firestore";

// 내부 - import
import MenuBar from "../component/MenuBar";
import Logo from "../asset/Logo.webp";
import { MenuStateAtom, usersAtom } from "../Recoil/atom";
import { showToast } from "../services/sweetalert";
import { db } from "../firebase";
import { userData } from "../Firebase/mypageFn";
import { changeMenu } from "./../hooks/action/changeMenu";
import { localLogin } from "../hooks/action/login";

export default function Login() {
  const navigate = useNavigate();
  const [menu, setMenu] = useRecoilState(MenuStateAtom);
  const users = useRecoilValue(usersAtom);
  const idRef = useRef();
  const pwRef = useRef();

  // 엔터키 Keydown 이벤트 적용
  const handleEnter = (e) => {
    if (e.key === "Enter") loginhandle();
  };

  // 메뉴바 상태 관리
  useEffect(() => {
    changeMenu("Login", true, setMenu);
    return () => {
      changeMenu("Login", false, setMenu);
    };
  }, [menu.Login]);

  // 로컬 로그인
  const loginhandle = () => {
    localLogin(idRef, pwRef, navigate, userData);
  };

  // 구글 로그인 처리 함수 - googleLogin
  const googleLogin = async () => {
    //   const auth = getAuth();
    //   const provider = new GoogleAuthProvider();
    //   signInWithPopup(auth, provider).then(async (userCredential) => {
    //     const user = userCredential.user;
    //     const DBUserData = await userData();
    //     const myData = DBUserData.filter((item) => item.email === user.email);
    //     // 나의 회원 테이블이 DB에 있다는 소리
    //     if (DBUserData.some((item) => item.email === user.email)) {
    //       localStorage.setItem("accessToken", user.accessToken);
    //       localStorage.setItem("nickname", myData[0].nickname);
    //       localStorage.setItem("profile", myData[0].profile);
    //       localStorage.setItem("email", myData[0].email);
    //       navigate("/");
    //       showToast("success", `${myData[0].nickname}님 환영합니다.`);
    //     } else {
    //       if (DBUserData.some((item) => item.nickname === user.displayName)) {
    //         const nickname = prompt(
    //           "동일한 닉네임이 있습니다. 다른 닉네임을 적어주세요"
    //         );
    //         if (nickname === null) return false;
    //         await addDoc(collection(db, "users"), {
    //           ...users,
    //           email: user.email,
    //           nickname,
    //           profile: user.photoURL,
    //         });
    //         localStorage.setItem("accessToken", user.accessToken);
    //         localStorage.setItem("nickname", nickname);
    //         localStorage.setItem("profile", user.photoURL);
    //         localStorage.setItem("email", user.email);
    //         navigate("/");
    //         showToast("success", `${nickname}님 환영합니다.`);
    //       } else {
    //         await addDoc(collection(db, "users"), {
    //           ...users,
    //           email: user.email,
    //           nickname: user.displayName,
    //           profile: user.photoURL,
    //         });
    //         localStorage.setItem("accessToken", user.accessToken);
    //         localStorage.setItem("nickname", user.displayName);
    //         localStorage.setItem("profile", user.photoURL);
    //         localStorage.setItem("email", user.email);
    //         navigate("/");
    //         showToast("success", `${user.displayName}님 환영합니다.`);
    //       }
    //     }
    //   });
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
              onKeyDown={handleEnter}
            />
            <input
              type="password"
              className="inputStyle"
              placeholder="비밀번호"
              ref={pwRef}
              onKeyDown={handleEnter}
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
