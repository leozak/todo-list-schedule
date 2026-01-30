import { useContext } from "react";
import { months, week } from "../../sets/calendar";
import { DateContext } from "../../contexts/DateContext";
import { FaCalendarAlt } from "react-icons/fa";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const SidebarCallendar = () => {
  const { year, setYear, month, setMonth, day, setDay } =
    useContext(DateContext);

  const hasTasks = (_date: string): boolean => {
    return false;
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getDayOfWeek = (day: number, month: number, year: number) => {
    return new Date(year, month, day).getDay();
  };

  const daysInMonth = getDaysInMonth(month, year);
  const firstDayOfWeek = getDayOfWeek(1, month, year);

  const daysClear = Array.from({ length: firstDayOfWeek });
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const daysHasTasks = Array.from({ length: daysInMonth }, (_, i) => {
    return hasTasks(
      year +
        "-" +
        (month < 9 ? "0" + (month + 1) : month + 1) +
        "-" +
        (i + 1 < 10 ? "0" + (i + 1) : i + 1),
    );
  });

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  return (
    <div>
      {/* Callendar Navbar */}
      <div className="flex flex-row rounded-md items-center justify-between">
        <div className="flex flex-row gap-2 items-center">
          <FaCalendarAlt />
          <span className="mt-1 font-bold">
            {months[month]} {year}
          </span>
        </div>
        <div className="flex flex-row gap-1">
          <button
            onClick={handlePrevMonth}
            className="bg-zinc-300/80 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 rounded-sm hover:cursor-pointer"
          >
            <HiChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNextMonth}
            className="bg-zinc-300/80 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 rounded-sm hover:cursor-pointer"
          >
            <HiChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendar Days */}
      <div className="text-sm grid grid-cols-7 grid-rows-5 gap-1">
        {week.map((day, index) => (
          <div
            key={index}
            className="flex text-xs font-bold items-center justify-center rounded-md pt-2 h-fit"
          >
            {day}
          </div>
        ))}
        {daysClear.map((_, index) => (
          <div key={index}></div>
        ))}
        {days.map((_day, index) => (
          <div
            onClick={() => {
              setDay(_day);
            }}
            key={index}
            className={`
              relative text-center justify-center hover:bg-zinc-300 dark:hover:bg-zinc-700 rounded-md proportional-nums py-1 hover:cursor-pointer
              ${_day == day ? "bg-zinc-300 dark:bg-zinc-700" : "bg-zinc-300/50 dark:bg-zinc-800"}`}
          >
            {_day}
            {daysHasTasks[_day - 1] && (
              <div className="absolute bg-zinc-500 dark:bg-zinc-300/50 w-3 h-0.5 bottom-1 left-2 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarCallendar;
