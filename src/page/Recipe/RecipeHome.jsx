import React, { useEffect, useState } from "react";
import LogoBar from "./../../component/LogoBar";
import MenuBar from "../../component/MenuBar";
import { MenuStateAtom, RecipeAtom } from "../../Recoil/atom";
import { useRecoilState } from "recoil";
import RecipeMenu from "./RecipeMenu";
import RecipeBest from "./RecipeBest";
import styled from "styled-components";
import RecipeNew from "./RecipeNew";
import Footer from "../../component/Footer";

export default function RecipeHome() {
  const [menu, setMenu] = useRecoilState(MenuStateAtom);
  const [recipe, setRecipe] = useRecoilState(RecipeAtom);
  const nickname = localStorage.getItem("nickname");
  const profile = localStorage.getItem("profile");
  const email = localStorage.getItem("email");

  useEffect(() => {
    setMenu((prev) => ({
      ...prev,
      home: true,
    }));

    setRecipe((prev) => ({
      ...prev,
      writer: { nickname, profile, email },
    }));

    return () => {
      setMenu((prev) => ({
        ...prev,
        home: false,
      }));
    };
  }, [menu.home]);

  return (
    <Container>
      <LogoBar />
      <MenuBar />
      <RecipeMenu />
      <RecipeBest />
      <RecipeNew />
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  overflow: auto;
  padding-bottom: 80px;
  max-width: 480px;
  margin: 0 auto;
`;
