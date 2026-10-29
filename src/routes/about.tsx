import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => pageHead({ title: "درباره روژان", description: "داستان و فلسفه‌ی برند روژان.", path: "/about" }),
  component: () => <ComingSoon title="درباره روژان" description="داستان و فلسفه‌ی برند روژان." />,
});
