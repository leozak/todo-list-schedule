import { FaCrosshairs, FaSearch } from "react-icons/fa";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const Schedule = ({
  nowMonth,
  nowYear,
  nowDay,
  setMonth,
  setYear,
  setDay,
  todo,
  setTodo,
}) => {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const nowDate = new Date();

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  return (
    <div className="p-2 w-full">
      <nav className="flex items-center justify-between py-3 text-xl">
        <div>
          <button
            title="Now"
            className="mr-1 text-gray-600 bg-gray-300 p-1 rounded-md hover:cursor-pointer hover:bg-gray-400 hover:text-gray-800 active:bg-gray-300"
            onClick={() => {
              setMonth(nowDate.getUTCMonth());
              setYear(nowDate.getUTCFullYear());
              setDay(nowDate.getUTCDate());
            }}
          >
            <FaCrosshairs />
          </button>
          <button
            title="Previous Day"
            className="mr-1 text-gray-600 bg-gray-300 p-1 rounded-md hover:cursor-pointer hover:bg-gray-400 hover:text-gray-800 active:bg-gray-300"
            onClick={() => {
              if (nowDay === 1) {
                if (nowMonth === 0) {
                  setYear(nowYear - 1);
                }
                setMonth((nowMonth - 1 + 12) % 12);
                setDay(getDaysInMonth(nowMonth - 1, nowYear));
              } else {
                setMonth(nowMonth);
                setDay(nowDay - 1);
              }
            }}
          >
            <HiChevronLeft />
          </button>
          <button
            title="Next Day"
            className="mr-1 text-gray-600 bg-gray-300 p-1 rounded-md hover:cursor-pointer hover:bg-gray-400 hover:text-gray-800 active:bg-gray-300"
            onClick={() => {
              if (nowDay === getDaysInMonth(nowMonth, nowYear)) {
                if (nowMonth === 11) {
                  setYear(nowYear + 1);
                }
                setMonth((nowMonth + 1) % 12);
                setDay(1);
              } else {
                setMonth(nowMonth);
                setDay(nowDay + 1);
              }
            }}
          >
            <HiChevronRight />
          </button>

          <span className="ml-4">
            {nowDay}, {month[nowMonth]} {nowYear}
          </span>
        </div>
        <div className="flex items-center border border-gray-400 rounded-xl pl-1">
          <FaSearch className="text-gray-500" />
          <input type="text" className="" />
        </div>
      </nav>
      <hr className="my-2 text-gray-300" />
      <div>
        <h1>To-do List</h1>
        <div>
          {todo.map((todo) => (
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
    </div>
  );
};

export default Schedule;
