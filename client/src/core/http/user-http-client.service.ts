import { AxiosResponse } from 'axios';
import http from 'core/http/http.service';

const USERS_PATH = '/users';

export function register(request: RegisterRequest): Promise<AxiosResponse<RegisterResponse>> {
  return http.post<RegisterResponse>(`${USERS_PATH}/register`, request);
}

export type RegisterRequest = {
  userName: string;
  password: string;
  passwordConfirmation: string;
};

export type RegisterResponse = {
  userId: number;
};

export function login(request: LoginRequest): Promise<AxiosResponse<LoginResponse>> {
  return http.put<LoginResponse>(`${USERS_PATH}/login`, request);
}

export type LoginRequest = {
  userName: string;
  password: string;
};

export type LoginResponse = {
  userId: number;
  accessToken: string;
};
