export default function LoadingState({
  label = "Loading...",
}: {
  label?: string;
}) {
  return (
    <div
      role="status"
      className="flex min-h-48 items-center justify-center gap-3 text-sm text-ink-dim"
    >
      <span className="size-5 animate-spin rounded-full border-2 border-(--secondary)/25 border-t-(--secondary)" />
      {label}
    </div>
  );
}
