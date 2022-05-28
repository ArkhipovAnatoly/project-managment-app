import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { RootState } from '../app/store/store';
import { BoardData, BoardDataResponse, DeleteBoardResponse, GetCurrentBoardData } from '../types';
import {
  ColumnsData,
  DeleteColumn,
  DeleteColumnResponse,
  UpdateColumnResponse,
  GetOneColumnData,
  GetColumnForDND,
} from '../types';
import {
  TaskData,
  TaskDataGet,
  TaskDataPost,
  TaskDataPostResponse,
  DeleteTask,
  DeleteTaskResponse,
  UpdateTaskResponse,
} from '../types';

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
  tagTypes: ['Board', 'Columns', 'Tasks'],
  endpoints: (build) => ({
    getAllBoards: build.query<BoardData[], ''>({
      query: () => ({
        url: '/boards',
      }),
      providesTags: () => ['Board'],
    }),
    getBoard: build.query<GetCurrentBoardData, string>({
      query: (boardId) => ({
        url: `/boards/${boardId}`,
      }),
      providesTags: () => ['Board', 'Columns', 'Tasks'],
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
    fetchColumns: build.query<ColumnsData[], string>({
      query: (idBoard) => ({
        url: `/boards/${idBoard}/columns`,
      }),
      providesTags: () => ['Columns'],
    }),
    // getOneColumn: build.query<GetColumnForDND, GetOneColumnData>({
    //   query: (oneColumn) => ({
    //     url: `${oneColumn.idBoard}/columns/${oneColumn.id}`,
    //   }),
    //   providesTags: () => ['Columns'],
    // }),
    updateColumn: build.mutation<UpdateColumnResponse, ColumnsData>({
      query(columnData) {
        return {
          url: `/boards/${columnData.idBoard}/columns/${columnData.id}`,
          method: 'PUT',
          body: { title: columnData.title, order: columnData.order },
        };
      },
      invalidatesTags: ['Columns'],
    }),
    createColumn: build.mutation<ColumnsData[], ColumnsData>({
      query: (columnData) => ({
        url: `/boards/${columnData.idBoard}/columns`,
        method: 'POST',
        // , order: columnData.order
        body: { title: columnData.title },
      }),
      invalidatesTags: ['Columns'],
    }),
    deleteColumn: build.mutation<DeleteColumnResponse, DeleteColumn>({
      query: (post) => ({
        url: `/boards/${post.boardId}/columns/${post.deleteColumnId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Columns'],
    }),
    fetchTasks: build.query<TaskData[], TaskDataGet>({
      query: (tasksDataGet) => ({
        url: `/boards/${tasksDataGet.idBoard}/columns/${tasksDataGet.idColumn}/tasks`,
      }),
      providesTags: () => ['Tasks'],
    }),
    updateTask: build.mutation<UpdateTaskResponse, TaskDataPost>({
      query(tasksDataUpdate) {
        return {
          url: `/boards/${tasksDataUpdate.boardId}/columns/${tasksDataUpdate.currentColumn}/tasks/${tasksDataUpdate.taskId}`,
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
        url: `/boards/${tasksDataPost.boardId}/columns/${tasksDataPost.columnId}/tasks`,
        method: 'POST',
        // order: tasksDataPost.order,
        body: {
          title: tasksDataPost.title,
          description: tasksDataPost.description,
          userId: tasksDataPost.userId,
        },
      }),
      invalidatesTags: ['Tasks'],
    }),
    deleteTask: build.mutation<DeleteTaskResponse, DeleteTask>({
      query: (tasksDataDelete) => ({
        url: `/boards/${tasksDataDelete.boardId}/columns/${tasksDataDelete.deleteColumnId}/tasks/${tasksDataDelete.deleteTaskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks'],
    }),
  }),
});
