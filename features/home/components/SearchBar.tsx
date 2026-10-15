"use client";

import { useEffect, useRef, useState } from "react";
import { LoaderCircle, Search, X } from "lucide-react";
import { searchUsers } from "@/features/users/api/search.api";
import UserSearchResults from "@/features/users/components/UserSearchResults";
import type { UserSearchResult } from "@/features/users/types/search.types";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UserSearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const term = query.trim();
    if (!term) return;

    let active = true;
    const timeoutId = window.setTimeout(async () => {
      setSearching(true);
      setError("");
      try {
        const matches = await searchUsers(term);
        if (active) setResults(matches);
      } catch (cause) {
        if (active) {
          setResults([]);
          setError(
            cause instanceof Error ? cause.message : "Could not search users.",
          );
        }
      } finally {
        if (active) setSearching(false);
      }
    }, 250);

    return () => {
      active = false;
      window.clearTimeout(timeoutId);
    };
  }, [query]);

  function clearSearch() {
    setQuery("");
    setResults([]);
    setError("");
    setOpen(false);
  }

  return (
    <div className="relative mx-3 w-full max-w-xl" ref={searchRef}>
      <label htmlFor="people-search" className="sr-only">
        Search Progress users
      </label>
      <div className="flex h-11 items-center rounded-full border border-line bg-surface px-4 shadow-sm transition focus-within:border-(--secondary)/60 focus-within:ring-2 focus-within:ring-(--secondary)/15">
        <Search
          size={18}
          className="shrink-0 text-ink-dim"
          aria-hidden="true"
        />
        <input
          id="people-search"
          type="search"
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setResults([]);
            setError("");
            if (!event.target.value.trim()) setSearching(false);
            setOpen(true);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") clearSearch();
          }}
          placeholder="Search people..."
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent px-3 text-sm text-ink outline-none placeholder:text-ink-dim/70"
        />
        {searching && (
          <LoaderCircle
            size={17}
            className="animate-spin text-ink-dim"
            aria-label="Searching"
          />
        )}
        {query && !searching && (
          <button
            type="button"
            onClick={clearSearch}
            aria-label="Clear search"
            className="rounded-full p-1 text-ink-dim transition hover:bg-surface-soft hover:text-ink"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {open && query.trim() && (
        <div className="absolute left-0 right-0 top-full z-40 mt-2 max-h-[min(70vh,34rem)] overflow-y-auto rounded-2xl border border-line bg-surface shadow-xl">
          {error ? (
            <p role="alert" className="px-4 py-5 text-sm text-red-600">
              {error}
            </p>
          ) : (
            <UserSearchResults
              results={results}
              searching={searching}
            />
          )}
        </div>
      )}
    </div>
  );
}
