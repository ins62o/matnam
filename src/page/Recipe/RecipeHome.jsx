import React, { useEffect, useState } from "react";
import LogoBar from "./../../component/LogoBar";
import MenuBar from "../../component/MenuBar";
import { MenuState } from "../../atom";
import { useRecoilState } from "recoil";

export default function RecipeHome() {
  const [menu, setMenu] = useRecoilState(MenuState);

  useEffect(() => {
    setMenu((prev) => ({
      ...prev,
      home: true,
    }));

    return () => {
      setMenu((prev) => ({
        ...prev,
        home: false,
      }));
    };
  }, [menu.home]);

  return (
    <>
      <LogoBar />
      <MenuBar />
      <div>레시피홈</div>
    </>
  );
}
