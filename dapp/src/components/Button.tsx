import { ReactNode } from "react";

interface ButtonProps {
  onClick: (params?: any) => void;
  children: ReactNode;
}

const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <div
      className="hover:cursor-pointer hover:opacity-80 flex items-center justify-center rounded-md bg-secondary font-medium text-black"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Button;
