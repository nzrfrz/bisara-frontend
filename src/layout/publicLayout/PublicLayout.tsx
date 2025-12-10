import { useMemo } from "react";
import { useQueryHook } from "../../_utils";
import { Outlet, useNavigate } from "react-router-dom";

import {
  Layout,
  Avatar,
  Spin
} from "antd";

import { NavbarMenu } from "./navbarMenu/NavbarMenu";
import { CustomButton } from "../../components";

import homeLogo from '../../assets/logo.png';
import { ThemeToggler } from "../themeToggler/ThemeToggler";

import styles from './PublicLayout.module.css';
import defaultAvatar from '../../assets/default-profile-pic.png'

const { Header, Content, Footer } = Layout;

export const PublicLayout = () => {
  const navigateTo = useNavigate();

  const me = useQueryHook(
    true,
    'user/me',
    ['myInfo'],
    1440
  );
  // console.log(me.data?.data?.email); // to fetch user info
  // console.log("user info: \d", me.isLoading)

  const credentialButton = useMemo(() => {
    if (me.isLoading === true) return <Spin size="default" />
    if (!me.data) return <CustomButton children="LOGIN" size="large" colorType="warning" onClick={() => { navigateTo('/login') }} />
    else return (
      <CustomButton
        colorType="default"
        shape="circle"
        icon={
          <Avatar
            size="default"
            src={defaultAvatar}
          />
        }
        onClick={() => navigateTo('/dashboard')}
      />
    )
  }, [me, navigateTo]);

  return (
    <Layout style={{ height: "100vh" }}>
      <Layout>
        <Header className={styles.headerNavbar}>
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: '16px' }}>
            <div className={styles.siderHeaderImageContainer}>
              <img alt="#" src={homeLogo} />
            </div>
            <NavbarMenu />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: '16px' }}>
            <ThemeToggler />
            {credentialButton}
          </div>
        </Header>
        <Content>
          <Outlet />
        </Content>
        <Footer className={styles.layoutContentFooter}>
          <span>This is the footer</span>
        </Footer>
      </Layout>
    </Layout>
  );
};