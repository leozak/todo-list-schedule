import {
  useQuery,
  useMutation,
  useQueryClient,
  type QueryKey,
} from "@tanstack/react-query";
import type { AxiosPromise, AxiosError } from "axios";

import { api } from "../services/api";

import type {
  NewTaskData,
  NewTaskResponse,
  TasksResponse,
} from "../interfaces/tasks";

const getTasks = async (email: string): AxiosPromise<TasksResponse> => {
  const response = await api.get<TasksResponse>(`/tasks/${email}`);
  return response;
};

export const useTasks = (email: string) => {
  const query = useQuery({
    queryFn: async () => {
      const response = await api.get<TasksResponse>(`/tasks/${email}`);
      return response;
    },
    queryKey: ["tasks"],
    retry: true,
  });
  return {
    ...query,
    data: query.data?.data,
  };
};

const submitNewTask = async (
  task: NewTaskData,
): AxiosPromise<NewTaskResponse> => {
  const response = await api.post<NewTaskResponse>("/tasks/create", task);
  return response;
};

export const useNewTask = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationKey: ["newTask"],
    mutationFn: submitNewTask,
    retry: true,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  return {
    ...mutate,
    data: mutate.data?.data,
  };
};
