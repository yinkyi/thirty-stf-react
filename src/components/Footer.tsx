import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const AppFooter: React.FC = () => (
  <Footer style={{ textAlign: 'center' }}>
    Copyright ©{new Date().getFullYear()} Created by 30 Seconds To Fly
  </Footer>
);

export default AppFooter;
