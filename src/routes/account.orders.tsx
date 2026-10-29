import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/account/orders")({
  head: () => pageHead({ title: "سفارش‌های من", description: "تاریخچه‌ی سفارش‌های نمایشی.", path: "/account/orders" }),
  component: () => <ComingSoon title="سفارش‌های من" description="تاریخچه‌ی سفارش‌های نمایشی." />,
});
