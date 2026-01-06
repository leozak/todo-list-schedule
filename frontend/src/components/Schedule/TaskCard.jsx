import { useState } from "react";
import TaskCardDetails from "./TaskCardDetails";
import TaskCardPill from "./TaskCardPill";

const TaskCard = ({ task }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div key={task.id} className={task.done ? "opacity-50" : ""}>
      <TaskCardPill
        task={task}
        showDetails={showDetails}
        setShowDetails={setShowDetails}
      />

      <TaskCardDetails task={task} showDetails={showDetails} />
    </div>
  );
};

export default TaskCard;
