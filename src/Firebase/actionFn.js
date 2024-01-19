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
} from "firebase/firestore";
import { db } from "../firebase";
import { useQueryClient } from "@tanstack/react-query";

// 조회수 증가
export const seeIncrease = async ({ id }) => {
  const recipeDocRef = await getDoc(doc(db, "recipe", id));
  const seeField = recipeDocRef.data().see;
  const updateData = {
    see: seeField + 1,
  };
  // updateDoc 함수가 반환하는 Promise를 기다림
  await updateDoc(doc(db, "recipe", id), updateData);
};
