/* eslint-disable */
// 외부 - import
import React, { useEffect } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// 내부 - import
import RecipeBar from "../../component/RecipeBar";
import { RecipeAtom } from "../../Recoil/atom";
import RecipeBtnBar from "../../component/RecipeBtnBar";
import { detailRecipe } from "../../Firebase/firebaseFn";
import Menu from "../../component/Menu";
import Category from "../../component/Category";

export default function RecipeWriteOne() {
  const [recipe, setRecipe] = useRecoilState(RecipeAtom);
  const recipeId = useParams();
  const nickname = localStorage.getItem("nickname");
  const email = localStorage.getItem("email");
  const profile = localStorage.getItem("profile");

  const { data, isLoading } = useQuery({
    queryKey: ["DetailRecipe", recipeId],
    queryFn: () => detailRecipe(recipeId),
  });

  useEffect(() => {
    if (recipeId.id) {
      setRecipe(data);
    } else {
      setRecipe({
        title: "",
        categoryName: "",
        ingredients: [],
        cookTip: "",
        cookStep: [{ info: "", imageUrl: "" }],
        date: new Date(),
        heart: [],
        writer: {
          email,
          nickname,
          profile,
        },
        see: 0,
      });
    }
  }, [recipeId.id]);

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
                  <Category
                    title={"메인반찬"}
                    icon={"🥘"}
                    categoryName={recipe.categoryName}
                  />
                  <Category
                    title={"밑반찬"}
                    icon={"🍳"}
                    categoryName={recipe.categoryName}
                  />
                  <Category
                    title={"국·탕"}
                    icon={"🍲"}
                    categoryName={recipe.categoryName}
                  />
                  <Category
                    title={"밥·죽"}
                    icon={"🍚"}
                    categoryName={recipe.categoryName}
                  />
                </div>
                <div className="menu-list">
                  <Category
                    title={"튀김"}
                    icon={"🍤"}
                    categoryName={recipe.categoryName}
                  />
                  <Category
                    title={"면요리"}
                    icon={"🍜"}
                    categoryName={recipe.categoryName}
                  />
                  <Category
                    title={"양념·소스"}
                    icon={"🧉"}
                    categoryName={recipe.categoryName}
                  />
                  <Category
                    title={"김치·젓갈"}
                    icon={"🌶️"}
                    categoryName={recipe.categoryName}
                  />
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="menu-Container">
                <div className="menu-list">
                  <Category
                    title={"셀러드"}
                    icon={"🥗"}
                    categoryName={recipe.categoryName}
                  />
                  <Category
                    title={"빵"}
                    icon={"🥖"}
                    categoryName={recipe.categoryName}
                  />
                  <Category
                    title={"디저트"}
                    icon={"🍨"}
                    categoryName={recipe.categoryName}
                  />
                  <Category
                    title={"차·음료"}
                    icon={"🍵"}
                    categoryName={recipe.categoryName}
                  />
                </div>
                <div className="menu-list">
                  <Category
                    title={"편의점요리"}
                    icon={"🍙"}
                    categoryName={recipe.categoryName}
                  />
                  <Category
                    title={"술"}
                    icon={"🍺"}
                    categoryName={recipe.categoryName}
                  />
                  <Category
                    title={"도시락"}
                    icon={"🍱"}
                    categoryName={recipe.categoryName}
                  />
                  <Category
                    title={"기타"}
                    icon={"🍽️"}
                    categoryName={recipe.categoryName}
                  />
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
