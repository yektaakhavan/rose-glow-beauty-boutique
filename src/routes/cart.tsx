import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/cart")({
  head: () => pageHead({ title: "سبد خرید", description: "محصولات انتخاب‌شده‌ی شما.", path: "/cart" }),
  component: () => <ComingSoon title="سبد خرید" description="محصولات انتخاب‌شده‌ی شما." />,
});
