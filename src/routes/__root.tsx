import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DirectionProvider } from "@radix-ui/react-direction";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AnnouncementBar, SiteHeader } from "@/components/layout/SiteHeader";
import { Toaster } from "@/components/ui/sonner";
import { SITE_NAME, jsonLdScript } from "@/lib/seo";
import { useHydrateStores } from "@/store/hydration";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-20">
      <div className="max-w-md text-center">
        <p className="font-display text-7xl text-primary">۴۰۴</p>
        <h1 className="mt-4 text-3xl text-foreground">صفحه پیدا نشد</h1>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          صفحه‌ای که دنبالش هستید وجود ندارد یا آدرس آن تغییر کرده است.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <Link
            to="/shop"
            className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
          >
            رفتن به فروشگاه
          </Link>
          <Link
            to="/"
            className="inline-flex h-11 items-center justify-center rounded-full border border-input bg-card px-6 text-sm font-medium hover:bg-muted"
          >
            صفحه اصلی
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-20">
      <div className="max-w-md text-center">
        <h1 className="text-3xl text-foreground">این صفحه بارگذاری نشد</h1>
        <p className="mt-2 text-sm text-muted-foreground">مشکلی پیش آمد. دوباره تلاش کنید یا به صفحه اصلی برگردید.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
          >
            تلاش دوباره
          </button>
          <a
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-full border border-input bg-card px-6 text-sm font-medium hover:bg-muted"
          >
            صفحه اصلی
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#fbf8f3" },
      { title: `${SITE_NAME} | فروشگاه آنلاین آرایشی و مراقبتی` },
      { name: "description", content: "روژان؛ فروشگاه آنلاین آرایشی، مراقبت از پوست، مو و عطر." },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Markazi+Text:wght@500;600;700&family=Vazirmatn:wght@300..700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
    scripts: [
      jsonLdScript({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        alternateName: "Rozhan",
        description: "فروشگاه نمونه محصولات آرایشی و مراقبتی",
      }),
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useHydrateStores();

  return (
    <QueryClientProvider client={queryClient}>
      <DirectionProvider dir="rtl">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
        >
          رفتن به محتوای اصلی
        </a>
        <AnnouncementBar />
        <SiteHeader />
        <main id="main" className="min-h-[60vh]">
          {/* Required: nested routes render here. */}
          <Outlet />
        </main>
        <SiteFooter />
        <Toaster position="top-center" dir="rtl" richColors={false} closeButton />
      </DirectionProvider>
    </QueryClientProvider>
  );
}
