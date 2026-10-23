"use client";

import { useEffect, useState } from "react";
import { getTasks } from "@/features/progress/tasks/api/task.api";
import type { Task } from "@/features/progress/tasks/types/task.types";
import type { Project } from "../types/project.types";

type DayProgress = {
    label: string;
    date: Date;
    completed: number;
    open: number;
    projectsDue: number;
};

function getWeekDays(): DayProgress[] {
    const today = new Date();
    const mondayOffset = (today.getDay() + 6) % 7;
    const monday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - mondayOffset,
    );

    return Array.from({ length: 7 }, (_, index) => {
        const date = new Date(monday);
        date.setDate(monday.getDate() + index);
        return {
            label: date.toLocaleDateString(undefined, { weekday: "short" }),
            date,
            completed: 0,
            open: 0,
            projectsDue: 0,
        };
    });
}

function sameLocalDay(left: Date, right: Date) {
    return (
        left.getFullYear() === right.getFullYear() &&
        left.getMonth() === right.getMonth() &&
        left.getDate() === right.getDate()
    );
}

export default function WeeklyProgressChart({
    projects,
}: {
    projects: Project[];
}) {
    const projectKey = projects.map((project) => project.id).join("|");
    const [result, setResult] = useState<{
        projectKey: string;
        requestKey: number;
        tasks: Task[];
        error: string;
    }>({ projectKey: "", requestKey: 0, tasks: [], error: "" });
    const [retryKey, setRetryKey] = useState(0);

    useEffect(() => {
        let active = true;
        const projectIds = projectKey ? projectKey.split("|") : [];

        Promise.all(projectIds.map((projectId) => getTasks(projectId)))
            .then((results) => {
                if (active) {
                    setResult({
                        projectKey,
                        requestKey: retryKey,
                        tasks: results.flat(),
                        error: "",
                    });
                }
            })
            .catch((cause: unknown) => {
                if (active) {
                    setResult({
                        projectKey,
                        requestKey: retryKey,
                        tasks: [],
                        error:
                            cause instanceof Error
                                ? cause.message
                                : "Could not load weekly task progress.",
                    });
                }
            });

        return () => {
            active = false;
        };
    }, [projectKey, retryKey]);

    const loading =
        result.projectKey !== projectKey || result.requestKey !== retryKey;
    const error = loading ? "" : result.error;
    const tasks = loading || error ? [] : result.tasks;
    const days = getWeekDays();
    for (const task of tasks) {
        const deadline = new Date(task.deadline);
        if (Number.isNaN(deadline.getTime())) continue;

        const day = days.find((item) => sameLocalDay(item.date, deadline));
        if (!day) continue;

        if (task.status === "completed") day.completed += 1;
        else day.open += 1;
    }
    for (const project of projects) {
        const dueDate = new Date(project.dueDate);
        if (Number.isNaN(dueDate.getTime())) continue;

        const day = days.find((item) => sameLocalDay(item.date, dueDate));
        if (day) day.projectsDue += 1;
    }

    const weeklyTotal = days.reduce(
        (total, day) => total + day.completed + day.open,
        0,
    );
    const completedTotal = days.reduce(
        (total, day) => total + day.completed,
        0,
    );
    const projectsDueThisWeek = days.reduce(
        (total, day) => total + day.projectsDue,
        0,
    );
    const maxDailyTotal = Math.max(
        1,
        ...days.map((day) => day.completed + day.open),
    );

    return (
        <section
            className="rounded-2xl border border-line bg-surface p-5"
            aria-labelledby="weekly-progress-heading"
        >
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h2
                        id="weekly-progress-heading"
                        className="font-semibold text-ink"
                    >
                        Weekly progress
                    </h2>
                    <p className="mt-1 text-xs leading-5 text-ink-dim">
                        Tasks due this week by current status
                    </p>
                </div>
                {!loading && !error && (
                    <span className="shrink-0 rounded-full bg-surface-soft px-2.5 py-1 text-xs font-semibold text-ink">
                        {`${weeklyTotal > 0 ? Math.round((completedTotal / weeklyTotal) * 100) : 0}%`}
                    </span>
                )}
            </div>

            <div className="mt-4 h-60">
                {loading ? (
                    <div className="flex h-full items-center justify-center">
                        <p className="text-sm text-ink-dim" role="status">
                            Loading weekly progress...
                        </p>
                    </div>
                ) : error ? (
                    <div className="flex h-full flex-col items-center justify-center gap-2 text-sm text-red-700">
                        <p role="alert">{error}</p>
                        <button
                            type="button"
                            onClick={() => setRetryKey((key) => key + 1)}
                            className="font-semibold underline"
                        >
                            Try again
                        </button>
                    </div>
                ) : (
                    <div className="flex h-full flex-col">
                        <p className="text-sm font-medium text-ink">
                            {weeklyTotal > 0
                                ? `${completedTotal} of ${weeklyTotal} tasks due this week completed`
                                : "No tasks due this week"}
                        </p>
                        <p className="mt-1 text-xs text-ink-dim">
                            {projectsDueThisWeek === 0
                                ? "No projects due this week"
                                : `${projectsDueThisWeek} ${projectsDueThisWeek === 1 ? "project" : "projects"} due this week`}
                        </p>
                        <div
                            className="mt-4 flex min-h-0 flex-1 items-end justify-between gap-1"
                            role="img"
                            aria-label={`${completedTotal} of ${weeklyTotal} tasks due this week are currently completed. Daily bars show completed and open tasks by due date. Project deadline markers show projects due each day.`}
                        >
                            {days.map((day) => {
                                const total = day.completed + day.open;
                                const height = (total / maxDailyTotal) * 100;

                                return (
                                    <div
                                        key={day.date.toISOString()}
                                        className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1"
                                        aria-hidden="true"
                                    >
                                        <span className="h-4 text-[10px] text-ink-dim">
                                            {total || ""}
                                        </span>
                                        <div className="flex h-20 w-full max-w-6 items-end justify-center">
                                            <div
                                                className="flex w-full flex-col overflow-hidden rounded-t-md bg-surface-soft"
                                                style={{
                                                    height: `${Math.max(height, 2)}%`,
                                                }}
                                            >
                                                {day.open > 0 && (
                                                    <span
                                                        className="w-full flex-1"
                                                        style={{
                                                            flexGrow: day.open,
                                                        }}
                                                    />
                                                )}
                                                {day.completed > 0 && (
                                                    <span
                                                        className="w-full flex-1 bg-(--secondary)"
                                                        style={{
                                                            flexGrow:
                                                                day.completed,
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <span className="text-[10px] text-ink-dim">
                                            {day.label}
                                        </span>
                                        <span className="flex h-4 items-center justify-center text-[10px] font-medium text-(--tertiary)">
                                            {day.projectsDue > 0 ? (
                                                <>
                                                    <span className="mr-1 size-1.5 rounded-full bg-(--tertiary)" />
                                                    {day.projectsDue}
                                                </>
                                            ) : (
                                                ""
                                            )}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-ink-dim">
                            <span className="inline-flex items-center gap-1.5">
                                <span
                                    className="size-2 rounded-full bg-(--secondary)"
                                    aria-hidden="true"
                                />
                                Completed
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <span
                                    className="size-2 rounded-full bg-surface-soft ring-1 ring-line"
                                    aria-hidden="true"
                                />
                                Open
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <span
                                    className="size-2 rounded-full bg-(--tertiary)"
                                    aria-hidden="true"
                                />
                                Project due
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
