import { useEffect, useRef, useState } from "react";
import { themeToken, themeComponents } from "./themeToken";
import { GlobalContext } from "./globalContextCreate";

import { theme, ConfigProvider, notification, message } from "antd";

export const GlobalContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { defaultAlgorithm, darkAlgorithm } = theme;

  const contentContainerRef = useRef<HTMLDivElement>(null);

  const [language, setLanguage] = useState<string>("en");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [api, contextHolder] = notification.useNotification();
  const [messageApi, messageContextHolder] = message.useMessage();

  const [windowDimension, setWindowDimension] = useState<windowDimensionData>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const openNotification = (
    type: notificationType,
    key: string,
    message: string,
    description: string
  ) => {
    api[type]({
      key,
      message,
      description,
      placement: "bottomLeft",
    });
  };

  const openMessage = (messagetype: notificationType, messageContent: string) => {
    messageApi.open({
      type: messagetype,
      content: messageContent,
    });
  };

  function getWindowSize() {
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", getWindowSize);

    return () => {
      window.removeEventListener('resize', getWindowSize);
    }
  }, [window]);

  const contextValues: IGlobalContext = {
    isDarkMode,
    setIsDarkMode,
    openNotification,
    openMessage,
    windowDimension,
    language, setLanguage,
    contentContainerRef,
  };

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--antdm-color-bg', isDarkMode ? "#171d20" : "#dfe7e8");
    root.style.setProperty('--antdm-text-clr', isDarkMode ? "white" : "black");
  }, [isDarkMode]);

  return (
    <GlobalContext value={contextValues}>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
          token: themeToken(isDarkMode),
          ...themeComponents(isDarkMode)
        }}
      >
        {contextHolder}
        {messageContextHolder}
        {children}
      </ConfigProvider>
    </GlobalContext>
  );
};