import { useEffect, useState, useContext } from "react";

import { useTasks } from "../../hooks/useTasks";
import type { Task } from "../../interfaces/tasks";
import { DateContext } from "../../contexts/DateContext";
import TaskManagerViewTaskCard from "./TaskManagerViewTaskCard";
import { useTags } from "../../contexts/TagsContext";

interface TaskManagerViewProps {
  search: string;
}

const email: string = localStorage.getItem("email") as string;

const TaskManagerView = ({ search }: TaskManagerViewProps) => {
  const [tasks, setTasks] = useState<Omit<Task, "email">[]>([]);
  const [dailyTasks, setDailyTasks] = useState<Omit<Task, "email">[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Omit<Task, "email">[]>([]);
  const [dots, setDots] = useState<string>("");

  const { year, month, day } = useContext(DateContext);
  const { data, isLoading } = useTasks(email);

  const { setTags } = useTags();

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
      })
    );
  };

  useEffect(() => {
    if (data?.tasks) {
      setTasks(data?.tasks);
      const tagsPopulation: (string | null)[] = data?.tasks.map((task) =>
        task.tags.length > 0 ? task.tags : null
      );
      setTags(tagsPopulation);
    }
  }, [data]);

  useEffect(() => {
    filterDate(
      `${year}-${month < 9 ? "0" + (month + 1) : month + 1}-${day < 10 ? "0" + day : day}`
    );
  }, [year, month, day, tasks]);

  useEffect(() => {
    filterSearch(search);
  }, [search, dailyTasks]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length === 3) {
          return "";
        }
        return prevDots + ".";
      });
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {isLoading && (
        <div className="flex h-screen items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="h-15 w-15 animate-spin rounded-full border-b-2 border-zinc-900 dark:border-zinc-100"></div>
            <div className="mt-6 flex text-2xl text-zinc-900 dark:text-zinc-100">
              <div>Carregando</div>
              <div className="w-5">{dots}</div>
            </div>
          </div>
        </div>
      )}

      {filteredTasks.length === 0 && (
        <div className="flex items-center justify-center">
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
