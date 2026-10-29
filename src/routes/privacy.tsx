import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => pageHead({ title: "حریم خصوصی", description: "نحوه‌ی نگهداری اطلاعات در روژان.", path: "/privacy" }),
  component: () => <ComingSoon title="حریم خصوصی" description="نحوه‌ی نگهداری اطلاعات در روژان." />,
});
