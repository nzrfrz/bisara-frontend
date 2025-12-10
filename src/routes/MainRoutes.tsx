import { useMemo } from "react";
import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { 
  AdminLayout, 
  PublicLayout, 
  SharedLayout 
} from "../layout";

import { routeRegistryPublic } from "./routeRegistryPublic";
import { privateRouteListOther } from "./routeRegistryPrivateOther";
import { routeRegistryShared } from './routeRegistryShared';

import { useFlattenRoutes } from "./useFlattenRoute";

export const MainRoute = () => {
  const flattenedRoutes = useFlattenRoutes();

  const publicRouteList = useMemo(() => {
    return routeRegistryPublic.map((route: IPageRoute, index: number) => {
      return <Route key={index} path={route.path} element={route.element} />
    });
  }, [routeRegistryPublic]);

  const privateRouteList = useMemo(() => {
    const routes = [...flattenedRoutes, ...privateRouteListOther];
    return routes.map((route: IPageRoute, index: number) => {
      return (
        <Route key={index} path={route.path} element={route.element} />
      )
    });
  }, [flattenedRoutes]);

  const sharedRouteList = useMemo(() => {
    return routeRegistryShared.map((route: IPageRoute, index: number) => {
      return <Route key={index} path={route.path} element={route.element} />
    });
  }, [routeRegistryShared]);

  return (
    <Routes>
      <Route path="/" element={<PublicLayout />} >
        {publicRouteList}
      </Route>

      <Route path="/" element={<AdminLayout />} >
        <Route path="/dashboard" element={<Navigate to={"/dashboard"} replace />} />
        {privateRouteList}
      </Route>

      <Route path="/" element={<SharedLayout />} >
        {sharedRouteList}
      </Route>
    </Routes>
  );
};