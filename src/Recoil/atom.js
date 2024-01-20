import { atom, selector } from "recoil";

// 하단메뉴바 상태 아톰
export const MenuStateAtom = atom({
  key: "MenuStateAtom",
  default: {
    Login: false,
    home: false,
    feed: false,
    mypage: false,
  },
});

// 레시피작성 - 카테고리 상태 아톰
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

// 레시피작성 - 데이터 관리 상태
export const RecipeAtom = atom({
  key: "RecipeAtom",
  default: {
    title: "",
    categoryName: "",
    ingredients: [],
    cookTip: "",
    cookStep: [],
    heart: [],
    writer: {
      nickname: localStorage.getItem("nickname"),
      profile: localStorage.getItem("profile"),
    },
    see: 0,
  },
});
