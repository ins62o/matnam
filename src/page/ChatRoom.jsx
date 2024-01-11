import React from "react";
import styled from "styled-components";
import MenuBar from "../component/MenuBar";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { FaArrowUp } from "react-icons/fa";
export default function ChatRoom() {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <div className="HeaderBar">
          <FaChevronLeft
            className="icon"
            onClick={() => {
              navigate(-1);
            }}
          />
          <div className="title">
            <div>닉네임</div>
          </div>
          <div>
            <CiLogout className="icon" />
          </div>
        </div>
        <div className="chat-room">
          <div className="my-chat">
            <div className="my-chatmessage">안녕하세요</div>
            <div className="time">23:30</div>
          </div>
          <div className="search-box">
            <div>
              <FaArrowUp className="search-icon" />
            </div>
            <input
              type="text"
              className="search-input"
              placeholder="메시지를 입력하세요."
            />
          </div>
        </div>
      </Container>

      <MenuBar />
    </>
  );
}

const Container = styled.div`
  height: 90vh;
  .HeaderBar {
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .icon {
    font-size: 1.2rem;
    width: 30px;
  }

  .title {
    padding: 10px;
    font-weight: 700;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
  }

  .chat-room {
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.05), 4px 12px 36px rgba(0, 0, 0, 0.05);
    margin: 0 10px;
    height: 90%;
    position: relative;
  }

  .search-box {
    display: flex;
    align-items: center;
    height: 40px;
    background-color: var(--hover-gray);
    border-radius: 10px;
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  .you-profile {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid var(--dark-gray);
  }

  .search-input {
    width: 80%;
    height: 100%;
    background-color: var(--hover-gray);
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0);
    outline: none;
    padding-left: 7px;
  }

  .search-icon {
    font-size: 1.3rem;
    margin-left: 7px;
    color: var(--main-color);
  }

  .one-box {
    display: flex;
    justify-content: center;
    margin-right: 10px;
  }

  .two-box {
    width: 80%;
  }

  .three-box {
    display: flex;
  }

  .time {
    display: flex;
    align-items: flex-end;
  }

  .youchat {
    display: flex;
    padding-top: 10px;
  }

  .my-chat {
    display: flex;
    padding-top: 10px;
    flex-direction: row-reverse;
  }

  .you-nickname {
    font-weight: 700;
    margin-bottom: 5px;
  }

  .you-chatmessage {
    padding: 20px;
    border-radius: 0px 30px 30px 30px;
    background-color: var(--hover-gray);
    display: inline-block;
    line-height: 1.2;
    letter-spacing: 1px;
  }

  .my-chatmessage {
    padding: 20px;
    border-radius: 30px 0px 30px 30px;
    background-color: var(--main-color);
    font-weight: 700;
    display: inline-block;
    line-height: 1.2;
    letter-spacing: 1px;
  }
`;
