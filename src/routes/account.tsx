import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/account")({
  head: () => pageHead({ title: "حساب کاربری", description: "حساب نمایشی روژان.", path: "/account" }),
  component: () => <ComingSoon title="حساب کاربری" description="حساب نمایشی روژان." />,
});
