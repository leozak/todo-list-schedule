import type { ReactNode } from "react";

interface ModalCloseConfirmProps {
  children: ReactNode;
}

const ModalCloseConfirm = ({ children }: ModalCloseConfirmProps) => {
  return (
    <>
      <div className="fixed flex z-10 inset-0 justify-center items-center opacity-90 transition-colors bg-black/60 backdrop-blur-sm"></div>
      <div className="fixed flex inset-0 z-20 justify-center items-center">
        <div
          className="
            absolute self-center text-zinc-700 bg-gradient-to-br m-5 p-6 rounded-2xl shadow-xl shadow-black backdrop-blur-xs
            from-zinc-200/80 to-zinc-200/30
            sm:m-20
            dark:text-zinc-300/85
            dark:from-zinc-600 dark:to-zinc-700/65"
        >
          <h2>Tem certeza que deseja sair?</h2>
          <div className="flex flex-row mt-4 justify-center space-x-4">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalCloseConfirm;
