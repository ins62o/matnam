import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import RecipeBar from "./../../component/RecipeBar";
import RecipeBtnBar from "../../component/RecipeBtnBar";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";

export default function RecipeWriteThree() {
  const [img, setImg] = useState("");
  const [images, setImages] = useState([]);
  const [swiper, setSwiper] = useState("");
  const [add, setAdd] = useState([{ id: 1 }]);
  const [num, setNum] = useState(0);
  const [numtwo, setNumtwo] = useState(1);

  useEffect(() => {
    setNum((pre) => pre + 1);
  }, [add]);

  const handleAdd = () => {
    setAdd((prev) => [...prev, { id: prev.length + 1 }]);
  };

  // 이미지 url 뽑아오는 함수(encodeFileToBase64)
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImages((prevImages) => [...prevImages, reader.result]);
        resolve();
      };
    });
  };

  return (
    <>
      <Container>
        <RecipeBar level={100} />
        <div className="title-box">
          <div className="title">조리 방법</div>
          <button onClick={handleAdd} className="add">
            {`추가 ${numtwo} / ${num}`}
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
            onSlideChange={(swiper) => setNumtwo(swiper.activeIndex + 1)}
          >
            {add.map((data, index) => (
              <SwiperSlide key={data.id}>
                {index < images.length ? (
                  <div>
                    <img
                      src={images[index]}
                      alt={`사진 ${index + 1}`}
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
                      onChange={(e) => {
                        encodeFileToBase64(e.target.files[0]);
                      }}
                    />
                    <div className="step-no">STEP {index + 1}</div>
                  </div>
                )}

                <div className="level-box">
                  <textarea
                    placeholder="단계별 레시피를 자세하게 설명해주세요."
                    className="level-text"
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
            />
          </div>
          <div className="last"></div>
        </div>
        <RecipeBtnBar next={""} />
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
  }

  .tip-text {
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
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
