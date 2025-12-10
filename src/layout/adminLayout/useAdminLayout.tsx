import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation } from "react-router-dom";

import type { MenuProps } from "antd";
import { sidebarRoutes } from "../../routes/routeRegistryPrivate";
import { GlobalContext } from "../../globalContextCreate";
import { useFlattenRoutes } from "../../routes/useFlattenRoute";
import { normalizeStringPath } from "../../modules";

interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

const sidebarItems = sidebarRoutes.map((data) => {
  return {
    key: data.key,
    label: data.label,
    icon: data.icon,
    children: data.children
  }
});

const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

const levelKeys = getLevelKeys(sidebarItems as LevelKeysProps[]);

export const useAdminLayout = () => {
  const location = useLocation();
  const flattenedRoutes = useFlattenRoutes();
  const { windowDimension } = useContext(GlobalContext);

  const [isShrink, setIsShrink] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [currentRouteKeys, setCurrentRouteKeys] = useState<string[] | []>([]);

  const collapsableWidth = useMemo(() => {
    return windowDimension.width >= 768 ? "70" : "0";
  }, [windowDimension.width]);

  const onOpenChangeMenu: MenuProps["onOpenChange"] = (opennedKeys: string[]) => {
    const currentOpenKey = opennedKeys.find((key) => openKeys.indexOf(key) === -1);

    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setOpenKeys(
        opennedKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    }
    else setOpenKeys(opennedKeys);
  };

  const handleClickedMenu = useCallback(() => {
    return collapsed === false && isShrink === true && setCollapsed(true);
  }, [collapsed, isShrink]);

  useEffect(() => {
    /**
     * To get the last path that user visited, so when user is refresh the page,
     * the sidebar indicator still on the same menu that user visited.
    */
    const defaultSelectedKeys = flattenedRoutes.filter((route) => normalizeStringPath(location.pathname).includes(normalizeStringPath(route?.path as string)));
    const routeKeys = defaultSelectedKeys.map((item) => item.key).reverse();    

    setCurrentRouteKeys(routeKeys as string[]);
  }, [location.pathname]);

  return {
    openKeys,
    sidebarItems,
    currentRouteKeys,
    collapsableWidth,
    onOpenChangeMenu,
    handleClickedMenu,
    isShrink, setIsShrink,
    collapsed, setCollapsed,
  }
};