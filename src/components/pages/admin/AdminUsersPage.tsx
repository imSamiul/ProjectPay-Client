import { useMemo, useState } from "react";
import { ArrowUpDownIcon, Trash2Icon } from "lucide-react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useAuth } from "@/hooks/use-auth";
import { useAdminUsers } from "@/lib/queries/admin-hooks";
import { useDeleteAdminUser } from "@/services/mutations/use-admin-mutations";
import { formatDate } from "@/lib/format";
import { PAGE_SIZE } from "@/lib/query-keys";
import { AdminUserRole, AdminUserRow } from "@/types/admin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Pagination from "@/components/shared/Pagination";
import TableSearchBar from "@/components/shared/TableSearchBar";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";

const ROLE_LABEL: Record<AdminUserRole, string> = {
  client: "Client",
  "project manager": "Project Manager",
  admin: "Admin",
};

type AdminUsersPageProps = {
  page: number;
  role: AdminUserRole | "all";
  onPageChange: (page: number) => void;
  onRoleChange: (role: AdminUserRole | "all") => void;
};

const columnHelper = createColumnHelper<AdminUserRow>();

export function AdminUsersPage({
  page,
  role,
  onPageChange,
  onRoleChange,
}: AdminUsersPageProps) {
  const auth = useAuth();
  const users = useAdminUsers(page, PAGE_SIZE, role === "all" ? undefined : role);
  const [userToDelete, setUserToDelete] = useState<AdminUserRow | null>(null);
  const deleteUser = useDeleteAdminUser();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const data = users.data?.users ?? [];

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => (
          <span className="font-medium text-foreground">{info.getValue() || "—"}</span>
        ),
      }),
      columnHelper.accessor("email", {
        header: "Email",
        cell: (info) => info.getValue() || "—",
      }),
      columnHelper.accessor("phone", {
        header: "Phone",
        cell: (info) => info.getValue() || "—",
      }),
      columnHelper.accessor("userType", {
        header: "Role",
        cell: (info) => (
          <Badge variant={info.getValue() === "admin" ? "default" : "secondary"}>
            {ROLE_LABEL[info.getValue()]}
          </Badge>
        ),
      }),
      columnHelper.accessor("createdAt", {
        header: "Joined",
        cell: (info) => formatDate(info.getValue()),
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (info) => {
          const user = info.row.original;
          const isSelf = user.email === auth.user?.email;
          return (
            <div className="flex justify-end">
              <Button
                size="icon-sm"
                variant="ghost"
                aria-label="Delete user"
                disabled={user.userType === "admin" || isSelf}
                onClick={() => setUserToDelete(user)}
              >
                <Trash2Icon />
              </Button>
            </div>
          );
        },
      }),
    ],
    [auth.user?.email],
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
      <div className="flex flex-col gap-1.5">
        <h1>Users</h1>
        <p className="text-muted-foreground">
          Manage every client, project manager, and admin account.
        </p>
      </div>

      <Card className="border-border bg-card shadow-none">
        <CardHeader className="flex flex-row items-center justify-between gap-2">
          <CardTitle className="text-lg">All users</CardTitle>
          <Select
            value={role}
            onValueChange={(value) => {
              onRoleChange((value as AdminUserRole | "all") ?? "all");
            }}
          >
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All roles</SelectItem>
                <SelectItem value="client">Client</SelectItem>
                <SelectItem value="project manager">Project Manager</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {users.isLoading ? (
            <div className="flex flex-col gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-10 w-full" />
              ))}
            </div>
          ) : data.length === 0 ? (
            <Empty className="border border-dashed border-border py-10">
              <EmptyHeader>
                <EmptyTitle>No users found</EmptyTitle>
                <EmptyDescription>Try a different role filter.</EmptyDescription>
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

          {(users.data?.pagination.totalPages ?? 1) > 1 ? (
            <Pagination
              totalPages={users.data?.pagination.totalPages ?? 1}
              currentPage={page}
              onPageChange={onPageChange}
            />
          ) : null}
        </CardContent>
      </Card>

      <Dialog open={Boolean(userToDelete)} onOpenChange={(open) => !open && setUserToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete {userToDelete?.name}?</DialogTitle>
            <DialogDescription>
              This permanently removes the account for {userToDelete?.email}. This
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
            <Button
              variant="destructive"
              disabled={deleteUser.isPending}
              onClick={() => {
                if (!userToDelete) return;
                deleteUser.mutate(userToDelete.id, {
                  onSuccess: () => setUserToDelete(null),
                });
              }}
            >
              {deleteUser.isPending ? "Deleting…" : "Delete user"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
