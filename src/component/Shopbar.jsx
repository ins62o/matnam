import React from "react";
import styled from "styled-components";

export default function Shopbar() {
  return (
    <Container>
      <div className="info-box">
        <div className="info  one">
          <div className="info-title">
            <div className="title">판매</div>
          </div>
        </div>

        <div className="info">
          <div className="info-title two">
            <div className="title">교환</div>
          </div>
        </div>

        <div className="info">
          <div className="info-title three">
            <div className="title">나눔</div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  margin-bottom: 40px;
  .info-box {
    display: flex;
    justify-content: center;
  }

  .info {
    width: 30%;
    padding: 10px;
    margin-right: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--hover-gray);
    border-radius: 10px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.05), 4px 12px 36px rgba(0, 0, 0, 0.05);
  }

  .info-title {
    display: flex;
    flex-direction: column;
  }

  .title {
    font-weight: 700;
  }

  .info-subtitle {
    margin-top: 5px;
    font-size: 0.8rem;
    color: gray;
  }

  .info-icon {
    display: flex;
    font-size: 1.4rem;
    margin-left: 5px;
  }

  .one {
    background-color: var(--point-color);
  }
`;
