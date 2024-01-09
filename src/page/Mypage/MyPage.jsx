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
      </Container>
      <MypageSection />
      <MenuBar />
    </>
  );
}

const Container = styled.div`
  margin: 0px 10px;
  display: flex;
  justify-content: center;
  .user-info-box {
    display: flex;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.05), 4px 12px 36px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    padding: 10px 10px 20px 10px;
    width: 500px;
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
    background-color: var(--hover-gray);
    padding: 10px;
    border-radius: 10px;
    position: absolute;
    top: 0;
    right: 0;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.05), 4px 12px 36px rgba(0, 0, 0, 0.05);
  }

  .profile-box {
    width: 30%;
    position: relative;
    display: flex;
    justify-content: flex-end;
  }

  .user-profile {
    border: 1px solid black;
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .setting {
    border: 1px solid black;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    position: absolute;
    right: 0;
    bottom: 0;
  }

  .user-name-box {
    width: 70%;
    position: relative;
  }
`;
