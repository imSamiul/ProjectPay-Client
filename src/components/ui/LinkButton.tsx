import { Link, LinkOptions } from "@tanstack/react-router";
import { HTMLProps } from "react";

type LinkButtonProps = {
  title: string;
  to: LinkOptions["to"];
  className?: HTMLProps<HTMLElement>["className"];
};

function LinkButton({ title, to, className }: LinkButtonProps) {
  return (
    <Link to={to} className={className}>
      {title}
    </Link>
  );
}

export default LinkButton;
