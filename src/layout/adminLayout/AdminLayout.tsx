import { Outlet, Navigate, useNavigate } from "react-router-dom";

import { Layout, Menu, Typography } from "antd";

import { useAdminLayout } from "./useAdminLayout";
import { MenuBurger } from "../menuBurger/MenuBurger";
import { ThemeToggler } from "../themeToggler/ThemeToggler";

import styles from './AdminLayout.module.css';
import brandLogo from '../../assets/brand-logo-RGB.webp';
import { CustomButton } from "../../components";
import { HomeOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Header, Sider, Content, Footer } = Layout;

export const AdminLayout = () => {
  const COOKIE = document.cookie;
  const navigateTo = useNavigate();

  const {
    openKeys,
    setIsShrink,
    sidebarItems,
    currentRouteKeys,
    collapsableWidth,
    onOpenChangeMenu,
    handleClickedMenu,
    collapsed, setCollapsed,
  } = useAdminLayout();
  
  const displayBrandText = collapsed === false ? 'flex' : 'none';

  if (!COOKIE) return <Navigate to={"/"} replace />

  return (
    <Layout style={{ height: "100vh" }}>
      <MenuBurger
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <Sider
        width={230}
        collapsible
        breakpoint="lg"
        trigger={null}
        collapsed={collapsed}
        className={styles.sider}
        collapsedWidth={collapsableWidth}
        onBreakpoint={(broken) => setIsShrink(broken)}
        onCollapse={(isCollapsed) => setCollapsed(isCollapsed)}
      >
        <div className={styles.siderHeaderContainer}>
          <div className={styles.siderHeaderImageContainer}>
            <img src={brandLogo} />
          </div>
          <div style={{ display: displayBrandText, alignItems: 'center', justifyContent: 'center' }}>
            <Title level={4} style={{ lineHeight: 0, marginBottom: 0 }}>Admin Panel</Title>
          </div>
        </div>
        <Menu
          mode="inline"
          inlineIndent={16}
          openKeys={openKeys}
          items={sidebarItems}
          onClick={handleClickedMenu}
          className={styles.siderMenu}
          selectedKeys={currentRouteKeys}
          onOpenChange={onOpenChangeMenu}
          defaultSelectedKeys={currentRouteKeys}
          defaultOpenKeys={currentRouteKeys as string[]}
        />
      </Sider>
      <Layout>
        <Header className={styles.headerNavbar}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <ThemeToggler />
            <CustomButton icon={<HomeOutlined />} onClick={() => {navigateTo('/')}}/>
          </div>
        </Header>
        <Content>
          <Outlet />
        </Content>
        <Footer className={styles.layoutContentFooter}>
          <span>Admin Panel ©2023 by nzrfrz</span>
        </Footer>
      </Layout>
    </Layout>
  )
};