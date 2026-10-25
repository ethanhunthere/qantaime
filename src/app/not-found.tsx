import Link from "next/link";
import { Button } from "@/shared/ui";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-6">
      <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-cognac)]">
        Archival Reference 404
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl text-[var(--text-primary)]">
        Silhouette Not Located
      </h1>
      <p className="text-xs font-mono text-[var(--text-secondary)] leading-relaxed max-w-md mx-auto">
        The requested bag design reference either belongs to an unreleased past archive or has been re-indexed in the workshop catalogue.
      </p>
      <div className="pt-2">
        <Link href="/">
          <Button variant="primary" size="md">
            Return to Permanent Works
          </Button>
        </Link>
      </div>
    </div>
  );
}
