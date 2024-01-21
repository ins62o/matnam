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

export const imagesAtom = atom({
  key: "imagesAtom",
  default: [],
});

// 레시피작성 - 데이터 관리 상태
export const RecipeAtom = atom({
  key: "RecipeAtom",
  default: {
    title: "",
    categoryName: "",
    ingredients: [],
    cookTip: "",
    cookStep: [{ info: "", imageUrl: "" }],
    date: new Date(),
    heart: [],
    writer: {
      nickname: localStorage.getItem("nickname"),
      profile: localStorage.getItem("profile"),
    },
    see: 0,
  },
});
