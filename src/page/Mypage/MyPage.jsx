import React, { useEffect, useState } from "react";
import LogoBar from "../../component/LogoBar";
import styled from "styled-components";
import MenuBar from "../../component/MenuBar";
import MypageSection from "./MypageSection";
import { MenuStateAtom } from "../../Recoil/atom";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, updateProfile, signOut } from "firebase/auth";
import { showToast } from "../../services/sweetalert";

export default function MyPage() {
  const [menu, setMenu] = useRecoilState(MenuStateAtom);
  const profile = localStorage.getItem("profile");
  const nickname = localStorage.getItem("nickname");
  const [image, setImage] = useState(profile);
  const [fireimage, setFireimage] = useState("");
  const [inserton, setInserton] = useState(false);
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

  // 로그아웃 함수 - logout
  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then((data) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("nickname");
        localStorage.removeItem("profile");
        navigate("/Login");
        showToast("success", "로그아웃하였습니다.");
      })
      .catch((error) => {
        showToast("error", "로그아웃에 문제가 발생했습니다.");
      });
  };

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

  // 프로필 이미지 변경 함수 - changeProfile
  const changeProfile = async () => {
    const storagePath = "profile/" + fireimage.name;
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
    <>
      <LogoBar />
      <Container>
        <div className="user-info-box">
          <div className="profile-box">
            <div className="user-profile">
              <img src={image} alt="프로필" />
              {inserton ? (
                <div className="setting">
                  <label htmlFor="file-input">
                    <IoMdSettings className="set-icon" />
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
          </div>
          <div className="user-name-box">
            <div className="nickname">{nickname}</div>
            <div className="sub-info">한줄소개 vs 팔로잉</div>
            {!inserton ? (
              <button className="insert" onClick={() => setInserton(!inserton)}>
                수정
              </button>
            ) : (
              <button className="insert" onClick={changeProfile}>
                완료
              </button>
            )}

            <button className="logout" onClick={logout}>
              로그아웃
            </button>
          </div>
        </div>
        <MypageSection />
        <MenuBar />
      </Container>
    </>
  );
}

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  margin-top: 10px;

  .user-info-box {
    display: flex;
    box-shadow: var(--box-shadow);
    border-radius: 10px;
    padding: 10px;
    margin: 0px 10px;
  }

  .sub-info {
    padding: 15px;
    font-weight: 700;
  }

  .nickname {
    padding: 15px;
    font-weight: 700;
    font-size: 1.2rem;
  }

  .logout {
    background-color: var(--gray-200);
    padding: 10px;
    border-radius: 10px;
    position: absolute;
    top: 0;
    right: 0;
    box-shadow: var(--box-shadow);
  }

  .insert {
    background-color: var(--gray-200);
    padding: 10px;
    border-radius: 10px;
    position: absolute;
    bottom: 0;
    right: 0;
    box-shadow: var(--box-shadow);
  }

  .profile-box {
    position: relative;
    display: flex;
    justify-content: flex-end;
  }

  .user-profile {
    border: 1px solid var(--gray-300);
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .setting {
    background-color: var(--gray-200);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .user-name-box {
    width: 80%;
    position: relative;
  }

  .setting label {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    font-size: 1.2rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .setting input[type="file"] {
    /* 파일 필드 숨기기 */
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;
