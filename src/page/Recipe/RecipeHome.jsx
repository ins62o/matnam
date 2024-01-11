import React, { useEffect, useState } from "react";
import LogoBar from "./../../component/LogoBar";
import MenuBar from "../../component/MenuBar";
import { MenuStateAtom } from "../../atom";
import { useRecoilState } from "recoil";
import RecipeMenu from "./RecipeMenu";
import RecipeBest from "./RecipeBest";
import styled from "styled-components";
import RecipeNew from "./RecipeNew";
import Footer from "../../component/Footer";

export default function RecipeHome() {
  const [menu, setMenu] = useRecoilState(MenuStateAtom);

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
  max-width: 500px;
  margin: 0 auto;
`;
