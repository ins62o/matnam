// 하단 메뉴바 변경  ( String , Boolean , Funtion )
export const changeMenu = (MenuName, state, setMenu) => {
  setMenu((prev) => ({
    ...prev,
    [MenuName]: state,
  }));
};
