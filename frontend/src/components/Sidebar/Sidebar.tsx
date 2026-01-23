import { useState } from "react";
import SidebarExpanded from "./SidebarExpanded";
import SidebarCollapsed from "./SidebarCollapsed";
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarLeftExpandFilled,
} from "react-icons/tb";
import SidebarSignout from "./SidebarSignout";
import SidebarUser from "./SidebarUser";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  return (
    <div
      className={`absolute min-h-full p-3 bg-zinc-400 z-10
                  sm:relative
                  ${isCollapsed ? "min-w-14" : "min-w-60"}
                  dark:bg-zinc-900`}
    >
      <div className="flex items-center mb-6">
        {/* COLLAPSE  BUTTON */}
        {isCollapsed ? (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hover:text-zinc-600 dark:hover:text-zinc-50 hover:cursor-pointer"
          >
            <TbLayoutSidebarLeftExpandFilled className="w-8 h-8" />
          </button>
        ) : (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hover:text-zinc-600 dark:hover:text-zinc-50 hover:cursor-pointer"
          >
            <TbLayoutSidebarLeftCollapseFilled className="w-8 h-8" />
          </button>
        )}

        {/* TITLE */}
        {!isCollapsed && (
          <h1 className="font-semibold text-lg w-full text-center mr-6">
            Tarefas
          </h1>
        )}
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
      <div className="absolute flex flex-col gap-y-4 bottom-4 items-center">
        {/* USER MENU */}
        <SidebarUser />

        {/* SAIR */}
        <SidebarSignout />
      </div>
    </div>
  );
};

export default Sidebar;
