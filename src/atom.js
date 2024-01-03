import { atom } from "recoil";

// 메뉴 상태 데이터
export const MenuState = atom({
  key: "MenuState",
  default: {
    Login: false,
    home: false,
    shop: false,
  },
});
