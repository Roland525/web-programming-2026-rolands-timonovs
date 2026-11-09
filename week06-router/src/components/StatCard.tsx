type StatTone = "neutral" | "positive" | "danger";

interface StatCardProps {
  index: string;
  label: string;
  value: string;
  note: string;
  tone?: StatTone;
}

const noteColors: Record<StatTone, string> = {
  neutral: "text-[#6c7485]",
  positive: "text-[#1ca76f]",
  danger: "text-[#c64444]",
};

function StatCard({ index, label, value, note, tone = "neutral" }: StatCardProps) {
  return (
    <article className="flex gap-3.5 rounded-[18px] border border-[#e5e9f2] bg-white p-5 shadow-sm">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f0edff] text-[11px] font-extrabold text-[#6d5dfc]">{index}</div>
      <div>
        <p className="mb-1 text-xs text-[#6c7485]">{label}</p>
        <strong className="block text-[26px] leading-tight">{value}</strong>
        <span className={`mt-1.5 block text-[10px] font-bold ${noteColors[tone]}`}>{note}</span>
      </div>
    </article>
  );
}

export default StatCard;
