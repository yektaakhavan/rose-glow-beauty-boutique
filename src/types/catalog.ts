export type CategorySlug =
  | "face"
  | "eyes"
  | "lips"
  | "skincare"
  | "haircare"
  | "fragrance"
  | "tools"
  | "body";

export type NeedSlug = "skincare-routine" | "dry-skin" | "oily-skin" | "daily-makeup" | "hair-care";

export type SkinType = "dry" | "oily" | "combination" | "normal" | "sensitive" | "all";

export type ProductBadge = "new" | "bestseller" | "limited";

/** Image keys resolve to bundled files in src/assets/products/<key>.webp */
export type ImageKey = string;

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
  image: ImageKey;
}

export interface Brand {
  id: string;
  name: string;
  latin: string;
}

export interface Need {
  slug: NeedSlug;
  title: string;
  description: string;
  image: ImageKey;
}

export interface ProductVariant {
  id: string;
  name: string;
  /** Visual colour for shade swatches (data value, not a design token). */
  swatch?: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
}

export interface VariantGroup {
  kind: "shade" | "size";
  label: string;
  options: ProductVariant[];
}

export interface ProductAttributes {
  volume?: string;
  skinTypes?: SkinType[];
  finish?: string;
  keyIngredients?: string[];
  ingredients?: string;
  howToUse: string;
  features: string[];
}

export interface ProductFaq {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brandId: string;
  category: CategorySlug;
  productType: string;
  shortDescription: string;
  description: string;
  /** Toman. For products with variants, this is the default variant's price. */
  price: number;
  compareAtPrice?: number;
  /** Units in stock for products without variants. */
  stock: number;
  images: ImageKey[];
  badges: ProductBadge[];
  needs: NeedSlug[];
  /** Units sold (sample data) — drives "best selling" sort. */
  soldCount: number;
  /** ISO date the product was added — drives "newest" sort. */
  createdAt: string;
  variants?: VariantGroup;
  attributes: ProductAttributes;
  faqs?: ProductFaq[];
  complementary?: string[];
}

export interface SampleReview {
  id: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  /** ISO date */
  date: string;
}

export interface RatingSummary {
  average: number;
  count: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: ImageKey;
  readMinutes: number;
  publishedAt: string;
  author: string;
  sections: { heading?: string; paragraphs: string[]; bullets?: string[] }[];
  relatedProducts: string[];
}
