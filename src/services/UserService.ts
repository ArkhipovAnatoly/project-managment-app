import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { RootState } from '../app/store/store';
import {
  DeleteUserData,
  EditUserProfileData,
  EditUserProfileResponse,
  SignInResponse,
  SignUpResponse,
  UserSignInData,
  UserSignUpData,
} from '../types';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://react-app-kanban.herokuapp.com' }),
  endpoints: (build) => ({
    userSignIn: build.mutation<SignInResponse, UserSignInData>({
      query: (userData) => ({
        url: '/signin',
        method: 'POST',
        body: userData,
      }),
    }),
    userSignUp: build.mutation<SignUpResponse, UserSignUpData>({
      query: (userData) => ({
        url: '/signup',
        method: 'POST',
        body: userData,
      }),
    }),
    userUpdate: build.mutation<EditUserProfileResponse, EditUserProfileData>({
      query: (userData) => ({
        url: `/users/${userData.userId}`,
        prepareHeaders: (headers: Headers, { getState }) => {
          const token = (getState() as RootState).userAuthReducer.auth.token;
          if (token) {
            headers.set('authorization', `Bearer ${token}`);
          }

          return headers;
        },
        method: 'PUT',
        body: userData,
      }),
    }),
    userDelete: build.mutation<EditUserProfileResponse, DeleteUserData>({
      query: (userData) => ({
        url: `/users/${userData.userId}`,
        prepareHeaders: (headers: Headers, { getState }) => {
          const token = (getState() as RootState).userAuthReducer.auth.token;
          if (token) {
            headers.set('authorization', `Bearer ${token}`);
          }

          return headers;
        },
        method: 'DELETE',
      }),
    }),
  }),
});
