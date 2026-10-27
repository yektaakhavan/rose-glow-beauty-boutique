import { useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";

interface SearchFormProps {
  initial?: string;
  className?: string;
  autoFocus?: boolean;
  onSubmitted?: () => void;
}

/** Product search: submits to /search?q=… where results are filtered from the catalog. */
export function SearchForm({ initial = "", className, autoFocus, onSubmitted }: SearchFormProps) {
  const id = useId();
  const [value, setValue] = useState(initial);
  const navigate = useNavigate();

  return (
    <form
      role="search"
      className={cn("relative", className)}
      onSubmit={(e) => {
        e.preventDefault();
        const q = value.trim();
        void navigate({ to: "/search", search: q ? { q } : {} });
        onSubmitted?.();
      }}
    >
      <label htmlFor={id} className="sr-only">
        جست‌وجوی محصولات
      </label>
      <Search className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        id={id}
        type="search"
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => setValue(e.target.value)}
        placeholder="جست‌وجوی محصول یا برند…"
        className="h-11 w-full rounded-full border border-input bg-card pe-10 ps-11 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/30 [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          type="button"
          onClick={() => setValue("")}
          aria-label="پاک کردن عبارت جست‌وجو"
          className="absolute end-1.5 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </form>
  );
}
