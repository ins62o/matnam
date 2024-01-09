import React from "react";
import styled from "styled-components";
import MenuBar from "../component/MenuBar";
import LogoBar from "../component/LogoBar";
import { IoSettingsOutline } from "react-icons/io5";

export default function ChatList() {
  return (
    <>
      <LogoBar />
      <ChatBox>
        <div className="title">
          <div>Chat Message</div>
          <div>
            <IoSettingsOutline className="icon" />
          </div>
        </div>
        <div className="chatBox">
          <div className="chat-card">
            <div className="card-image"></div>
            <div className="user-box">
              <div className="user-name">이름</div>
              <div className="user-last">마지막 내용</div>
            </div>
            <div className="time-box">
              <div className="time">13:30</div>
              <div className="notice">1</div>
            </div>
          </div>
        </div>
        <div className="chatBox">
          <div className="chat-card">
            <div className="card-image"></div>
            <div className="user-box">
              <div className="user-name">이름</div>
              <div className="user-last">마지막 내용</div>
            </div>
            <div className="time-box">
              <div className="time">13:30</div>
              <div className="notice">1</div>
            </div>
          </div>
        </div>
        <div className="chatBox">
          <div className="chat-card">
            <div className="card-image"></div>
            <div className="user-box">
              <div className="user-name">이름</div>
              <div className="user-last">마지막 내용</div>
            </div>
            <div className="time-box">
              <div className="time">13:30</div>
              <div className="notice">1</div>
            </div>
          </div>
        </div>
        <div className="chatBox">
          <div className="chat-card">
            <div className="card-image"></div>
            <div className="user-box">
              <div className="user-name">이름</div>
              <div className="user-last">마지막 내용</div>
            </div>
            <div className="time-box">
              <div className="time">13:30</div>
              <div className="notice">1</div>
            </div>
          </div>
        </div>
        <div className="chatBox">
          <div className="chat-card">
            <div className="card-image"></div>
            <div className="user-box">
              <div className="user-name">이름</div>
              <div className="user-last">마지막 내용</div>
            </div>
            <div className="time-box">
              <div className="time">13:30</div>
              <div className="notice">1</div>
            </div>
          </div>
        </div>
        <div className="chatBox">
          <div className="chat-card">
            <div className="card-image"></div>
            <div className="user-box">
              <div className="user-name">이름</div>
              <div className="user-last">마지막 내용</div>
            </div>
            <div className="time-box">
              <div className="time">13:30</div>
              <div className="notice">1</div>
            </div>
          </div>
        </div>
      </ChatBox>
      <MenuBar />
    </>
  );
}

const ChatBox = styled.div`
  margin: 0px 10px;
  padding-bottom: 80px;
  .title {
    padding: 10px;
    font-weight: 700;
    font-size: 1.4rem;
    color: var(--sub-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .chatBox {
    border-radius: 10px;
    padding: 10px;
    position: relative;
  }

  .chat-card {
    border-radius: 10px;
    padding: 10px;
    display: flex;
  }

  .icon {
    font-size: 1.7rem;
  }

  .card-image {
    border: 1px solid var(--dark-gray);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .user-name {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 10px;
  }

  .user-last {
    color: #606060;
  }

  .time-box {
    position: absolute;
    right: 0;
    top: 0;
    margin: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .time {
    margin-bottom: 5px;
  }

  .notice {
    font-weight: 700;
    background-color: red;
    color: #fff;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
