import { createFileRoute, notFound } from "@tanstack/react-router";
import { ProductGrid } from "@/components/products/ProductCard";
import { PageIntro, RouteError, RouteNotFound } from "@/components/shared/States";
import { getCategory } from "@/data/catalog";
import { products } from "@/data/products";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    if (!getCategory(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const c = getCategory(params.slug);
    return pageHead({ title: c?.name ?? "دسته‌بندی", description: c?.description ?? "دسته‌بندی محصولات روژان", path: `/category/${params.slug}`, noindex: !c });
  },
  component: Page,
  errorComponent: ({ error }) => <RouteError error={error} />,
  notFoundComponent: () => <RouteNotFound title="دسته‌بندی پیدا نشد" />,
});

function Page() {
  const { slug } = Route.useParams();
  const c = getCategory(slug);
  const list = products.filter((p) => p.category === slug);
  return (
    <>
      <PageIntro title={c?.name ?? ""} description={c?.description} />
      <div className="container-page py-10">
        <ProductGrid products={list} priorityCount={4} />
      </div>
    </>
  );
}
