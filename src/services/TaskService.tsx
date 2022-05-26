import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { RootState } from '../app/store/store';
import { TasksData, TaskDataGet, TaskDataPost, TaskDataPostResponse } from '../types';

export const taskAPI = createApi({
  reducerPath: 'taskAPI',
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
  tagTypes: ['Tasks'],
  endpoints: (build) => ({
    fetchTasks: build.query<TasksData, TaskDataGet>({
      query: (tasksDataGet) => ({
        url: `${tasksDataGet.idBoard}/columns/${tasksDataGet.idColumn}`,
      }),
      providesTags: () => ['Tasks'],
    }),
    // updateColumn: build.mutation<UpdateColumnResponse, ColumnsData>({
    //   query(columnData) {
    //     return {
    //       url: `${columnData.idBoard}/columns/${columnData.id}`,
    //       method: 'PUT',
    //       body: { title: columnData.title, order: columnData.order },
    //     };
    //   },
    //   invalidatesTags: ['Tasks'],
    // }),
    createTask: build.mutation<TaskDataPostResponse, TaskDataPost>({
      query: (tasksDataPost) => ({
        url: `${tasksDataPost.boardId}/columns/${tasksDataPost.columnId}`,
        method: 'POST',
        body: {
          title: tasksDataPost.title,
          order: tasksDataPost.order,
          description: tasksDataPost.description,
          userId: tasksDataPost.userId,
        },
      }),
      invalidatesTags: ['Tasks'],
    }),
    // deleteColumn: build.mutation<DeleteColumnResponse, DeleteColumn>({
    //   query: (post) => ({
    //     url: `${post.boardId}/columns/${post.deleteColumnId}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: ['Tasks'],
    // }),
  }),
});
