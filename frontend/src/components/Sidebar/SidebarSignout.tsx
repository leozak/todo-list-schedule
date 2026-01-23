import { FaPowerOff } from "react-icons/fa";

const SidebarSignout = () => {
  return (
    <button
      onClick={() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/";
      }}
      className="hover:cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-300 dark:text-zinc-400"
    >
      <FaPowerOff className="w-6 h-6" />
    </button>
  );
};

export default SidebarSignout;
