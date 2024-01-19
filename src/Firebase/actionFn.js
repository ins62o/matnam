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
import { useQueryClient } from "react-query";

// 조회수 증가
export const seeIncrease = async ({ id }) => {
  const recipeDocRef = doc(db, "recipe", id);
  const updateData = {
    see: increment(1),
  };
  await updateDoc(recipeDocRef, updateData);
};
