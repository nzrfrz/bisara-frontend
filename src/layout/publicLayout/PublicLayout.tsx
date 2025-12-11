import { 
  useContext, 
  useMemo,
} from "react";
import { useQueryHook } from "../../_utils";
import { Outlet, useNavigate } from "react-router-dom";

import {
  Layout,
  Avatar,
} from "antd";

import { NavbarMenu } from "./navbarMenu/NavbarMenu";
import { CustomButton } from "../../components";

import homeLogo from '../../assets/logo.png';
import { ThemeToggler } from "../themeToggler/ThemeToggler";

import styles from './PublicLayout.module.css';
import defaultAvatar from '../../assets/default-profile-pic.png'
import { GlobalContext } from "../../globalContextCreate";

const { Header, Content, Footer } = Layout;

export const PublicLayout = () => {
  const navigateTo = useNavigate();
  const { loginCredential } = useContext(GlobalContext);

  const me = useQueryHook(
    true,
    'user/me',
    ['myInfo'],
    1440
  );  

  const credentialButton = useMemo(() => {
    if (!loginCredential) return <CustomButton children="LOGIN" size="large" colorType="warning" onClick={() => { navigateTo('/login') }} />
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