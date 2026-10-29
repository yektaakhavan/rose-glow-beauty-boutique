import { createFileRoute } from "@tanstack/react-router";
import { ProductGrid } from "@/components/products/ProductCard";
import { EmptyState, PageIntro } from "@/components/shared/States";
import { products } from "@/data/products";
import { parseShopSearch, queryProducts, searchToQuery } from "@/features/products/query";
import { formatNumber } from "@/lib/format";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/shop")({
  validateSearch: (raw: Record<string, unknown>) => parseShopSearch(raw),
  head: () => pageHead({ title: "فروشگاه", description: "همه‌ی محصولات آرایشی و مراقبتی روژان.", path: "/shop" }),
  component: Page,
});

function Page() {
  const search = Route.useSearch();
  const { items, total } = queryProducts(products, { ...searchToQuery(search), page: 50 });
  return (
    <>
      <PageIntro title="فروشگاه" description={`${formatNumber(total)} محصول`} />
      <div className="container-page py-10">
        {items.length ? <ProductGrid products={items} priorityCount={4} /> : <EmptyState title="محصولی پیدا نشد" description="عبارت دیگری را امتحان کنید." />}
      </div>
    </>
  );
}
