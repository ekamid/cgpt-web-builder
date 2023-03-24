import React, { createContext, FC, ReactElement, useState } from "react";
import { AppContextType, IHistory } from "../@types/@types.builder";

const AppContext = createContext<AppContextType | null>(null);

interface Props {
  children: ReactElement;
}

// React.FC can only be a return type of JSX.Element or equivalent.
const AppProvider: FC<Props> = ({ children }: Props) => {
  const [history, setHistory] = useState<IHistory[]>([]);
  const [isGenerating, setIsgenerating] = useState<boolean>(false);

  const toggleIsGenerating = (data: boolean): void => {
    setIsgenerating(data);
  };

  const addToHistory = ({ command, html, css, js }: IHistory): void => {
    setHistory((prev) => [
      {
        d: prev.length + 1,
        command,
        html,
        css,
        js,
        active: true,
      },
      ...prev.map((item: IHistory) => ({ ...item, active: false })),
    ]);
  };

  const getFromHistory = (id: number): IHistory => {
    let selected: IHistory;
    history.forEach((item: IHistory) => {
      if (item.id === id) {
        selected = item;
      }
    });

    setHistory((prev) => [
      ...prev.map((item) =>
        item.id === id ? { ...item, active: true } : { ...item, active: false }
      ),
    ]);

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
