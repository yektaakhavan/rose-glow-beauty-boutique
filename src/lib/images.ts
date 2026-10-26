import type { ImageKey } from "@/types/catalog";

import hero from "@/assets/hero.webp";
import editorialRitual from "@/assets/editorial-ritual.webp";
import editorialFlatlay from "@/assets/editorial-flatlay.webp";

const productFiles = import.meta.glob<string>("../assets/products/*.webp", {
  eager: true,
  import: "default",
});

const byKey: Record<string, string> = {
  hero,
  "editorial-ritual": editorialRitual,
  "editorial-flatlay": editorialFlatlay,
};

for (const [path, url] of Object.entries(productFiles)) {
  const key = path.split("/").pop()?.replace(".webp", "");
  if (key) byKey[key] = url;
}

/** Resolve an image key from the catalog data to a bundled URL. */
export function imageUrl(key: ImageKey): string {
  return byKey[key] ?? byKey["tex-cream"] ?? "";
}

export const IMAGE_SIZES: Record<string, { width: number; height: number }> = {
  hero: { width: 1100, height: 1222 },
  "editorial-ritual": { width: 900, height: 1128 },
  "editorial-flatlay": { width: 1200, height: 900 },
};

export function imageSize(key: ImageKey) {
  return IMAGE_SIZES[key] ?? { width: 720, height: 720 };
}
