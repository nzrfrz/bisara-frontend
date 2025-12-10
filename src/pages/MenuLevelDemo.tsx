import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useFlattenRoutes } from "../routes/useFlattenRoute";
import { normalizeStringPath } from "../modules";

export const MenuLevelDemo = () => {
  const location = useLocation();
  const flattenedRoutes = useFlattenRoutes();

  const getPageTitle = useMemo(() => {
    const temp = flattenedRoutes.filter((route) => normalizeStringPath(location.pathname).includes(normalizeStringPath(route?.path as string)));
    return temp[temp.length - 1].title;
  }, [location]);

  return (
    <div style={{ width: '100%', height: '100%', paddingTop: 16 }}>
      <span>You are viewing demo {getPageTitle} page</span>
    </div>
  );
};