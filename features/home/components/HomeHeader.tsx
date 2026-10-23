import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import AccountDropdown from "./AccountDropdown";

export default function HomeHeader({ username }: { username?: string }) {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-canvas/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-3 py-4 sm:gap-4 sm:px-6">
        <Link
          href="/home"
          aria-label="Progress home"
          className="shrink-0"
        >
          <Image
            src="/progress_no_bg.png"
            alt="Progress"
            width={40}
            height={20}
          />
        </Link>

        <SearchBar />

        <div className="shrink-0">
          <AccountDropdown username={username} />
        </div>
      </div>
    </header>
  );
}
