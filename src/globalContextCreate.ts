import { createContext } from "react";

const initialGlobalContextValue: IGlobalContext = {
  isDarkMode: false,
  setIsDarkMode: () => { },
  language: "",
  setLanguage: () => { },
  openNotification: () => { },
  openMessage: () => { },
  windowDimension: { width: 0, height: 0 },
  contentContainerRef: null,
};

export const GlobalContext = createContext<IGlobalContext>(initialGlobalContextValue);