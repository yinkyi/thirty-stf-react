import React from 'react';
import { Dropdown, Layout, Menu, MenuProps, Space } from 'antd';
import {
  GlobalOutlined,
  HomeOutlined,
  CarOutlined,
  CalendarOutlined,
  RocketOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useAuth0 } from '@auth0/auth0-react';
import { IinitialState } from '../utils/interface';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/auth';
import { useMutation } from 'react-query';
import { saveUserInfo } from '../libs/fetcher';

const { Header } = Layout;

const Nav: React.FC = () => {
  const auth = useSelector((state: IinitialState) => state.auth);
  const dispatch = useDispatch();
  const {
    loginWithRedirect,
    isAuthenticated,
    logout,
    user,
    getAccessTokenSilently,
    getIdTokenClaims,
  } = useAuth0();

  const handleLogout = () => {
    logout({});
    dispatch(authActions.logout());
  };

  const saveUser = useMutation(
    (token: string) => {
      return saveUserInfo(token);
    },
    {
      onSuccess: async () => {},
    },
  );
  console.log(auth?.accessToken);
  if (isAuthenticated && !auth?.isAuth) {
    const fetchTokens = async () => {
      // Get the ID token
      const idTokenClaims = await getIdTokenClaims();
      const idToken = idTokenClaims?.__raw; // The raw ID token
      if (idToken) {
        saveUser.mutate(idToken);
      }

      // Get the Access Token
      const accessToken = await getAccessTokenSilently();
      dispatch(
        authActions.login({
          isAuth: isAuthenticated,
          accessToken: accessToken,
          user: user,
        }),
      );
    };

    // Fetch the tokens only once when the user is authenticated
    fetchTokens();
  }

  const items: MenuProps['items'] = [
    {
      label: (
        <a target='_blank' rel='noopener noreferrer' href='https://www.antgroup.com'>
          {auth?.user?.given_name || auth?.user?.name}
        </a>
      ),
      key: '0',
    },
    {
      label: (
        <a target='_blank' rel='noopener noreferrer' onClick={handleLogout}>
          Logout
        </a>
      ),
      key: '1',
    },
  ];

  return (
    <Header className='app-header'>
      <div style={{ display: 'flex', paddingLeft: '10%' }}>
        <div style={{ flex: 1 }} className='logo'>
          {import.meta.env.VITE_WEBSITE_NAME}
        </div>
        <Menu
          theme='dark'
          mode='horizontal'
          defaultSelectedKeys={['1']}
          style={{ flex: 2, minWidth: 0 }}
        >
          <Menu.Item key='1' icon={<GlobalOutlined />}>
            Flights
          </Menu.Item>
          <Menu.Item key='2' icon={<HomeOutlined />}>
            Hotels
          </Menu.Item>
          <Menu.Item key='3' icon={<CarOutlined />}>
            Buses
          </Menu.Item>
          <Menu.Item key='4' icon={<CalendarOutlined />}>
            Travel Services
          </Menu.Item>

          {!auth.isAuth ? (
            <Menu.Item key='7' icon={<RocketOutlined />} onClick={() => loginWithRedirect()}>
              Log In
            </Menu.Item>
          ) : (
            <Menu.Item key='7'>
              <Dropdown menu={{ items }}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space size={2}>
                    <UserOutlined />
                  </Space>
                </a>
              </Dropdown>
            </Menu.Item>
          )}
        </Menu>
      </div>
    </Header>
  );
};

export default Nav;
