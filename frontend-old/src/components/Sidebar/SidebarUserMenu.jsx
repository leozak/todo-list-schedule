import { FaUserCog } from "react-icons/fa";

const SidebarUserMenu = ({ user }) => {
  return (
    <div className="absolute bottom-4 p-2 text-gray-400 text-sm font-semibold">
      <button
        title="User options"
        className="flex items-center py-1 gap-x-2 hover:text-gray-200 hover:cursor-pointer"
      >
        <FaUserCog /> {user.name}
      </button>
    </div>
  );
};

export default SidebarUserMenu;
