import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () => pageHead({ title: "شرایط استفاده", description: "شرایط استفاده از فروشگاه روژان.", path: "/terms" }),
  component: () => <ComingSoon title="شرایط استفاده" description="شرایط استفاده از فروشگاه روژان." />,
});
