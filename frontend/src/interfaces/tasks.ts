export interface Task {
  id: number;
  title: string;
  description: string;
  tags: string;
  pin: boolean;
  done: boolean;
  date: string;
  email: string;
}

export interface NewTaskData extends Omit<Task, "id"> {}

export interface NewTaskResponse {
  success: boolean;
  message: string;
  data?: Omit<NewTaskData, "email">;
}

export interface TasksResponse {
  success: boolean;
  message: string;
  tasks: Omit<Task, "email">[];
}
