import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

const fieldClasses =
  "w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-ink-dim/70 focus:border-(--secondary) focus:ring-2 focus:ring-(--secondary)/15";

export function FormField({
  label,
  id,
  hint,
  children,
}: {
  label: string;
  id: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs leading-5 text-ink-dim">{hint}</p>}
    </div>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${fieldClasses} ${props.className ?? ""}`} />;
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`${fieldClasses} min-h-24 resize-y ${props.className ?? ""}`}
    />
  );
}

export function SelectInput(props: InputHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...(props as InputHTMLAttributes<HTMLSelectElement>)}
      className={`${fieldClasses} ${props.className ?? ""}`}
    />
  );
}
