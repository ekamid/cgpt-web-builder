import React, { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  const addToHistory = ({ command, html, css, js }) => {
    setHistory((prev) => [
      ...prev,
      { id: prev.length + 1, command: command, html: html, css: css, js: js },
    ]);
  };

  const getFromHistory = (id) => {
    const data = history.filter((item) => item.id === id);
    console.log(data);
    return data[0];
  };

  return (
    <AppContext.Provider value={{ history, addToHistory, getFromHistory }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
