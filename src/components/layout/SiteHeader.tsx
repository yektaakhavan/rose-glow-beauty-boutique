import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { categories, needs } from "@/data/catalog";
import { FREE_SHIPPING_THRESHOLD } from "@/features/cart/pricing";
import { useCartCount } from "@/hooks/use-cart";
import { formatNumber, formatPrice } from "@/lib/format";
import { imageUrl } from "@/lib/images";
import { cn } from "@/lib/utils";
import { useStoresHydrated } from "@/store/hydration";
import { useWishlistStore } from "@/store/wishlist";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Logo } from "./Logo";
import { SearchForm } from "./SearchForm";

const NAV_LINKS = [
  { to: "/new", label: "جدیدترین‌ها" },
  { to: "/sale", label: "تخفیف‌ها" },
  { to: "/blog", label: "مجله زیبایی" },
  { to: "/about", label: "درباره روژان" },
] as const;

export function AnnouncementBar() {
  return (
    <div className="bg-ink text-ink-foreground">
      <p className="container-page py-2 text-center text-xs leading-5">
        ارسال رایگان با پست پیشتاز برای خریدهای بالای {formatPrice(FREE_SHIPPING_THRESHOLD)}
        <Link to="/shipping-returns" className="ms-2 underline underline-offset-4 opacity-80 hover:opacity-100">
          قوانین ارسال
        </Link>
      </p>
    </div>
  );
}

function CountBadge({ count, label }: { count: number; label: string }) {
  if (count <= 0) return null;
  return (
    <span
      key={count}
      className="animate-bump absolute -top-0.5 end-0 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[0.65rem] font-semibold text-primary-foreground"
    >
      {formatNumber(count)}
      <span className="sr-only"> {label}</span>
    </span>
  );
}

const iconBtn =
  "relative inline-flex h-11 w-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted";

