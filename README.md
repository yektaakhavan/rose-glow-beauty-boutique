# Rose Glow Beauty Boutique — Rozhan

A Persian (RTL) beauty & skincare storefront built with TanStack Start, React 19, and TypeScript. Featuring a custom design system, a URL-driven product query engine, persisted cart / wishlist / demo-order stores, and per-route SEO.

[![TanStack Start](https://img.shields.io/badge/TanStack_Start-Router-EF4444?logo=reactrouter&logoColor=white)](https://tanstack.com/start)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-5-433E38)](https://zustand.docs.pmnd.rs/)
[![Vitest](https://img.shields.io/badge/Vitest-Tested-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)

> **Project type:** Frontend engineering showcase (work in progress).
>
> Rozhan (روژان) is a fictional online beauty store. Its products, brands, reviews, articles, and prices are sample content. There is no backend, no real payment, and no real user account — cart, wishlist, orders, and profile are stored only in the visitor's browser. See [Demo Limitations](#demo-limitations).

---

## Table of Contents

- [Overview](#overview)
- [Screenshots](#screenshots)
- [Features](#features)
- [Project Status](#project-status)
- [Tech Stack](#tech-stack)
- [Architecture & Key Decisions](#architecture--key-decisions)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Demo Limitations](#demo-limitations)
- [Author](#author)

---

## Overview

Rose Glow Beauty Boutique is a responsive, Persian-language e-commerce storefront for a fictional beauty brand, **Rozhan**. It covers makeup, skincare, haircare, fragrance, tools, and body care.

The project focuses on the engineering behind a real shop rather than static pages: typed catalog data, a product query engine synchronized with URL search params, cart and stock rules, shipping and pricing logic, hydration-safe persisted stores, and per-route SEO metadata.

The interface is fully right-to-left (`lang="fa"`, `dir="rtl"`) and uses a rose-gold design system built on Tailwind CSS v4 design tokens.

The application is built with TanStack Start (file-based routing and SSR) and strict TypeScript.

## Screenshots

<!-- Add screenshots to docs/screenshots/ and uncomment.

### Homepage

![Home page](docs/screenshots/home.png)

### Shop & Product Detail

| Shop | Product Detail |
| --- | --- |
| ![Shop](docs/screenshots/shop.png) | ![Product detail](docs/screenshots/product-detail.png) |

### Mobile Experience

<img src="docs/screenshots/mobile-menu.png" alt="Mobile navigation menu" width="240">
-->

_Screenshots coming soon._

---

## Features

### Storefront Pages

- Home page with hero section and best-selling products.
- Shop page, category pages, search results, sale and new-arrivals pages.
- Product detail pages with brand, pricing, discount display, add-to-cart, and wishlist actions.
- Designed not-found and error states for unknown products, categories, and failed routes.

### Product Query Engine

- Filtering by category, brand, shopping need, price range, stock availability, sale status, and minimum rating.
- Five sort options: best-selling, newest, price ascending, price descending, and rating.
- Page-based "show more" pagination.
- Search that normalizes Persian and Arabic letter variants (such as `ي` / `ی` and `ك` / `ک`), zero-width non-joiners, and diacritics, and matches product name, type, brand, and description.
- State synchronized with URL search params through a tolerant parser: malformed values are dropped, never thrown.

### Cart, Pricing & Stock Logic

- Per-line quantity limits and stock checks when adding to the cart.
- Variant-aware cart lines (shade and size) with unit price, compare-at price, line total, and savings.
- Three shipping methods (standard post, Tipax, Tehran courier — the last restricted to Tehran addresses).
- Free standard shipping above a configurable subtotal threshold.
- Demo orders that consume stock locally, so availability reflects orders placed in the same browser.

### Persisted Demo State

- Zustand stores for cart, wishlist, orders, and account profile.
- Versioned `localStorage` keys.
- Hydration-safe persistence: server renders and the first client render use empty state, and stores rehydrate after mount to avoid mismatches.

### Layout & Navigation

- Announcement bar, header with mega menu, search, wishlist, account, and cart icons with live item count.
- Mega menu with `aria-expanded` / `aria-controls` and Escape-to-close.
- Mobile navigation panel and footer.
- Newsletter form validated with React Hook Form and Zod (demo only, nothing is sent).

### Design System

- CSS-variable design tokens exposed through Tailwind v4 `@theme`: rose-gold, sale, success, warning, and ink colors.
- Vazirmatn for UI text and Markazi Text for display headings.
- RTL support at the document level and in Radix UI components through `DirectionProvider`.
- shadcn/ui component library built on Radix primitives.

### SEO

- Per-route `head()` metadata: title, description, canonical URL, Open Graph, and Twitter cards.
- `noindex` for missing products and categories.
- JSON-LD helpers for structured data and breadcrumbs.
- `robots.txt`.

---

## Project Status

This project is under active development. The foundation (design system, data, stores, query logic, layout, and core browsing pages) is in place; the remaining pages are routed placeholders.

**Implemented**

- [x] Design system, sample catalog, pricing and query logic
- [x] Cart, wishlist, demo orders / stock, and demo account stores
- [x] Layout: announcement bar, header with mega menu and search, mobile navigation, footer
- [x] Product card, product grid, and product rails
- [x] Home, shop, category, search, sale, new-arrivals, and product pages
- [x] Per-route SEO metadata

**Planned**

- [ ] Shop filter and sort controls in the UI
- [ ] Product detail: image gallery, variant selection, reviews, related products, JSON-LD
- [ ] Cart page, checkout flow, and order confirmation
- [ ] Wishlist and account pages (profile, addresses, orders)
- [ ] Content pages: about, contact, journal, FAQ, shipping & returns, privacy, terms
- [ ] Sitemap
- [ ] Unit tests for pricing, shipping, filtering, and stock rules; end-to-end user flows

---

## Tech Stack

### Frontend

| Technology | Purpose |
| --- | --- |
| TanStack Start | Full-stack React framework with SSR |
| TanStack Router | File-based, type-safe routing and search-param validation |
| React 19 | UI development |
| TypeScript 5 | Static typing and type safety |
| Tailwind CSS 4 | Styling and design tokens |
| shadcn/ui + Radix UI | Accessible component primitives |
| Zustand | Cart, wishlist, orders, and account state |
| TanStack Query | Async state management |
| React Hook Form | Form state management |
| Zod 3 | Schema validation |
| lucide-react | Icons |
| Sonner | Toast notifications |

### Testing & Code Quality

| Technology | Purpose |
| --- | --- |
| Vitest | Unit testing |
| React Testing Library + jsdom | Component testing |
| ESLint 9 | Code quality and linting |
| Prettier | Code formatting |

### Build Tools

| Technology | Purpose |
| --- | --- |
| Vite 8 | Development server and bundling |
| Nitro | Server output |
| Bun / npm | Package management |

---

## Architecture & Key Decisions

**File-Based Routing with Typed Search Params**

Each route is a file under `src/routes/`. Shop filters live in the URL and are validated by a tolerant `parseShopSearch` function, so filtered views are shareable and survive refresh and browser navigation.

**Query Logic Separated from UI**

Filtering, sorting, searching, and pagination are pure functions in `src/features/products/`. Cart pricing, shipping rules, and stock calculations live in `src/features/cart/` and `src/features/inventory/`. Keeping them free of React makes them straightforward to unit test.

**Hydration-Safe Persistence**

Zustand stores persist to `localStorage` through a storage adapter that returns nothing on the server. Stores are rehydrated explicitly after mount, so the server HTML and first client render always match.

**Replaceable Data Layer**

Components talk to stores and selectors, not to storage or data files directly. Replacing the local catalog and `localStorage` with a real API means changing the stores and selectors without rewriting the UI.

**Custom Design Tokens**

Colors, fonts, and semantic tokens (sale, success, warning) are defined once as CSS variables and mapped into Tailwind v4, so every page shares the same visual language.

**Typed Catalog**

Products, variants, categories, brands, and shopping needs are described by shared TypeScript types, so invalid catalog entries and slugs are caught at compile time.

**Per-Route SEO**

A single `pageHead` helper builds title, description, canonical, Open Graph, and Twitter metadata for every route, with `noindex` applied to missing entities.

---

## Project Structure

```text
src/
├── routes/                    # File-based routes (pages)
├── components/
│   ├── ui/                    # shadcn/ui primitives
│   ├── layout/                # Header, footer, logo, search
│   ├── products/              # Product card, rails, price, rating, wishlist
│   └── shared/                # Breadcrumbs, states, newsletter, reveal
│
├── features/
│   ├── products/              # Query engine and selectors
│   ├── cart/                  # Pricing and shipping rules
│   └── inventory/             # Stock availability
│
├── store/                     # Zustand stores (cart, wishlist, orders, account)
├── data/                      # Typed sample catalog, reviews, journal
├── hooks/                     # Shared hooks
├── lib/                       # Formatting, SEO, storage, image helpers
├── types/                     # Shared TypeScript types
├── assets/                    # Bundled product and editorial images
├── test/                      # Vitest setup and tests
└── styles.css                 # Design tokens and global styles
```

---

## Testing

Unit and component tests run with **Vitest**, **React Testing Library**, and **jsdom**.

```bash
npm test
```

Current coverage is a routing smoke test. Tests for the pricing, shipping, filtering, and stock rules are planned (see [Project Status](#project-status)).

---

## Getting Started

### Prerequisites

- Node.js 20.19 or newer
- npm or Bun

### Installation

Clone the repository:

```bash
git clone https://github.com/yektaakhavan/rose-glow-beauty-boutique.git
cd rose-glow-beauty-boutique
```

Install dependencies:

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open the local URL printed in the terminal.

### Production Build

```bash
npm run build
npm run preview
```

---

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run build:dev` | Create a development-mode build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run unit and component tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run format` | Format code with Prettier |

---

## Demo Limitations

Rose Glow Beauty Boutique is a frontend engineering demonstration, not a real store.

- **Fictional content:** The brand, products, prices, reviews, and articles are invented sample data.
- **No payments or checkout backend:** No real orders are placed or paid for.
- **Browser-only state:** Cart, wishlist, demo orders, profile, and newsletter sign-up are stored in `localStorage` and are not shared between devices or browsers.
- **Sample reviews:** Ratings are computed from sample reviews, and the interface labels them as sample data.
- **Persian only:** The interface is currently available in Persian (RTL) only.
- **Unfinished pages:** Cart, checkout, account, wishlist, and content pages are placeholders for now.
- **Browser testing:** Automated tests currently cover routing only; cross-browser testing has not been done.

---

## Author

**Yekta Akhavan**

Frontend Engineer | React, Next.js, TypeScript

[![GitHub](https://img.shields.io/badge/GitHub-yektaakhavan-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/yektaakhavan)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Yekta_Akhavan-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/yekta-akhavan/)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit_Website-000000?style=flat-square&logo=vercel&logoColor=white)](https://yekta-akhavan.vercel.app/)
[![Email](https://img.shields.io/badge/Email-Contact-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:yekta.akhavan.dev@gmail.com)
