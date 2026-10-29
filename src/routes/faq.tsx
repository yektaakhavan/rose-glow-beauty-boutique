import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  head: () => pageHead({ title: "سؤالات متداول", description: "پاسخ پرسش‌های رایج درباره خرید، ارسال و مرجوعی.", path: "/faq" }),
  component: () => <ComingSoon title="سؤالات متداول" description="پاسخ پرسش‌های رایج درباره خرید، ارسال و مرجوعی." />,
});
