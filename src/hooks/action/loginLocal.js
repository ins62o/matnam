// 외부 - import
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// 내부 - import
import { showToast } from "../../services/sweetalert";
import { userData } from "../../Firebase/mypageFn";

// 로컬 로그인 ( String , String , Funtion )
export const localLogin = (idRef, pwRef, navigate) => {
  const idValue = idRef.current.value;
  const pwValue = pwRef.current.value;

  if (idValue.length === 0) {
    showToast("error", "아이디를 입력하세요", idRef);
  } else if (pwValue.length === 0) {
    showToast("error", "패스워드를 입력하세요", pwRef);
  } else {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, idValue, pwValue)
      .then((userCredential) => {
        const user = userCredential.user;
        handleLoginSuccess(user, navigate);
      })
      .catch(() => {
        showToast("error", "맛남의 공간 회원이 아닙니다.", idRef);
      });
  }
};

// 로그인 성공 시 처리
const handleLoginSuccess = async (user, navigate) => {
  const DBUserData = await userData(user.email);
  localStorage.setItem("accessToken", user.accessToken);
  localStorage.setItem("nickname", DBUserData.nickname);
  localStorage.setItem("profile", DBUserData.profile);
  localStorage.setItem("email", DBUserData.email);
  showToast("success", `${DBUserData.nickname} 님 환영합니다.`);
  navigate("/");
};
