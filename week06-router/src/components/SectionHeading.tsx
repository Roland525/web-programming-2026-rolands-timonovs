import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}

function SectionHeading({ eyebrow, title, children }: SectionHeadingProps) {
  return (
    <div className="mb-5 flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <p className="mb-2.5 text-[11px] font-extrabold tracking-[0.14em] text-[#6d5dfc]">{eyebrow}</p>
        <h2 className="text-[28px] font-bold tracking-[-0.035em]">{title}</h2>
      </div>
      {children}
    </div>
  );
}

export default SectionHeading;
