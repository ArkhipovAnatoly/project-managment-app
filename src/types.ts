export type CardProps = {
  imgSrc: string;
  name: string;
  description: string;
};

export type UserAuthData = {
  userId?: string;
  token?: string;
  isAuth?: boolean;
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
  };
};

export type EditUserProfileResponse = SignUpResponse;

export type DeleteUserResponse = {
  error?: {
    data: {
      message: string;
      statusCode: number;
    };
    status: number;
  };
};
export type DeleteBoardResponse = DeleteUserResponse;

export type User = {
  id: string;
  login: string;
  name: string;
};

export type GetUserByIdResponse = SignUpResponse;

export enum StatusCode {
  OK = 200,
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

export type DeleteColumn = {
  boardId?: string;
  deleteColumnId?: string;
};
export type DeleteColumnResponse = DeleteUserResponse;
export type UpdateColumnResponse = DeleteUserResponse;

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
};

export type TaskDataPost = {
  boardId?: string;
  columnId?: string;
  userId?: string;
  title: string;
  order: number;
  description: string;
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

export type DeleteTaskResponse = DeleteUserResponse;
export type UpdateTaskResponse = DeleteUserResponse;
