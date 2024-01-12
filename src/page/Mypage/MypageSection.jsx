import React, { useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import RecipeCard from "../../component/RecipeCard";
import { Link } from "react-router-dom";

export default function MypageSection() {
  const [swiper, setSwiper] = useState();
  const [menu, setMenu] = useState({
    recipe: false,
    shop: false,
    like: false,
  });
  const moveSwiper = (index, menu) => {
    swiper.slideTo(index, 1000, false);
    setMenu((prevMenu) => {
      const newMenu = { ...prevMenu };

      // 클릭된 메뉴는 true로 설정하고, 다른 모든 메뉴는 false로 설정
      Object.keys(newMenu).forEach((key) => {
        newMenu[key] = key === menu;
      });

      return newMenu;
    });
  };

  const changeSwiper = (index) => {
    if (index === 0) {
      setMenu({
        recipe: true,
        shop: false,
        like: false,
      });
    } else if (index === 1) {
      setMenu({
        recipe: false,
        shop: true,
        like: false,
      });
    } else {
      setMenu({
        recipe: false,
        shop: false,
        like: true,
      });
    }
  };
  return (
    <>
      <Container>
        <div className="menuBar">
          <div
            className={menu.recipe ? "check-menu menu" : "menu"}
            onClick={() => moveSwiper(0, "recipe")}
          >
            <div className="icon">📖</div>
            <div className="menu-name">레시피</div>
          </div>

          <div
            className={menu.shop ? "check-menu menu" : "menu"}
            onClick={() => moveSwiper(1, "shop")}
          >
            <div className="icon">🛒</div>
            <div className="menu-name">쇼핑</div>
          </div>

          <div
            className={menu.like ? "check-menu menu" : "menu"}
            onClick={() => moveSwiper(2, "like")}
          >
            <div className="icon">😍</div>
            <div className="menu-name">좋아요</div>
          </div>
          <Link to="/chatList" className="menu">
            <div>
              <div className="icon">💌</div>
              <div className="menu-name">채팅</div>
            </div>
          </Link>
        </div>
        <Swiper
          slidesPerView={1}
          onSwiper={(swiper) => setSwiper(swiper)}
          onSlideChange={(swiper) => changeSwiper(swiper.activeIndex)}
        >
          <SwiperSlide className="auto">
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
          </SwiperSlide>
          <SwiperSlide>2</SwiperSlide>
          <SwiperSlide className="auto">
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
          </SwiperSlide>
        </Swiper>
      </Container>
    </>
  );
}

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  height: 65vh;
  .menuBar {
    margin: 10px 0px;
    border-radius: 10px;
    box-shadow: var(--box-shadow);
    display: flex;
    height: 15%;
    margin: 10px;
  }

  .menu {
    box-shadow: var(--box-shadow);
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    font-weight: 700;
    cursor: pointer;
  }

  .check-menu {
    background-color: var(--gray-300);
    border-radius: 10px;
  }

  .icon {
    font-size: 1.2rem;
    margin-bottom: 3px;
  }

  .swiper {
    border-radius: 10px;
    box-shadow: var(--box-shadow);
    margin: 10px;
    height: 70%;
  }

  .auto {
    overflow: auto;
  }
`;
