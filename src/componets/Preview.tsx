import React from "react";
import styled from "styled-components";

const Preview = (): JSX.Element => {
  return (
    <Container>
      <iframe id="preview"></iframe>
    </Container>
  );
};

const Container = styled.div`
  grid-column: span 8;
`;

export default Preview;
