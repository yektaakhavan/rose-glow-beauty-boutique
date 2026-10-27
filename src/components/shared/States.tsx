import { Link, useRouter } from "@tanstack/react-router";
import { FlaskConical, SearchX, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon: Icon = SearchX,
  title,
  description,
  action,
  className,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-3xl border border-dashed bg-card px-6 py-14 text-center",
        className,
      )}
    >
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-primary">
        <Icon className="h-6 w-6" aria-hidden />
      </span>
      <h2 className="text-2xl text-foreground">{title}</h2>
      {description && <p className="mt-2 max-w-md text-sm leading-7 text-muted-foreground">{description}</p>}
      {action && <div className="mt-6 flex flex-wrap justify-center gap-2">{action}</div>}
    </div>
  );
}

/** Clear label for anything simulated in this build (orders, account, newsletter). */
export function DemoNotice({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      role="note"
      className={cn(
        "flex items-start gap-3 rounded-2xl border border-warning/30 bg-warning-soft px-4 py-3 text-sm leading-7 text-foreground",
        className,
      )}
    >
      <FlaskConical className="mt-1 h-4 w-4 shrink-0 text-warning" aria-hidden />
      <div>
        <span className="font-semibold">نسخه‌ی نمایشی (Demo): </span>
        {children}
      </div>
    </div>
  );
}

export function RouteError({ error }: { error: unknown }) {
  const router = useRouter();
  return (
    <div className="container-page py-24">
      <EmptyState
        title="این صفحه بارگذاری نشد"
        description={error instanceof Error ? error.message : "خطای غیرمنتظره‌ای رخ داد. دوباره تلاش کنید."}
        action={
          <>
            <Button onClick={() => router.invalidate()}>تلاش دوباره</Button>
            <Button variant="outline" asChild>
              <Link to="/">بازگشت به خانه</Link>
            </Button>
          </>
        }
      />
    </div>
  );
}

export function RouteNotFound({ title = "صفحه پیدا نشد", description }: { title?: string; description?: string }) {
  return (
    <div className="container-page py-24">
      <EmptyState
        title={title}
        description={description ?? "ممکن است این صفحه حذف شده یا آدرس آن تغییر کرده باشد."}
        action={
          <>
            <Button asChild>
              <Link to="/shop">رفتن به فروشگاه</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/">صفحه اصلی</Link>
            </Button>
          </>
        }
      />
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className,
  id,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div className={cn("mb-8 flex flex-wrap items-end justify-between gap-4", className)}>
      <div className="max-w-xl">
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h2 id={id} className="text-3xl text-foreground sm:text-4xl">
          {title}
        </h2>
        {description && <p className="mt-2 text-sm leading-7 text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function PageIntro({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <header className="border-b bg-secondary/40">
      <div className="container-page py-10 sm:py-14">
        {children}
        {eyebrow && <p className="eyebrow mb-2 mt-4">{eyebrow}</p>}
        <h1 className="mt-3 text-4xl text-foreground sm:text-5xl">{title}</h1>
        {description && (
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">{description}</p>
        )}
      </div>
    </header>
  );
}
