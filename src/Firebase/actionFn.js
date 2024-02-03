import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { showToast } from "../services/sweetalert";

// 조회수 증가
export const IncraseSee = async ({ recipeId, email }) => {
  if (email) {
    const recipeDocRef = await getDoc(doc(db, "recipe", recipeId.id));
    const seeField = recipeDocRef.data().see;
    const updateData = {
      see: seeField + 1,
    };
    await updateDoc(doc(db, "recipe", recipeId.id), updateData);
  }
};

// 좋아요 증가
export const IncreaseHeart = async ({ recipeId, email }) => {
  if (!email) {
    showToast("info", "맛남의 공간 회원이 아니에요 !");
    return;
  }
  const recipeDocRef = await getDoc(doc(db, "recipe", recipeId.id));
  const likeField = recipeDocRef.data().heart;
  if (likeField.includes(email)) {
    const heart = likeField.filter((item) => item !== email);
    const updateData = {
      heart,
    };
    await updateDoc(doc(db, "recipe", recipeId.id), updateData);
  } else {
    const heart = [...likeField, email];
    const updateData = {
      heart,
    };
    await updateDoc(doc(db, "recipe", recipeId.id), updateData);
  }
};
