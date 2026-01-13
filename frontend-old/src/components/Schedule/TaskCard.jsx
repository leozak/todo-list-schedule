import { useState } from "react";
import TaskCardDetails from "./TaskCardDetails";
import TaskCardPill from "./TaskCardPill";
import TaskUpdate from "./TaskUpdate";

const TaskCard = ({ task }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);

  return (
    <>
      <div className={task.done ? "opacity-50" : ""}>
        <TaskCardPill
          task={task}
          showDetails={showDetails}
          setShowDetails={setShowDetails}
        />

        <TaskCardDetails
          task={task}
          showDetails={showDetails}
          editTask={() => setShowEditTask(true)}
        />
      </div>

      {/* EDITA A TAREFA */}
      {showEditTask && (
        <TaskUpdate task={task} closeEditTask={() => setShowEditTask(false)} />
      )}
    </>
  );
};

export default TaskCard;
