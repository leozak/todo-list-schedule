import { useContext } from "react";

import { DateContext } from "../../context/DateContext";

const ScheduleView = ({ todos }) => {
  const { year, month, day } = useContext(DateContext);

  return (
    <div>
      <div className="inline-block">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex rounded-md overflow-hidden border-red-700 border mb-1 scale-95 transition-all hover:bg-gray-300 hover:cursor-pointer hover:scale-100"
          >
            <div className="bg-red-700 w-2"></div>
            <div className="py-0.5 px-2">{todo.title}</div>
          </div>
        ))}
        <div className="flex rounded-md overflow-hidden border-red-700 border mb-2 hover:bg-red-100 hover:cursor-pointer">
          Year: {year}
          <br />
          Month: {month}
          <br />
          Day: {day}
        </div>
      </div>
    </div>
  );
};

export default ScheduleView;
