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

export const ModeAtom = atom({
  key: "ModeAtom",
  default: false,
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

// 레시피수정 - 데이터 관리 상태
export const RecipeEditAtom = atom({
  key: "RecipeEditAtom",
  default: {
    title: "",
    categoryName: "",
    ingredients: [],
    cookTip: "",
    cookStep: [],
    date: new Date(),
    heart: [],
    writer: {
      nickname: localStorage.getItem("nickname"),
      profile: localStorage.getItem("profile"),
    },
    see: 0,
  },
});

// users 초기 데이터
export const usersAtom = atom({
  key: "usersAtom",
  default: {
    email: "",
    nickname: "",
    profile: "https://matnam.s3.ap-northeast-2.amazonaws.com/LogoIcon.png",
    following: [],
    followers: [],
  },
});
