import { useState } from "react";
import { Trash2Icon } from "lucide-react";
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
          ) : (users.data?.users.length ?? 0) === 0 ? (
            <Empty className="border border-dashed border-border py-10">
              <EmptyHeader>
                <EmptyTitle>No users found</EmptyTitle>
                <EmptyDescription>Try a different role filter.</EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.data?.users.map((user) => {
                  const isSelf = user.email === auth.user?.email;
                  return (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium text-foreground">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>
                        <Badge variant={user.userType === "admin" ? "default" : "secondary"}>
                          {ROLE_LABEL[user.userType]}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(user.createdAt)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="icon-sm"
                          variant="ghost"
                          aria-label="Delete user"
                          disabled={user.userType === "admin" || isSelf}
                          onClick={() => setUserToDelete(user)}
                        >
                          <Trash2Icon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
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
