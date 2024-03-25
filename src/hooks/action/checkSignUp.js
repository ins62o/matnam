// 외부 - import
import { collection, addDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

// 내부 - import
import { showToast } from "../../services/sweetalert";
import { userData } from "../../Firebase/mypageFn";
import { db } from "../../firebase";

// 회원가입 확인 ( String , String , String , String , function , RecoilState , function )
export const checkSignup = async (
  idRef,
  pwRef,
  pwcheckRef,
  nicknameRef,
  navigate,
  users,
  setUsers
) => {
  const nicknameLength = nicknameRef.current.value.length;
  const idValue = idRef.current.value;
  const pwValue = pwRef.current.value;
  const pwCheckValue = pwcheckRef.current.value;

  if (nicknameLength < 2 || nicknameLength > 6) {
    showToast("error", "2~6글자 사이로 설정해주세요", nicknameRef);
  } else if (!idValue.includes("@")) {
    showToast("error", "이메일 형식으로 적어주세요", idRef);
  } else if (pwValue.length < 6) {
    showToast("error", "6자 이상의 패스워드를 설정해주세요", pwRef);
  } else if (pwValue !== pwCheckValue) {
    showToast("error", "패스워드가 일치하지 않습니다", pwcheckRef);
  } else {
    try {
      const auth = getAuth();
      const newNickname = nicknameRef.current.value;
      const usersdata = await userData();
      if (
        usersdata.some((item) => item.nickname === nicknameRef.current.value)
      ) {
        showToast("error", "닉네임이 사용중입니다.", nicknameRef);
        nicknameRef.current.focus();
      } else {
        // users 아톰 상태 변경
        setUsers((prev) => ({
          ...prev,
          nickname: newNickname,
        }));

        // 파이어베이스 회원가입
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          idValue,
          pwValue
        );
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: nicknameRef.current.value,
        });

        // 새로운 users 정보 문서 생성
        await addDoc(collection(db, "users"), {
          ...users,
          email: idValue,
          nickname: newNickname,
        });

        nicknameRef.current.value = "";
        idRef.current.value = "";
        showToast("success", "회원가입을 축하합니다.");
        navigate("/Login");
      }
    } catch (err) {
      showToast("error", "이미 존재하는 아이디입니다.", idRef);
    }
  }
};
