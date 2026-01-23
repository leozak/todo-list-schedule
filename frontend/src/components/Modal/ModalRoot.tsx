import type { ReactNode } from "react";

interface ModalRootProps {
  children: ReactNode;
}

const ModalRoot = ({ children }: ModalRootProps) => {
  return (
    <>
      <div className="fixed flex z-10 inset-0 justify-center items-center opacity-90 transition-colors bg-black/90 backdrop-blur-sm"></div>
      <div className="fixed flex inset-0 z-20 justify-center items-center">
        {/* dark:bg-zinc-700 */}
        {/* bg-zinc-200 */}
        <div
          className="
            relative text-zinc-700 bg-gradient-to-br m-5 p-6 rounded-2xl shadow-xl shadow-black
            from-zinc-200/80 to-zinc-200/30
            sm:m-20
            dark:text-zinc-300/85
            dark:from-zinc-600 dark:to-zinc-700/65"
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default ModalRoot;
