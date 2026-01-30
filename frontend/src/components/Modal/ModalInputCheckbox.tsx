import type { InputHTMLAttributes } from "react";
import { PiCheckFatFill } from "react-icons/pi";
import { twMerge } from "tailwind-merge";

interface ModalInputCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | null;
}

const ModalInputCheckbox = ({
  label,
  error,
  ...rest
}: ModalInputCheckboxProps) => {
  return (
    <div className="mb-1">
      <label
        htmlFor={rest.id}
        className="relative flex text-zinc-700 dark:text-zinc-300/90 text-xs sm:text-sm items-center ml-1 hover:cursor-pointer"
      >
        <input
          {...rest}
          type="checkbox"
          className={twMerge(
            "appearance-none bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 border-zinc-500 dark:border-zinc-600 w-4 h-4 border-2 rounded active:scale-90 mr-2 mb-2 hover:cursor-pointer",
            rest.className,
          )}
        />
        <PiCheckFatFill
          className="absolute text-zinc-700 dark:text-zinc-300 bottom-2 left-0 w-5 h-5"
          style={{ opacity: rest.checked ? "100" : "0" }}
        />
        {label}
      </label>
      {error && (
        <p className="text-red-600/70 dark:text-red-400/70 text-xs ml-2 mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default ModalInputCheckbox;
