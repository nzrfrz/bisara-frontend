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
  loginCredential: undefined,
  setLoginCredential: () => { }
};

export const GlobalContext = createContext<IGlobalContext>(initialGlobalContextValue);