import type { ReactNode } from "react";

interface ModalActionsProps {
  children: ReactNode;
}

const ModalActions = ({ children }: ModalActionsProps) => {
  return (
    <div className="flex flex-row mt-6 justify-center space-x-4">
      {children}
    </div>
  );
};

export default ModalActions;
