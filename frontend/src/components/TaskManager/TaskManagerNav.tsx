import Theme from "../Theme/Theme";

const TaskManagerNav = () => {
  return (
    <div className="flex items-center justify-between border-b-1 p-2 pb-4">
      <div>Navegador de dias</div>
      <div>
        <Theme />
      </div>
    </div>
  );
};

export default TaskManagerNav;
