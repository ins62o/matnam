import React from "react";
import styled from "styled-components";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import MenuBar from "./../../component/MenuBar";
export default function RecipeDetail() {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <div className="top-menu">
          <FaChevronLeft className="goBack-icon" onClick={() => navigate(-1)} />
        </div>
        <div className="recipe-name title">맛좋은 된장국의 레시피</div>
        <div className="user-box">
          <div className="user">
            <div className="profile-image"></div>
            <div>닉네임</div>
          </div>
          <div className="icon-box">
            <FaHeart className="icon-heart" />
            16명
          </div>
        </div>
        <div className="titleBox">
          <div className="title">꿀팁🤫</div>
          <div className="insdel">수정 | 삭제</div>
        </div>
        <div className="cook-tip">
          <div>요리의 TIP을 알려주겠습니다</div>
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
            <div className="image-box"></div>
            <div className="recipe">
              <div className="number">
                <div className="rank">1</div>
              </div>
              <div className="info">떡볶이를 물에 충분히 행궈주세요</div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="image-box"></div>
            <div className="recipe">
              <div className="number">
                <div className="rank">2</div>
              </div>
              <div className="info">떡볶이를 물에 충분히 행궈주세요</div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="image-box"></div>
            <div className="recipe">
              <div className="number">
                <div className="rank">3</div>
              </div>
              <div className="info">떡볶이를 물에 충분히 행궈주세요</div>
            </div>
          </SwiperSlide>
        </Swiper>
        <div>
          <div className="ingredient">재료🪹</div>
          <div className="ing-info">
            <div className="info-box">
              <div className="ing-rank">1</div>
              <div className="ing-what"> 떡볶이떡 250g</div>
            </div>
            <div className="info-box">
              <div className="ing-rank">1</div>
              <div className="ing-what"> 떡볶이떡 250g</div>
            </div>
          </div>
        </div>
        <MenuBar />
      </Container>
    </>
  );
}

const Container = styled.div`
  overflow: auto;
  max-width: 480px;
  margin: 0 auto;
  .top-menu {
    height: 50px;
    display: flex;
    align-items: center;
  }

  .user-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0px 10px 20px 10px;
  }

  .user {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
  }

  .goBack-icon {
    margin-left: 10px;
    font-size: 1.2rem;
    width: 30px;
    cursor: pointer;
  }

  .titleBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .love {
    font-size: 0.9rem;
    font-weight: 700;
  }

  .title {
    font-size: 1.2rem;
    margin: 10px 20px;
    font-weight: 700;
  }

  .profile-image {
    border: 1px solid var(--gray-400);
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin-right: 5px;
  }

  .recipe-name {
    text-align: center;
  }

  .info-box {
    display: flex;
    margin-bottom: 10px;
  }

  .cook-tip {
    margin: 0px 10px;
    border: 1px solid var(--main-color);
    padding: 10px;
    border-radius: 10px;
    font-weight: 700;
  }

  .swiper {
    margin: 10px 10px 0px 10px;
    height: 320px;
    border-radius: 10px;
    box-shadow: var(--box-shadow);
  }

  .image-box {
    border-radius: 10px;
    height: 70%;
  }

  .recipe {
    border-radius: 10px;
    height: 20%;
    display: flex;
    background-color: var(--gray-200);
    box-shadow: var(--box-shadow);
  }

  .number {
    width: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .rank {
    background-color: var(--main-color);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
  }

  .ing-rank {
    background-color: var(--sub-color);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
  }

  .info {
    width: 85%;
    padding: 10px;
    font-weight: 700;
    font-size: 0.9rem;
    overflow: auto;
    line-height: 1.4;
    letter-spacing: 0.8px;
    display: flex;
    align-items: center;
  }

  .recipe-heart {
    margin: 0px 10px;
    font-weight: 700;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }

  .icon {
    width: 30px;
    height: 30px;
  }

  .swiper-pagination-bullet-active {
    background-color: var(--main-color);
  }

  .icon-box {
    display: flex;
    align-items: center;
    font-weight: 700;
  }

  .icon-heart {
    margin-right: 5px;
    color: red;
    width: 20px;
    height: 20px;
  }

  .insdel {
    margin-right: 20px;
    font-weight: 700;
    cursor: pointer;
  }

  .ingredient {
    font-size: 1.2rem;
    margin: 20px;
    font-weight: 700;
  }

  .ing-info {
    margin: 0px 10px;
    margin-bottom: 80px;
    border-radius: 10px;
    background-color: var(--gray-200);
    padding: 10px;
    display: flex;
    flex-direction: column;
  }

  .ing-what {
    width: 85%;
    margin-left: 10px;
    font-weight: 700;
    font-size: 0.9rem;
    line-height: 1.4;
    letter-spacing: 0.8px;
    display: flex;
    align-items: center;
  }
`;
