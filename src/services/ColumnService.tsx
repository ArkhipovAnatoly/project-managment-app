import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { RootState } from '../app/store/store';
import { ColumnsData, BoardDataResponse, DeleteColumn, DeleteColumnResponse } from '../types';

export const columnAPI = createApi({
  reducerPath: 'columnAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://react-app-kanban.herokuapp.com/boards/`,
    prepareHeaders: (headers: Headers, { getState }) => {
      const token =
        (getState() as RootState).userAuthReducer.auth.token || localStorage.getItem('token');

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Columns'],
  endpoints: (build) => ({
    fetchColumns: build.query<ColumnsData[], string>({
      query: (idBoard) => ({
        url: `${idBoard}/columns`,
      }),
      providesTags: () => ['Columns'],
    }),
    createColumn: build.mutation<ColumnsData[], ColumnsData>({
      query: (post) => ({
        url: `${post.id}/columns`,
        method: 'POST',
        body: { title: post.title, order: post.order },
      }),
      invalidatesTags: ['Columns'],
    }),
    deleteColumn: build.mutation<DeleteColumnResponse, DeleteColumn>({
      query: (post) => ({
        url: `${post.boardId}/columns/${post.deleteColumnId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Columns'],
    }),
  }),
});
