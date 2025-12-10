import { useMemo } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from "antd";
import { routeRegistryPublic } from '../../../routes/routeRegistryPublic'

const navbarMenu = routeRegistryPublic.map((route: IPageRoute) => {
  return {
    key: route.key,
    title: route.title,
    path: route.path
  }
});

export const NavbarMenu = () => {
  const navigateTo = useNavigate();
  const location = useLocation();  

  const navbarMenuItems = useMemo(() => {
    return navbarMenu.map((route: any, index: number) => {      
      return (
        <Button
          key={index}
          type="text"
          variant={location.pathname === route.path ? "outlined" : "text"}
          color={location.pathname === route.path ? "orange" : "default"}
          onClick={() => navigateTo(route.path)}
        >
          {route.title}
        </Button>
      )
    })
  }, [navbarMenu, location]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: "8px" }}>
      {navbarMenuItems}
    </div>
  );
};