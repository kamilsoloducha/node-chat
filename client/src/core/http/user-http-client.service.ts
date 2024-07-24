import { AxiosError, AxiosResponse } from 'axios';
import { HttpError } from 'core/http/http-error.model';
import http from 'core/http/http.service';

const USERS_PATH = '/users';

export async function register(request: RegisterRequest): Promise<RegisterResponse | HttpError> {
  try {
    const { data } = await http.post<RegisterResponse, AxiosResponse<RegisterResponse, RegisterRequest>, RegisterRequest>(`${USERS_PATH}/register`, request);
    return { ...data, isSuccessful: true };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const httpError: HttpError = {
        isSuccessful: false,
        statusCode: error.response?.status,
        friendlyErrorMessage: error.response?.data.errorCode === 'USER_ALREADY_EXISTS' ? 'User name has been already taken' : undefined,
        errorMessage: error.message,
        errorCode: error.response?.data.errorCode,
      };

      return httpError as any;
    }
    return { errorMessage: 'Internal server error. Please try again later.', isSuccessful: false };
  }
}

export type RegisterRequest = {
  userName: string;
  password: string;
  passwordConfirmation: string;
};

export type RegisterResponse = {
  isSuccessful: true;
  userId: number;
};

export async function login(request: LoginRequest): Promise<LoginResponse | HttpError> {
  try {
    const { data } = await http.put<LoginResponse, AxiosResponse<LoginResponse, LoginRequest>, LoginRequest>(`${USERS_PATH}/login`, request);
    return { ...data, isSuccessful: true };
  } catch (error) {
    if (error instanceof AxiosError) {
      const httpError: HttpError = {
        isSuccessful: false,
        statusCode: error.response?.status,
        errorMessage: 'Invalid username or password.',
        errorCode: error.response?.data.errorCode,
      };

      return httpError as any;
    }
    return { errorMessage: 'Internal server error. Please try again later.', isSuccessful: false };
  }
}

export type LoginRequest = {
  userName: string;
  password: string;
};

export type LoginResponse = {
  isSuccessful: true;
  userId: string;
  accessToken: string;
};
