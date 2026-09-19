import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDownIcon, XIcon } from "lucide-react";
import { useManagerClients } from "@/lib/queries/project-hooks";
import { useUnlinkClient } from "@/services/mutations/use-client-mutations";
import { ManagerClientRow } from "@/types/client";
import Pagination from "@/components/shared/Pagination";
import TableSearchBar from "@/components/shared/TableSearchBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { formatCurrency } from "@/lib/format";
import { PAGE_SIZE } from "@/lib/query-keys";

type ManagerClientsPageProps = {
  page: number;
  onPageChange: (page: number) => void;
};

const columnHelper = createColumnHelper<ManagerClientRow>();

export function ManagerClientsPage({ page, onPageChange }: ManagerClientsPageProps) {
  const clientsQuery = useManagerClients(page, PAGE_SIZE);
  const unlinkClient = useUnlinkClient();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const data = clientsQuery.data?.clients ?? [];
  const totalPages = Math.max(clientsQuery.data?.pagination.totalPages ?? 1, 1);

  const columns = useMemo(
    () => [
      columnHelper.accessor("clientName", {
        header: "Client",
        cell: (info) => (
          <div className="flex flex-col gap-0.5">
            <span className="font-medium text-foreground">
              {info.getValue() || "Unnamed client"}
            </span>
            <span className="text-xs text-muted-foreground">
              {[info.row.original.clientEmail, info.row.original.clientPhone]
                .filter(Boolean)
                .join(" · ") || "—"}
            </span>
          </div>
        ),
      }),
      columnHelper.accessor("clientKey", {
        header: "Client key",
        cell: (info) =>
          info.getValue() ? (
            <code className="rounded-md border border-border bg-muted px-2 py-1 text-xs font-semibold tracking-wide">
              {info.getValue()}
            </code>
          ) : (
            "—"
          ),
      }),
      columnHelper.accessor("projectName", {
        header: "Project",
        cell: (info) => (
          <Link
            to="/project/$projectCode"
            params={{ projectCode: info.row.original.projectCode }}
            className="font-medium text-foreground hover:underline"
          >
            {info.getValue()}
          </Link>
        ),
      }),
      columnHelper.accessor("budget", {
        header: "Budget",
        cell: (info) => formatCurrency(info.getValue() ?? 0),
      }),
      columnHelper.accessor("due", {
        header: "Due",
        cell: (info) => formatCurrency(info.getValue() ?? 0),
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => (
          <Badge variant={info.getValue() ? "default" : "secondary"}>
            {info.getValue() ? "Done" : "Active"}
          </Badge>
        ),
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (info) => (
          <Button
            type="button"
            size="icon-sm"
            variant="ghost"
            aria-label={`Remove ${info.row.original.clientName ?? "client"} from ${info.row.original.projectName}`}
            disabled={unlinkClient.isPending}
            onClick={() =>
              unlinkClient.mutate({
                projectCode: info.row.original.projectCode,
                clientId: info.row.original.clientId,
              })
            }
          >
            <XIcon />
          </Button>
        ),
      }),
    ],
    [unlinkClient],
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1>Clients</h1>
        <p className="text-muted-foreground">
          Everyone linked to your projects, and what they're connected to.
        </p>
      </div>

      <Card className="border-border bg-card shadow-none">
        <CardHeader>
          <CardTitle className="text-lg">All clients</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {clientsQuery.isLoading ? (
            <div className="flex flex-col gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-10 w-full" />
              ))}
            </div>
          ) : data.length === 0 ? (
            <Empty className="border border-dashed border-border py-16">
              <EmptyHeader>
                <EmptyTitle>No clients linked yet</EmptyTitle>
                <EmptyDescription>
                  Open a project and link a client using their client key to
                  see them here.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <div className="flex flex-col gap-3">
              <TableSearchBar
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          <div
                            className={`flex items-center gap-2 ${
                              header.column.getCanSort()
                                ? "cursor-pointer select-none"
                                : ""
                            }`}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                            {header.column.getCanSort() ? (
                              <ArrowUpDownIcon className="size-3.5 text-muted-foreground" />
                            ) : null}
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {totalPages > 1 ? (
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              onPageChange={onPageChange}
            />
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
