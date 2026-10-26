import type { CategorySlug, SampleReview } from "@/types/catalog";

/**
 * SAMPLE reviews used to demonstrate the review UI. They are not real customer reviews,
 * and the UI labels them as sample data. Ratings shown in the store are computed from these.
 */
const authors = ["مریم", "سارا", "نگار", "الهام", "پریسا", "نازنین", "یاسمن", "فرشته", "هستی", "زهرا"];

const pool: Record<CategorySlug | "general", { title: string; body: string; rating: number }[]> = {
  face: [
    { title: "یکدست و سبک", body: "بافتش خیلی راحت پخش می‌شود و سنگینی حس نمی‌کنم.", rating: 5 },
    { title: "رنگ مناسب", body: "رنگ با پوستم هماهنگ بود، فقط برای پوشش بیشتر دو لایه می‌زنم.", rating: 4 },
    { title: "ماندگاری خوب", body: "تا عصر روی پوستم ماند و در خطوط جمع نشد.", rating: 5 },
  ],
  eyes: [
    { title: "حجم عالی", body: "مژه‌ها را خیلی خوب جدا می‌کند و گلوله نمی‌شود.", rating: 5 },
    { title: "خوب برای روزانه", body: "برای آرایش روزانه عالی است، پاک‌کردنش هم ساده است.", rating: 4 },
    { title: "رنگ‌ها کاربردی", body: "ترکیب رنگ‌ها هم برای روز هم برای مهمانی جواب می‌دهد.", rating: 5 },
  ],
  lips: [
    { title: "رنگ زیبا", body: "رنگش دقیقاً همان چیزی بود که انتظار داشتم و لب را خشک نمی‌کند.", rating: 5 },
    { title: "حس راحت", body: "روی لب سبک است ولی بعد از غذا نیاز به تجدید دارد.", rating: 4 },
    { title: "بسته‌بندی شیک", body: "هم کیفیت خوبی دارد هم بسته‌بندی‌اش خیلی زیباست.", rating: 5 },
  ],
  skincare: [
    { title: "جذب سریع", body: "سریع جذب می‌شود و زیر آرایش هم مشکلی ایجاد نمی‌کند.", rating: 5 },
    { title: "بافت سبک", body: "برای پوست مختلط من مناسب بود و چربی ایجاد نکرد.", rating: 4 },
    { title: "جزو روتینم شد", body: "چند هفته است استفاده می‌کنم و از حس پوستم راضی‌ام.", rating: 5 },
  ],
  haircare: [
    { title: "موها نرم‌تر", body: "بعد از استفاده موهایم نرم‌تر و شانه‌کردنش راحت‌تر شد.", rating: 5 },
    { title: "رایحه ملایم", body: "بوی ملایمی دارد و موها را سنگین نمی‌کند.", rating: 4 },
  ],
  fragrance: [
    { title: "رایحه خاص", body: "بویش خیلی لطیف و خاص است و چند ساعت می‌ماند.", rating: 5 },
    { title: "مناسب هدیه", body: "به‌عنوان هدیه خریدم و بسته‌بندی خیلی شیکی داشت.", rating: 4 },
  ],
  tools: [
    { title: "کیفیت خوب", body: "نرم است و محصول را خوب پخش می‌کند.", rating: 5 },
    { title: "ارزش خرید", body: "نسبت به قیمت کیفیت مناسبی دارد.", rating: 4 },
  ],
  body: [
    { title: "نرمی پوست", body: "پوستم را نرم نگه می‌دارد و بوی ملایمی دارد.", rating: 5 },
    { title: "سبک و خوب", body: "سریع جذب می‌شود و لباس را چرب نمی‌کند.", rating: 4 },
  ],
  general: [{ title: "راضی بودم", body: "در مجموع راضی بودم و دوباره تهیه می‌کنم.", rating: 4 }],
};

function hash(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) >>> 0;
  return h;
}

const cache = new Map<string, SampleReview[]>();

/** Deterministic sample reviews per product (same on server and client). */
export function getSampleReviews(productId: string, category: CategorySlug): SampleReview[] {
  const cached = cache.get(productId);
  if (cached) return cached;
  const h = hash(productId);
  const source = [...pool[category], ...pool.general];
  const count = 2 + (h % 3); // 2–4 reviews
  const reviews: SampleReview[] = [];
  for (let i = 0; i < Math.min(count, source.length); i++) {
    const item = source[(h + i) % source.length];
    const day = 1 + ((h >> (i + 2)) % 27);
    const month = 6 + ((h >> i) % 4);
    reviews.push({
      id: `${productId}-r${i}`,
      author: authors[(h + i * 3) % authors.length],
      rating: item.rating,
      title: item.title,
      body: item.body,
      date: `2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    });
  }
  cache.set(productId, reviews);
  return reviews;
}
