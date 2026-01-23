import type { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface ModalActionCancelProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const ModalActionCancel = ({ text, ...rest }: ModalActionCancelProps) => {
  return (
    <button
      {...rest}
      className={twMerge(
        "px-4 py-0.5 text-sm sm:text-base text-zinc-50 bg-gradient-to-b from-red-700/90 hover:from-red-700 dark:from-red-700/80 dark:hover:from-red-700/90 to-red-950/90 hover:to-red-950 dark:to-red-950/80 dark:hover:to-red-950/90 rounded-md hover:cursor-pointer active:scale-97",
        rest.className,
      )}
    >
      {text ? text : "Cancelar"}
    </button>
  );
};

export default ModalActionCancel;
