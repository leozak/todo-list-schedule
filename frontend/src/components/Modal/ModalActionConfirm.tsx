import type { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface ModalActionConfirmProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const ModalActionConfirm = ({ text, ...rest }: ModalActionConfirmProps) => {
  return (
    <button
      {...rest}
      className={twMerge(
        "px-4 py-0.5 text-sm sm:text-base text-zinc-50 bg-gradient-to-b from-green-700/90 hover:from-green-700 dark:from-green-700/80 dark:hover:from-green-700/90 to-green-950/90 hover:to-green-950 dark:to-green-950/80 dark:hover:to-green-950/90 rounded-md hover:cursor-pointer active:scale-97",
        rest.className,
      )}
    >
      {text ? text : "Confirmar"}
    </button>
  );
};

export default ModalActionConfirm;
