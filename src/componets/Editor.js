import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Generator from "@/componets/Generator";
import Header from "@/componets/Header";
import History from "@/componets/History";
import { AppContext } from "@/context/AppContext";
import { extractCode, updatePreview } from "@/utils/helpers";

const Editor = () => {
  const [codes, setCodes] = useState({
    html: "",
    css: "",
    js: "",
  });

  const { addToHistory, getFromHistory } = useContext(AppContext);

  const handleCodes = (e) => {
    setCodes((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //previously genered code
  const getPreviousCode = (id) => {
    const { html, css, js } = getFromHistory(id);
    setCodes({ html, css, js });
  };

  const handleCurrentBuild = (command, message) => {
    const { html, css, js } = extractCode(message);

    setCodes({ html, css, js });

    addToHistory({ command, html, css, js });
  };

  //if code changes, update preview
  useEffect(() => {
    updatePreview(codes);
  }, [codes]);

  const handleCollapse = (event) => {
    // Get the clicked element
    const clickedElement = event.target;

    const parentElement = clickedElement.nextElementSibling;

    if (parentElement.style.visibility == "hidden") {
      parentElement.style.height = "380px";
      parentElement.style.visibility = "visible";
    } else {
      parentElement.style.height = 0;
      parentElement.style.visibility = "hidden";
    }
  };

  return (
    <EditorContainer>
      <Header />
      <Generator handleCurrentBuild={handleCurrentBuild} />
      <History getPreviousCode={getPreviousCode} />
      <Container>
        <ColumnContainer>
          <Heading onClick={handleCollapse}>HTML</Heading>
          <EditorField
            name="html"
            value={codes.html}
            onChange={handleCodes}
            placeholder="Enter HTML code"
          />
        </ColumnContainer>
        <ColumnContainer>
          <Heading onClick={handleCollapse}>CSS</Heading>
          <EditorField
            name="css"
            value={codes.css}
            onChange={handleCodes}
            placeholder="Enter CSS code"
          />
        </ColumnContainer>
        <ColumnContainer>
          <Heading onClick={handleCollapse}>JS</Heading>
          <EditorField
            name="js"
            value={codes.js}
            onChange={handleCodes}
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
  cursor: pointer;
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
