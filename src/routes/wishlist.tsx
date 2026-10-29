import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/wishlist")({
  head: () => pageHead({ title: "علاقه‌مندی‌ها", description: "محصولاتی که برای بعد ذخیره کرده‌اید.", path: "/wishlist" }),
  component: () => <ComingSoon title="علاقه‌مندی‌ها" description="محصولاتی که برای بعد ذخیره کرده‌اید." />,
});
