import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/blog")({
  head: () => pageHead({ title: "مجله زیبایی", description: "راهنماهای کوتاه مراقبت از پوست، آرایش و مو.", path: "/blog" }),
  component: () => <ComingSoon title="مجله زیبایی" description="راهنماهای کوتاه مراقبت از پوست، آرایش و مو." />,
});
