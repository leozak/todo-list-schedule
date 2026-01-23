import { useMutation } from "@tanstack/react-query";
import type { AxiosPromise } from "axios";

import type { NewUserData, NewUserResponse } from "../interfaces/user";

import { api } from "../services/api";

const submitNewUser = async (
  user: NewUserData,
): AxiosPromise<NewUserResponse> => {
  const response = await api.post<NewUserResponse>("/users/create", user);
  return response;
};

export const useUserMutate = () => {
  const mutate = useMutation({
    mutationKey: ["newUser"],
    mutationFn: submitNewUser,
    retry: true,
  });
  return {
    ...mutate,
    data: mutate.data?.data,
  };
};
