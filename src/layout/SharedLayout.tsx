import { Navigate, Outlet, useLocation } from "react-router-dom";

import { 
  Layout, 
} from "antd";

const { Content } = Layout;

const COOKIE = document.cookie;

export const SharedLayout = () => {
  const location = useLocation();

  if (location.pathname === '/login' && COOKIE) return <Navigate to={"/"} replace />
  
  return (
    <Layout style={{ height: "100vh" }}>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};