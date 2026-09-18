import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type PaginationPropsType = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

type PageItem = number | "ellipsis";

function getVisiblePages(current: number, total: number): PageItem[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const pages = new Set<number>();
  pages.add(1);
  pages.add(total);
  pages.add(current);

  for (let offset = 1; offset <= 1; offset += 1) {
    if (current - offset > 1) pages.add(current - offset);
    if (current + offset < total) pages.add(current + offset);
  }

  // Keep a denser start/end when near the edges
  if (current <= 3) {
    pages.add(2);
    pages.add(3);
    pages.add(4);
  }
  if (current >= total - 2) {
    pages.add(total - 1);
    pages.add(total - 2);
    pages.add(total - 3);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const items: PageItem[] = [];

  for (let index = 0; index < sorted.length; index += 1) {
    const value = sorted[index]!;
    const previous = sorted[index - 1];
    if (previous !== undefined && value - previous > 1) {
      items.push("ellipsis");
    }
    items.push(value);
  }

  return items;
}

function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationPropsType) {
  const safeTotal = Math.max(totalPages, 1);
  const page = Math.min(Math.max(currentPage, 1), safeTotal);
  const canGoPrevious = page > 1;
  const canGoNext = page < safeTotal;
  const visiblePages = getVisiblePages(page, safeTotal);

  return (
    <div className="flex flex-wrap items-center justify-center gap-1">
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        onClick={() => onPageChange(1)}
        disabled={!canGoPrevious}
        aria-label="First page"
      >
        <ChevronFirstIcon />
      </Button>
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        onClick={() => onPageChange(page - 1)}
        disabled={!canGoPrevious}
        aria-label="Previous page"
      >
        <ChevronLeftIcon />
      </Button>
      {visiblePages.map((item, index) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="px-1.5 text-sm text-muted-foreground"
            aria-hidden
          >
            …
          </span>
        ) : (
          <Button
            key={item}
            type="button"
            variant={page === item ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(item)}
          >
            {item}
          </Button>
        ),
      )}
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        onClick={() => onPageChange(page + 1)}
        disabled={!canGoNext}
        aria-label="Next page"
      >
        <ChevronRightIcon />
      </Button>
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        onClick={() => onPageChange(safeTotal)}
        disabled={!canGoNext}
        aria-label="Last page"
      >
        <ChevronLastIcon />
      </Button>
    </div>
  );
}

export default Pagination;
