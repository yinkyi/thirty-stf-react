import { ConfigProvider } from 'antd';
import { Fragment } from 'react';
import Template from './Template';
import { TemplateProps } from '../utils/interface';

const Layout: React.FC<TemplateProps> = ({ children }) => {
  return (
    <Fragment>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#FF8C00',
            borderRadius: 6,
            fontFamily: 'Manrope',
          },
          components: {
            Button: {
              colorPrimary: '#FF8C00',
              algorithm: true,
            },
          },
        }}
      >
        <Template children={children} />
      </ConfigProvider>
    </Fragment>
  );
};
export default Layout;
