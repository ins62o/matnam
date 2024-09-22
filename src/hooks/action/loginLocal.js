// 외부 - import
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// 내부 - import
import { showToast } from "../../services/sweetalert";
import { userData } from "../../Firebase/mypageFn";

// 로컬 로그인 ( String , String , Funtion )
export const localLogin = async (id, pw) => {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      id.current.value,
      pw.current.value
    );
    const user = userCredential.user;
    console.log(user);
    await SaveLocalData(user);
    return user; // 로그인 성공 시 유저 정보를 반환
  } catch (error) {
    showToast("error", "맛남의 공간 회원이 아닙니다.", id);
    return null; // 로그인 실패 시 null 반환
  }
};

// 로그인 성공 시 처리
export const SaveLocalData = async (user) => {
  const DBUserData = await userData(user.email);
  localStorage.setItem("accessToken", user.accessToken);
  localStorage.setItem("nickname", DBUserData.nickname);
  localStorage.setItem("profile", DBUserData.profile);
  localStorage.setItem("email", DBUserData.email);
};
