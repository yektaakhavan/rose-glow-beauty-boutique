import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import type { Product } from "@/types/catalog";
import { ProductCard } from "./ProductCard";

/**
 * Horizontally scrollable product row using native scroll-snap (touch/trackpad
 * friendly, no carousel library, no autoplay). Buttons scroll one viewport.
 */
export function ProductRail({ products, label }: { products: Product[]; label: string }) {
  const ref = useRef<HTMLUListElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    // RTL: "next" moves toward negative scrollLeft.
    el.scrollBy({ left: -dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <ul
        ref={ref}
        aria-label={label}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-2 sm:-mx-6 sm:gap-5 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:px-0"
      >
        {products.map((p) => (
          <li key={p.id} className="w-[46%] shrink-0 snap-start sm:w-[31%] lg:w-[23.5%]">
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
      <div className="mt-4 hidden justify-end gap-2 lg:flex">
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="محصولات قبلی"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-card transition-colors hover:bg-muted"
        >
          <ChevronRight className="h-4 w-4" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="محصولات بعدی"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-card transition-colors hover:bg-muted"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
