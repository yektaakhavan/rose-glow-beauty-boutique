import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { EmptyState, PageIntro } from "./States";

/** Temporary page body for sections that are not built yet. */
export function ComingSoon({ title, description }: { title: string; description?: string }) {
  return (
    <>
      <PageIntro title={title} description={description} />
      <div className="container-page py-16">
        <EmptyState
          title="این بخش در حال ساخت است"
          description="این صفحه هنوز کامل نشده است. فعلاً می‌توانید محصولات فروشگاه را ببینید."
          action={
            <Button asChild>
              <Link to="/shop">رفتن به فروشگاه</Link>
            </Button>
          }
        />
      </div>
    </>
  );
}
