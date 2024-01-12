import React from "react";
import LogoBar from "../../component/LogoBar";
import styled from "styled-components";
import MenuBar from "../../component/MenuBar";
import MypageSection from "./MypageSection";

export default function MyPage() {
  return (
    <>
      <LogoBar />
      <Container>
        <div className="user-info-box">
          <div className="profile-box">
            <div className="user-profile">
              <div className="setting"></div>
            </div>
          </div>
          <div className="user-name-box">
            <div className="nickname">요리고수</div>
            <div className="sub-info">한줄소개 vs 팔로잉</div>
            <button className="logout">로그아웃</button>
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
  }

  .setting {
    border: 1px solid var(--gray-300);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    position: absolute;
    right: 0;
    bottom: 0;
  }

  .user-name-box {
    width: 80%;
    position: relative;
  }
`;
