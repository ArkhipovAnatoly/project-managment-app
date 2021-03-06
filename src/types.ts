export type CardProps = {
  imgSrc: string;
  name: string;
  description: string;
};

export type UserAuthData = {
  userId?: string;
  token?: string;
  isAuth?: boolean;
  userName?: string;
};

export type UserSignInData = {
  login: string;
  password: string;
};

export type SignInResponse = {
  error?: {
    data: {
      message: string;
      statusCode: number;
    };
    status: number;
  };
  data?: {
    token: string;
  };
};

export type UserSignUpData = {
  name: string;
  login: string;
  password: string;
};

export type SignUpResponse = {
  error?: {
    data: {
      message: string;
      statusCode: number;
    };
    status: number;
  };
  data?: {
    id: string;
    login: string;
    name: string;
  };
};

export type EditUserProfileData = {
  userId?: string;
  name: string;
  login: string;
  password: string;
};

export type BoardData = {
  id?: string;
  title: string;
  description: string;
};

export type BoardDataResponse = {
  error?: {
    data: {
      message: string;
      statusCode: number;
    };
    status: number;
  };
  data?: {
    id: string;
    title: string;
    description: string;
  };
};

export type EditUserProfileResponse = SignUpResponse;

export type DeleteResponse = {
  error?: {
    data: {
      message: string;
      statusCode: number;
    };
    status: number;
  };
};

export type User = {
  id: string;
  login: string;
  name: string;
};

export type GetUserByIdResponse = SignUpResponse;

export enum StatusCode {
  OK = 200,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  InternalServerError = 500,
}

export type ColumnsData = {
  idBoard?: string;
  id?: string;
  title: string;
  order: number;
};
export type GetOneColumnData = {
  idBoard?: string;
  id?: string;
};

export type DeleteColumn = {
  boardId?: string;
  deleteColumnId?: string;
};
export type DeleteColumnResponse = DeleteResponse;
export type UpdateColumnResponse = DeleteResponse;

export type TaskDataGet = {
  idBoard: string;
  idColumn: string;
};

export type TasksData = {
  idBoard?: string;
  id?: string;
  title: string;
  order: number;
  tasks: TaskData[];
};

export type TaskData = {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
};

export type DeleteTask = {
  boardId?: string;
  deleteColumnId?: string;
  deleteTaskId?: string;
};

export type TaskDataPost = {
  boardId?: string;
  columnId?: string;
  currentColumn?: string;
  userId?: string;
  taskId?: string;
  title: string;
  order?: number;
  description?: string;
};
export type TaskDataPostResponse = {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
};

export type Column = {
  id: string;
  title: string;
  order: number;
  tasks: task[];
};

export type task = {
  id: string;
  title: string;
  order: number;
  done?: boolean;
  description: string;
  userId: string;
  files: file[];
};

export type file = {
  filename: string;
  fileSize: number;
};

export type GetCurrentBoardData = {
  columns: Column[];
  id: string;
  title: string;
};

export interface CurrentBoardProps {
  currentBoard?: GetCurrentBoardData;
}

export type DeleteTaskResponse = DeleteResponse;
export type UpdateTaskResponse = DeleteResponse;
