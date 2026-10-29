import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductGrid } from "@/components/products/ProductCard";
import { SectionHeading } from "@/components/shared/States";
import { Button } from "@/components/ui/button";
import { getBestSellers } from "@/features/products/selectors";
import { imageUrl } from "@/lib/images";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => pageHead({ title: "روژان | فروشگاه آنلاین آرایشی و مراقبتی", description: "آرایش صورت، چشم و لب، مراقبت از پوست و مو و عطر؛ انتخابی دقیق از محصولات زیبایی در روژان.", path: "/" }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="container-page grid items-center gap-10 py-10 md:grid-cols-2 md:py-16">
        <div>
          <p className="eyebrow mb-3">مراقبت روزانه، زیبایی ماندگار</p>
          <h1 className="text-5xl text-foreground sm:text-6xl">زیبایی، ساده و دقیق</h1>
          <p className="mt-4 max-w-md leading-8 text-muted-foreground">انتخابی کوتاه از محصولات آرایشی و مراقبتی برای روتینی که واقعاً استفاده می‌کنید.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild><Link to="/shop">مشاهده محصولات</Link></Button>
            <Button size="lg" variant="outline" asChild><Link to="/sale">پیشنهادهای ویژه</Link></Button>
          </div>
        </div>
        <img src={imageUrl("hero")} alt="محصولات آرایشی و مراقبتی روژان" width={1100} height={1222} fetchPriority="high" className="aspect-[9/10] w-full rounded-3xl object-cover" />
      </section>
      <section className="container-page py-12">
        <SectionHeading title="پرفروش‌ترین‌ها" action={<Link to="/shop" className="text-sm text-primary">مشاهده همه</Link>} />
        <ProductGrid products={getBestSellers(8)} />
      </section>
    </>
  );
}
