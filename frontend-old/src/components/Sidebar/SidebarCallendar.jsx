import { useContext } from "react";
import { FaCalendarAlt, FaUserCog } from "react-icons/fa";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import { DateContext } from "../../context/DateContext";
import { TasksContext } from "../../context/TasksContext";

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const week = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

const SidebarCallendar = () => {
  const { year, setYear, month, setMonth, day, setDay } =
    useContext(DateContext);

  const { hasTasks } = useContext(TasksContext);

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getDayOfWeek = (day, month, year) => {
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
        (i + 1 < 10 ? "0" + (i + 1) : i + 1)
    );
  });

  return (
    <>
      {/* CALLENDAR  */}
      <div className="p-2 my-2">
        {/* Callendar Navbar */}
        <div className="w-full inline-flex align-middle justify-between text-gray-400 text-sm">
          <div className="left inline-flex items-center">
            <FaCalendarAlt />
            <span className="ml-2">
              {months[month]} {year}
            </span>
          </div>
          <div className="right">
            <button
              title="Previous Month"
              onClick={() => {
                setMonth((month - 1 + 12) % 12);
                if (month === 0) {
                  setYear(year - 1);
                }
              }}
              className="p-0.5 m-1 bg-cyan-900 rounded-sm hover:bg-cyan-800 hover:cursor-pointer hover:text-gray-200"
            >
              <HiChevronLeft />
            </button>
            <button
              title="Next Month"
              onClick={() => {
                setMonth((month + 1) % 12);
                if (month === 11) {
                  setYear(year + 1);
                }
              }}
              className="p-0.5 m-1 bg-cyan-900 rounded-sm hover:bg-cyan-800 hover:cursor-pointer hover:text-gray-200"
            >
              <HiChevronRight />
            </button>
          </div>
        </div>

        {/* Calendar Days */}
        <div className="text-xs text-gray-400 grid grid-cols-7 text-center">
          {week.map((nameDay) => (
            <div key={nameDay} className="font-bold text-gray-300 py-1">
              {nameDay}
            </div>
          ))}

          {daysClear.map((_day, i) => (
            <div key={i} className="py-1"></div>
          ))}

          {days.map((_day) => (
            <div
              key={_day}
              onClick={() => setDay(_day)}
              className={`${day === _day ? "bg-cyan-900" : ""}
              ${
                daysHasTasks[_day - 1]
                  ? "underline font-bold text-gray-200"
                  : "font-normal"
              } rounded-sm hover:bg-cyan-800 hover:cursor-pointer hover:text-gray-100 py-1`}
            >
              {_day}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SidebarCallendar;
