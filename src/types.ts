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

export type User = {
  id: string;
  login: string;
  name: string;
};

export type GetUserByIdResponse = SignUpResponse;

/* export type HeaderParams = {
  getState: AppStore;
}; */
