// 외부 - import
import React from "react";
import styled from "styled-components";

export default function BoxSkeleton() {
  return (
    <Container>
      <div>
        <div className="image-box"></div>

        <div className="content-box">
          <div className="tag-name-box">
            <div className="see-box">
              <div className="see-count"></div>
            </div>
          </div>
          <div className="heart-see-box">
            <div className="heart-box">
              <div className="heart-count"></div>
            </div>
            <div className="namebox"></div>
          </div>
          <div className="recipe-title"></div>
          <div className="recipe-btn"> </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  box-shadow: var(--box-shadow);
  border-radius: 10px;
  height: 400px;
  padding: 10px;
  margin-bottom: 20px;

  .content-box {
    height: 200px;
    font-weight: 700;
    margin-top: 10px;
  }

  .tag-name-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 20px;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
  }

  .namebox {
    display: flex;
    align-items: center;
  }

  .tag {
    background-color: var(--main-color);
    padding: 7px;
    border-radius: 10px;
    font-size: 0.9rem;
  }

  .recipe-title {
    font-size: 1.4rem;
    padding: 20px 0px 0px 7px;
  }

  .heart-box {
    display: flex;
  }

  .heart-see-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    width: 100%;
    height: 20px;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
  }

  .heart-count {
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 0.8rem;
  }

  .see-box {
    display: flex;
    font-weight: 700;
    color: var(--gray-700);
  }

  .see-count {
    font-size: 0.9rem;
    margin-left: 2px;
  }

  .recipe-btn {
    border-radius: 10px;
    margin-top: 20px;
    text-align: center;
    width: 100%;
    height: 50px;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
  }
`;
