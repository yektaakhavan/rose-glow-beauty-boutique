import { formatPercent, formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

interface PriceProps {
  price: number;
  compareAtPrice?: number;
  discountPercent?: number;
  from?: boolean;
  size?: "sm" | "lg";
  className?: string;
}

export function Price({ price, compareAtPrice, discountPercent = 0, from, size = "sm", className }: PriceProps) {
  const onSale = !!compareAtPrice && discountPercent > 0;
  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-2 gap-y-0.5", className)}>
      <span
        className={cn(
          "font-semibold tabular-nums",
          onSale ? "text-sale" : "text-foreground",
          size === "lg" ? "text-2xl" : "text-[0.95rem]",
        )}
      >
        {from && <span className="me-1 text-xs font-normal text-muted-foreground">از</span>}
        {formatPrice(price)}
      </span>
      {onSale && (
        <>
          <span className="sr-only">قیمت قبلی:</span>
          <s className={cn("text-muted-foreground tabular-nums", size === "lg" ? "text-base" : "text-xs")}>
            {formatPrice(compareAtPrice)}
          </s>
          {size === "lg" && (
            <span className="rounded-full bg-sale-soft px-2.5 py-0.5 text-xs font-semibold text-sale">
              {formatPercent(discountPercent)} تخفیف
            </span>
          )}
        </>
      )}
    </div>
  );
}
