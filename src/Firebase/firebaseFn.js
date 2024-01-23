import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

// 모든 레시피 카드 - Get
export const getAllRecipes = async () => {
  const recipesQuery = await getDocs(
    query(collection(db, "recipe"), orderBy("date", "desc"))
  );
  return recipesQuery.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// 카테고리별 레시피 카드 - Get
export const getCategoryRecipes = async (category) => {
  const recipesQuery = await getDocs(
    query(
      collection(db, "recipe"),
      where("categoryName", "==", category),
      orderBy("date", "desc")
    )
  );
  return recipesQuery.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// 좋아요순 레시피 카드 - Get
export const likeRecipes = async () => {
  const recipesQuery = await getDocs(query(collection(db, "recipe")));
  const recipesData = recipesQuery.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const sortedRecipes = recipesData.sort(
    (a, b) => b.heart.length - a.heart.length
  );

  return sortedRecipes;
};

// 레시피 카드 상세보기 - Get
export const detailRecipe = async ({ id }) => {
  const recipeDocRef = doc(db, "recipe", id);
  const recipeDocSnapshot = await getDoc(recipeDocRef);
  return { id: recipeDocSnapshot.id, ...recipeDocSnapshot.data() };
};

// 내가 쓴 레시피 조회 - Get
export const myRecipe = async (nickname) => {
  const recipesQuery = await getDocs(query(collection(db, "recipe")));
  const recipesData = recipesQuery.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const myData = recipesData.filter(
    (item) => item.writer.nickname === nickname
  );

  return myData;
};

// 좋아요한 글 - Get
export const mylikeRecipe = async (nickname) => {
  const recipesQuery = await getDocs(query(collection(db, "recipe")));
  const recipesData = recipesQuery.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const myData = recipesData.filter((item) => item.heart.includes(nickname));

  return myData;
};
