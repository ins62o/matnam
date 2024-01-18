import React, { useState, useEffect } from "react";
import { collection, getDocs, where, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import styled from "styled-components";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import RecipeBox from "./../../component/RecipeBox";

export default function RecipeNew() {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const recipesQuery = query(
        collection(db, "recipe"),
        orderBy("date", "desc")
      );

      const querySnapshot = await getDocs(recipesQuery);
      const newData = [];
      querySnapshot.forEach((doc) => {
        newData.push(doc.data());
      });
      setData(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Container>
      <div className="new-title">
        <div className="title">방금 나온 신상 레시피🎉</div>
        <Link to="/recipeFeed/1">
          <div className="all">
            전체 보기
            <FaAngleRight />
          </div>
        </Link>
      </div>
      <div className="Box">
        {data.slice(0, 1).map((item) => (
          <RecipeBox item={item} key={item.id} getData={getData} />
        ))}
      </div>
    </Container>
  );
}

const Container = styled.div`
  margin: 15px 10px;

  .new-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .title {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 10px;
  }

  .all {
    color: var(--gray-700);
    display: flex;
    align-items: center;
  }
`;
