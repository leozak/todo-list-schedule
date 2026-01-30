import { useState } from "react";
import type { Task } from "../../interfaces/tasks";

const TaskManagerViewTaskCard = ({
  id,
  title,
  description,
  tags,
  pin,
  done,
  date,
}: Omit<Task, "email">) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  return (
    <div className="mb-2 text-xs sm:text-sm">
      <div className="group relative flex scale-98 hover:scale-100">
        <div className="absolute bg-linear-to-br from-purple-900/30 to-blue-900/30 w-full h-full top-0 left-0 z-10 group-hover:blur-sm rounded-md"></div>
        <div
          className={`bg-zinc-900 group-hover:bg-zinc-900/95 font-semibold w-full z-20 p-1 pl-2 rounded-md`}
        >
          <p
            onClick={() => setShowDetails(!showDetails)}
            className={`text-zinc-200 hover:cursor-pointer py-1 pl-2
                      ${done ? "line-through decoration-zinc-400/50 decoration-2 text-zinc-500" : ""}`}
          >
            {title}
          </p>
          {showDetails && (
            <div className="flex flex-col border-t border-zinc-600 py-1 px-4 space-y-2">
              <p className="text-zinc-400">{description}</p>
              {tags.length > 0 && (
                <div>
                  {tags.split(",").map((tag, index) => (
                    <span
                      key={index}
                      className="dark:bg-zinc-600 py-0.5 px-2 rounded-md mr-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <p className="text-zinc-400">{pin ? "true" : "false"}</p>
              <p className="text-zinc-400">{done ? "true" : "false"}</p>
              <p className="text-zinc-400">{date}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskManagerViewTaskCard;
