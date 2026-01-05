import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { DateContext } from "./DateContext";

export const TasksContext = createContext();

const url_base = "http://localhost:8000";

const username = sessionStorage.getItem("username");

let data = [];

const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [tasksRefresh, setTasksRefresh] = useState(false);

  const { year, month, day } = useContext(DateContext);
  const date =
    year +
    "-" +
    (month < 9 ? "0" + (month + 1) : month + 1) +
    "-" +
    (day < 10 ? "0" + day : day);

  //
  // Carrega as tarefas
  const loadingTasks = async () => {
    const response = await fetch(url_base + "/tasks/" + username, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.log(error);
      toast.error("Erro ao carregar tarefas.");
    });

    data = await response.json();

    if (response.status === 200) {
      setTasks(data);
    } else {
      console.log(response);
      toast.error("Erro ao carregar tarefas.");
    }
  };

  //
  // Recarrega as tarefas
  const refresh = () => {
    toast.warning("Tarefas recarregadas.");
    // Carrega as tarefas
    loadingTasks()
      // Filtra as tarefas por data
      .finally(() => {
        //
        //
        // - Verificar se o filtro de data está ligado
        //
        //
        filterDateTasks(date);
      });
  };

  //
  // Filtra as tarefas por data
  const filterDateTasks = (_date) => {
    const _tasks = data.filter((task) => {
      console.log(task.date, _date, task.date === _date);
      return task.date === _date;
    });
    setTasks(_tasks);
  };

  //
  // Montagem do componente
  useEffect(() => {
    // Carrega as tarefas
    loadingTasks()
      // Filtra as tarefas por data
      .finally(() => filterDateTasks(date));
  }, []);

  //
  // Atualiza as tarefas quando a data mudar
  useEffect(() => {
    filterDateTasks(date);
  }, [year, month, day]);

  return (
    <TasksContext.Provider value={{ tasks, setTasks, refresh }}>
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;
