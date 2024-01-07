import { atom } from "recoil";

// 메뉴 상태 데이터
export const MenuStateAtom = atom({
  key: "MenuStateAtom",
  default: {
    Login: false,
    home: false,
    shop: false,
  },
});

// 카테고리 데이터
export const categoryAtom = atom({
  key: "categoryAtom",
  default: {
    메인반찬: false,
    밑반찬: false,
    국탕: false,
    밥죽: false,
    튀김: false,
    면요리: false,
    양념소스: false,
    김치젓갈: false,
    셀러드: false,
    빵: false,
    디저트: false,
    차음료: false,
    편의점요리: false,
    술: false,
    도시락: false,
    기타: false,
  },
});

export const RecipeAtom = atom({
  key: "RecipeAtom",
  default: {
    title: "",
    category: "",
  },
});
