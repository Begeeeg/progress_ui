import { LoaderCircle, UserRound } from "lucide-react";
import Link from "next/link";
import type { UserSearchResult } from "../types/search.types";

export default function UserSearchResults({
  results,
  searching,
}: {
  results: UserSearchResult[];
  searching: boolean;
}) {
  if (searching) {
    return (
      <p className="flex items-center gap-2 px-4 py-5 text-sm text-ink-dim">
        <LoaderCircle size={16} className="animate-spin" />
        Looking for people...
      </p>
    );
  }

  if (results.length === 0) {
    return (
      <p className="px-4 py-5 text-sm text-ink-dim">
        No users found. Try another name or username.
      </p>
    );
  }

  return (
    <ul className="py-2">
      {results.map((result) => (
        <li key={result.id}>
          <Link
            href={`/home/users/${encodeURIComponent(result.username)}`}
            className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-(--secondary)/5"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-(--secondary)/10 text-(--secondary)">
              <UserRound size={17} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-ink">
                @{result.username}
              </span>
              <span className="block truncate text-xs text-ink-dim">
                {result.givenname} {result.surname}
              </span>
            </span>
            <span
              className={`size-2 shrink-0 rounded-full ${result.isOnline ? "bg-(--primary)" : "bg-ink-dim/40"}`}
              aria-label={result.isOnline ? "Online" : "Offline"}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
