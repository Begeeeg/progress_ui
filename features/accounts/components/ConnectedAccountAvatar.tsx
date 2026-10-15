"use client";

import { useState } from "react";
import Image from "next/image";
import type { AccountProvider } from "../types/account.types";
import ProviderLogo from "./ProviderLogo";

export default function ConnectedAccountAvatar({
  provider,
  avatarUrl,
}: {
  provider: AccountProvider;
  avatarUrl: string | null;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <span className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-line bg-white">
      {avatarUrl && !imageFailed ? (
        <Image
          src={avatarUrl}
          alt=""
          width={48}
          height={48}
          unoptimized
          onError={() => setImageFailed(true)}
          className="size-full object-cover"
        />
      ) : (
        <ProviderLogo provider={provider} size={30} />
      )}
    </span>
  );
}
