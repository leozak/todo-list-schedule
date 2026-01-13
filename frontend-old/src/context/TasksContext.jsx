import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { DateContext } from "./DateContext";

export const TasksContext = createContext();

import { API_URL } from "../config";

const username = sessionStorage.getItem("username");

let data = [];

const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [_search, _setSearch] = useState("");
  const [dailyTasks, setDailyTasks] = useState([]);

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
    const response = await fetch(`${API_URL}/tasks/${username}`, {
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
      data = data.sort((a, b) => {
        return a.done - b.done || b.pin - a.pin;
      });
      setTasks(data);
    } else {
      console.log(response);
      toast.error("Erro ao carregar tarefas.");
    }
  };

  //
  // Recarrega as tarefas
  const refresh = () => {
    // Carrega as tarefas
    loadingTasks()
      // Filtra as tarefas por data
      .then(() => filterDateTasks(date))
      // Filtra as tarefas por pesquisa
      .then(() => filterSearch(_search));
  };

  //
  // Realiza uma pesquisa
  const search = (_search) => {
    _setSearch(_search);
    filterSearch(_search);
  };

  //
  // Filtra as tarefas por data
  const filterDateTasks = (_date) => {
    return new Promise((resolve) => {
      const _tasks = data.filter((task) => {
        return task.date === _date;
      });
      setTasks(_tasks);
      setDailyTasks(_tasks);
      resolve();
    });
  };

  //
  // Filtra as tarefas por pesquisa
  const filterSearch = (_search) => {
    const _tasks = dailyTasks.filter((task) => {
      if (_search === "") return true;
      return (
        task.title.toLowerCase().includes(_search.toLowerCase()) ||
        task.description.toLowerCase().includes(_search.toLowerCase())
      );
    });
    setTasks(_tasks);
  };

  //
  // Verifica se tem tarefas em uma data especifica
  const hasTasks = (_date) => {
    const _tasks = data.filter((task) => {
      return task.date === _date;
    });
    return _tasks.length > 0;
  };

  //
  // Montagem do componente
  useEffect(() => {
    // Carrega as tarefas
    loadingTasks();
  }, []);

  //
  // Atualiza as tarefas quando a data mudar
  useEffect(() => {
    filterDateTasks(date);
  }, [year, month, day]);

  return (
    <TasksContext.Provider value={{ tasks, refresh, hasTasks, search }}>
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;
