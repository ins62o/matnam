// 외부 - import
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

// 내부 - import
import { db } from "../../firebase";
import { userData } from "../../Firebase/mypageFn";
import { showToast } from "../../services/sweetalert";

// 구글 로그인 ( function , RecoilState )
export const googleLogin = async (navigate, users) => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  try {
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    const DBUserData = await userData();
    const existingUser = DBUserData.find((item) => item.email === user.email);

    if (existingUser) {
      localStorage.setItem("accessToken", user.accessToken);
      localStorage.setItem("nickname", existingUser.nickname);
      localStorage.setItem("profile", existingUser.profile);
      localStorage.setItem("email", existingUser.email);
      navigate("/");
      showToast("success", `${existingUser.nickname}님 환영합니다.`);
    } else {
      let nickname = user.displayName;
      if (DBUserData.some((item) => item.nickname === user.displayName)) {
        nickname = prompt("동일한 닉네임이 있습니다. 다른 닉네임을 적어주세요");
        if (nickname === null) return false;
      }

      await addDoc(collection(db, "users"), {
        ...users,
        email: user.email,
        nickname,
        profile: user.photoURL,
      });

      localStorage.setItem("accessToken", user.accessToken);
      localStorage.setItem("nickname", nickname);
      localStorage.setItem("profile", user.photoURL);
      localStorage.setItem("email", user.email);
      navigate("/");
      showToast("success", `${nickname}님 환영합니다.`);
    }
  } catch (error) {
    console.error("Google 로그인 에러:", error);
    showToast("error", "구글 로그인 중 오류가 발생했습니다.");
  }
};
