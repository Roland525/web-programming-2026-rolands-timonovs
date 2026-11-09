interface LoadingBoxProps {
  text: string;
}

interface ErrorBoxProps {
  message: string;
  onRetry: () => void;
}

interface EmptyBoxProps {
  title: string;
  text: string;
}

export function LoadingBox({ text }: LoadingBoxProps) {
  return (
    <p role="status" className="col-span-full rounded-[18px] border border-[#e5e9f2] bg-white p-8 text-center text-sm text-[#6c7485]">
      {text}
    </p>
  );
}

export function ErrorBox({ message, onRetry }: ErrorBoxProps) {
  return (
    <div role="alert" className="col-span-full rounded-[18px] border border-[#f0caca] bg-[#fff5f5] p-6 text-center text-sm text-[#9c3434]">
      <p>{message}</p>
      <button type="button" onClick={onRetry} className="mt-3 cursor-pointer rounded-lg bg-[#6d5dfc] px-4 py-2 text-xs font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6d5dfc]">
        Try again
      </button>
    </div>
  );
}

export function EmptyBox({ title, text }: EmptyBoxProps) {
  return (
    <div className="col-span-full rounded-[18px] border border-[#e5e9f2] bg-white p-8 text-center text-sm text-[#6c7485]">
      <p className="font-bold">{title}</p>
      <p>{text}</p>
    </div>
  );
}
