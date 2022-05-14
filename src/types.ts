export type UserSignInData = {
  login: string;
  password: string;
};

export type UserSignUpData = {
  name: string;
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

export type CardProps = {
  imgSrc: string;
  name: string;
  description: string;
};
