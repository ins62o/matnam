import React from "react";
import styled from "styled-components";

export default function Note({ date, tag, text }) {
  return (
    <Container>
      <div className="info">
        <div className="date">{date}</div>
        <div className="box">
          <div className={`tag2 ${tag}`}>{tag}</div>
          <div className="text">
            <div>{text}</div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .info {
    font-size: 0.9rem;
    padding: 20px;
    border-radius: 10px;
  }

  .date {
    font-size: 1rem;
    margin-bottom: 5px;
  }

  .box {
    display: flex;
    align-items: center;
  }

  .text {
    margin-left: 5px;
    font-size: 1rem;
    line-height: 1.3;
    display: flex;
    align-items: center;
  }

  .tag2 {
    padding: 5px;
    margin: 2px;
    box-shadow: var(--box-shadow);
    border-radius: 7px;
    display: inline-block;
  }

  .NEW {
    color: purple;
  }

  .UPDATE {
    color: green;
  }

  .CHANGED {
    color: var(--sub-color);
  }

  .FIXED {
    color: blue;
  }

  .STOP {
    color: red;
  }
`;
