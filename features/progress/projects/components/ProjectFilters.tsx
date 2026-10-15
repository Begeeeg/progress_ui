import { Search } from "lucide-react";
import type { ProjectStatus, ProjectType } from "../types/project.types";

export default function ProjectFilters({
  title,
  type,
  status,
  onTitleChange,
  onTypeChange,
  onStatusChange,
}: {
  title: string;
  type: ProjectType | "";
  status: ProjectStatus | "";
  onTitleChange: (value: string) => void;
  onTypeChange: (value: ProjectType | "") => void;
  onStatusChange: (value: ProjectStatus | "") => void;
}) {
  return (
    <div className="grid gap-3 rounded-2xl border border-line bg-surface p-3 sm:grid-cols-[1fr_11rem_11rem] sm:p-4">
      <label className="relative">
        <span className="sr-only">Search projects</span>
        <Search
          size={17}
          aria-hidden="true"
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-dim"
        />
        <input
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder="Search projects..."
          className="h-11 w-full rounded-xl border border-line bg-canvas pl-10 pr-3 text-sm text-ink outline-none transition placeholder:text-ink-dim/70 focus:border-(--secondary) focus:ring-2 focus:ring-(--secondary)/15"
        />
      </label>
      <label>
        <span className="sr-only">Project type</span>
        <select
          value={type}
          onChange={(event) => onTypeChange(event.target.value as ProjectType | "")}
          className="h-11 w-full rounded-xl border border-line bg-canvas px-3 text-sm text-ink outline-none focus:border-(--secondary)"
        >
          <option value="">All types</option>
          <option value="personal">Personal</option>
          <option value="team">Team</option>
        </select>
      </label>
      <label>
        <span className="sr-only">Project status</span>
        <select
          value={status}
          onChange={(event) =>
            onStatusChange(event.target.value as ProjectStatus | "")
          }
          className="h-11 w-full rounded-xl border border-line bg-canvas px-3 text-sm text-ink outline-none focus:border-(--secondary)"
        >
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="inactive">On hold</option>
          <option value="achieved">Achieved</option>
        </select>
      </label>
    </div>
  );
}
