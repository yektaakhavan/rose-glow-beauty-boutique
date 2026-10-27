import { Star } from "lucide-react";
import { formatNumber, formatRating } from "@/lib/format";
import { cn } from "@/lib/utils";

export function RatingStars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-hidden>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn("h-3.5 w-3.5", i <= Math.round(value) ? "fill-rose-gold text-rose-gold" : "text-border")}
        />
      ))}
    </span>
  );
}

/** Compact rating line. Ratings come from labelled sample reviews. */
export function RatingInline({ average, count, className }: { average: number; count: number; className?: string }) {
  if (count === 0) return null;
  return (
    <span className={cn("inline-flex items-center gap-1 text-xs text-muted-foreground", className)}>
      <Star className="h-3.5 w-3.5 fill-rose-gold text-rose-gold" aria-hidden />
      <span className="font-medium text-foreground">{formatRating(average)}</span>
      <span>({formatNumber(count)} نظر نمونه)</span>
      <span className="sr-only">امتیاز {formatRating(average)} از ۵ بر اساس نظرات نمونه</span>
    </span>
  );
}
