import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
export default function Menu({ page, icon, title, categoryName }) {
  return (
    <Container>
      <Link to={page}>
        <div>
          <div className="menu-icon">{icon}</div>
          <div className="menu-name">{title}</div>
        </div>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 25%;

  .menu-icon {
    font-size: 1.5rem;
    text-align: center;
  }

  .menu-name {
    margin-top: 5px;
    font-weight: 700;
    text-align: center;
  }
`;
