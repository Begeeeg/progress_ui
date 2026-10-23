"use client";

import { useEffect, useState } from "react";
import { getTasks } from "@/features/progress/tasks/api/task.api";
import type { Task } from "@/features/progress/tasks/types/task.types";

export default function ProjectTaskAnalytics({
    projectId,
}: {
    projectId: string;
}) {
    const [result, setResult] = useState<{
        projectId: string;
        tasks: Task[];
        error: string;
    }>({ projectId: "", tasks: [], error: "" });
    const [retryKey, setRetryKey] = useState(0);

    useEffect(() => {
        let active = true;

        getTasks(projectId)
            .then((tasks) => {
                if (active) setResult({ projectId, tasks, error: "" });
            })
            .catch((cause: unknown) => {
                if (active) {
                    setResult({
                        projectId,
                        tasks: [],
                        error:
                            cause instanceof Error
                                ? cause.message
                                : "Could not load task analytics.",
                    });
                }
            });

        return () => {
            active = false;
        };
    }, [projectId, retryKey]);

    const loading = result.projectId !== projectId;
    const error = loading ? "" : result.error;
    const tasks = loading || error ? [] : result.tasks;
    const completed = tasks.filter((task) => task.status === "completed").length;
    const inProgress = tasks.filter(
        (task) => task.status === "in_progress",
    ).length;
    const pending = tasks.filter((task) => task.status === "pending").length;
    const total = tasks.length;

    return (
        <section
            className="rounded-2xl border border-line bg-surface p-5 sm:p-6"
            aria-labelledby="project-task-analytics-title"
        >
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h2
                        id="project-task-analytics-title"
                        className="font-semibold text-ink"
                    >
                        Task progress
                    </h2>
                    <p className="mt-1 text-xs text-ink-dim">
                        Status breakdown for this project
                    </p>
                </div>
                {!loading && !error && (
                    <span className="rounded-full bg-surface-soft px-2.5 py-1 text-xs font-semibold text-ink">
                        {total > 0
                            ? `${Math.round((completed / total) * 100)}%`
                            : "0%"}
                    </span>
                )}
            </div>

            {loading ? (
                <p className="mt-6 text-sm text-ink-dim" role="status">
                    Loading task analytics...
                </p>
            ) : error ? (
                <div className="mt-6 text-sm text-red-700" role="alert">
                    {error}{" "}
                    <button
                        type="button"
                        onClick={() => setRetryKey((key) => key + 1)}
                        className="font-semibold underline"
                    >
                        Try again
                    </button>
                </div>
            ) : (
                <>
                    <div className="mt-6 flex items-end justify-between gap-4">
                        <p className="text-3xl font-semibold tracking-tight text-ink">
                            {completed}
                            <span className="ml-1 text-base font-medium text-ink-dim">
                                / {total}
                            </span>
                        </p>
                        <p className="pb-1 text-xs text-ink-dim">
                            {total === 1 ? "task completed" : "tasks completed"}
                        </p>
                    </div>

                    <div
                        className="mt-4 flex h-3 overflow-hidden rounded-full bg-surface-soft"
                        role="img"
                        aria-label={`${pending} pending, ${inProgress} in progress, ${completed} completed`}
                    >
                        {total > 0 && (
                            <>
                                <span
                                    className="h-full bg-amber-400"
                                    style={{ width: `${(pending / total) * 100}%` }}
                                />
                                <span
                                    className="h-full bg-(--secondary)"
                                    style={{
                                        width: `${(inProgress / total) * 100}%`,
                                    }}
                                />
                                <span
                                    className="h-full bg-emerald-500"
                                    style={{
                                        width: `${(completed / total) * 100}%`,
                                    }}
                                />
                            </>
                        )}
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-2">
                        <div className="rounded-xl bg-surface-soft/70 p-3">
                            <span className="mb-2 flex items-center gap-1.5 text-[11px] text-ink-dim">
                                <span className="size-2 rounded-full bg-amber-400" />
                                To do
                            </span>
                            <p className="text-lg font-semibold text-ink">
                                {pending}
                            </p>
                        </div>
                        <div className="rounded-xl bg-surface-soft/70 p-3">
                            <span className="mb-2 flex items-center gap-1.5 text-[11px] text-ink-dim">
                                <span className="size-2 rounded-full bg-(--secondary)" />
                                In progress
                            </span>
                            <p className="text-lg font-semibold text-ink">
                                {inProgress}
                            </p>
                        </div>
                        <div className="rounded-xl bg-surface-soft/70 p-3">
                            <span className="mb-2 flex items-center gap-1.5 text-[11px] text-ink-dim">
                                <span className="size-2 rounded-full bg-emerald-500" />
                                Done
                            </span>
                            <p className="text-lg font-semibold text-ink">
                                {completed}
                            </p>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
}
