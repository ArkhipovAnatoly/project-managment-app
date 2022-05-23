import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { RootState } from '../app/store/store';
import { BoardData, BoardDataResponse, DeleteBoardResponse } from '../types';

export const boardAPI = createApi({
  reducerPath: 'boardAPI',
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
    getAllBoards: build.query<BoardData[], ''>({
      query: () => ({
        url: '/boards',
      }),
    }),
    getBoard: build.query<BoardData, string>({
      query: (boardId) => ({
        url: `/boards/${boardId}`,
      }),
    }),
    updateBoard: build.mutation<BoardDataResponse, BoardData>({
      query(userData) {
        const { boardId, ...body } = userData;
        return {
          url: `/boards/${boardId}`,
          method: 'PUT',
          body,
        };
      },
    }),
    createBoard: build.mutation<BoardDataResponse, BoardData>({
      query(boardData) {
        return {
          url: `/boards`,
          method: 'POST',
          body: boardData,
        };
      },
    }),
    deleteBoard: build.mutation<DeleteBoardResponse, string>({
      query: (boardId) => ({
        url: `/users/${boardId}`,
        method: 'DELETE',
      }),
    }),
  }),
});
