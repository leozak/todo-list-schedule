import { useState } from "react";

import SidebarCollapseButton from "./SidebarCollapseButton";
import SidebarTitle from "./SidebarTitle";
import SidebarCallendar from "./SidebarCallendar";
import SidebarUserMenu from "./SidebarUserMenu";

const Sidebar = ({ user }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="relative min-w-60 min-h-full h-screen p-2 bg-cyan-950">
      <div className="flex p-1 mb-5 text-gray-400 items-center">
        {/* COLLAPSE  BUTTON */}
        <SidebarCollapseButton
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />

        {/* TITLE */}
        <SidebarTitle />
      </div>

      {/* CALLENDAR */}
      <SidebarCallendar />

      {/* USER MENU */}
      <SidebarUserMenu user={user} />

      {/* SAIR */}
      <div className="absolute bottom-6 right-4">
        <button
          onClick={() => {
            sessionStorage.removeItem("loggedIn");
            window.location.href = "/";
          }}
          className="text-gray-400 text-sm font-semibold hover:text-gray-300 hover:cursor-pointer"
        >
          Sair
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
