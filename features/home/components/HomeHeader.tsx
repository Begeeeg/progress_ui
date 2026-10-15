import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import AccountDropdown from "./AccountDropdown";

export default function HomeHeader({ username }: { username?: string }) {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-canvas/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/home" aria-label="Progress home">
          <Image
            src="/progress_no_bg.png"
            alt="Progress"
            width={40}
            height={20}
          />
        </Link>

        <SearchBar />

        <AccountDropdown username={username} />
      </div>
    </header>
  );
}
