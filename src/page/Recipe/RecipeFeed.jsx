import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import LogoBar from "../../component/LogoBar";
import MenuBar from "../../component/MenuBar";
import { IoSearchOutline } from "react-icons/io5";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import categorylist from "../../services/category";
import RecipeBox from "./../../component/RecipeBox";
import { useQuery } from "@tanstack/react-query";
import {
  getCategoryRecipes,
  getAllRecipes,
  searchRecipe,
} from "../../Firebase/firebaseFn";
import { useRecoilState } from "recoil";
import { MenuStateAtom } from "../../Recoil/atom";

export default function RecipeFeed() {
  const { category } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get("search");
  const [menu, setMenu] = useRecoilState(MenuStateAtom);
  const [name, setName] = useState("");
  const [recipeData, setRecipeData] = useState([]);
  const searchRef = useRef("");

  // 해당 검색어로 이동 (쿼리스트링 사용)
  const handleSearch = () => {
    const searchTerm = encodeURIComponent(searchRef.current.value);
    navigate(`/recipeFeed?search=${searchTerm}`);
  };

  // 엔터키 Keydown 이벤트 적용
  const handleEnter = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const { error, isLoading, data } = useQuery({
    queryKey: ["FeedRecipe", name],
    queryFn: () =>
      name === "모든" ? getAllRecipes() : getCategoryRecipes(name),
  });

  const { data: searchData, isLoading: searchLoading } = useQuery({
    queryKey: ["searchRecipe", searchValue],
    queryFn: () => searchRecipe(searchValue),
  });

  const recipesToUse = searchValue ? searchData : data;

  useEffect(() => {
    const name = categorylist(category);
    setName(name);
    setMenu((prev) => ({
      ...prev,
      feed: true,
    }));

    return () => {
      setMenu((prev) => ({
        ...prev,
        feed: false,
      }));
    };
  }, [category, name]);

  return (
    <>
      <LogoBar />
      <Container>
        <div className="search-box">
          <div>
            <IoSearchOutline className="search-icon" />
          </div>
          <input
            type="text"
            className="search-input"
            placeholder="오늘은 어떤 요리를 할까요?"
            ref={searchRef}
            onKeyDown={handleEnter}
          />
        </div>
        <div className="main-title">
          {searchValue ? (
            <>
              검색하신 <b className="point">{searchValue}</b> 관련 레시피를
              찾아봤어요
            </>
          ) : (
            <>
              맛남의 <b className="point">{name}</b> 레시피를 살펴보세요 !
            </>
          )}
        </div>
        <div className="card-box">
          {recipesToUse?.map((item) => (
            <RecipeBox name={name} item={item} key={item.id} />
          ))}
        </div>
        <MenuBar />
      </Container>
    </>
  );
}

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding-bottom: 60px;
  .search-box {
    display: flex;
    align-items: center;
    height: 40px;
    background-color: var(--gray-200);
    border-radius: 10px;
    margin: 0px 10px;
  }

  .search-input::placeholder {
    font-weight: 400;
  }

  .search-input {
    width: 80%;
    height: 100%;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0);
    outline: none;
    padding-left: 7px;
    font-weight: 700;
  }

  .search-icon {
    font-size: 1.3rem;
    margin-left: 7px;
    color: var(--dark-gray);
  }

  .main-title {
    text-align: center;
    margin: 20px 0px;
    font-weight: 700;
  }

  .point {
    font-size: 1.4rem;
  }

  .card-box {
    margin: 10px 10px;
    display: flex;
    flex-direction: column;
  }
`;