export function SiteHeader() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hydrated = useStoresHydrated();
  const cartCount = useCartCount();
  const wishCount = useWishlistStore((s) => s.ids.length);

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMegaOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [megaOpen]);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 150);
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="container-page flex h-16 items-center gap-2 lg:gap-6">
        <button type="button" className={cn(iconBtn, "lg:hidden")} aria-label="باز کردن منو" onClick={() => setMobileOpen(true)}>
          <Menu className="h-5 w-5" />
        </button>

        <Logo />

        <nav aria-label="منوی اصلی" className="hidden lg:block">
          <ul className="flex items-center gap-1 text-sm">
            <li onMouseEnter={openMega} onMouseLeave={scheduleClose}>
              <button
                type="button"
                aria-expanded={megaOpen}
                aria-controls="mega-menu"
                onClick={() => setMegaOpen((v) => !v)}
                className="inline-flex h-10 items-center gap-1 rounded-full px-3 font-medium hover:bg-muted"
              >
                دسته‌بندی‌ها
                <ChevronDown className={cn("h-4 w-4 transition-transform", megaOpen && "rotate-180")} aria-hidden />
              </button>
            </li>
            <li>
              <Link
                to="/shop"
                className="inline-flex h-10 items-center rounded-full px-3 hover:bg-muted"
                activeProps={{ className: "text-primary font-medium" }}
              >
                فروشگاه
              </Link>
            </li>
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={cn(
                    "inline-flex h-10 items-center rounded-full px-3 hover:bg-muted",
                    l.to === "/sale" && "text-sale",
                  )}
                  activeProps={{ className: "font-medium text-primary" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ms-auto flex items-center gap-0.5 sm:gap-1">
          <SearchForm className="me-2 hidden w-64 xl:block xl:w-72" />
          <button type="button" className={cn(iconBtn, "xl:hidden")} aria-label="جست‌وجو" onClick={() => setSearchOpen(true)}>
            <Search className="h-5 w-5" />
          </button>
          <Link to="/account" className={cn(iconBtn, "hidden sm:inline-flex")} aria-label="حساب کاربری">
            <User className="h-5 w-5" />
          </Link>
          <Link to="/wishlist" className={iconBtn} aria-label="علاقه‌مندی‌ها">
            <Heart className="h-5 w-5" />
            {hydrated && <CountBadge count={wishCount} label="محصول در علاقه‌مندی‌ها" />}
          </Link>
          <Link to="/cart" className={iconBtn} aria-label="سبد خرید">
            <ShoppingBag className="h-5 w-5" />
            {hydrated && <CountBadge count={cartCount} label="کالا در سبد خرید" />}
          </Link>
        </div>
      </div>

      {/* Desktop mega menu */}
      <div
        id="mega-menu"
        hidden={!megaOpen}
        onMouseEnter={openMega}
        onMouseLeave={scheduleClose}
        className="absolute inset-x-0 top-full hidden border-b bg-background shadow-lift lg:block"
      >
        <div className="container-page grid grid-cols-[1fr_16rem] gap-10 py-8 animate-in fade-in-0 slide-in-from-top-1 duration-200">
          <ul className="grid grid-cols-4 gap-4">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/category/$slug"
                  params={{ slug: c.slug }}
                  className="group flex items-center gap-3 rounded-2xl p-2 transition-colors hover:bg-muted"
                >
                  <img
                    src={imageUrl(c.image)}
                    alt=""
                    width={56}
                    height={56}
                    loading="lazy"
                    className="h-14 w-14 rounded-xl object-cover"
                  />
                  <span>
                    <span className="block text-sm font-medium group-hover:text-primary">{c.name}</span>
                    <span className="block text-xs text-muted-foreground">{c.tagline}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="border-s ps-8">
            <p className="eyebrow mb-3">خرید بر اساس نیاز</p>
            <ul className="space-y-2 text-sm">
              {needs.map((n) => (
                <li key={n.slug}>
                  <Link to="/shop" search={{ need: n.slug }} className="hover:text-primary">
                    {n.title}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link to="/shop" className="font-medium text-primary">
                  مشاهده همه محصولات
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="overflow-y-auto p-0">
          <SheetHeader className="border-b px-5 py-4">
            <SheetTitle className="text-start">
              <span className="font-display text-2xl text-primary">روژان</span>
            </SheetTitle>
          </SheetHeader>
          <nav aria-label="منوی موبایل" className="px-5 pb-8">
            <SearchForm className="my-4" onSubmitted={() => setMobileOpen(false)} />
            <ul className="space-y-1 border-b pb-4 text-[0.95rem]">
              <li>
                <Link to="/shop" className="flex h-11 items-center font-medium">
                  همه محصولات
                </Link>
              </li>
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className={cn("flex h-11 items-center", l.to === "/sale" && "text-sale")}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="eyebrow mb-2 mt-5">دسته‌بندی‌ها</p>
            <ul className="grid grid-cols-2 gap-2">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    to="/category/$slug"
                    params={{ slug: c.slug }}
                    className="flex items-center gap-2 rounded-xl bg-muted/60 p-2 text-sm"
                  >
                    <img src={imageUrl(c.image)} alt="" width={40} height={40} loading="lazy" className="h-10 w-10 rounded-lg object-cover" />
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-5 space-y-1 border-t pt-4 text-sm text-muted-foreground">
              <li>
                <Link to="/account" className="flex h-10 items-center gap-2">
                  <User className="h-4 w-4" /> حساب کاربری (نمایشی)
                </Link>
              </li>
              <li>
                <Link to="/faq" className="flex h-10 items-center">
                  سؤالات متداول
                </Link>
              </li>
              <li>
                <Link to="/contact" className="flex h-10 items-center">
                  تماس با ما
                </Link>
              </li>
            </ul>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Mobile / tablet search */}
      <Sheet open={searchOpen} onOpenChange={setSearchOpen}>
        <SheetContent side="top" className="pb-8">
          <SheetHeader>
            <SheetTitle className="text-start text-xl">جست‌وجو در روژان</SheetTitle>
          </SheetHeader>
          <SearchForm autoFocus onSubmitted={() => setSearchOpen(false)} />
          <div className="flex flex-wrap gap-2 text-xs">
            {["رژلب", "سرم", "ضدآفتاب", "ریمل", "عطر"].map((t) => (
              <Link
                key={t}
                to="/search"
                search={{ q: t }}
                className="rounded-full border bg-card px-3 py-1.5 hover:border-primary hover:text-primary"
              >
                {t}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
