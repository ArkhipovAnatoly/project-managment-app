import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { RootState } from '../app/store/store';
import { ColumnsData, DeleteColumn, DeleteColumnResponse, UpdateColumnResponse } from '../types';

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
    updateColumn: build.mutation<UpdateColumnResponse, ColumnsData>({
      query(columnData) {
        return {
          url: `${columnData.idBoard}/columns/${columnData.id}`,
          method: 'PUT',
          body: { title: columnData.title, order: columnData.order },
        };
      },
      invalidatesTags: ['Columns'],
    }),
    createColumn: build.mutation<ColumnsData[], ColumnsData>({
      query: (columnData) => ({
        url: `${columnData.idBoard}/columns`,
        method: 'POST',
        body: { title: columnData.title, order: columnData.order },
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
