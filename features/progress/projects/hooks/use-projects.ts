"use client";

import { useCallback, useEffect, useState } from "react";
import { searchProjects } from "../api/project.api";
import type { Project, ProjectStatus, ProjectType } from "../types/project.types";

export default function useProjects(filters: {
  title: string;
  type: ProjectType | "";
  status: ProjectStatus | "";
}) {
  const { title, type, status } = filters;
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = useCallback(() => setRefreshKey((key) => key + 1), []);

  useEffect(() => {
    let active = true;
    const timeoutId = window.setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const result = await searchProjects({ title, type, status });
        if (active) setProjects(result);
      } catch (cause) {
        if (active) {
          setError(
            cause instanceof Error ? cause.message : "Could not load projects.",
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }, title.trim() ? 250 : 0);

    return () => {
      active = false;
      window.clearTimeout(timeoutId);
    };
  }, [status, title, type, refreshKey]);

  return { projects, loading, error, refresh };
}
