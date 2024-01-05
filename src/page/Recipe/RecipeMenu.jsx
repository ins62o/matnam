import React from "react";
import styled from "styled-components";
import { IoSearchOutline } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";
import event from "../../asset/event.jpg";
export default function RecipeMenu() {
  return (
    <MenuBox>
      <div className="search-box">
        <div>
          <IoSearchOutline className="search-icon" />
        </div>
        <input
          type="text"
          className="search-input"
          placeholder="오늘은 어떤 요리를 할까요?"
        />
      </div>
      <div className="info-box">
        <div className="info">
          <div className="info-title">
            <div className="title">빠르게</div>
            <div className="info-subtitle">검색하고</div>
          </div>
          <div className="info-icon">🔍</div>
        </div>

        <div className="info">
          <div className="info-title">
            <div className="title">누구나</div>
            <div className="info-subtitle">따라하는</div>
          </div>
          <div className="info-icon">🤗</div>
        </div>

        <div className="info">
          <div className="info-title">
            <div className="title">편리한</div>
            <div className="info-subtitle">레시피</div>
          </div>
          <div className="info-icon">📝</div>
        </div>
      </div>
      <Swiper
        slidesPerView={1}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
      >
        <SwiperSlide>
          <div className="menu-Container">
            <div className="menu-list">
              <div className="menu-box">
                <div className="menu-icon">🥘</div>
                <div className="menu-name">메인반찬</div>
              </div>
              <div className="menu-box">
                <div className="menu-icon">🍳</div>
                <div className="menu-name">밑반찬</div>
              </div>
              <div className="menu-box">
                <div className="menu-icon">🍲</div>
                <div className="menu-name">국·탕</div>
              </div>
              <div className="menu-box">
                <div className="menu-icon">🍚</div>
                <div className="menu-name">밥·죽</div>
              </div>
            </div>
            <div className="menu-list">
              <div className="menu-box">
                <div className="menu-icon">🍤</div>
                <div className="menu-name">튀김</div>
              </div>
              <div className="menu-box">
                <div className="menu-icon">🍜</div>
                <div className="menu-name">면요리</div>
              </div>
              <div className="menu-box">
                <div className="menu-icon">🧉</div>
                <div className="menu-name">양념·소스</div>
              </div>
              <div className="menu-box">
                <div className="menu-icon">🌶️</div>
                <div className="menu-name">김치·젓갈</div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="menu-Container">
            <div className="menu-list">
              <div className="menu-box">
                <div className="menu-icon">🥗</div>
                <div className="menu-name">셀러드</div>
              </div>
              <div className="menu-box">
                <div className="menu-icon">🥖</div>
                <div className="menu-name">빵</div>
              </div>
              <div className="menu-box">
                <div className="menu-icon">🍨</div>
                <div className="menu-name">디저트</div>
              </div>
              <div className="menu-box">
                <div className="menu-icon">🍵</div>
                <div className="menu-name">차·음료</div>
              </div>
            </div>
            <div className="menu-list">
              <div className="menu-box">
                <div className="menu-icon">🍙</div>
                <div className="menu-name">편의점요리</div>
              </div>
              <div className="menu-box">
                <div className="menu-icon">🍺</div>
                <div className="menu-name">술</div>
              </div>
              <div className="menu-box">
                <div className="menu-icon">🍱</div>
                <div className="menu-name">도시락</div>
              </div>
              <div className="menu-box">
                <div className="menu-icon">🍽️</div>
                <div className="menu-name">기타</div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="event-banner">
        <div className="event-titleBox">
          <div className="event-title">
            #나만 아는 편의점 <b className="big">꿀</b> 조합
          </div>
          <div className="event-info">
            편의점 꿀조합 업로드하고 기프티콘 받아가세요!
          </div>
        </div>
      </div>
    </MenuBox>
  );
}

const MenuBox = styled.div`
  margin: 0 10px;

  .search-box {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    background-color: var(--hover-gray);
    border-radius: 10px;
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
    color: var(--dark-gray);
  }

  .info-box {
    display: flex;
    justify-content: center;
    margin-top: 15px;
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

  .swiper {
    margin-top: 15px;
    height: 160px;
    border: 1px solid var(--hover-gray);
    border-radius: 10px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.05), 4px 12px 36px rgba(0, 0, 0, 0.05);
  }

  .swiper-pagination-bullet-active {
    background-color: var(--point-color);
  }

  .menu-Container {
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    height: 80%;
  }

  .menu-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 25%;
  }

  .menu-list {
    display: flex;
    width: 100%;
    height: 50%;
  }

  .menu-icon {
    font-size: 1.5rem;
  }

  .menu-name {
    margin-top: 5px;
    font-weight: 700;
  }

  .event-banner {
    background-image: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)),
      url(${event});
    background-position: center;
    background-size: cover;
    height: 100px;
    border-radius: 10px;
    margin-top: 15px;
  }

  .event-titleBox {
    border-radius: 10px;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

  .event-title {
    font-size: 1.3rem;
    line-height: 1.5;
    color: var(--point-color);
  }

  .big {
    font-size: 1.7rem;
    color: var(--point-color);
  }

  .event-info {
    font-size: 1rem;
    line-height: 1.5;
    color: #fff;
  }
`;
