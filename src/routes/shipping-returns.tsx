import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/shipping-returns")({
  head: () => pageHead({ title: "ارسال و مرجوعی", description: "روش‌ها و هزینه‌های ارسال و شرایط مرجوعی.", path: "/shipping-returns" }),
  component: () => <ComingSoon title="ارسال و مرجوعی" description="روش‌ها و هزینه‌های ارسال و شرایط مرجوعی." />,
});
