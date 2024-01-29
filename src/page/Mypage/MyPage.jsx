import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MenuBar from "./../../component/MenuBar";
import MypageSection from "./MypageSection";
import { FaChevronLeft } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { IoMdSettings } from "react-icons/io";
import { useRecoilState } from "recoil";
import { MenuStateAtom } from "../../Recoil/atom";
import { showToast } from "../../services/sweetalert";
import { getAuth, updateProfile, signOut } from "firebase/auth";
import { useNavigate, useLocation, useParams, Link } from "react-router-dom";
import {
  userData,
  changeProfile,
  AddFriend,
  CancelFriend,
  successFriend,
  rejectFriend,
  deleteFriend,
} from "../../Firebase/mypageFn";
import { FaTimes } from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function MyPage() {
  const email = localStorage.getItem("email");
  const mynickname = localStorage.getItem("nickname");
  const profile = localStorage.getItem("profile");
  const location = useLocation();
  const queryClient = useQueryClient();
  const { nickname } = useParams();
  const [menu, setMenu] = useRecoilState(MenuStateAtom);
  const [inserton, setInserton] = useState(false);
  const [check, setCheck] = useState(false);
  const [fireimage, setFireimage] = useState("");
  const [image, setImage] = useState("");
  const [modal, setModal] = useState(false);
  const [modalTwo, setModalTwo] = useState(false);
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const UrlEmail = searchParams.get("email");

  const { error, isLoading, data } = useQuery({
    queryKey: ["userData", UrlEmail],
    queryFn: () => userData(UrlEmail),
  });

  useEffect(() => {
    data?.following.some((item) => item.email === email)
      ? setCheck(true)
      : setCheck(false);

    return () => {
      setModal(false);
      setModalTwo(false);
    };
  }, [data]);

  // 하단 메뉴바 상태 관리 - useEffect
  useEffect(() => {
    setMenu((prev) => ({
      ...prev,
      mypage: true,
    }));
    return () => {
      setMenu((prev) => ({
        ...prev,
        mypage: false,
      }));
    };
  }, [menu.mypage]);

  // 이미지 url 뽑아오는 함수(encodeFileToBase64)
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = async () => {
        setImage(reader.result);
        resolve();
      };
    });
  };

  // 로그아웃 함수 - logout
  const logout = () => {
    if (!email) {
      showToast("info", "로그인도 안하셨어요 !");
      return;
    }
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("nickname");
        localStorage.removeItem("profile");
        localStorage.removeItem("email");
        navigate("/Login");
        showToast("success", "로그아웃하였습니다.");
      })
      .catch(() => {
        showToast("error", "로그아웃에 문제가 발생했습니다.");
      });
  };

  // 프로필 변경
  const changeProfileMutation = useMutation({
    mutationFn: changeProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(["userData", UrlEmail]);
      setInserton(false);
    },
  });

  // 친구추가
  const adduserMutation = useMutation({
    mutationFn: AddFriend,
    onSuccess: () => {
      queryClient.invalidateQueries(["userData", UrlEmail]);
      setCheck(true);
    },
  });

  // 신청취소
  const canceluserMutation = useMutation({
    mutationFn: CancelFriend,
    onSuccess: () => {
      queryClient.invalidateQueries(["userData", UrlEmail]);
      setCheck(false);
    },
  });

  // 신청목록 - 수락
  const successMutation = useMutation({
    mutationFn: successFriend,
    onSuccess: () => {
      queryClient.invalidateQueries(["userData", UrlEmail]);
    },
  });

  // 신청목록 - 거절
  const rejectMutation = useMutation({
    mutationFn: rejectFriend,
    onSuccess: () => {
      queryClient.invalidateQueries(["userData", UrlEmail]);
    },
  });

  // 신청목록 - 거절
  const deleteMutation = useMutation({
    mutationFn: deleteFriend,
    onSuccess: () => {
      queryClient.invalidateQueries(["userData", UrlEmail]);
    },
  });

  return (
    <Container>
      <div className="header-box">
        <FaChevronLeft onClick={() => navigate(-1)} className="icon" />
        <FiLogOut onClick={logout} className="icon" />
      </div>
      <div className="profile-box">
        <div className="profile">
          {image === "" ? (
            <img src={data?.profile} alt="로딩중" className="main-image" />
          ) : (
            <img src={image} alt="로딩중" className="main-image" />
          )}
          {inserton ? (
            <div className="setting">
              <label htmlFor="file-input">
                <IoMdSettings className="setting-icon" />
              </label>
              <input
                type="file"
                id="file-input"
                accept="image/*"
                onChange={(e) => {
                  encodeFileToBase64(e.target.files[0]);
                  setFireimage(e.target.files[0]);
                }}
              />
            </div>
          ) : null}
        </div>
        <div className="user-nickname">{data?.nickname}</div>
        {email === UrlEmail ? (
          !inserton ? (
            <button
              className="info-insert-btn"
              onClick={() => setInserton(!inserton)}
            >
              내 정보 수정
            </button>
          ) : (
            <button
              className="info-insert-btn info-check-btn "
              onClick={() =>
                changeProfileMutation.mutate({ data, fireimage, UrlEmail })
              }
            >
              수정 완료
            </button>
          )
        ) : null}
      </div>
      <div className="friend-box">
        <div className="box">
          <div className="item-box" onClick={() => setModalTwo(true)}>
            <div className="item-icon">👩‍👧‍👦</div>
            <div className="item-name">친구({data?.followers.length})</div>
          </div>
          {email === UrlEmail ? (
            <div className="item-box" onClick={() => setModal(true)}>
              <div className="item-icon">📬</div>
              <div className="item-name">
                신청목록({data?.following.length})
              </div>
              {data?.following.length === 0 ? null : (
                <div className="new-circle">N</div>
              )}
            </div>
          ) : check ? (
            <div
              className="item-box"
              onClick={() => canceluserMutation.mutate({ data, email })}
            >
              <div className="item-icon">🚫</div>
              <div className="item-name">신청취소</div>
            </div>
          ) : data?.followers.some((item) => item.email === email) ? (
            <div className="item-box">
              <div className="item-icon">🤗</div>
              <div className="item-name">친구사이</div>
            </div>
          ) : (
            <div
              className="item-box"
              onClick={() =>
                adduserMutation.mutate({
                  data,
                  email,
                })
              }
            >
              <div className="item-icon">✅</div>
              <div className="item-name">친구추가</div>
            </div>
          )}
        </div>
      </div>
      <MypageSection />
      <MenuBar />

      <div>
        {modal ? (
          <div className="modal-box">
            <div className="modal">
              <div className="header">
                <div className="title">친구신청 리스트</div>
                <FaTimes className="icon-x" onClick={() => setModal(false)} />
              </div>
              <p className="center">친구신청 온 리스트를 표시합니다.</p>
              <div className="scroll-box">
                {data?.following.map((item, index) => (
                  <div className="friend-card-box" key={index}>
                    <Link
                      to={`/mypage/${item.nickname}?email=${item.email}`}
                      className="info-box"
                    >
                      <div className="info-box-profile">
                        <img
                          src={item.profile}
                          alt="프로필"
                          className="main-image"
                        />
                      </div>
                      <div className="info-box-nickname">{item.nickname}</div>
                    </Link>
                    <div className="btn-box">
                      <button
                        className="ok"
                        onClick={() =>
                          successMutation.mutate({ data, email: item.email })
                        }
                      >
                        수락
                      </button>
                      <button
                        className="no"
                        onClick={() =>
                          rejectMutation.mutate({ data, email: item.email })
                        }
                      >
                        거절
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div>
        {modalTwo ? (
          <div className="modal-box">
            <div className="modal">
              <div className="header">
                <div className="title">친구 리스트</div>
                <FaTimes
                  className="icon-x"
                  onClick={() => setModalTwo(false)}
                />
              </div>
              <div className="scroll-box">
                {data?.followers.map((item, index) => (
                  <div className="friend-card-box" key={index}>
                    <Link
                      to={`/mypage/${item.nickname}?email=${item.email}`}
                      className="info-box2"
                    >
                      <div className="info-box-profile">
                        <img
                          src={item.profile}
                          alt="프로필"
                          className="main-image"
                        />
                      </div>
                      <div className="info-box-nickname">{item.nickname}</div>
                    </Link>
                    <div className="btn-box">
                      {data.email === email ? (
                        <button
                          className="no"
                          onClick={() =>
                            deleteMutation.mutate({ data, email: item.email })
                          }
                        >
                          삭제
                        </button>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </Container>
  );
}

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  position: relative;

  .header-box {
    height: 50px;
    margin: 0 10px;
    font-size: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    margin: 5px 10px;
    font-weight: 700;
  }

  .friend-card-box {
    border: 1px solid var(--gray-200);
    height: 40px;
    border-radius: 10px;
    box-shadow: var(--box-shadow);
    padding: 10px;
    display: flex;
    align-items: center;
  }

  .info-box {
    display: flex;
    width: 75%;
  }

  .info-box2 {
    display: flex;
    width: 85%;
  }

  .center {
    text-align: center;
  }

  .info-box-profile {
    border: 1px solid var(--gray-300);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .info-box-nickname {
    display: flex;
    align-items: center;
    font-weight: 700;
  }

  .btn-box {
    display: flex;
  }

  .ok {
    color: green;
    margin-right: 10px;
  }

  .no {
    color: red;
  }

  .title {
    font-size: 1.3rem;
    margin-left: 10px;
  }

  .icon-x {
    font-size: 1.3rem;
  }

  .profile-box {
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .profile {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    margin-bottom: 20px;
    box-shadow: var(--box-shadow);
    position: relative;
  }

  .user-nickname {
    font-size: 1.7rem;
    font-weight: 700;
    margin-bottom: 10px;
  }

  .info-insert-btn {
    padding: 10px;
    border-radius: 10px;
    background-color: var(--gray-200);
    color: var(--gray-700);
  }

  .info-check-btn {
    color: black;
  }

  .menu-bar {
    display: flex;
    box-shadow: var(--box-shadow);
    justify-content: center;
    margin: 20px;
    border-radius: 10px;
    font-weight: 700;
  }

  .main-image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .modal-box {
    width: 100%;
    height: 400px;
    position: absolute;
    top: 120px;
    z-index: 1;
    display: flex;
    justify-content: center;
  }

  .modal {
    width: 300px;
    height: 100%;
    box-shadow: var(--box-shadow);
    background-color: #fff;
    border: 1px solid var(--main-color);
    border-radius: 10px;
  }

  .main-image-skt {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
  }

  .main-image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .menu-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 33%;
    padding: 10px;
    font-weight: 700;
    cursor: pointer;
  }

  .menu-list:nth-child(2) {
    border-left: 1px solid var(--gray-300);
    border-right: 1px solid var(--gray-300);
  }

  .menu-icon {
    font-size: 1.5rem;
    margin-bottom: 5px;
  }

  .icon {
    cursor: pointer;
  }

  .setting {
    background-color: var(--gray-200);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* 파일 필드 숨기기 */
  .setting input[type="file"] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  .setting-icon {
    font-size: 1.5rem;
  }

  .friend-box {
    margin: 20px;
    display: flex;
    justify-content: center;
  }

  .box {
    width: 200px;
    height: 60px;
    display: flex;
    box-shadow: var(--box-shadow);
  }

  .item-box {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
  }

  .item-icon {
    font-size: 1.2rem;
    margin-bottom: 5px;
  }

  .item-name {
    font-weight: 700;
  }

  .new-circle {
    font-weight: 700;
    color: #fff;
    background-color: red;
    width: 21px;
    height: 21px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
  }
`;
