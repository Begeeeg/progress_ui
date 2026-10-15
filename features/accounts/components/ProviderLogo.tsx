import Image from "next/image";
import type { AccountProvider } from "../types/account.types";

const providerLogoPaths: Record<AccountProvider, string> = {
  github: "/icons/github_icon.png",
  google: "/icons/google_icon.png",
  linkedin: "/icons/linkedin_icon.png",
  facebook: "/icons/facebook_icon.png",
};

export default function ProviderLogo({
  provider,
  size = 28,
}: {
  provider: AccountProvider;
  size?: number;
}) {
  return (
    <span className="flex shrink-0 items-center justify-center rounded-xl bg-white">
      <Image
        src={providerLogoPaths[provider]}
        alt=""
        width={size}
        height={size}
        className="object-contain"
      />
    </span>
  );
}
