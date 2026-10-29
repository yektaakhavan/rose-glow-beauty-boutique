import { createFileRoute } from "@tanstack/react-router";
import { ProductGrid } from "@/components/products/ProductCard";
import { EmptyState, PageIntro } from "@/components/shared/States";
import { products } from "@/data/products";
import { parseShopSearch, queryProducts, searchToQuery } from "@/features/products/query";
import { formatNumber } from "@/lib/format";
import { pageHead } from "@/lib/seo";
import { getOnSale } from "@/features/products/selectors";

export const Route = createFileRoute("/sale")({
  validateSearch: (raw: Record<string, unknown>) => parseShopSearch(raw),
  head: () => pageHead({ title: "تخفیف‌ها", description: "محصولات تخفیف‌دار روژان.", path: "/sale" }),
  component: Page,
});

function Page() {
  const search = Route.useSearch();
  const { items, total } = queryProducts(getOnSale(), { ...searchToQuery(search), page: 50 });
  return (
    <>
      <PageIntro title="تخفیف‌ها" description={`${formatNumber(total)} محصول`} />
      <div className="container-page py-10">
        {items.length ? <ProductGrid products={items} priorityCount={4} /> : <EmptyState title="محصولی پیدا نشد" description="عبارت دیگری را امتحان کنید." />}
      </div>
    </>
  );
}
