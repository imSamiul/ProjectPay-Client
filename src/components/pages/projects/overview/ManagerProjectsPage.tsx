import { useMemo } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import ProjectSearchBox from "@/components/pages/projects/overview/ProjectSearchBox";
import ProjectGrid from "@/components/pages/projects/overview/ProjectGrid";
import Pagination from "@/components/shared/Pagination";
import {
  useManagerProjects,
  useSearchProject,
} from "@/lib/queries/project-hooks";
import { PAGE_SIZE } from "@/lib/query-keys";
import { ProjectType } from "@/types/project";

type ManagerProjectsPageProps = {
  q: string;
  page: number;
  onSearchChange: (next: string) => void;
  onPageChange: (page: number) => void;
};

export function ManagerProjectsPage({
  q,
  page,
  onSearchChange,
  onPageChange,
}: ManagerProjectsPageProps) {
  const debouncedSearchText = useDebounce(q, 400);
  const isSearching = Boolean(debouncedSearchText);

  const listQuery = useManagerProjects(page, PAGE_SIZE);
  const searchQuery = useSearchProject(
    debouncedSearchText,
    page,
    PAGE_SIZE,
  );

  const activeQuery = isSearching ? searchQuery : listQuery;
  const projects = useMemo(() => {
    const items = activeQuery.data?.projects ?? [];
    if (isSearching) return items;
    return [...items].sort((a: ProjectType, b: ProjectType) => {
      if (a.status === false && b.status === true) return -1;
      if (a.status === true && b.status === false) return 1;
      return 0;
    });
  }, [activeQuery.data?.projects, isSearching]);

  const pagination = activeQuery.data?.pagination;
  const totalPages = Math.max(pagination?.totalPages ?? 1, 1);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h1>Projects</h1>
        <p className="text-muted-foreground">
          Browse and open projects assigned to your workspace.
        </p>
      </div>
      <ProjectSearchBox value={q} onSearchTextChange={onSearchChange} />
      <ProjectGrid
        projects={projects}
        isLoading={activeQuery.isLoading || activeQuery.isFetching}
      />
      {totalPages > 1 ? (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={onPageChange}
        />
      ) : null}
    </div>
  );
}
