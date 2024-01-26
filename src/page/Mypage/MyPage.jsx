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
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, updateProfile, signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate, useLocation, useParams, Link } from "react-router-dom";
import { userData } from "../../Firebase/firebaseFn";
import { FaTimes } from "react-icons/fa";

export default function MyPage() {
  const email = localStorage.getItem("email");
  const mynickname = localStorage.getItem("nickname");
  const profile = localStorage.getItem("profile");
  const location = useLocation();
  const { nickname } = useParams();
  const [menu, setMenu] = useRecoilState(MenuStateAtom);
  const [inserton, setInserton] = useState(false);
  const [data, setData] = useState({});
  const [check, setCheck] = useState(true);
  const [fireimage, setFireimage] = useState("");
  const [modal, setModal] = useState(false);
  const [modalTwo, setModalTwo] = useState(false);
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get("email");

  console.log(data);

  // 마이페이지 상태 가져오기
  useEffect(() => {
    const myDataFetch = async () => {
      const myData = await userData(nickname, searchValue);
      const isAlreadyFollowing = myData.following.some(
        (item) => item.email === email
      );
      isAlreadyFollowing ? setCheck(true) : setCheck(false);
      setData({
        ...myData,
        nickname: myData.nickname,
        profile: myData.profile,
      });
    };
    myDataFetch();
  }, []);

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
      reader.onload = () => {
        setData({
          nickname,
          profile: reader.result,
        });
        resolve();
      };
    });
  };

  // 로그아웃 함수 - logout
  const logout = () => {
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

  // 프로필 이미지 변경 함수 - changeProfile
  const changeProfile = async () => {
    const storagePath = "profile/" + fireimage.name + nickname;
    const storageRef = ref(storage, storagePath);
    const myData = await userData(nickname, email);

    try {
      // 이미지 업로드,URL
      const snapshot = await uploadBytes(storageRef, fireimage);
      const profile = await getDownloadURL(storageRef);

      // 사용자 프로필 업데이트
      await updateDoc(doc(db, "users", myData.id), { nickname, profile });

      // 성공 토스트 메시지 표시
      showToast("success", "프로필 이미지를 변경했습니다.");

      // 수정버튼 false
      setInserton(false);
    } catch (error) {
      showToast("error", "프로필 이미지를 변경하지 못했습니다.");
    }
  };

  const AddFriend = async () => {
    const data = await userData(nickname, searchValue); // 친구정보 데이터베이스 불러오기

    // 현재 사용자의 이메일이 이미 팔로잉 목록에 있는지 확인
    const isAlreadyFollowing = data.following.some(
      (item) => item.email === email
    );

    // 현재 사용자의 이메일이 이미 팔로잉 목록에 없는 경우에만 추가
    if (!isAlreadyFollowing) {
      await updateDoc(doc(db, "users", data.id), {
        ...data,
        following: [
          ...data.following,
          { nickname: mynickname, profile, email },
        ],
      })
        .then(() => {
          setCheck(true);
          showToast("success", `${nickname}님에게 친구신청을 보냈습니다.`);
        })
        .catch(() => {
          showToast("error", "친구신청에 오류가 발생했습니다.");
        });
    } else {
      // 이미 친구 목록에 있는 경우 처리
      setCheck(false);
      showToast("warning", "이미 친구로 추가된 사용자입니다.");
    }
  };

  const RemoveFriend = async () => {
    const data = await userData(nickname, searchValue);
    const following = data.following.filter((item) => item.email !== email);
    await updateDoc(doc(db, "users", data.id), {
      ...data,
      following,
    })
      .then(() => {
        setCheck(false);
        showToast("success", "친구신청을 취소했습니다.");
      })
      .catch(() => {
        showToast("error", "친구신청에 오류가 발생했습니다.");
      });
  };

  const rejectFriend = async (email) => {
    const data = await userData(nickname, searchValue);
    const updataData = data.following.filter((item) => item.email !== email);
    await updateDoc(doc(db, "users", data.id), { following: updataData }).then(
      async () => {
        console.log("성공");
        const data = await userData(nickname, searchValue);
        setData(data);
      }
    );
  };

  const deleteFriend = async (usernickname, useremail) => {
    // 내 정보 가져오기
    const data = await userData(nickname, searchValue);

    // 상대방 정보 가져오기
    const otherData = await userData(usernickname, useremail);

    // 내 정보에서 상대방을 팔로우한 데이터 삭제
    const updatedData = data.followers.filter(
      (item) => item.email !== useremail
    );
    await updateDoc(doc(db, "users", data.id), { followers: updatedData });

    // 상대방 정보에서 나를 팔로우한 데이터 삭제
    const updatedOtherData = otherData.followers.filter(
      (item) => item.email !== email
    );
    await updateDoc(doc(db, "users", otherData.id), {
      followers: updatedOtherData,
    });

    // 삭제가 완료된 내 정보 다시 가져오기
    const newData = await userData(nickname, searchValue);
    setData(newData);
    console.log(newData);
    console.log("친구 삭제가 완료되었습니다.");
  };

  const successFriend = async (useremail, usernickname) => {
    console.log(useremail);
    // 팔로잉을 거부하는 함수 호출
    await rejectFriend(useremail);

    // 내 정보 가져오기
    const myData = await userData(nickname, searchValue);
    console.log("내정보 : ", myData);

    // 상대방 정보 가져오기
    const otherData = await userData(usernickname, useremail);
    console.log("상대방 정보 : ", otherData);

    //내 정보를 업데이트하고 팔로잉 추가
    const updatedFollowing = [
      ...myData.following,
      {
        nickname: otherData.nickname,
        profile: otherData.profile,
        email: useremail,
      },
    ];
    await updateDoc(doc(db, "users", myData.id), {
      followers: updatedFollowing,
    });

    // 상대방 정보를 업데이트하고 팔로워 추가
    const updatedFollowers = [
      ...otherData.followers,
      {
        nickname: myData.nickname,
        profile: myData.profile,
        email: myData.email,
      },
    ];
    await updateDoc(doc(db, "users", otherData.id), {
      followers: updatedFollowers,
    });

    console.log("성공");
  };

  if (!data) return <p>로딩중</p>;

  return (
    <Container>
      <div className="header-box">
        <FaChevronLeft onClick={() => navigate(-1)} className="icon" />
        <FiLogOut onClick={logout} className="icon" />
      </div>
      <div className="profile-box">
        <div className="profile">
          {data.profile ? (
            <img src={data.profile} alt="로딩중" className="main-image" />
          ) : (
            <div className="main-image-skt"></div>
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
        <div className="user-nickname">{data.nickname}</div>
        {email === searchValue ? (
          !inserton ? (
            <button
              className="info-insert-btn"
              onClick={() => setInserton(!inserton)}
            >
              내 정보 수정
            </button>
          ) : (
            <button
              className="info-insert-btn info-check-btn  "
              onClick={changeProfile}
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
            <div className="item-name">친구({data.followers?.length})</div>
          </div>
          {email === searchValue ? (
            <div className="item-box" onClick={() => setModal(true)}>
              <div className="item-icon">📬</div>
              <div className="item-name">
                신청목록({data.following?.length})
              </div>
              <div className="new-circle">N</div>
            </div>
          ) : check ? (
            <div className="item-box" onClick={RemoveFriend}>
              <div className="item-icon">🚫</div>
              <div className="item-name">신청취소</div>
            </div>
          ) : data.followers.some((item) => item.email === email) ? (
            <div className="item-box">
              <div className="item-icon">🤗</div>
              <div className="item-name">친구사이</div>
            </div>
          ) : (
            <div className="item-box" onClick={AddFriend}>
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
              <div className="scroll-box">
                {data.following?.map((item, index) => (
                  <div className="friend-card" key={index}>
                    <div className="one-card-box">
                      <div className="card-profile">
                        <img
                          src={item.profile}
                          alt="사진"
                          className="main-image"
                        />
                      </div>
                    </div>
                    <div className="two-card-box">
                      <div className="card-name">{item.nickname}</div>
                    </div>
                    <div className="three-card-box">
                      <button
                        className="ok"
                        onClick={() => successFriend(item.email, item.nickname)}
                      >
                        수락
                      </button>
                      <button
                        className="no"
                        onClick={() => rejectFriend(item.email)}
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
                {data.followers?.map((item, index) => (
                  <Link
                    to={`/mypage/${item.nickname}?email=${item.email}`}
                    className="iconBox"
                  >
                    <div className="friend-card" key={index}>
                      <div className="one-card-box">
                        <div className="card-profile">
                          <img
                            src={item.profile}
                            alt="사진"
                            className="main-image"
                          />
                        </div>
                      </div>
                      <div className="two-card-box">
                        <div className="card-name">{item.nickname}</div>
                      </div>
                      <div className="three-card-box">
                        {searchValue === email ? (
                          <button
                            className="no"
                            onClick={() =>
                              deleteFriend(item.nickname, item.email)
                            }
                          >
                            삭제
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </Link>
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

  .ok {
    color: green;
    margin-right: 10px;
  }

  .no {
    color: red;
  }

  .one-card-box {
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .two-card-box {
    width: 50%;
    display: flex;
    align-items: center;
  }

  .three-card-box {
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .scroll-box {
    overflow: auto;
  }

  .title {
    font-size: 1.3rem;
  }

  .icon-x {
    font-size: 1.3rem;
  }

  .friend-card {
    display: flex;
    padding: 10px;
    font-weight: 700;
    border-radius: 10px;
  }

  .card-profile {
    width: 40px;
    height: 40px;
    border: 1px solid var(--gray-400);
    border-radius: 50%;
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
