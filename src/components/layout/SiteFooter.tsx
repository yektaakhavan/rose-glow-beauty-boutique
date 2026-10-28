import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MapPin, Phone, Send } from "lucide-react";
import { categories } from "@/data/catalog";
import { NewsletterForm } from "@/components/shared/NewsletterForm";
import { Logo } from "./Logo";

const quickLinks = [
  { to: "/shop", label: "فروشگاه" },
  { to: "/new", label: "محصولات جدید" },
  { to: "/sale", label: "تخفیف‌ها" },
  { to: "/blog", label: "مجله زیبایی" },
  { to: "/about", label: "درباره ما" },
] as const;

const helpLinks = [
  { to: "/faq", label: "سؤالات متداول" },
  { to: "/shipping-returns", label: "ارسال و مرجوعی" },
  { to: "/contact", label: "تماس با ما" },
  { to: "/account/orders", label: "پیگیری سفارش" },
  { to: "/privacy", label: "حریم خصوصی" },
  { to: "/terms", label: "شرایط استفاده" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-ink text-ink-foreground">
      <div className="container-page grid gap-12 py-14 lg:grid-cols-[1.3fr_2fr]">
        <div className="max-w-sm">
          <Logo tone="light" />
          <p className="mt-4 text-sm leading-7 text-ink-foreground/70">
            روژان یک فروشگاه نمونه برای محصولات آرایشی و مراقبتی است؛ با انتخابی کوتاه و دقیق از محصولات روزمره و تمرکز
            بر تجربه خریدی ساده و شفاف.
          </p>
          <div className="mt-6">
            <p className="mb-3 text-sm font-medium">عضویت در خبرنامه</p>
            <NewsletterForm tone="dark" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <FooterCol title="دسترسی سریع">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-ink-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </FooterCol>
          <FooterCol title="دسته‌بندی‌ها">
            {categories.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link to="/category/$slug" params={{ slug: c.slug }} className="hover:text-ink-foreground">
                  {c.name}
                </Link>
              </li>
            ))}
          </FooterCol>
          <FooterCol title="راهنما">
            {helpLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-ink-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </FooterCol>
          <FooterCol title="ارتباط (نمونه)">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" aria-hidden />
              <span dir="ltr">۰۲۱-۰۰۰۰ ۰۰۰۰</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" aria-hidden />
              <span dir="ltr">hello@example.com</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-1 h-4 w-4 shrink-0" aria-hidden />
              <span>تهران (آدرس نمونه)</span>
            </li>
            <li className="flex gap-2 pt-2">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="اینستاگرام (لینک نمونه)"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-foreground/20 hover:bg-ink-foreground/10"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://telegram.org/"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="تلگرام (لینک نمونه)"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-foreground/20 hover:bg-ink-foreground/10"
              >
                <Send className="h-4 w-4" />
              </a>
            </li>
          </FooterCol>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-ink-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© ۱۴۰۵ روژان. همه‌ی حقوق محفوظ است.</p>
          <p>پروژه‌ی نمونه‌کار — پرداخت و ارسال واقعی انجام نمی‌شود و اطلاعات تماس نمونه است.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 font-sans text-sm font-semibold">{title}</h2>
      <ul className="space-y-2.5 text-sm text-ink-foreground/70">{children}</ul>
    </div>
  );
}
