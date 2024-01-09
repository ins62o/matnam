import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LogoBar from "../../component/LogoBar";
import MenuBar from "../../component/MenuBar";
import { MenuStateAtom } from "../../atom";
import { useRecoilState } from "recoil";
import { IoSearchOutline } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";
import Shopbar from "../../component/Shopbar";
export default function ShopHome() {
  const [menu, setMenu] = useRecoilState(MenuStateAtom);

  useEffect(() => {
    setMenu((prev) => ({
      ...prev,
      shop: true,
    }));

    return () => {
      setMenu((prev) => ({
        ...prev,
        shop: false,
      }));
    };
  }, [menu.shop]);
  return (
    <>
      <Container>
        <LogoBar />
        <div className="search-box">
          <div>
            <IoSearchOutline className="search-icon" />
          </div>
          <input
            type="text"
            className="search-input"
            placeholder="필요한 물건들을 검색해보세요."
          />
        </div>
        <div className="ready"> 🚫준비중🚫</div>
      </Container>
      <MenuBar />
    </>
  );
}

const Container = styled.div`
  margin: 0 10px;

  .search-box {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    background-color: var(--hover-gray);
    border-radius: 10px;
  }

  .ready {
    font-size: 2rem;
    height: 30vh;
    display: flex;
    justify-content: center;
    align-items: center;
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

  .swiper {
    margin-top: 15px;
    border-radius: 10px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.05), 4px 12px 36px rgba(0, 0, 0, 0.05);
  }

  .swiper-pagination-bullet-active {
    background-color: var(--point-color);
  }

  .s-box {
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    padding: 20px;
    height: 60%;
  }

  .market-image {
    object-fit: cover;
  }
`;
