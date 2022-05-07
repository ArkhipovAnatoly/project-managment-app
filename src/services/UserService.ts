import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { UserSignInData, UserSignUpData } from '../types';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://react-app-kanban.herokuapp.com' }),
  endpoints: (build) => ({
    userSignIn: build.mutation<UserSignInData, UserSignInData>({
      query: (userData) => ({
        url: '/signin',
        method: 'POST',
        body: userData,
      }),
    }),
    userSignUp: build.mutation<UserSignUpData, UserSignUpData>({
      query: (userData) => ({
        url: '/signup',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});
