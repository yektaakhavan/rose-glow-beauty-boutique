import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  /** Omit for the current page. */
  to?: string;
  params?: Record<string, string>;
}

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="مسیر صفحه" className={cn("text-xs text-muted-foreground", className)}>
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <Link to="/" className="rounded px-0.5 hover:text-foreground">
            خانه
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-1">
            <ChevronLeft className="h-3 w-3 opacity-60" aria-hidden />
            {item.to ? (
              <Link
                to={item.to as "/"}
                params={item.params as never}
                className="rounded px-0.5 hover:text-foreground"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-foreground">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
