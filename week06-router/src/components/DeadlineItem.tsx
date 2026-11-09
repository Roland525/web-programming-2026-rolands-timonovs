import type { Deadline } from "../types";
import { daysUntil, deadlineText } from "../date";
import Pill from "./Pill";

interface DeadlineItemProps {
  deadline: Deadline;
}

function DeadlineItem({ deadline }: DeadlineItemProps) {
  const date = new Date(`${deadline.date}T00:00:00`);
  const days = daysUntil(deadline.date);
  let badgeColor = "bg-slate-100 text-[#6f7788]";
  if (days < 0) badgeColor = "bg-[#fdeeee] text-[#c64444]";
  else if (days <= 5) badgeColor = "bg-[#fff5de] text-[#aa7416]";

  return (
    <article className="grid grid-cols-[auto_1fr] items-center gap-3.5 border-b border-[#e5e9f2] px-2 py-3.5 last:border-b-0 sm:grid-cols-[auto_1fr_auto]">
      <div className="grid min-h-[50px] w-[46px] place-items-center content-center rounded-xl bg-slate-50">
        <strong className="text-[17px] leading-none">{date.getDate()}</strong>
        <span className="mt-1 text-[9px] font-extrabold text-[#6c7485]">
          {date.toLocaleDateString("en-US", { month: "short" }).toUpperCase()}
        </span>
      </div>
      <div className="grid gap-1">
        <strong className="text-[13px]">{deadline.title}</strong>
        <span className="text-[11px] text-[#6c7485]">{deadline.course} · {deadline.time}</span>
      </div>
      <div className="col-start-2 sm:col-auto">
        <Pill className={badgeColor}>{deadlineText(days)}</Pill>
      </div>
    </article>
  );
}

export default DeadlineItem;
