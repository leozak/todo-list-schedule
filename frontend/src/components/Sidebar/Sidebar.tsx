import { useState } from "react";
import SidebarExpanded from "./SidebarExpanded";
import SidebarCollapsed from "./SidebarCollapsed";
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarLeftExpandFilled,
} from "react-icons/tb";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  return (
    <div
      className={`absolute min-h-full p-3
                  sm:relative
                  ${isCollapsed ? "min-w-14" : "min-w-60"}
                  dark:bg-zinc-900`}
    >
      <div className="flex">
        {/* COLLAPSE  BUTTON */}
        {isCollapsed ? (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="dark:hover:text-zinc-50 dark:hover:cursor-pointer"
          >
            <TbLayoutSidebarLeftExpandFilled className="w-8 h-8" />
          </button>
        ) : (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="dark:hover:text-zinc-50 dark:hover:cursor-pointer"
          >
            <TbLayoutSidebarLeftCollapseFilled className="w-8 h-8" />
          </button>
        )}

        {/* TITLE */}
        {!isCollapsed && <h1 className="font-semibold text-lg">Tarefas</h1>}
      </div>
      {isCollapsed ? (
        <>
          <SidebarCollapsed />
        </>
      ) : (
        <>
          <SidebarExpanded />
        </>
      )}
    </div>
  );
};

export default Sidebar;
