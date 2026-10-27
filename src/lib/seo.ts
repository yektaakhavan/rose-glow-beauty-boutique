export const SITE_NAME = "روژان";
export const SITE_TAGLINE = "فروشگاه آنلاین آرایشی و مراقبتی";

interface PageHeadInput {
  title: string;
  description: string;
  /** Path of the canonical URL, e.g. "/shop". Omit for pages that should not be canonicalised. */
  path?: string;
  type?: "website" | "article" | "product";
  noindex?: boolean;
}

/** Builds per-route head() meta + canonical link. Titles get the brand suffix. */
export function pageHead({ title, description, path, type = "website", noindex }: PageHeadInput) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const meta = [
    { title: fullTitle },
    { name: "description", content: description },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: "fa_IR" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
    ...(noindex ? [{ name: "robots", content: "noindex, follow" }] : []),
  ];
  const links = path ? [{ rel: "canonical", href: path }] : [];
  return { meta, links };
}

export function jsonLdScript(data: unknown) {
  return { type: "application/ld+json", children: JSON.stringify(data) };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.path,
    })),
  };
}
