// 외부 - import
import React, { useRef } from "react";
import styled from "styled-components";
import { IoSearchOutline } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Menu from "../../component/Menu";

export default function RecipeMenu() {
  const searchRef = useRef("");
  const navigate = useNavigate();

  // 해당 검색어로 이동 (쿼리스트링 사용)
  const handleSearch = () => {
    const searchTerm = encodeURIComponent(searchRef.current.value);
    navigate(`/recipeFeed?search=${searchTerm}`);
  };

  // 엔터키 Keydown 이벤트 적용
  const handleEnter = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <MenuBox>
      <div className="search-box">
        <div>
          <IoSearchOutline className="search-icon" onClick={handleSearch} />
        </div>
        <input
          type="text"
          className="search-input"
          placeholder="오늘은 어떤 요리를 할까요?"
          ref={searchRef}
          onKeyDown={handleEnter}
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
              <Menu page={"/recipeFeed/2"} icon={"🥘"} title={"메인반찬"} />
              <Menu page={"/recipeFeed/3"} icon={"🍳"} title={"밑반찬"} />
              <Menu page={"/recipeFeed/4"} icon={"🍲"} title={"국·탕"} />
              <Menu page={"/recipeFeed/5"} icon={"🍚"} title={"밥·죽"} />
            </div>
            <div className="menu-list">
              <Menu page={"/recipeFeed/6"} icon={"🍤"} title={"튀김"} />
              <Menu page={"/recipeFeed/7"} icon={"🍜"} title={"면요리"} />
              <Menu page={"/recipeFeed/8"} icon={"🧉"} title={"양념·소스"} />
              <Menu page={"/recipeFeed/9"} icon={"🌶️"} title={"김치·젓갈"} />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="menu-Container">
            <div className="menu-list">
              <Menu page={"/recipeFeed/10"} icon={"🥗"} title={"셀러드"} />
              <Menu page={"/recipeFeed/11"} icon={"🥖"} title={"빵"} />
              <Menu page={"/recipeFeed/12"} icon={"🍨"} title={"디저트"} />
              <Menu page={"/recipeFeed/13"} icon={"🍵"} title={"차·음료"} />
            </div>
            <div className="menu-list">
              <Menu page={"/recipeFeed/14"} icon={"🍙"} title={"편의점요리"} />
              <Menu page={"/recipeFeed/15"} icon={"🍺"} title={"술"} />
              <Menu page={"/recipeFeed/16"} icon={"🍱"} title={"도시락"} />
              <Menu page={"/recipeFeed/17"} icon={"🍽️"} title={"기타"} />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="event-box">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLScVWzGTPwG4yIdGZNKxokd6mP80rwlGa5aX38uCyYqoG3yNOA/viewform"
          target="_blank"
          className="event-banner1"
        >
          <div className="one-box">
            <div>맛남의 공간</div>
            <div>피드백 </div>
          </div>
          <div className="two-box">📬</div>
        </a>
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
    background-color: var(--gray-200);
    border-radius: 10px;
  }

  .search-input::placeholder {
    font-weight: 400;
  }

  .search-input {
    width: 80%;
    height: 100%;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0);
    outline: none;
    padding-left: 7px;
    font-weight: 700;
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

  .event-box {
    display: flex;
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
    background-color: var(--main-color);
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
    text-align: center;
  }

  .menu-name {
    margin-top: 5px;
    font-weight: 700;
    text-align: center;
  }

  .event-banner2 {
    background-color: var(--gray-200);
    width: 50%;
    height: 100px;
    border-radius: 10px;
    margin-top: 10px;
    display: flex;
    font-weight: 700;
    cursor: pointer;
  }

  .event-banner1 {
    background-image: linear-gradient(135deg, #fde5d2 0%, #f0feea 100%);
    width: 100%;
    height: 100px;
    border-radius: 10px;
    margin-top: 10px;
    display: flex;
    font-weight: 700;
  }

  .one-box {
    width: 70%;
    font-size: 1.3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 1.5;
  }

  .two-box {
    width: 30%;
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .big {
    font-size: 1.7rem;
    color: var(--main-color);
  }
`;
