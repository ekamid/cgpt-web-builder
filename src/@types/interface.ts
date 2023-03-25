export interface ICodes {
  html: string;
  css: string;
  js: string;
}

export interface IHistory {
  id?: number;
  command: string;
  html: string;
  css: string;
  js: string;
  active?: boolean;
}

export type AppContextType = {
  history: IHistory[];
  addToHistory: (history: IHistory) => void;
  getFromHistory: (id: number) => IHistory;
  isGenerating: boolean;
  toggleIsGenerating: (data: boolean) => void;
};
