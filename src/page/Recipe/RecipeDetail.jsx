import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import MenuBar from "./../../component/MenuBar";
import { FaRegEye } from "react-icons/fa";
import Loading from "../Loading";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { IncraseSee, IncreaseHeart } from "../../Firebase/actionFn";
import { detailRecipe } from "../../Firebase/firebaseFn";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { alertSweet } from "../../services/sweetalert";

export default function RecipeDetail() {
  const navigate = useNavigate();
  const recipeId = useParams();
  const queryClient = useQueryClient();
  const email = localStorage.getItem("email");

  useEffect(() => {
    SeeMutation.mutate({ recipeId, email });
  }, []);

  const { error, isLoading, data } = useQuery({
    queryKey: ["DetailRecipe", recipeId],
    queryFn: () => detailRecipe(recipeId),
  });

  const SeeMutation = useMutation({
    mutationFn: IncraseSee,
    onSuccess: () => {
      queryClient.invalidateQueries(["DetailRecipe", recipeId]);
    },
  });

  const HeartMutation = useMutation({
    mutationFn: IncreaseHeart,
    onSuccess: () => {
      queryClient.invalidateQueries(["DetailRecipe", recipeId]);
    },
    onMutate: async () => {
      await queryClient.cancelQueries(["DetailRecipe", recipeId]);
      const prevData = queryClient.getQueryData(["DetailRecipe", recipeId]);
      queryClient.setQueryData(["DetailRecipe", recipeId], (old) => {
        const heart = old.heart.filter((user) => user !== email);
        return old.heart.includes(email)
          ? { ...old, heart }
          : { ...old, heart: [...old.heart, email] };
      });
      return prevData;
    },
    onError: (err, variales, prevData) => {
      queryClient.setQueryData(["DetailRecipe", recipeId], prevData);
    },
  });

  if (isLoading) return <Loading />;
  if (error) return <p>{error}</p>;

  const deleteRecipe = async (id) => {
    await deleteDoc(doc(db, "recipe", id))
      .then(() => {
        navigate(`/`);
        alertSweet("success", "레시피를 삭제했습니다", "성공");
      })
      .catch(() => {
        alertSweet("error", "레시피를 삭제하지 못했어요.", "오류");
      });
  };

  return (
    <>
      <Container>
        <div className="top-menu">
          <FaChevronLeft className="goBack-icon" onClick={() => navigate(-1)} />
        </div>
        <div>
          <div className="recipe-name title">{data.title}의 레시피</div>
          <div className="see-box">
            <div>
              <FaRegEye />
            </div>
            <div className="see-count">{data.see}</div>
          </div>
        </div>
        <div className="user-box">
          <Link
            to={`/mypage/${data.writer.nickname}?email=${data.writer.email}`}
          >
            <div className="user">
              <div className="profile-image">
                <img
                  src={data.writer.profile}
                  alt="프로필"
                  className="user-profile"
                />
              </div>
              <div>{data.writer.nickname}</div>
            </div>
          </Link>

          <div className="icon-box">
            {data.heart.includes(email) ? (
              <FaHeart
                className="icon-heart"
                onClick={() => HeartMutation.mutate({ recipeId, email })}
              />
            ) : (
              <FaRegHeart
                className="icon-heart"
                onClick={() => HeartMutation.mutate({ recipeId, email })}
              />
            )}
            {data.heart.length}명
          </div>
        </div>
        <div className="titleBox">
          <div className="title">꿀팁🤫</div>
          {email === data.writer.email ? (
            <div className="ins-del-box">
              <Link to={`/RecipeEdit/${recipeId.id}`}>
                <div className="ins">수정</div>
              </Link>

              <div className="del" onClick={() => deleteRecipe(recipeId.id)}>
                삭제
              </div>
            </div>
          ) : null}
        </div>
        <div className="cook-tip">
          <div>{data.cookTip}</div>
        </div>
        <Swiper
          slidesPerView={1}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
        >
          {data.cookStep.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="image-box">
                <img src={item.imageUrl} alt="사진" className="main-image" />
              </div>
              <div className="recipe">
                <div className="number">
                  <div className="rank">{index + 1}</div>
                </div>
                <div className="info">{item.info}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div>
          <div className="ingredient">재료🪹</div>
          <div className="ing-info">
            {data.ingredients.map((item, index) => (
              <div className="info-box" key={index}>
                <div className="ing-rank">{index + 1}</div>
                <div className="ing-what">{item}</div>
              </div>
            ))}
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

  .ins-del-box {
    display: flex;
    font-weight: 700;
    margin-right: 10px;
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

  .user-profile {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .swiper {
    margin: 10px 10px 0px 10px;
    height: 450px;
    border-radius: 10px;
    box-shadow: var(--box-shadow);
  }

  .image-box {
    border-radius: 10px;
    height: 80%;
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
    cursor: pointer;
  }

  .ins {
    font-weight: 700;
    cursor: pointer;
  }

  .del {
    font-weight: 700;
    cursor: pointer;
    margin-left: 10px;
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

  .see-box {
    display: flex;
    justify-content: flex-end;
    margin-right: 10px;
    font-weight: 700;
    color: var(--gray-700);
  }

  .see-count {
    font-size: 0.9rem;
    margin-left: 2px;
  }

  .main-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px 10px 0px 0px;
  }
`;
