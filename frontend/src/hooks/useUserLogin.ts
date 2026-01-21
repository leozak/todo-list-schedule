import { useMutation } from "@tanstack/react-query";
import axios, { type AxiosError } from "axios";

import type { AuthResponse, LoginCredentials } from "../interfaces/user";

import { API_URL } from "../services/config";

const loginRequest = async (user: LoginCredentials): Promise<AuthResponse> => {
  const params = new URLSearchParams();
  params.append("username", user.username);
  params.append("password", user.password);

  const { data } = await axios.post<AuthResponse>(
    `${API_URL}/users/login-form`,
    params,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );

  console.log(data);

  return data;
};

export const useAuthLogin = () => {
  return useMutation<AuthResponse, AxiosError, LoginCredentials>({
    mutationKey: ["login"],
    mutationFn: loginRequest,
    onSuccess: (data) => {
      localStorage.setItem("email", data.email as string);
      localStorage.setItem("name", data.name as string);
      localStorage.setItem("access_token", data.access_token as string);
      localStorage.setItem("refresh_token", data.refresh_token as string);
      window.location.href = "/";
    },
    onError: (error) => {
      console.error("Erro ao fazer login:", error);
    },
  });
};
