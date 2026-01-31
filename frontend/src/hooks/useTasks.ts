import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosPromise } from "axios";

import { api } from "../services/api";

import type {
  NewTaskData,
  NewTaskResponse,
  TasksResponse,
  TaskDoneData,
  TaskDoneResponse,
  TaskPinData,
  TaskPinResponse,
  TaskDeleteResponse,
} from "../interfaces/tasks";

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

//
// Save new task
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

const submitNewTask = async (
  task: NewTaskData,
): AxiosPromise<NewTaskResponse> => {
  const response = await api.post<NewTaskResponse>("/tasks/create", task);
  return response;
};

//
// Change task done
export const useChangeTaskDone = () => {
  const queryClient = useQueryClient();
  const mutateDone = useMutation({
    mutationKey: ["changeTaskDone"],
    mutationFn: changeTaskDone,
    retry: true,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  return {
    ...mutateDone,
    mutateDone: mutateDone.mutate,
    isErrorDone: mutateDone.isError,
    errorDone: mutateDone.error,
    dataDone: mutateDone.data?.data,
  };
};

const changeTaskDone = async (
  task: TaskDoneData,
): AxiosPromise<TaskDoneResponse> => {
  const response = await api.patch<TaskDoneResponse>(
    `/tasks/done/${task.id}`,
    task,
  );
  return response;
};

//
// Change task pin
export const useChangeTaskPin = () => {
  const queryClient = useQueryClient();
  const mutatePin = useMutation({
    mutationKey: ["changeTaskPin"],
    mutationFn: changeTaskPin,
    retry: true,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  return {
    ...mutatePin,
    mutatePin: mutatePin.mutate,
    isErrorPin: mutatePin.isError,
    errorPin: mutatePin.error,
    dataPin: mutatePin.data?.data,
  };
};

const changeTaskPin = async (
  task: TaskPinData,
): AxiosPromise<TaskPinResponse> => {
  const response = await api.patch<TaskPinResponse>(
    `/tasks/pin/${task.id}`,
    task,
  );
  return response;
};

//
// Delete task
export const useTaskDelete = () => {
  const queryClient = useQueryClient();
  const mutateDelete = useMutation({
    mutationKey: ["changeTaskDelete"],
    mutationFn: changeTaskDelete,
    retry: true,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  return {
    ...mutateDelete,
    mutateDelete: mutateDelete.mutate,
    isErrorDelete: mutateDelete.isError,
    errorDelete: mutateDelete.error,
    dataDelete: mutateDelete.data?.data,
  };
};

const changeTaskDelete = async (
  id: number,
): AxiosPromise<TaskDeleteResponse> => {
  const response = await api.delete<TaskDeleteResponse>(`/tasks/delete/${id}`);
  return response;
};
