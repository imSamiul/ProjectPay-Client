import { HTMLProps } from "react";

interface ButtonProps {
  className?: HTMLProps<HTMLElement>["className"];
  children: React.ReactNode;
  onClick?: () => void;
}

function Button({ className, children, onClick }: ButtonProps) {
  return (
    <button
      className={`btn outline-none border-none   ${className}  btn-sm md:btn-md`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
