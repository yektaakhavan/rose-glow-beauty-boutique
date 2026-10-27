import { Heart } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useStoresHydrated } from "@/store/hydration";
import { useWishlistStore } from "@/store/wishlist";

interface WishlistButtonProps {
  productId: string;
  productName: string;
  className?: string;
  variant?: "floating" | "outline";
}

export function WishlistButton({ productId, productName, className, variant = "floating" }: WishlistButtonProps) {
  const hydrated = useStoresHydrated();
  const active = useWishlistStore((s) => s.ids.includes(productId)) && hydrated;
  const toggle = useWishlistStore((s) => s.toggle);

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? `حذف ${productName} از علاقه‌مندی‌ها` : `افزودن ${productName} به علاقه‌مندی‌ها`}
      onClick={() => {
        const added = toggle(productId);
        toast(added ? "به علاقه‌مندی‌ها اضافه شد" : "از علاقه‌مندی‌ها حذف شد", { description: productName });
      }}
      className={cn(
        "inline-flex items-center justify-center rounded-full transition-[background-color,color,transform] duration-200 active:scale-90",
        variant === "floating"
          ? "h-10 w-10 bg-card/90 text-foreground shadow-soft backdrop-blur hover:bg-card"
          : "h-12 w-12 border border-input bg-card hover:border-foreground/40",
        className,
      )}
    >
      <Heart className={cn("h-[18px] w-[18px] transition-colors", active && "fill-primary text-primary")} aria-hidden />
    </button>
  );
}
