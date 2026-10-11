import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/Button";

const sections = [
  { id: "features", label: "Features" },
  { id: "how-it-works", label: "How it works" },
  { id: "developer", label: "Developer" },
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
              href={s.id}
              className="transition-colors hover:text-(--secondary)"
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/login" className={buttonVariants.default}>
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
