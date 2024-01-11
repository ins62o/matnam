import React from "react";
import styled from "styled-components";
import MenuBar from "../component/MenuBar";
import LogoBar from "../component/LogoBar";
import { IoSettingsOutline } from "react-icons/io5";
import { FaChevronLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function ChatList() {
  const navigate = useNavigate();

  return (
    <>
      <ChatBox>
        <div className="HeaderBar">
          <FaChevronLeft
            className="goBack-icon"
            onClick={() => {
              navigate(-1);
            }}
          />
          <div className="title">
            <div>인성님의 채팅방</div>
          </div>
          <div>
            <IoSettingsOutline className="icon" />
          </div>
        </div>
        <div className="chat-container">
          <Link to="/chatroom">
            <div className="chatBox">
              <div className="chat-card">
                <div className="card-image"></div>
                <div className="user-box">
                  <div className="user-name">이름</div>
                  <div className="user-last">마지막 내용</div>
                </div>
                <div className="time-box">
                  <div className="time">13:30</div>
                  <div className="message-count">1</div>
                </div>
              </div>
            </div>
          </Link>

          <div className="chatBox">
            <div className="chat-card">
              <div className="card-image"></div>
              <div className="user-box">
                <div className="user-name">이름</div>
                <div className="user-last">마지막 내용</div>
              </div>
              <div className="time-box">
                <div className="time">13:30</div>
                <div className="message-count">1</div>
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
                <div className="message-count">1</div>
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
                <div className="message-count">1</div>
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
                <div className="message-count">1</div>
              </div>
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

  .HeaderBar {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .goBack-icon {
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
    font-size: 1.4rem;
    width: 30px;
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

  .time {
    position: absolute;
    right: 0;
    margin: 10px;
    top: 0;
    font-weight: 700;
  }

  .message-count {
    position: absolute;
    right: 0;
    margin: 10px;
    bottom: 0;
    font-weight: 700;
    background-color: var(--main-color);
    padding: 5px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .chat-container {
    background-color: var(--hover-gray);
    border-radius: 10px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.05), 4px 12px 36px rgba(0, 0, 0, 0.05);
  }
`;
