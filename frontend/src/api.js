const api = (url) => {
  const todos = [
    {
      id: 1,
      date: "2025-12-08",
      title: "Delectus aut autem",
      description: "Quis ut nam facilis et officia qui.",
      completed: false,
    },
    {
      id: 2,
      date: "2025-12-08",
      title: "Quis ut nam facilis et officia qui",
      description: "Quis ut nam facilis et officia qui.",
      completed: true,
    },
    {
      id: 3,
      date: "2025-12-08",
      title: "Fugiat veniam minus",
      description: "Quis ut nam facilis et officia qui.",
      completed: false,
    },
    {
      id: 4,
      date: "2025-12-09",
      title: "Et porro",
      description: "Quis ut nam facilis et officia qui.",
      completed: false,
    },
    {
      id: 5,
      date: "2025-12-09",
      title: "Laboriosam mollitia et enim quasi",
      description: "Quis ut nam facilis et officia qui.",
      completed: false,
    },
    {
      id: 6,
      date: "2025-12-10",
      title: "Qui ullam ratione quibusdam",
      description: "Quis ut nam facilis et officia qui.",
      completed: false,
    },
  ];

  if (url === "/todos") {
    return todos;
  }

  return true;
};

export default api;
