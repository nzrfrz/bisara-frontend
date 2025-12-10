import { useContext, useMemo } from "react";
import { GlobalContext } from "../../globalContextCreate";

import styles from './ThemeToggler.module.css';

export const ThemeToggler = () => {
  const { isDarkMode, setIsDarkMode } = useContext(GlobalContext);

  const classname = useMemo(() => {
    return isDarkMode ? styles.darkMode : styles.lightMode
  }, [isDarkMode]);

  return (
    <div className={styles.container} onClick={() => setIsDarkMode(!isDarkMode)}>
      <div className={classname} />
    </div>
  );
};