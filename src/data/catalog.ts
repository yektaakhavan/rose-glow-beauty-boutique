import type { Brand, Category, Need } from "@/types/catalog";

export const categories: Category[] = [
  {
    slug: "face",
    name: "آرایش صورت",
    tagline: "پوستی یکدست و طبیعی",
    description: "کرم‌پودر، کانسیلر، رژگونه و هایلایتر برای چهره‌ای شاداب و یکدست.",
    image: "foundation",
  },
  {
    slug: "eyes",
    name: "آرایش چشم",
    tagline: "نگاهی ماندگار",
    description: "ریمل، پالت سایه، خط‌چشم و ژل ابرو برای آرایش روزانه تا شب.",
    image: "eyeshadow-palette",
  },
  {
    slug: "lips",
    name: "آرایش لب",
    tagline: "رنگ‌هایی برای هر حال",
    description: "رژلب، برق لب، روغن لب و مداد لب در طیف رنگ‌های نود تا توتی.",
    image: "lipstick",
  },
  {
    slug: "skincare",
    name: "مراقبت از پوست",
    tagline: "روتینی ساده و مؤثر",
    description: "شوینده، سرم، مرطوب‌کننده و ضدآفتاب برای مراقبت روزانه از پوست.",
    image: "vitamin-c-serum",
  },
  {
    slug: "haircare",
    name: "مراقبت از مو",
    tagline: "نرمی و درخشش",
    description: "شامپو، نرم‌کننده، ماسک و روغن مو برای انواع مو.",
    image: "hair-oil",
  },
  {
    slug: "fragrance",
    name: "عطر و ادکلن",
    tagline: "امضای شخصی شما",
    description: "ادوپرفیوم‌ها و بادی‌میست‌ها با رایحه‌های گلی، چوبی و شیرین.",
    image: "floral-perfume",
  },
  {
    slug: "tools",
    name: "ابزار آرایشی",
    tagline: "اجرای دقیق‌تر",
    description: "براش، پد آرایشی، فرمژه و ابزار ماساژ صورت.",
    image: "brush-set",
  },
  {
    slug: "body",
    name: "بهداشتی و بدن",
    tagline: "مراقبت از سر تا پا",
    description: "شامپو بدن، لوسیون و کرم دست برای مراقبت روزانه.",
    image: "body-lotion",
  },
];

export const brands: Brand[] = [
  { id: "rozhan", name: "روژان", latin: "Rozhan" },
  { id: "lumiere", name: "لومیر", latin: "Lumière" },
  { id: "sera", name: "سِرا", latin: "Sera" },
  { id: "noa", name: "نوآ", latin: "Noa" },
  { id: "avizheh", name: "آویژه", latin: "Avizheh" },
  { id: "mahoor", name: "ماهور", latin: "Mahoor" },
];

export const needs: Need[] = [
  {
    slug: "skincare-routine",
    title: "روتین مراقبت از پوست",
    description: "از شست‌وشو تا ضدآفتاب، قدم‌به‌قدم.",
    image: "tex-cream",
  },
  {
    slug: "dry-skin",
    title: "پوست خشک",
    description: "بافت‌های غنی و آبرسان.",
    image: "moisturizer",
  },
  {
    slug: "oily-skin",
    title: "پوست چرب",
    description: "سبک، بدون چربی و مات.",
    image: "cleanser",
  },
  {
    slug: "daily-makeup",
    title: "آرایش روزانه",
    description: "سریع، سبک و طبیعی.",
    image: "tex-lip",
  },
  {
    slug: "hair-care",
    title: "مراقبت از مو",
    description: "نرمی، درخشش و تغذیه.",
    image: "hair-mask",
  },
];

export const skinTypeLabels: Record<string, string> = {
  dry: "خشک",
  oily: "چرب",
  combination: "مختلط",
  normal: "نرمال",
  sensitive: "حساس",
  all: "همه انواع پوست",
};

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getBrand(id: string) {
  return brands.find((b) => b.id === id);
}

export function getNeed(slug: string) {
  return needs.find((n) => n.slug === slug);
}
