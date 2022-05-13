import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { RootState } from '../app/store/store';
import {
  DeleteUserResponse,
  EditUserProfileData,
  EditUserProfileResponse,
  SignInResponse,
  SignUpResponse,
  User,
  UserSignInData,
  UserSignUpData,
} from '../types';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://react-app-kanban.herokuapp.com',
    prepareHeaders: (headers: Headers, { getState }) => {
      const token = (getState() as RootState).userAuthReducer.auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
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
      query(userData) {
        const { userId, ...body } = userData;
        return {
          url: `users/${userId}`,
          method: 'PUT',
          body,
        };
      },
    }),
    userDelete: build.mutation<DeleteUserResponse, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'DELETE',
      }),
    }),
    getUser: build.query<User, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
      }),
    }),
  }),
});
