import React, { ReactNode } from 'react';
import { Layout } from 'antd';
import Nav from './Nav';
import AppFooter from './Footer';
const { Content } = Layout;

const Template: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Layout>
      <Nav />
      <Content style={{ padding: '0 48px', marginTop: '10px' }}>{children}</Content>
      <AppFooter />
    </Layout>
  );
};

export default Template;
