import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "../ui/Button";

const sections = [
  { id: "features", label: "Features" },
  { id: "how-it-works", label: "How it works" },
  { id: "purpose", label: "Purpose" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-canvas/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/">
          <Image src="/progress_no_bg.png" alt="Logo" width={40} height={10} />
        </Link>

        <nav className="hidden gap-8 font-body text-sm font-medium text-ink/80 md:flex">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="transition-colors hover:text-(--secondary)"
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden text-sm font-semibold text-ink-dim transition hover:text-(--secondary) sm:inline"
          >
            Log in
          </Link>
          <ButtonLink href="/signup">Get started</ButtonLink>
        </div>
      </div>
    </header>
  );
}
