import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

import { useTheme } from "../../contexts/ThemeContext";

const Theme = () => {
  const { toggleTheme } = useTheme();
  return (
    <div className="bg-zinc-200 dark:bg-zinc-700 p-2 rounded-xl pb-1">
      <button
        onClick={() => toggleTheme("dark")}
        className="
                  bg-transparent p-1 rounded-lg text-black mr-1
                  hover:bg-zinc-400/40 hover:cursor-pointer
                  dark:text-white dark:bg-zinc-100/10 dark:hover:bg-zinc-100/10
                "
      >
        <MdOutlineDarkMode className="w-5 h-5" />
      </button>
      <button
        onClick={() => toggleTheme("light")}
        className="
                  bg-zinc-300/90 p-1 rounded-lg text-black ml-1
                  hover:bg-zinc-400/40 hover:cursor-pointer
                  dark:text-white dark:bg-transparent dark:hover:bg-zinc-100/10
                "
      >
        <MdOutlineLightMode className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Theme;
