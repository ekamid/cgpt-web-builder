import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Generator from "@/componets/Generator";
import Header from "@/componets/Header";

const Editor = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");

  function updatePreview() {
    const iframe = document.getElementById("preview");
    const iframeContent = iframe.contentDocument;
    iframeContent.open();
    iframeContent.write(`<style>${css}</style>${html}<script>${js}</script>`);
    iframeContent.close();
  }

  function handleHtmlChange(event) {
    setHtml(event.target.value);
  }

  function handleCssChange(event) {
    setCss(event.target.value);
  }

  function handleJsChange(event) {
    setJs(event.target.value);
  }

  const handleCurrentBuild = (message) => {
    extractCode(message);
  };

  const extractCode = (message) => {
    const regexHtml = /---starthtml---([\s\S]*?)---endhtml---/;
    const regexCss = /---startcss---([\s\S]*?)---endcss---/;
    const regexJs = /---startjs---([\s\S]*?)---endjs---/;

    const html = message.match(regexHtml) ? message.match(regexHtml)[1] : "";
    const css = message.match(regexCss) ? message.match(regexCss)[1] : "";
    const js = message.match(regexJs) ? message.match(regexJs)[1] : "";
    setHtml(html);
    setCss(css);
    setJs(js);

    // updatePreview();
  };

  useEffect(() => {
    updatePreview();
  }, [html, css, js]);

  return (
    <EditorContainer>
      <Header />
      <Generator handleCurrentBuild={handleCurrentBuild} />
      <Container>
        <ColumnContainer>
          <Heading>HTML</Heading>
          <EditorField
            value={html}
            onChange={handleHtmlChange}
            placeholder="Enter HTML code"
          />
        </ColumnContainer>
        <ColumnContainer>
          <Heading>CSS</Heading>
          <EditorField
            value={css}
            onChange={handleCssChange}
            placeholder="Enter CSS code"
          />
        </ColumnContainer>
        <ColumnContainer>
          <Heading>JS</Heading>
          <EditorField
            value={js}
            onChange={handleJsChange}
            placeholder="Enter JS code"
          />
        </ColumnContainer>
      </Container>
    </EditorContainer>
  );
};

const EditorContainer = styled.div`
  grid-column: span 4;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding: 10px;
  background-color: #f2f1f0;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Heading = styled.h2`
  font-size: 18px;
  color: #fff;
  background-color: #000;
  padding: 6px;
  margin: 0;
`;

const EditorField = styled.textarea`
  height: 380px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  resize: none;
  font-size: 16px;
  font-family: "Arial", sans-serif;
  /* Styling the scrollbar */
  &::-webkit-scrollbar {
    width: 10px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #888;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;
export default Editor;
