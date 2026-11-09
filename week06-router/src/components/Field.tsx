import type { ReactNode } from "react";

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}

function Field({ id, label, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold">{label}</label>
      {children}
      <p id={`${id}Error`} className="mt-1 min-h-5 text-xs text-[#c64444]">{error}</p>
    </div>
  );
}

export default Field;
