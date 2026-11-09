import DeadlineSection from "../components/DeadlineSection";
import type { Deadline, LoadState } from "../types";

interface DeadlinesPageProps {
  deadlines: LoadState<Deadline[]>;
  onRetry: () => void;
}

function DeadlinesPage({ deadlines, onRetry }: DeadlinesPageProps) {
  return (
    <div className="mx-auto w-full max-w-[1220px] px-[14px] py-[34px] sm:px-5">
      <title>Deadlines · CampusFlow</title>
      <DeadlineSection deadlines={deadlines} onRetry={onRetry} />
    </div>
  );
}

export default DeadlinesPage;
