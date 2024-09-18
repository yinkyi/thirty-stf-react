// requireAuth.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { IinitialState } from './utils/interface';
import { useAuth0 } from '@auth0/auth0-react';

interface RequireAuthProps {
  element: React.ReactElement;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ element }) => {
  const { loginWithRedirect } = useAuth0();
  const isAuth = useSelector((state: IinitialState) => state.auth.isAuth); // Adjust based on your state
  if (isAuth) {
    return element;
  } else {
    loginWithRedirect();
    return;
  }
};

export default RequireAuth;
