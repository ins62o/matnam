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

// 각 필드의 유효성 검사 체크
export const CheckValidate = (id, pw, pwCheck, nickname) => {
  const IdRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const pwReg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;

  // 1. 유효성 검사 시작
  if (
    nickname &&
    (nickname.current.value.length < 2 || nickname.current.value.length > 6)
  ) {
    showToast("error", "2~6글자 사이로 설정해주세요", nickname);
    return false;
  }
  if (id && !IdRegex.test(id.current.value)) {
    showToast("error", "이메일 형식으로 적어주세요", id);
    return false;
  }
  if (pw && !pwReg.test(pw.current.value)) {
    showToast("error", "8자 이상 영문자와 숫자를 넣어주세요", pw);
    return false;
  }
  if (pwCheck && pw.current.value !== pwCheck.current.value) {
    showToast("error", "패스워드가 일치하지 않습니다.", pwCheck);
    return false;
  }

  // 2. 모든 유효성 검사가 통과되면 true 반환
  return true;
};

// DB 유저 데이터 닉네임 중복 체크
export const duplicateNickName = async (nickname) => {
  const userdata = await userData();
  if (userdata.some((user) => user.nickname === nickname.current.value)) {
    showToast("error", "중복된 닉네임이 있습니다.", nickname);
  } else {
    return true;
  }
};

// 파이어베이스 사용자 생성 및 닉네임 설정
export const createFirebaseUser = async (id, pw, nickname) => {
  const auth = getAuth();
  await createUserWithEmailAndPassword(
    auth,
    id.current.value,
    pw.current.value
  );
  updateProfile(auth.currentUser, {
    displayName: nickname.current.value,
  });
};

// 유저 필드값 DB에 생성
export const createUserDB = async (users) => {
  try {
    await addDoc(collection(db, "users"), users);
    return true;
  } catch (e) {
    showToast("error", "회원가입에 오류가 발생했습니다.");
    return false;
  }
};
