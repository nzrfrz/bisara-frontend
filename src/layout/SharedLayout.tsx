import { Outlet } from "react-router-dom";

import { 
  Layout, 
} from "antd";

const { Content } = Layout;

export const SharedLayout = () => {
  
  return (
    <Layout style={{ height: "100vh" }}>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};