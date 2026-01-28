import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useContext, useRef, useState } from "react";

import Theme from "../Theme/Theme";
import { DateContext } from "../../contexts/DateContext";
import { useTheme } from "../../contexts/ThemeContext";

import { months } from "../../sets/calendar";
import { FaCrosshairs, FaSearch } from "react-icons/fa";
import { RiCrosshair2Fill } from "react-icons/ri";
import { IoClose, IoSearch } from "react-icons/io5";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { LuSearchX } from "react-icons/lu";

const nowDate = new Date();

interface TaskManagerNavProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const TaskManagerNav = ({ search, setSearch }: TaskManagerNavProps) => {
  const [showSearch, setShowSearch] = useState<boolean>(false);

  const { year, setYear, month, setMonth, day, setDay } =
    useContext(DateContext);

  const searchRef = useRef<HTMLInputElement>(null);

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const { theme, toggleTheme } = useTheme();

  const handleNextDay = () => {
    if (day < getDaysInMonth(month, year)) {
      setDay(day + 1);
    } else if (month < 11) {
      setMonth(month + 1);
      setDay(1);
    } else {
      setYear(year + 1);
      setMonth(0);
      setDay(1);
    }
  };

  const handlePrevDay = () => {
    if (day > 1) {
      setDay(day - 1);
    } else if (month > 0) {
      setMonth(month - 1);
      setDay(getDaysInMonth(month - 1, year));
    } else {
      setYear(year - 1);
      setMonth(11);
      setDay(getDaysInMonth(11, year - 1));
    }
  };

  const handleNow = () => {
    setYear(nowDate.getUTCFullYear());
    setMonth(nowDate.getUTCMonth());
    setDay(nowDate.getUTCDate());
  };

  const handleShowSearch = async () => {
    await setShowSearch(!showSearch);
    searchRef?.current?.focus();
  };

  return (
    <>
      <div className="flex items-center justify-between p-2 pb-4">
        {showSearch ? (
          <>
            <div className="flex flex-row w-full justify-center">
              <div className="flex text-zinc-500 dark:text-zinc-600 bg-zinc-200 dark:bg-zinc-300 focus:bg-zinc-300 items-center py-1 px-2 border rounded-xl border-zinc-500 gap-2">
                <FaSearch
                  onClick={() => searchRef?.current?.focus()}
                  className="hover:cursor-pointer hover:text-zinc-600 active:scale-90"
                />
                <input
                  value={search}
                  ref={searchRef}
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Pesquisar"
                  className="w-full text-zinc-600 dark:text-zinc-700 bg-transparent focus:outline-none"
                />
                <IoClose
                  onClick={() => {
                    setSearch("");
                    searchRef?.current?.focus();
                  }}
                  className="text-zinc-500 dark:text-zinc-600 hover:cursor-pointer hover:text-zinc-600 active:scale-90 w-5 h-5"
                />
              </div>
            </div>
            <div className="ml-2">
              <IoClose
                title="Fechar pesquisa"
                onClick={() => setShowSearch(false)}
                className="w-6 h-6 sm:w-8 sm:h-8 hover:cursor-pointer hover:text-zinc-600 active:scale-90"
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-row gap-1 my-1">
              <button
                onClick={handleNow}
                title="Ir para o dia atual"
                className="bg-zinc-400/40 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-600 p-1 rounded-sm hover:cursor-pointer active:scale-90"
              >
                <FaCrosshairs className="w-4 h-4 mx-0.5" />
              </button>

              <button
                onClick={handlePrevDay}
                title="Retroceder um dia"
                className="bg-zinc-400/40 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-600 rounded-sm hover:cursor-pointer active:scale-90"
              >
                <HiChevronLeft className="w-7 h-7" />
              </button>
              <button
                onClick={handleNextDay}
                title="Avançar um dia"
                className="bg-zinc-400/40 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-600 rounded-sm hover:cursor-pointer active:scale-90"
              >
                <HiChevronRight className="w-7 h-7" />
              </button>
              <button
                onClick={handleShowSearch}
                title="Buscar"
                className="relative bg-zinc-400/40 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-600 p-1 rounded-sm hover:cursor-pointer active:scale-90"
              >
                <FaSearch className="w-4 h-4 mx-0.5" />
                {search.length > 0 && (
                  <div className="absolute w-1.5 h-1.5 top-0.5 right-0.5 bg-yellow-600/80 rounded-full animate-pulse"></div>
                )}
              </button>
            </div>
            <div className="text-sm sm:text-xl font-semibold text-center">
              {day} de {months[month]}
            </div>
            <div className="flex">
              {/* <Theme /> */}
              {theme === "dark" ? (
                <button
                  onClick={() => toggleTheme("light")}
                  title="Mudar para tema claro"
                  className="bg-zinc-400/40 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-600 p-1 rounded-sm hover:cursor-pointer active:scale-90"
                >
                  <MdOutlineLightMode className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={() => toggleTheme("dark")}
                  title="Mudar para tema escuro"
                  className="bg-zinc-400/40 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-600 p-1 rounded-sm hover:cursor-pointer active:scale-90"
                >
                  <MdOutlineDarkMode className="w-5 h-5" />
                </button>
              )}
            </div>
          </>
        )}
      </div>
      <hr className="text-zinc-400 dark:text-zinc-600 shadow" />
    </>
  );
};

export default TaskManagerNav;
