// 외부 - import
import React, { useEffect } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// 내부 - import
import RecipeBar from "../../component/RecipeBar";
import { RecipeEditAtom } from "../../Recoil/atom";
import { detailRecipe } from "../../Firebase/firebaseFn";
import RecipeBtnBar from "../../component/RecipeBtnBar";
import Loading from "./../Loading";

export default function RecipeEditOne() {
  const [recipe, setRecipe] = useRecoilState(RecipeEditAtom);
  const recipeId = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["DetailRecipe", recipeId],
    queryFn: () => detailRecipe(recipeId),
  });

  useEffect(() => {
    if (recipeId.id) setRecipe(data);
  }, [recipeId]);

  if (isLoading)
    return (
      <>
        <Loading />
      </>
    );

  const handleMenuClick = (categoryName) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      categoryName,
    }));
  };

  return (
    <>
      <Container>
        <RecipeBar level={10} />
        <div className="recipe-nameBox">
          <div className="title"> 레시피 이름</div>
          <div className="input-box">
            <input
              type="text"
              className="recipeInput"
              placeholder="소개 할 레시피의 이름은 무엇인가요?"
              defaultValue={data?.title}
              onChange={(e) =>
                setRecipe((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <div className="recipe-catagroy">
          <div className="title"> 카테고리</div>
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
                  <div
                    className={
                      recipe?.categoryName == "메인반찬"
                        ? "Onmenu-box"
                        : "menu-box"
                    }
                    onClick={() => handleMenuClick("메인반찬")}
                  >
                    <div className="menu-icon">🥘</div>
                    <div className="menu-name">메인반찬</div>
                  </div>
                  <div
                    className={
                      recipe?.categoryName == "밑반찬"
                        ? "Onmenu-box"
                        : "menu-box"
                    }
                    onClick={() => handleMenuClick("밑반찬")}
                  >
                    <div className="menu-icon">🍳</div>
                    <div className="menu-name">밑반찬</div>
                  </div>
                  <div
                    className={
                      recipe?.categoryName == "국·탕"
                        ? "Onmenu-box"
                        : "menu-box"
                    }
                    onClick={() => handleMenuClick("국·탕")}
                  >
                    <div className="menu-icon">🍲</div>
                    <div className="menu-name">국·탕</div>
                  </div>
                  <div
                    className={
                      recipe?.categoryName == "밥·죽"
                        ? "Onmenu-box"
                        : "menu-box"
                    }
                    onClick={() => handleMenuClick("밥·죽")}
                  >
                    <div className="menu-icon">🍚</div>
                    <div className="menu-name">밥·죽</div>
                  </div>
                </div>
                <div className="menu-list">
                  <div
                    className={
                      recipe?.categoryName == "튀김" ? "Onmenu-box" : "menu-box"
                    }
                    onClick={() => handleMenuClick("튀김")}
                  >
                    <div className="menu-icon">🍤</div>
                    <div className="menu-name">튀김</div>
                  </div>
                  <div
                    className={
                      recipe?.categoryName == "면요리"
                        ? "Onmenu-box"
                        : "menu-box"
                    }
                    onClick={() => handleMenuClick("면요리")}
                  >
                    <div className="menu-icon">🍜</div>
                    <div className="menu-name">면요리</div>
                  </div>
                  <div
                    className={
                      recipe?.categoryName == "양념·소스"
                        ? "Onmenu-box"
                        : "menu-box"
                    }
                    onClick={() => handleMenuClick("양념·소스")}
                  >
                    <div className="menu-icon">🧉</div>
                    <div className="menu-name">양념·소스</div>
                  </div>
                  <div
                    className={
                      recipe?.categoryName == "김치·젓갈"
                        ? "Onmenu-box"
                        : "menu-box"
                    }
                    onClick={() => handleMenuClick("김치·젓갈")}
                  >
                    <div className="menu-icon">🌶️</div>
                    <div className="menu-name">김치·젓갈</div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="menu-Container">
                <div className="menu-list">
                  <div
                    className={
                      recipe?.categoryName == "셀러드"
                        ? "Onmenu-box"
                        : "menu-box"
                    }
                    onClick={() => handleMenuClick("셀러드")}
                  >
                    <div className="menu-icon">🥗</div>
                    <div className="menu-name">셀러드</div>
                  </div>
                  <div
                    className={
                      recipe?.categoryName == "빵" ? "Onmenu-box" : "menu-box"
                    }
                    onClick={() => handleMenuClick("빵")}
                  >
                    <div className="menu-icon">🥖</div>
                    <div className="menu-name">빵</div>
                  </div>
                  <div
                    className={
                      recipe?.categoryName == "디저트"
                        ? "Onmenu-box"
                        : "menu-box"
                    }
                    onClick={() => handleMenuClick("디저트")}
                  >
                    <div className="menu-icon">🍨</div>
                    <div className="menu-name">디저트</div>
                  </div>
                  <div
                    className={
                      recipe?.categoryName == "차·음료"
                        ? "Onmenu-box"
                        : "menu-box"
                    }
                    onClick={() => handleMenuClick("차·음료")}
                  >
                    <div className="menu-icon">🍵</div>
                    <div className="menu-name">차·음료</div>
                  </div>
                </div>
                <div className="menu-list">
                  <div
                    className={
                      recipe?.categoryName == "편의점요리"
                        ? "Onmenu-box"
                        : "menu-box"
                    }
                    onClick={() => handleMenuClick("편의점요리")}
                  >
                    <div className="menu-icon">🍙</div>
                    <div className="menu-name">편의점요리</div>
                  </div>
                  <div
                    className={
                      recipe?.categoryName == "술" ? "Onmenu-box" : "menu-box"
                    }
                    onClick={() => handleMenuClick("술")}
                  >
                    <div className="menu-icon">🍺</div>
                    <div className="menu-name">술</div>
                  </div>
                  <div
                    className={
                      recipe?.categoryName == "도시락"
                        ? "Onmenu-box"
                        : "menu-box"
                    }
                    onClick={() => handleMenuClick("도시락")}
                  >
                    <div className="menu-icon">🍱</div>
                    <div className="menu-name">도시락</div>
                  </div>
                  <div
                    className={
                      recipe?.categoryName == "기타" ? "Onmenu-box" : "menu-box"
                    }
                    onClick={() => handleMenuClick("기타")}
                  >
                    <div className="menu-icon">🍽️</div>
                    <div className="menu-name">기타</div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <RecipeBtnBar next={"1"} />
      </Container>
    </>
  );
}

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  .title {
    padding: 10px 0px;
    font-size: 1.2rem;
    font-weight: 700;
  }

  .recipe-nameBox {
    margin: 90px 10px 0px 10px;
  }

  .recipeInput {
    border-bottom: 1px solid var(--gray-400);
    padding: 10px 0px 10px 5px;
    outline: none;
    margin-top: 10px;
    width: 100%;
    font-weight: 700;
  }

  .recipeInput::placeholder {
    font-weight: 400;
  }

  .recipe-catagroy {
    margin: 30px 10px;
  }

  .swiper {
    margin-top: 15px;
    height: 200px;
    border-radius: 10px;
  }

  .swiper-pagination-bullet-active {
    background-color: var(--main-color);
  }

  .menu-Container {
    border-radius: 10px;
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
    border: 1px solid var(--gray-400);
    margin: 5px;
    border-radius: 10px;
    cursor: pointer;
  }

  .Onmenu-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 25%;
    border: 1px solid var(--gray-400);
    margin: 5px;
    border-radius: 10px;
    background-color: var(--gray-400);
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
`;
