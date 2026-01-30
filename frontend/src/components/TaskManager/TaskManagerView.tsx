import { useEffect, useState, useContext } from "react";

import { useTasks } from "../../hooks/useTasks";
import type { Task } from "../../interfaces/tasks";
import { DateContext } from "../../contexts/DateContext";
import TaskManagerViewTaskCard from "./TaskManagerViewTaskCard";

interface TaskManagerViewProps {
  search: string;
}

const email: string = localStorage.getItem("email") as string;

const TaskManagerView = ({ search }: TaskManagerViewProps) => {
  const { data, isPending, isSuccess } = useTasks(email);
  const [tasks, setTasks] = useState<Omit<Task, "email">[]>([]);
  const [dailyTasks, setDailyTasks] = useState<Omit<Task, "email">[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Omit<Task, "email">[]>([]);

  const { year, month, day } = useContext(DateContext);

  const filterDate = (date: string) => {
    setDailyTasks(tasks.filter((task) => task.date.substring(0, 10) === date));
  };

  const filterSearch = (search: string) => {
    setFilteredTasks(
      dailyTasks.filter((task) => {
        if (search === "") return true;
        return (
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase()) ||
          task.tags.toLowerCase().includes(search.toLowerCase())
        );
      }),
    );
  };

  useEffect(() => {
    if (data?.tasks) {
      setTasks(data?.tasks);
    }
  }, [data]);

  useEffect(() => {
    filterDate(
      `${year}-${month < 9 ? "0" + (month + 1) : month + 1}-${day < 10 ? "0" + day : day}`,
    );
  }, [year, month, day, tasks]);

  useEffect(() => {
    filterSearch(search);
  }, [search, dailyTasks]);

  return (
    <>
      {filteredTasks.length === 0 && (
        <div className="flex justify-center items-center">
          <h2 className="mt-15">Não há tarefas à serem exibidas.</h2>
        </div>
      )}

      <div className="p-4">
        {filteredTasks.map((task) => (
          <TaskManagerViewTaskCard key={task.id} {...task} />
        ))}
      </div>
    </>
  );
};

export default TaskManagerView;
