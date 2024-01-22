import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  doc,
  getDoc,
  increment,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase";

// 조회수 증가
export const IncraseSee = async ({ id }) => {
  const recipeDocRef = await getDoc(doc(db, "recipe", id));
  const seeField = recipeDocRef.data().see;
  const updateData = {
    see: seeField + 1,
  };
  // updateDoc 함수가 반환하는 Promise를 기다림
  await updateDoc(doc(db, "recipe", id), updateData);
};

// 좋아요 증가
export const IncreaseHeart = async ({ recipeId, nickname }) => {
  const recipeDocRef = await getDoc(doc(db, "recipe", recipeId.id));
  const likeField = recipeDocRef.data().heart;

  if (likeField.includes(nickname)) {
    const heart = likeField.filter((item) => item !== nickname);
    const updateData = {
      heart,
    };
    await updateDoc(doc(db, "recipe", recipeId.id), updateData);
  } else {
    const heart = [...likeField, nickname];
    const updateData = {
      heart,
    };
    await updateDoc(doc(db, "recipe", recipeId.id), updateData);
  }
};

// 게시글 쓰기
export const createData = async (recipe) => {
  try {
    const docRef = await addDoc(collection(db, "recipe"), recipe);
  } catch (e) {
    console.log(e);
  }
};
