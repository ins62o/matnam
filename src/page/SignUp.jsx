// 외부 - import
import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { useRecoilState } from "recoil";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

// 내부 - import
import MenuBar from "../component/MenuBar";
import { showToast } from "../services/sweetalert";
import { usersAtom } from "../Recoil/atom";
import { db } from "../firebase";
import { userData } from "../Firebase/mypageFn";

export default function SignUp() {
  const navigate = useNavigate();
  const nicknameRef = useRef();
  const idRef = useRef();
  const pwRef = useRef();
  const pwcheckRef = useRef();
  const [users, setUsers] = useRecoilState(usersAtom);

  useEffect(() => {
    return () => {
      setUsers({
        email: "",
        nickname: "",
        profile:
          "https://s3.ap-northeast-2.amazonaws.com/matnam.me/LogoIcon.png",
        following: [],
        followers: [],
      });
    };
  }, []);

  // 엔터키 Keydown 이벤트 적용
  const handleEnter = (e) => {
    if (e.key === "Enter") checkSignUp();
  };

  const checkSignUp = async () => {
    const nicknameLength = nicknameRef.current.value.length;
    const idValue = idRef.current.value;
    const pwValue = pwRef.current.value;
    const pwCheckValue = pwcheckRef.current.value;

    if (nicknameLength < 2 || nicknameLength > 6) {
      showToast("error", "2~6글자 사이로 설정해주세요", nicknameRef);
    } else if (!idValue.includes("@")) {
      showToast("error", "이메일 형식으로 적어주세요", idRef);
    } else if (pwValue.length < 6) {
      showToast("error", "6자 이상의 패스워드를 설정해주세요", pwRef);
    } else if (pwValue !== pwCheckValue) {
      showToast("error", "패스워드가 일치하지 않습니다", pwcheckRef);
    } else {
      try {
        const auth = getAuth();
        const newNickname = nicknameRef.current.value;
        const usersdata = await userData();
        if (
          usersdata.some((item) => item.nickname === nicknameRef.current.value)
        ) {
          showToast("error", "닉네임이 사용중입니다.", nicknameRef);
          nicknameRef.current.focus();
        } else {
          // users 아톰 상태 변경
          setUsers((prev) => ({
            ...prev,
            nickname: newNickname,
          }));

          // 파이어베이스 회원가입
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            idValue,
            pwValue
          );
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: nicknameRef.current.value,
          });

          // 새로운 users 정보 문서 생성
          await addDoc(collection(db, "users"), {
            ...users,
            email: idValue,
            nickname: newNickname,
          });

          nicknameRef.current.value = "";
          idRef.current.value = "";
          showToast("success", "회원가입을 축하합니다.");
          navigate("/Login");
        }
      } catch (err) {
        showToast("error", "이미 존재하는 아이디입니다.", idRef);
      }
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
    background-color: var(--main-color);
    color: black;
    font-weight: 700;
  }
`;
