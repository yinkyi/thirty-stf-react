// requireAuth.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { IinitialState } from './utils/interface';

interface RequireAuthProps {
  element: React.ReactElement;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ element }) => {
  const isAuth = useSelector((state: IinitialState) => state.auth.isAuth); // Adjust based on your state

  return isAuth ? element : <Navigate to='/' />;
};

export default RequireAuth;
