import { createSlice } from '@reduxjs/toolkit';
import { IinitialState } from '../utils/interface';

const initialAuthState: IinitialState['auth'] = {
  isAuth: false,
  accessToken: null,
  user: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuth = true;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;

      // localStorage.setItem('isAuth', 'true');
      // localStorage.setItem('token', action.payload.accessToken);
      // localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    logout(state) {
      state.isAuth = false;
      state.accessToken = null;
      state.user = {};

      // localStorage.removeItem('isAuth');
      // localStorage.removeItem('token');
      // localStorage.removeItem('user');
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
