import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MenuBar from "./../../component/MenuBar";
import MypageSection from "./MypageSection";
import { FaChevronLeft } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { IoMdSettings } from "react-icons/io";
import { useRecoilState } from "recoil";
import { MenuStateAtom } from "../../Recoil/atom";
import { showToast } from "../../services/sweetalert";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, updateProfile, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function MyPage() {
  const profile = localStorage.getItem("profile");
  const nickname = localStorage.getItem("nickname");
  const [menu, setMenu] = useRecoilState(MenuStateAtom);
  const [inserton, setInserton] = useState(false);
  const [image, setImage] = useState(profile);
  const [fireimage, setFireimage] = useState("");
  const navigate = useNavigate();

  // 하단 메뉴바 상태 관리 - useEffect
  useEffect(() => {
    setMenu((prev) => ({
      ...prev,
      mypage: true,
    }));
    return () => {
      setMenu((prev) => ({
        ...prev,
        mypage: false,
      }));
    };
  }, [menu.mypage]);

  // 이미지 url 뽑아오는 함수(encodeFileToBase64)
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImage(reader.result);
        resolve();
      };
    });
  };

  // 로그아웃 함수 - logout
  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("nickname");
        localStorage.removeItem("profile");
        navigate("/Login");
        showToast("success", "로그아웃하였습니다.");
      })
      .catch(() => {
        showToast("error", "로그아웃에 문제가 발생했습니다.");
      });
  };

  // 프로필 이미지 변경 함수 - changeProfile
  const changeProfile = async () => {
    const storagePath = "profile/" + fireimage.name + nickname;
    const storageRef = ref(storage, storagePath);

    try {
      // 이미지 업로드,URL
      const snapshot = await uploadBytes(storageRef, fireimage);
      const url = await getDownloadURL(storageRef);

      // 사용자 프로필 업데이트
      const auth = getAuth();
      await updateProfile(auth.currentUser, { photoURL: url });
      localStorage.setItem("profile", auth.currentUser.photoURL);

      // 성공 토스트 메시지 표시
      showToast("success", "프로필 이미지를 변경했습니다.");

      // 수정버튼 false
      setInserton(false);
    } catch (error) {
      showToast("error", "프로필 이미지를 변경하지 못했습니다.");
    }
  };

  return (
    <Container>
      <div className="header-box">
        <FaChevronLeft onClick={() => navigate(-1)} />
        <FiLogOut onClick={logout} />
      </div>
      <div className="profile-box">
        <div className="profile">
          <img src={image} alt="이미지" className="main-image" />
          {inserton ? (
            <div className="setting">
              <label htmlFor="file-input">
                <IoMdSettings className="setting-icon" />
              </label>
              <input
                type="file"
                id="file-input"
                accept="image/*"
                onChange={(e) => {
                  encodeFileToBase64(e.target.files[0]);
                  setFireimage(e.target.files[0]);
                }}
              />
            </div>
          ) : null}
        </div>
        <div className="user-nickname">{nickname}</div>
        {!inserton ? (
          <button
            className="info-insert-btn"
            onClick={() => setInserton(!inserton)}
          >
            내 정보 수정
          </button>
        ) : (
          <button
            className="info-insert-btn info-check-btn  "
            onClick={changeProfile}
          >
            수정 완료
          </button>
        )}
      </div>
      <MypageSection />
      <MenuBar />
    </Container>
  );
}

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;

  .header-box {
    height: 50px;
    margin: 0 10px;
    font-size: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .profile-box {
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .profile {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    margin-bottom: 20px;
    box-shadow: var(--box-shadow);
    position: relative;
  }

  .user-nickname {
    font-size: 1.7rem;
    font-weight: 700;
    margin-bottom: 10px;
  }

  .info-insert-btn {
    padding: 10px;
    border-radius: 10px;
    background-color: var(--gray-200);
    color: var(--gray-700);
  }

  .info-check-btn {
    color: black;
  }

  .menu-bar {
    display: flex;
    box-shadow: var(--box-shadow);
    justify-content: center;
    margin: 20px;
    border-radius: 10px;
    font-weight: 700;
  }

  .main-image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .menu-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 33%;
    padding: 10px;
    font-weight: 700;
    cursor: pointer;
  }

  .menu-list:nth-child(2) {
    border-left: 1px solid var(--gray-300);
    border-right: 1px solid var(--gray-300);
  }

  .menu-icon {
    font-size: 1.5rem;
    margin-bottom: 5px;
  }

  .setting {
    background-color: var(--gray-200);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* 파일 필드 숨기기 */
  .setting input[type="file"] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  .setting-icon {
    font-size: 1.5rem;
  }
`;
