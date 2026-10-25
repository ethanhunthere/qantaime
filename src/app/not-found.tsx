import Link from "next/link";
import { Button } from "@/shared/ui";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24 text-center space-y-6">
      <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[var(--accent-cognac)]">
        Archival Reference 404
      </span>
      <h1 className="font-sans font-medium uppercase text-2xl sm:text-3xl tracking-[0.06em] leading-[1.05] text-[var(--text-primary)]">
        Silhouette Not Located
      </h1>
      <p className="text-xs font-mono text-[var(--text-secondary)] leading-relaxed max-w-md mx-auto">
        The requested bag design reference either belongs to an unreleased past archive or has been re-indexed in the workshop catalogue.
      </p>
      <div className="pt-2">
        <Link href="/" className="inline-block w-full sm:w-auto">
          <Button variant="primary" size="md" className="w-full sm:w-auto min-h-[46px]">
            Return to Permanent Works
          </Button>
        </Link>
      </div>
    </div>
  );
}
