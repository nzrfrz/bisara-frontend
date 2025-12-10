import { useCallback } from "react";

import { sidebarRoutes } from "./routeRegistryPrivate";

export const useFlattenRoutes = () => {
  const flattenRoutes = useCallback((routes: ISidebarRoute[]) => {
    const flatRoutes: ISidebarRoute[] = [];

    function traverse(routelist: ISidebarRoute[]) {
      routelist.forEach(route => {
        const { children, ...routeWithoutChildren } = route;
        flatRoutes.push(routeWithoutChildren);
        if (children) traverse(children);
      });
    };

    traverse(routes);
    return flatRoutes;
  }, []);

  const flattenedRoutes = flattenRoutes(sidebarRoutes);

  return flattenedRoutes;
};