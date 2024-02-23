import { atom } from "recoil";

// 하단메뉴 - 상태 아톰
export const MenuStateAtom = atom({
  key: "MenuStateAtom",
  default: {
    Login: false,
    home: false,
    feed: false,
    mypage: false,
  },
});

// 이미지 배열 - 상태 아톰
export const imagesAtom = atom({
  key: "imagesAtom",
  default: [],
});

// 레시피 작성 데이터 - 상태 아톰
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
    writer: {},
    see: 0,
  },
});

// users 초기 데이터 - 상태 아톰
export const usersAtom = atom({
  key: "usersAtom",
  default: {
    email: "",
    nickname: "",
    profile: "https://s3.ap-northeast-2.amazonaws.com/matnam.me/LogoIcon.png",
    following: [],
    followers: [],
  },
});
