import React from "react";
import styled, { keyframes } from "styled-components";

const Loader = ({ size, color, border }) => {
  return (
    <Container>
      <Spinner size={size} color={color} border={border} />
      <Text>Generating</Text>
    </Container>
  );
};

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Text = styled.h1`
  color: ${(props) => props.color || "#fff"};
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #000c;
  gap: 20px;
`;

const Spinner = styled.div`
  border-radius: 50%;
  width: ${(props) => props.size || "75px"};
  height: ${(props) => props.size || "75px"};
  border: ${(props) => props.border || "4px"} solid
    ${(props) => props.color || "#fff"};
  border-top-color: transparent;
  animation: ${spin} 1s linear infinite;
`;

export default Loader;
