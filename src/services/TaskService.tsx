import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { RootState } from '../app/store/store';
import {
  TaskData,
  TaskDataGet,
  TaskDataPost,
  TaskDataPostResponse,
  DeleteTask,
  DeleteTaskResponse,
  UpdateTaskResponse,
} from '../types';

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
    fetchTasks: build.query<TaskData[], TaskDataGet>({
      query: (tasksDataGet) => ({
        url: `${tasksDataGet.idBoard}/columns/${tasksDataGet.idColumn}/tasks`,
      }),
      providesTags: () => ['Tasks'],
    }),
    updateTask: build.mutation<UpdateTaskResponse, TaskDataPost>({
      query(tasksDataUpdate) {
        return {
          url: `${tasksDataUpdate.boardId}/columns/${tasksDataUpdate.columnId}/tasks/${tasksDataUpdate.taskId}`,
          method: 'PUT',
          body: {
            title: tasksDataUpdate.title,
            order: tasksDataUpdate.order,
            description: tasksDataUpdate.description,
            userId: tasksDataUpdate.userId,
            boardId: tasksDataUpdate.boardId,
            columnId: tasksDataUpdate.columnId,
          },
        };
      },
      invalidatesTags: ['Tasks'],
    }),
    createTask: build.mutation<TaskDataPostResponse, TaskDataPost>({
      query: (tasksDataPost) => ({
        url: `${tasksDataPost.boardId}/columns/${tasksDataPost.columnId}/tasks`,
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
    deleteTask: build.mutation<DeleteTaskResponse, DeleteTask>({
      query: (tasksDataDelete) => ({
        url: `${tasksDataDelete.boardId}/columns/${tasksDataDelete.deleteColumnId}/tasks/${tasksDataDelete.deleteTaskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks'],
    }),
  }),
});
