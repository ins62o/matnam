import { db, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { showToast } from "../services/sweetalert";

// 유저 테이블 가져오기
export const userData = async (email) => {
  if (email) {
    const usersQuery = await getDocs(
      query(collection(db, "users"), where("email", "==", email))
    );

    const users = usersQuery.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return users[0];
  } else {
    const usersQuery = await getDocs(collection(db, "users"));
    return usersQuery.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
};

// 마이페이지 프로필 변경
export const changeProfile = async ({ data, fireimage, UrlEmail }) => {
  const storagePath = "profile/" + fireimage.name + UrlEmail;
  const storageRef = ref(storage, storagePath);
  await uploadBytes(storageRef, fireimage);
  const profile = await getDownloadURL(storageRef);
  await updateDoc(doc(db, "users", data.id), { ...data, profile })
    .then(() => {
      showToast("success", "프로필 이미지를 변경했습니다.");
    })
    .catch(() => {
      showToast("error", "프로필 이미지를 변경하지 못했습니다.");
    });
};

// 친구 추가
export const AddFriend = async ({ data, email }) => {
  const myData = await userData(email);
  await updateDoc(doc(db, "users", data.id), {
    ...data,
    following: [...data.following, myData],
  })
    .then(() => {
      showToast("success", `${data.nickname}님에게 친구신청을 보냈습니다.`);
    })
    .catch(() => {
      showToast("error", "친구신청에 오류가 발생했습니다.");
    });
};

// 신청 취소
export const CancelFriend = async ({ data, email }) => {
  const following = data.following.filter((item) => item.email !== email);
  await updateDoc(doc(db, "users", data.id), {
    ...data,
    following,
  })
    .then(() => {
      showToast("error", "친구신청을 취소했습니다.");
    })
    .catch(() => {
      showToast("error", "친구신청에 오류가 발생했습니다.");
    });
};

// 신청목록 - 수락버튼
export const successFriend = async ({ data, email }) => {
  // data는 나, email은 상대방
  const yourData = await userData(email);

  // 상대방의 팔로워에 나 추가
  await updateDoc(doc(db, "users", yourData.id), {
    ...yourData,
    followers: [...yourData.followers, data],
  });

  // 내 팔로잉에서 상대방의 아이디를 찾아 제거
  const following = data.following.filter((item) => item.email !== email);

  await updateDoc(doc(db, "users", data.id), {
    ...data,
    following,
    followers: [...data.followers, yourData],
  });
};

// 신청목록 - 거절
export const rejectFriend = async ({ data, email }) => {
  const following = data.following.filter((item) => item.email !== email);

  await updateDoc(doc(db, "users", data.id), {
    ...data,
    following,
  });
};

// 친구목록 - 삭제
export const deleteFriend = async ({ data, email }) => {
  const yourData = await userData(email);

  // 나의 팔로워 목록에서 상대방 제거
  const myfollowers = data.followers.filter((item) => item.email !== email);
  // 상대방의 팔로워 목록에서 나 제거
  const yourfollowers = yourData.followers.filter(
    (item) => item.email !== data.email
  );

  // 나의 팔로워 목록 업데이트
  await updateDoc(doc(db, "users", data.id), {
    ...data,
    followers: myfollowers,
  });

  // 상대방의 팔로워 목록 업데이트
  await updateDoc(doc(db, "users", yourData.id), {
    ...yourData,
    followers: yourfollowers,
  });
};
