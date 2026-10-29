import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => pageHead({ title: "تماس با ما", description: "راه‌های ارتباط با روژان.", path: "/contact" }),
  component: () => <ComingSoon title="تماس با ما" description="راه‌های ارتباط با روژان." />,
});
