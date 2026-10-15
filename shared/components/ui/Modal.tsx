"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { X } from "lucide-react";

export default function Modal({
  title,
  description,
  onClose,
  children,
}: {
  title: string;
  description?: string;
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="my-auto w-full max-w-xl rounded-3xl border border-line bg-surface p-6 shadow-2xl sm:p-8"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 id="modal-title" className="text-xl font-semibold text-ink">
              {title}
            </h2>
            {description && (
              <p className="mt-1.5 text-sm leading-6 text-ink-dim">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            className="rounded-xl p-2 text-ink-dim transition hover:bg-surface-soft hover:text-ink"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}
