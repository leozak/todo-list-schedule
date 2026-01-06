import { useContext } from "react";

import {
  FaCrosshairs,
  FaSearch,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";

import { DateContext } from "../../context/DateContext";
import { TasksContext } from "../../context/TasksContext";

const nowDate = new Date();

const months = [
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

// const NavBar = ({ month, year, day, setMonth, setYear, setDay }) => {
const NavBar = () => {
  const { year, setYear, month, setMonth, day, setDay } =
    useContext(DateContext);

  const { refresh, search } = useContext(TasksContext);

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handleSearchChange = (e) => {
    search(e.target.value);
  };

  return (
    <nav className="flex items-center justify-between py-3 px-4 text-xl">
      <div>
        {/* Now Button */}
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

        {/* Previous Day Button */}
        <button
          title="Previous Day"
          className="mr-1 text-gray-600 bg-gray-300 p-1 rounded-md hover:cursor-pointer hover:bg-gray-400 hover:text-gray-800 active:bg-gray-300"
          onClick={() => {
            if (day === 1) {
              if (month === 0) {
                setYear(year - 1);
              }
              setMonth((month - 1 + 12) % 12);
              setDay(getDaysInMonth(month - 1, year));
            } else {
              setMonth(month);
              setDay(day - 1);
            }
          }}
        >
          <FaAngleLeft />
        </button>

        {/* Next Day Button */}
        <button
          title="Next Day"
          className="mr-1 text-gray-600 bg-gray-300 p-1 rounded-md hover:cursor-pointer hover:bg-gray-400 hover:text-gray-800 active:bg-gray-300"
          onClick={() => {
            if (day === getDaysInMonth(month, year)) {
              if (month === 11) {
                setYear(year + 1);
              }
              setMonth((month + 1) % 12);
              setDay(1);
            } else {
              setMonth(month);
              setDay(day + 1);
            }
          }}
        >
          <FaAngleRight />
        </button>

        {/* Refresh Button */}
        <button
          title="Recarregar tarefas"
          className="mr-1 text-gray-600 bg-gray-300 p-1 rounded-md hover:cursor-pointer hover:bg-gray-400 hover:text-gray-800 active:bg-gray-300"
          onClick={refresh}
        >
          <FaArrowsRotate />
        </button>

        {/* Date */}
        <span className="ml-4">
          {day}, {months[month]} {year}
        </span>
      </div>

      {/* Search Bar */}
      <div className="flex items-center p-1 border border-gray-400 rounded-xl pl-1">
        <FaSearch className="text-gray-500" />
        <input
          onChange={handleSearchChange}
          type="text"
          className="text-sm pl-2 focus:outline-none"
        />
      </div>
    </nav>
  );
};

export default NavBar;
