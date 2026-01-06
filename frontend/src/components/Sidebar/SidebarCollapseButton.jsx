import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { TbLayoutSidebarRightCollapse } from "react-icons/tb";

const SidebarCollapseButton = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  return (
    <>
      {!sidebarCollapsed ? (
        <TbLayoutSidebarLeftCollapse
          title="Collapse sidebar"
          onClick={() => setSidebarCollapsed(true)}
          className="w-8 h-8 hover:text-neutral-300 hover:cursor-pointer"
        />
      ) : (
        <TbLayoutSidebarRightCollapse
          title="Expand sidebar"
          onClick={() => setSidebarCollapsed(false)}
          className="w-8 h-8 hover:text-neutral-300 hover:cursor-pointer"
        />
      )}
    </>
  );
};

export default SidebarCollapseButton;
