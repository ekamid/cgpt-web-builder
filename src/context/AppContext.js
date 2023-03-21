import React, { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [history, setHistory] = useState([]);
  const [isGenerating, setIsgenerating] = useState(false);

  const toggleIsGenerating = (data) => {
    setIsgenerating(data);
  };

  const addToHistory = ({ command, html, css, js }) => {
    setHistory((prev) => [
      {
        id: prev.length + 1,
        command: command,
        html: html,
        css: css,
        js: js,
        active: true,
      },
      ...prev.map((item) => ({ ...item, active: false })),
    ]);
  };

  const getFromHistory = (id) => {
    let selected;
    history.forEach((item) => {
      if (item.id === id) {
        selected = item;
      }
    });

    setHistory((prev) => [
      ...prev.map((item) =>
        item.id === id ? { ...item, active: true } : { ...item, active: false }
      ),
    ]);
    // const data = history.filter((item) => item.id === id);
    // return data[0];

    return selected;
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
