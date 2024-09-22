// 외부 - import
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// 내부 - import
import { userData } from "../../Firebase/mypageFn";

export const googleLogin = async () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const user = await signInWithPopup(auth, provider);
  return user.user;
};

export const DBUserCheck = async (user) => {
  const DBUserData = await userData();
  const IsUsers = DBUserData.find((item) => item.email === user.email);
  return IsUsers;
};
