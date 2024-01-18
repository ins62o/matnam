import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "../firebase";

// 모든 레시피 카드 Get
export const getAllRecipes = async () => {
  const recipesQuery = await getDocs(
    query(collection(db, "recipe"), orderBy("date", "desc"))
  );
  return recipesQuery.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// 카테고리별 레시피 카드 Get
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
