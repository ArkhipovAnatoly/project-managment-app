import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { RootState } from '../app/store/store';
import { BoardData, BoardDataResponse, DeleteBoardResponse } from '../types';

export const boardAPI = createApi({
  reducerPath: 'boardAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://react-app-kanban.herokuapp.com',
    prepareHeaders: (headers: Headers, { getState }) => {
      const token =
        (getState() as RootState).userAuthReducer.auth.token || localStorage.getItem('token');

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Board'],
  endpoints: (build) => ({
    getAllBoards: build.query<BoardData[], ''>({
      query: () => ({
        url: '/boards',
      }),
      providesTags: () => ['Board'],
    }),
    getBoard: build.query<BoardData, string>({
      query: (boardId) => ({
        url: `/boards/${boardId}`,
      }),
    }),
    updateBoard: build.mutation<BoardDataResponse, BoardData>({
      query(userData) {
        const { id, ...body } = userData;
        return {
          url: `/boards/${id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['Board'],
    }),
    createBoard: build.mutation<BoardDataResponse, BoardData>({
      query(boardData) {
        return {
          url: `/boards`,
          method: 'POST',
          body: boardData,
        };
      },
      invalidatesTags: ['Board'],
    }),
    deleteBoard: build.mutation<DeleteBoardResponse, string>({
      query: (boardId) => ({
        url: `/boards/${boardId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Board'],
    }),
  }),
});
