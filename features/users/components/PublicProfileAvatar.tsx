"use client";

import { useState } from "react";
import Image from "next/image";
import { UserRound } from "lucide-react";

export default function PublicProfileAvatar({
  avatarUrl,
}: {
  avatarUrl: string | null;
}) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-3xl border-4 border-surface bg-surface-soft text-(--secondary) shadow-sm">
      {avatarUrl && !imageFailed ? (
        <Image
          src={avatarUrl}
          alt=""
          width={96}
          height={96}
          unoptimized
          onError={() => setImageFailed(true)}
          className="size-full object-cover"
        />
      ) : (
        <UserRound size={36} aria-hidden="true" />
      )}
    </div>
  );
}
