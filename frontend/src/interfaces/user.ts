export interface NewUserData {
  name: string;
  email: string;
  password: string;
}

export interface NewUserResponseData {
  sussess: boolean;
  message: string;
  name: string;
  email: string;
}

export interface NewUserResponse {
  data: NewUserResponseData;
}
