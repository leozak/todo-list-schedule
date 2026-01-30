import { BsCalendar2Fill } from "react-icons/bs";

import { useContext } from "react";
import { DateContext } from "../../contexts/DateContext";

const SidebarCollapsed = () => {
  const { day } = useContext(DateContext);
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute text-zinc-300 dark:text-zinc-700 text-sm font-semibold mt-2">
        {day}
      </div>
      <BsCalendar2Fill className="w-7 h-7" />
    </div>
  );
};

export default SidebarCollapsed;
