const ScheduleView = ({ todos }) => {
  return (
    <div>
      <div className="inline-block">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex rounded-md overflow-hidden border-red-700 border mb-2 hover:bg-red-100 hover:cursor-pointer"
          >
            <div className="bg-red-700 w-2"></div>
            <div className="py-0.5 px-2">{todo.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleView;
