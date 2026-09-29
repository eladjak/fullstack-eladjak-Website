import Link from "next/link";
import { Search, SlidersHorizontal, X } from "lucide-react";

import type { GuideDiscoveryCategory } from "@/lib/guide-discovery";

export type GuideDiscoveryCopy = {
  title: string;
  searchLabel: string;
  searchPlaceholder: string;
  categoryLabel: string;
  allCategories: string;
  agents: string;
  patterns: string;
  infrastructure: string;
  submit: string;
  reset: string;
  resultCount: (count: number) => string;
  noResultsTitle: string;
  noResultsDescription: string;
  resetSearch: string;
};

export function GuideDiscoveryForm({
  action,
  query,
  category,
  resultCount,
  copy,
}: {
  action: string;
  query: string;
  category: GuideDiscoveryCategory;
  resultCount: number;
  copy: GuideDiscoveryCopy;
}) {
  const isFiltered = Boolean(query) || category !== "all";

  return (
    <section
      className="max-w-6xl mx-auto px-4 sm:px-6 pb-10"
      aria-labelledby="guide-discovery-title"
    >
      <div className="rounded-2xl border border-border bg-card/70 p-4 sm:p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <SlidersHorizontal className="size-4 text-primary" aria-hidden="true" />
          <h2 id="guide-discovery-title" className="text-base font-semibold text-foreground">
            {copy.title}
          </h2>
        </div>
        <form action={action} method="get" className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_13rem_auto] sm:items-end">
          <div>
            <label htmlFor="guide-search" className="mb-1.5 block text-sm font-medium text-foreground">
              {copy.searchLabel}
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <input
                id="guide-search"
                name="q"
                type="search"
                defaultValue={query}
                placeholder={copy.searchPlaceholder}
                className="h-11 w-full rounded-xl border border-input bg-background ps-10 pe-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
          </div>
          <div>
            <label htmlFor="guide-category" className="mb-1.5 block text-sm font-medium text-foreground">
              {copy.categoryLabel}
            </label>
            <select
              id="guide-category"
              name="category"
              defaultValue={category}
              className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="all">{copy.allCategories}</option>
              <option value="agent">{copy.agents}</option>
              <option value="pattern">{copy.patterns}</option>
              <option value="infra">{copy.infrastructure}</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="h-11 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {copy.submit}
            </button>
            {isFiltered && (
              <Link
                href={action}
                className="inline-flex h-11 items-center gap-1.5 rounded-xl border border-border px-3 text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <X className="size-4" aria-hidden="true" />
                {copy.reset}
              </Link>
            )}
          </div>
        </form>
        <p className="mt-3 text-sm text-muted-foreground" aria-live="polite" aria-atomic="true">
          {copy.resultCount(resultCount)}
        </p>
      </div>
    </section>
  );
}

export function GuideNoResults({ action, copy }: { action: string; copy: GuideDiscoveryCopy }) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16" aria-live="polite">
      <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-8 text-center">
        <h2 className="text-xl font-semibold text-foreground">{copy.noResultsTitle}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{copy.noResultsDescription}</p>
        <Link
          href={action}
          className="mt-5 inline-flex rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {copy.resetSearch}
        </Link>
      </div>
    </section>
  );
}
