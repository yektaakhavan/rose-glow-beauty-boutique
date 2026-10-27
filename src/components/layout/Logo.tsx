import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <Link to="/" aria-label="روژان — صفحه اصلی" className={cn("inline-flex items-baseline gap-1.5", className)}>
      <span
        className={cn(
          "font-display text-[1.9rem] font-semibold leading-none",
          tone === "dark" ? "text-primary" : "text-ink-foreground",
        )}
      >
        روژان
      </span>
      <span
        className={cn(
          "hidden text-[0.6rem] font-medium uppercase tracking-[0.25em] sm:inline",
          tone === "dark" ? "text-rose-gold" : "text-ink-foreground/60",
        )}
        dir="ltr"
      >
        Rozhan
      </span>
    </Link>
  );
}
