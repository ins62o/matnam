import React, { useEffect, useState } from "react";
import LogoBar from "../../component/LogoBar";
import MenuBar from "../../component/MenuBar";
import { MenuState } from "../../atom";
import { useRecoilState } from "recoil";

export default function ShopHome() {
  const [menu, setMenu] = useRecoilState(MenuState);

  useEffect(() => {
    setMenu((prev) => ({
      ...prev,
      shop: true,
    }));

    return () => {
      setMenu((prev) => ({
        ...prev,
        shop: false,
      }));
    };
  }, [menu.shop]);
  return (
    <>
      <LogoBar />
      <MenuBar />
      하이
    </>
  );
}
