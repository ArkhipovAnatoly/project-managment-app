import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { SignInResponse, SignUpResponse, UserSignInData, UserSignUpData } from '../types';

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
  }),
});
