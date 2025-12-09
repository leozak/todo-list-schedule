const ScheduleView = ({ todos }) => {
  return (
    <div>
      <div>
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex rounded-md overflow-hidden border-red-700 border mb-1"
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
