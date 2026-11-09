import type { ReactNode } from "react";

interface PillProps {
  children: ReactNode;
  className: string;
}

function Pill({ children, className }: PillProps) {
  return (
    <span className={`inline-flex min-h-[25px] w-fit items-center rounded-full px-2.5 text-[10px] font-extrabold ${className}`}>
      {children}
    </span>
  );
}

export default Pill;
