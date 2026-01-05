import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { DateContext } from "./DateContext";

export const TasksContext = createContext();

const url_base = "http://localhost:8000";

const username = sessionStorage.getItem("username");

const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [tasksRefresh, setTasksRefresh] = useState(true);

  const { year, month, day } = useContext(DateContext);

  //
  // Recarrega as tarefas
  const refresh = () => {
    setTasksRefresh(true);
  };

  //
  // Verifica se as tarefas devem ser carregadas quando o componente montar
  useEffect(() => {
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

      const data = await response.json();

      if (response.status === 200) {
        setTasks(data);
      } else {
        console.log(response);
        toast.error("Erro ao carregar tarefas.");
      }
    };
    if (tasksRefresh) {
      loadingTasks();
      setTasksRefresh(false);
    }
  }, []);

  //
  // Atualiza as tarefas quando a data mudar
  useEffect(() => {
    console.log("Data alterada:", year, month, day);
  }, [year, month, day]);

  return (
    <TasksContext.Provider value={{ tasks, setTasks, refresh }}>
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;
