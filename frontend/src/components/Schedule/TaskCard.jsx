const TaskCard = ({ task }) => {
  return (
    <div
      key={task.id}
      className="flex md:min-w-xs rounded-md overflow-hidden border-red-700 border mb-1 scale-95 transition-all hover:bg-gray-300 hover:cursor-pointer hover:scale-100"
    >
      <div className="bg-red-700 w-2"></div>
      <div className="py-0.5 px-2">{task.title}</div>
    </div>
  );
};

export default TaskCard;
