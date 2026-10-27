import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAccountStore } from "@/store/account";

const schema = z.object({
  email: z.string().trim().min(1, "ایمیل را وارد کنید.").email("ایمیل واردشده معتبر نیست."),
});
type Values = z.infer<typeof schema>;

/** Demo newsletter signup: validated, saved only in this browser, no email is sent. */
export function NewsletterForm({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const id = useId();
  const subscribe = useAccountStore((s) => s.subscribe);
  const [done, setDone] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { email: "" } });

  const onSubmit = async (values: Values) => {
    await new Promise((r) => setTimeout(r, 500));
    subscribe(values.email);
    setDone(values.email);
    reset();
  };

  const dark = tone === "dark";

  if (done) {
    return (
      <div
        role="status"
        className={cn(
          "flex items-start gap-3 rounded-2xl px-4 py-3 text-sm leading-7",
          dark ? "bg-ink-foreground/10 text-ink-foreground" : "bg-success-soft text-foreground",
          className,
        )}
      >
        <CheckCircle2 className={cn("mt-1 h-4 w-4 shrink-0", dark ? "text-ink-foreground" : "text-success")} />
        <p>
          ایمیل <span dir="ltr">{done}</span> در این مرورگر ثبت شد. این بخش نمایشی است و ایمیلی ارسال نمی‌شود.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={cn("w-full", className)}>
      <label htmlFor={id} className="sr-only">
        ایمیل برای عضویت در خبرنامه
      </label>
      <div className="flex gap-2">
        <input
          id={id}
          type="email"
          dir="ltr"
          autoComplete="email"
          placeholder="email@example.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? `${id}-error` : `${id}-hint`}
          {...register("email")}
          className={cn(
            "h-12 min-w-0 flex-1 rounded-full border px-5 text-start text-sm outline-none transition-colors placeholder:text-right focus-visible:ring-2 focus-visible:ring-ring",
            dark
              ? "border-ink-foreground/25 bg-ink-foreground/10 text-ink-foreground placeholder:text-ink-foreground/50"
              : "border-input bg-card text-foreground placeholder:text-muted-foreground",
          )}
        />
        <Button type="submit" size="lg" variant={dark ? "secondary" : "default"} disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="animate-spin" aria-hidden /> : null}
          عضویت
        </Button>
      </div>
      {errors.email ? (
        <p id={`${id}-error`} role="alert" className={cn("mt-2 text-xs", dark ? "text-sale-soft" : "text-destructive")}>
          {errors.email.message}
        </p>
      ) : (
        <p id={`${id}-hint`} className={cn("mt-2 text-xs", dark ? "text-ink-foreground/60" : "text-muted-foreground")}>
          نمایشی: ایمیل فقط در همین مرورگر ذخیره می‌شود.
        </p>
      )}
    </form>
  );
}
