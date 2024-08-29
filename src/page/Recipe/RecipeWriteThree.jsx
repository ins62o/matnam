/* eslint-disable */
// 외부 - import
import React, { useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { Pagination } from "swiper/modules";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// 내부 - import
import RecipeBar from "./../../component/RecipeBar";
import RecipeBtnBar from "../../component/RecipeBtnBar";
import { RecipeAtom } from "../../Recoil/atom";
import { storage } from "../../firebase";
import { resize } from "../../services/imageFn";

export default function RecipeWriteThree() {
  const [num, setNum] = useState(1);
  const [recipe, setRecipe] = useRecoilState(RecipeAtom);
  const email = localStorage.getItem("email");

  const AddImage = async (e) => {
    const files = e.target.files;
    let updatedCookSteps = [...recipe.cookStep];

    for (let i = 0; i < files.length; i++) {
      const storagePath = "image/" + `${files[i].name}.${email}`;
      const storageRef = ref(storage, storagePath);
      const compressedFile = await resize(files[i], 440, 200, "file");
      const snapshot = await uploadBytes(storageRef, compressedFile);
      const imageUrl = await getDownloadURL(storageRef);

      updatedCookSteps.push({
        info: "",
        imageUrl,
      });
    }

    const update = updatedCookSteps.filter((item) => item.imageUrl !== "");

    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      cookStep: update,
    }));
  };

  const handleTextAreaChange = (e) => {
    const index = e.target.dataset.index;
    const updatedCookSteps = [...recipe.cookStep];
    updatedCookSteps[index] = {
      info: e.target.value,
      imageUrl: updatedCookSteps[index]?.imageUrl || "",
    };
    setRecipe((prev) => ({ ...prev, cookStep: updatedCookSteps }));
  };

  const handleAdd = () => {
    setRecipe((prev) => ({
      ...prev,
      cookStep: [...prev.cookStep, { info: "", imageUrl: "" }],
    }));
  };

  return (
    <>
      <Container>
        <RecipeBar level={100} />
        <div className="title-box">
          <div className="title">조리 방법</div>
          <button className="add" onClick={handleAdd}>
            {`추가 ${num} / ${recipe.cookStep.length}`}
          </button>
        </div>

        <div className="imageBox">
          <Swiper
            slidesPerView={1}
            loop={false}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            onSlideChange={(swiper) => setNum(swiper.activeIndex + 1)}
          >
            {recipe.cookStep.map((data, index) => (
              <SwiperSlide key={index}>
                {data.imageUrl ? (
                  <div>
                    <img
                      src={recipe.cookStep[index].imageUrl}
                      className="recipe-image"
                    />
                    <div className="step">STEP {index + 1}</div>
                  </div>
                ) : (
                  <div className="image">
                    <label htmlFor={`ex_file_${index}`}>+</label>
                    <input
                      type="file"
                      id={`ex_file_${index}`}
                      accept="image/*"
                      multiple
                      onChange={(e) => AddImage(e)}
                    />
                    <div className="step-no">STEP {index + 1}</div>
                  </div>
                )}

                <div className="level-box">
                  <textarea
                    placeholder="단계별 레시피를 자세하게 설명해주세요."
                    className="level-text"
                    data-index={index}
                    defaultValue={data.info}
                    onChange={handleTextAreaChange}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="tip">요리 TIP</div>

          <div className="tip-box">
            <textarea
              placeholder="나만의 요리 TIP을 알려주세요"
              className="tip-text"
              defaultValue={recipe.cookTip}
              onChange={(e) => {
                setRecipe((prev) => ({
                  ...prev,
                  cookTip: e.target.value,
                }));
              }}
            />
          </div>
          <div className="last"></div>
        </div>
        <RecipeBtnBar next={"3"} />
      </Container>
    </>
  );
}

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  .swiper {
    height: 360px;
  }

  .add {
    padding: 10px;
    font-weight: 700;
    border: 1px solid var(--gray-300);
    border-radius: 10px;
  }

  .step {
    position: absolute;
    top: 0;
    padding: 10px;
    margin: 5px;
    border-radius: 10px;
    font-weight: 700;
    background-color: var(--main-color);
  }

  .step-no {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px;
    margin: 10px;
    border-radius: 10px;
    font-weight: 700;
    background-color: var(--main-color);
  }
  .title {
    padding: 10px;
    font-size: 1.1rem;
    font-weight: 700;
  }

  .title-box {
    display: flex;
    margin: 90px 10px 0px 10px;
  }

  .tip {
    margin-top: 10px;
    font-size: 1.1rem;
    font-weight: 700;
  }

  .imageBox {
    padding: 10px;
    height: 60vh;
    overflow: auto;
  }

  .image {
    border: 1px solid var(--gray-300);
    border-radius: 10px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tip-box {
    margin-top: 10px;
    height: 90px;
    border-radius: 10px;
    padding: 10px;
    border: 1px solid var(--main-color);
  }

  .level-box {
    margin-top: 10px;
    height: 90px;
    border-radius: 10px;
    padding: 10px;
    border: 1px solid var(--gray-300);
  }

  .level-text {
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    font-weight: 700;
    font-family: "Pretendard-Regular";
  }

  .tip-text {
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    font-weight: 700;
    font-family: "Pretendard-Regular";
  }

  .last {
    margin-bottom: 100px;
  }

  .image label {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    display: inline-block;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--gray-700);
  }

  .image input[type="file"] {
    /* 파일 필드 숨기기 */
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  .swiper-pagination-bullet-active {
    background-color: var(--main-color);
  }

  .recipe-image {
    width: 100%;
    height: 200px;
    border-radius: 10px;
    object-fit: cover;
  }
`;
