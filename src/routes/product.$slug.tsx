import { createFileRoute, notFound } from "@tanstack/react-router";
import { Price } from "@/components/products/Price";
import { WishlistButton } from "@/components/products/WishlistButton";
import { RouteError, RouteNotFound } from "@/components/shared/States";
import { Button } from "@/components/ui/button";
import { getBrand } from "@/data/catalog";
import { getPriceInfo, getProductBySlug } from "@/features/products/selectors";
import { useAddToCart } from "@/hooks/use-add-to-cart";
import { imageUrl } from "@/lib/images";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    if (!getProductBySlug(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const p = getProductBySlug(params.slug);
    return pageHead({ title: p?.name ?? "محصول", description: p?.shortDescription ?? "محصول روژان", path: `/product/${params.slug}`, type: "product", noindex: !p });
  },
  component: Page,
  errorComponent: ({ error }) => <RouteError error={error} />,
  notFoundComponent: () => <RouteNotFound title="محصول پیدا نشد" />,
});

function Page() {
  const { slug } = Route.useParams();
  const product = getProductBySlug(slug);
  const addToCart = useAddToCart();
  if (!product) return null;
  const info = getPriceInfo(product);
  return (
    <div className="container-page grid gap-10 py-10 md:grid-cols-2">
      <img src={imageUrl(product.images[0] ?? "")} alt={product.name} width={720} height={720} className="aspect-square w-full rounded-3xl object-cover" />
      <div>
        <p className="text-sm text-muted-foreground">{getBrand(product.brandId)?.name}</p>
        <h1 className="mt-2 text-4xl">{product.name}</h1>
        <p className="mt-4 leading-8 text-muted-foreground">{product.shortDescription}</p>
        <Price className="mt-6" size="lg" price={info.price} compareAtPrice={info.compareAtPrice} discountPercent={info.discountPercent} />
        <div className="mt-6 flex gap-2">
          <Button size="lg" onClick={() => addToCart(product)}>افزودن به سبد خرید</Button>
          <WishlistButton productId={product.id} productName={product.name} variant="outline" />
        </div>
      </div>
    </div>
  );
}
