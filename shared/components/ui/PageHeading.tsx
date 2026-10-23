import type { ReactNode } from "react";

export default function PageHeading({
    eyebrow,
    title,
    description,
    actions,
}: {
    eyebrow?: string;
    title: string;
    description?: string;
    actions?: ReactNode;
}) {
    return (
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
                {eyebrow && (
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-(--secondary)">
                        {eyebrow}
                    </p>
                )}
                <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                    {title}
                </h1>
                {description && (
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-dim sm:text-base">
                        {description}
                    </p>
                )}
            </div>
            {actions && (
                <div className="flex shrink-0 items-center gap-3">
                    {actions}
                </div>
            )}
        </div>
    );
}
