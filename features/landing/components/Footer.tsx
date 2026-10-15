import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface px-4 py-12 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" aria-label="Progress home">
            <Image
              src="/progress_no_bg.png"
              alt="Progress"
              width={40}
              height={32}
            />
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-6 text-ink-dim">
            Make progress, one step at a time.
          </p>
        </div>

        <nav aria-label="Product links">
          <h2 className="text-sm font-semibold text-ink">Explore</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link
                href="/documentation"
                className="text-ink-dim transition hover:text-(--secondary)"
              >
                Documentation
              </Link>
            </li>
            <li>
              <a
                href="#features"
                className="inline-flex items-center gap-1 text-ink-dim transition hover:text-(--secondary)"
              >
                Features <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            </li>
            <li>
              <Link
                href="/login"
                className="text-ink-dim transition hover:text-(--secondary)"
              >
                Log in
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                className="text-ink-dim transition hover:text-(--secondary)"
              >
                Create account
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Support links">
          <h2 className="text-sm font-semibold text-ink">Support</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href="https://vmy.onrender.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-ink-dim transition hover:text-(--secondary)"
              >
                Contact the developer
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-label="Legal links">
          <h2 className="text-sm font-semibold text-ink">Legal</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link
                href="/privacy-policy"
                className="text-ink-dim transition hover:text-(--secondary)"
              >
                Privacy policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-ink-dim transition hover:text-(--secondary)"
              >
                Terms &amp; conditions
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-2 border-t border-line pt-5 text-xs text-ink-dim sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Progress</p>
        <p>Built to help you make progress, one step at a time.</p>
      </div>
    </footer>
  );
}
