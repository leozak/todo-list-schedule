import { useMutation } from "@tanstack/react-query";
import type { AxiosPromise } from "axios";

import type {
  UpdateUserInterface,
  UpdateUserResponseData,
} from "../interfaces/user";

import { api } from "../services/api";

const submitUserUpdate = async (
  user: UpdateUserInterface,
): AxiosPromise<UpdateUserResponseData> => {
  const response = await api.post<UpdateUserResponseData>(
    "/users/update",
    user,
  );
  return response;
};

export const useUserUpdate = () => {
  const mutate = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: submitUserUpdate,
    retry: true,
    onSuccess: (data) => {
      localStorage.setItem("name", data?.data?.name as string);
    },
  });
  return {
    ...mutate,
    data: mutate.data?.data,
  };
};
