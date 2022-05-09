import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserAuthData } from '../../../types';

interface UserAuth {
  auth: UserAuthData;
}

const initialState: UserAuth = {
  auth: {
    userId: '',
    token: '',
    isAuth: false,
  },
};

export const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setUserAuthData(state, action: PayloadAction<UserAuthData>) {
      state.auth = { ...state, ...action.payload };
    },
  },
});

export default userAuthSlice.reducer;
