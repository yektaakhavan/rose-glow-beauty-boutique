import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { getBrand } from "@/data/catalog";
import { getStockStatus } from "@/features/inventory/stock";
import { getMinPrice, getPriceInfo, getRatingSummary } from "@/features/products/selectors";
import { useAddToCart } from "@/hooks/use-add-to-cart";
import { useAvailableStock } from "@/hooks/use-cart";
import { formatPercent } from "@/lib/format";
import { imageUrl } from "@/lib/images";
import { cn } from "@/lib/utils";
import type { Product, ProductBadge } from "@/types/catalog";
import { Price } from "./Price";
import { RatingInline } from "./Rating";
import { WishlistButton } from "./WishlistButton";

export const BADGE_LABEL: Record<ProductBadge, string> = {
  new: "جدید",
  bestseller: "پرفروش",
  limited: "تعداد محدود",
};

interface ProductCardProps {
  product: Product;
  /** Load eagerly (first row above the fold). */
  priority?: boolean;
  className?: string;
}

export function ProductCard({ product, priority = false, className }: ProductCardProps) {
  const brand = getBrand(product.brandId);
  const info = getPriceInfo(product);
  const minPrice = getMinPrice(product);
  const hasPriceRange = !!product.variants && product.variants.options.some((v) => v.price !== minPrice);
  const available = useAvailableStock(product);
  const status = getStockStatus(available);
  const rating = getRatingSummary(product);
  const addToCart = useAddToCart();
  const [main, hover] = product.images;

  return (
    <article className={cn("group relative flex h-full flex-col", className)}>
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
        <div className="h-full w-full">
          <img
            src={imageUrl(main ?? "")}
            alt=""
            width={720}
            height={720}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className={cn(
              "h-full w-full object-cover transition-[transform,opacity] duration-500 ease-out group-hover:scale-[1.03]",
              hover && "group-hover:opacity-0",
              status === "out" && "opacity-70",
            )}
          />
          {hover && (
            <img
              src={imageUrl(hover)}
              alt=""
              width={720}
              height={720}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
        </div>

        <div className="pointer-events-none absolute start-3 top-3 flex flex-col items-start gap-1.5">
          {info.discountPercent > 0 && (
            <span className="rounded-full bg-sale px-2.5 py-1 text-[0.7rem] font-semibold text-sale-foreground">
              {formatPercent(info.discountPercent)}−
            </span>
          )}
          {product.badges.slice(0, 1).map((b) => (
            <span key={b} className="rounded-full bg-card/90 px-2.5 py-1 text-[0.7rem] font-medium text-foreground">
              {BADGE_LABEL[b]}
            </span>
          ))}
        </div>

        <WishlistButton productId={product.id} productName={product.name} className="absolute end-3 top-3 z-10" />

        {status === "out" ? (
          <span className="absolute inset-x-3 bottom-3 rounded-full bg-card/90 py-2 text-center text-xs font-medium text-muted-foreground">
            ناموجود
          </span>
        ) : (
          <button
            type="button"
            onClick={() => addToCart(product)}
            aria-label={`افزودن سریع ${product.name} به سبد خرید`}
            className="absolute bottom-3 end-3 z-10 inline-flex h-10 items-center gap-1.5 rounded-full bg-ink px-3.5 text-xs font-medium text-ink-foreground shadow-soft transition-[transform,background-color] duration-200 hover:bg-primary active:scale-95"
          >
            <Plus className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">افزودن</span>
          </button>
        )}
      </div>

      <div className="mt-3 flex flex-1 flex-col gap-1 px-0.5">
        <p className="text-[0.7rem] font-medium tracking-wide text-muted-foreground">
          {brand?.name} <span className="opacity-60">· {product.productType}</span>
        </p>
        <h3 className="line-clamp-2 min-h-[2.75rem] font-sans text-sm font-medium leading-[1.4rem] text-foreground">
          <Link
            to="/product/$slug"
            params={{ slug: product.slug }}
            className="after:absolute after:inset-0 after:rounded-2xl after:content-[''] hover:text-primary focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-ring"
          >
            {product.name}
          </Link>
        </h3>
        <RatingInline average={rating.average} count={rating.count} />
        <div className="mt-auto flex flex-wrap items-center justify-between gap-1 pt-1">
          <Price
            price={hasPriceRange ? minPrice : info.price}
            compareAtPrice={info.compareAtPrice}
            discountPercent={info.discountPercent}
            from={hasPriceRange}
          />
          {status === "low" && <span className="text-[0.7rem] font-medium text-warning">فقط چند عدد باقی مانده</span>}
        </div>
      </div>
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col" aria-hidden>
      <div className="aspect-square animate-pulse rounded-2xl bg-muted" />
      <div className="mt-3 h-3 w-1/3 animate-pulse rounded bg-muted" />
      <div className="mt-2 h-4 w-4/5 animate-pulse rounded bg-muted" />
      <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-muted" />
    </div>
  );
}

export function ProductGrid({ products, priorityCount = 0 }: { products: Product[]; priorityCount?: number }) {
  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-3 xl:grid-cols-4">
      {products.map((p, i) => (
        <li key={p.id}>
          <ProductCard product={p} priority={i < priorityCount} />
        </li>
      ))}
    </ul>
  );
}
