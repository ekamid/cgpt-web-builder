import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const Loader = ({ size, color, border, texts }) => {
  const [text, setText] = useState(texts.length ? texts[0] : "");

  useEffect(() => {
    if (texts.length) {
      let i = 0;
      setInterval(() => {
        setText(texts[i]);
        i = i === texts.length - 1 ? 0 : i + 1;
      }, 3000);
    }
  }, [texts]);

  return (
    <Container>
      <Spinner size={size} color={color} border={border} />
      <Text>{text}</Text>
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
