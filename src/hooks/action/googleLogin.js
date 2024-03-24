// 외부 - import
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

// 내부 - import
import { db } from "../../firebase";
import { userData } from "../../Firebase/mypageFn";

// 구글 로그인 ( function , function , RecoilState )
export const googleLogin = (showToast, navigate, users) => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider).then(async (userCredential) => {
    const user = userCredential.user;
    const DBUserData = await userData();
    const myData = DBUserData.filter((item) => item.email === user.email);
    // 나의 회원 테이블이 DB에 있다는 소리
    if (DBUserData.some((item) => item.email === user.email)) {
      localStorage.setItem("accessToken", user.accessToken);
      localStorage.setItem("nickname", myData[0].nickname);
      localStorage.setItem("profile", myData[0].profile);
      localStorage.setItem("email", myData[0].email);
      navigate("/");
      showToast("success", `${myData[0].nickname}님 환영합니다.`);
    } else {
      if (DBUserData.some((item) => item.nickname === user.displayName)) {
        const nickname = prompt(
          "동일한 닉네임이 있습니다. 다른 닉네임을 적어주세요"
        );
        if (nickname === null) return false;
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
      } else {
        await addDoc(collection(db, "users"), {
          ...users,
          email: user.email,
          nickname: user.displayName,
          profile: user.photoURL,
        });
        localStorage.setItem("accessToken", user.accessToken);
        localStorage.setItem("nickname", user.displayName);
        localStorage.setItem("profile", user.photoURL);
        localStorage.setItem("email", user.email);
        navigate("/");
        showToast("success", `${user.displayName}님 환영합니다.`);
      }
    }
  });
};
