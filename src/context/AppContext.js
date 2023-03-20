import React, { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [history, setHistory] = useState([]);
  const [isGenerating, setIsgenerating] = useState(false);

  const toggleIsGenerating = () => {
    setIsgenerating((prev) => !prev);
  };

  const addToHistory = ({ command, html, css, js }) => {
    setHistory((prev) => [
      ...prev,
      { id: prev.length + 1, command: command, html: html, css: css, js: js },
    ]);
  };

  const getFromHistory = (id) => {
    const data = history.filter((item) => item.id === id);
    return data[0];
  };

  return (
    <AppContext.Provider
      value={{
        history,
        addToHistory,
        getFromHistory,
        isGenerating,
        toggleIsGenerating,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
