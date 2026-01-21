export interface NewUserData {
  name: string;
  email: string;
  password: string;
}

export interface NewUserResponseData {
  success: boolean;
  message: string;
  name: string;
  email: string;
}

export interface NewUserResponse {
  success?: boolean;
  message?: string;
  data: NewUserResponseData;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  name?: string;
  email?: string;
  access_token?: string;
  refresh_token?: string;
  token_type?: string;
}
