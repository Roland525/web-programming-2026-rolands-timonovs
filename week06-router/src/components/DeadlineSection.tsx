import type { Deadline, LoadState } from "../types";
import DeadlineItem from "./DeadlineItem";
import SectionHeading from "./SectionHeading";
import { EmptyBox, ErrorBox, LoadingBox } from "./StateBox";

interface DeadlineSectionProps {
  deadlines: LoadState<Deadline[]>;
  onRetry: () => void;
}

function DeadlineSection({ deadlines, onRetry }: DeadlineSectionProps) {
  let content;
  if (deadlines.status === "loading") {
    content = <LoadingBox text="Loading deadlines…" />;
  } else if (deadlines.status === "error") {
    content = <ErrorBox message={deadlines.message} onRetry={onRetry} />;
  } else if (deadlines.data.length === 0) {
    content = <EmptyBox title="No upcoming deadlines." text="There is nothing due right now." />;
  } else {
    const sorted = [...deadlines.data].sort((a, b) => {
      return `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`);
    });
    content = sorted.map((deadline) => (
      <DeadlineItem
        key={`${deadline.title}-${deadline.course}-${deadline.date}-${deadline.time}`}
        deadline={deadline}
      />
    ));
  }

  return (
    <section className="rounded-[18px] border border-[#e5e9f2] border-l-4 border-l-[#6d5dfc] bg-white p-6" id="deadlines">
      <SectionHeading eyebrow="DEADLINES" title="Coming up">
        <a className="text-xs font-extrabold text-[#6d5dfc] hover:text-[#5547df] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6d5dfc]" href="#">See all</a>
      </SectionHeading>
      <div className="grid" id="deadlineList">{content}</div>
    </section>
  );
}

export default DeadlineSection;
