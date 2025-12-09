import { FaCalendarAlt } from "react-icons/fa";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi";

const Sidebar = ({ nowMonth, nowYear, nowDay, setMonth, setYear, setDay }) => {
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

  const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getDayOfWeek = (day, month, year) => {
    return new Date(year, month, day).getDay();
  };

  const daysInMonth = getDaysInMonth(nowMonth, nowYear);
  const FirstDayOfWeek = getDayOfWeek(1, nowMonth, nowYear);

  const daysClear = Array.from({ length: FirstDayOfWeek });
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="min-w-60 min-h-full h-screen p-2 bg-cyan-950">
      <div className="flex p-1 text-gray-400 mb-5 items-center">
        <button className="hover:text-gray-100 hover:cursor-pointer">
          <GiHamburgerMenu />
        </button>

        <div className="text-xl font-bold text-gray-300 text-center w-full">
          Schedule
        </div>
      </div>

      {/* Callendar Navbar */}
      <div className="w-full inline-flex align-middle justify-between text-gray-400 text-sm">
        <div className="left inline-flex items-center">
          <FaCalendarAlt />
          <span className="ml-2">
            {months[nowMonth]} {nowYear}
          </span>
        </div>
        <div className="right">
          <button
            onClick={() => setMonth((nowMonth - 1 + 12) % 12)}
            className="p-0.5 m-1 bg-cyan-900 rounded-sm hover:bg-cyan-800 hover:cursor-pointer hover:text-gray-200"
          >
            <HiChevronLeft />
          </button>
          <button
            onClick={() => setMonth((nowMonth + 1) % 12)}
            className="p-0.5 m-1 bg-cyan-900 rounded-sm hover:bg-cyan-800 hover:cursor-pointer hover:text-gray-200"
          >
            <HiChevronRight />
          </button>
        </div>
      </div>

      <div className="text-xs text-gray-300 grid grid-cols-7 text-center">
        {week.map((nameDay) => (
          <div key={nameDay} className="font-bold py-2">
            {nameDay}
          </div>
        ))}

        {daysClear.map((day, index) => (
          <div key={index} className="py-2"></div>
        ))}

        {days.map((day) => (
          <div
            key={day}
            onClick={() => setDay(day)}
            className={`${
              nowDay === day ? "bg-cyan-900" : ""
            } rounded-sm hover:bg-cyan-800 hover:cursor-pointer hover:text-gray-200 py-2`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
