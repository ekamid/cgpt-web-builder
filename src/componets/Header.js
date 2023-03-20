import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <HeaderContainer>
      <Heading>Easy Web Builder</Heading>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background-color: #000;
  color: #fff;
  padding: 20px 10px;
`;

const Heading = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin: 0;
`;

export default Header;