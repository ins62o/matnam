// 외부 - import
import React from "react";
import styled from "styled-components";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// 내부 - import
import MenuBar from "../component/MenuBar";
import Note from "../component/Note";

export default function ReleaseNote() {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="HeaderBar">
        <FaChevronLeft className="goBack-icon" onClick={() => navigate(-1)} />
      </div>

      <div className="title">패치노트</div>
      <div className="tags">
        <div className="flex-box">
          <div className="tag new">NEW(신규)</div>
          <div className="tag feature">UPDATE(기능)</div>
        </div>

        <div className="tags-two">
          <div className="tag changed">CHANGED(변경)</div>
          <div className="tag fixed">FIXED(수정)</div>
          <div className="tag stop">STOP(중단)</div>
        </div>
      </div>

      {/* Note 사용법 : date(날짜), tag(태그),text(문구) */}
      <div className="scroll-box">
        <Note
          date="2024.02.04"
          tag="NEW"
          text={`맛남의 공간 서비스가 오픈되었어요`}
        />
      </div>

      <MenuBar />
    </Container>
  );
}

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  font-weight: 700;

  .HeaderBar {
    height: 50px;
    display: flex;
    align-items: center;
  }

  .flex-box {
    display: flex;
    justify-content: center;
  }

  .goBack-icon {
    margin-left: 10px;
    font-size: 1.2rem;
    width: 30px;
    cursor: pointer;
  }

  .tags {
    font-size: 0.9rem;
    font-weight: 700;
    margin: 30px 20px 0px 20px;
    text-align: center;
    height: 100px;
    display: flex;
    flex-direction: column;
  }

  .tags-two {
    margin-top: 10px;
    border-radius: 7px;
    display: flex;
    justify-content: center;
  }

  .tag {
    padding: 5px;
    margin: 2px;
    box-shadow: var(--box-shadow);
    border-radius: 7px;
    display: inline-block;
  }

  .new {
    color: purple;
  }

  .feature {
    color: green;
  }

  .changed {
    color: var(--sub-color);
  }

  .fixed {
    color: blue;
  }

  .stop {
    color: red;
  }

  .title {
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
  }

  .scroll-box {
    box-shadow: var(--box-shadow);
  }
`;
