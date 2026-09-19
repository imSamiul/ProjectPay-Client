import { Link, type LinkOptions } from "@tanstack/react-router";
import {
  FolderKanbanIcon,
  FolderPlusIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import navbarLogo from "@/assets/nav-logo.png";
import { useAuth } from "@/hooks/use-auth";
import { useLogOutUser } from "@/services/mutations/use-user-mutations";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/layout/ThemeToggle";

type NavItem = {
  title: string;
  to: LinkOptions["to"];
  search?: LinkOptions["search"];
  icon: typeof LayoutDashboardIcon;
  exact?: boolean;
};

type NavGroup = {
  label: string;
  items: NavItem[];
};

const projectManagerNavGroups: NavGroup[] = [
  {
    label: "Workspace",
    items: [
      {
        title: "Dashboard",
        to: "/projectManager/dashboard",
        icon: LayoutDashboardIcon,
      },
      {
        title: "Projects",
        to: "/projectManager/projects",
        search: { q: "", page: 1 },
        icon: FolderKanbanIcon,
      },
      {
        title: "Clients",
        to: "/projectManager/clients",
        search: { page: 1 },
        icon: UsersIcon,
      },
    ],
  },
  {
    label: "Manage",
    items: [
      {
        title: "Add Project",
        to: "/projectManager/addProject",
        icon: FolderPlusIcon,
      },
    ],
  },
];

const clientNavGroups: NavGroup[] = [
  {
    label: "Workspace",
    items: [{ title: "Overview", to: "/", icon: LayoutDashboardIcon }],
  },
];

const adminNavGroups: NavGroup[] = [
  {
    label: "Workspace",
    items: [
      {
        title: "Dashboard",
        to: "/admin",
        icon: LayoutDashboardIcon,
        exact: true,
      },
      {
        title: "Users",
        to: "/admin/users",
        search: { page: 1, role: "all" },
        icon: UsersIcon,
      },
      {
        title: "Projects",
        to: "/admin/projects",
        search: { page: 1 },
        icon: FolderKanbanIcon,
      },
    ],
  },
];

const activeNavClassName = {
  className: "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
};

function navGroupsForRole(userType: string | undefined): NavGroup[] {
  switch (userType) {
    case "project manager":
      return projectManagerNavGroups;
    case "admin":
      return adminNavGroups;
    default:
      return clientNavGroups;
  }
}

export function AppSidebar() {
  const auth = useAuth();
  const logOutUserMutation = useLogOutUser();
  const navGroups = navGroupsForRole(auth.user?.userType);

  return (
    <Sidebar>
      <SidebarHeader>
        <Link to="/" className="flex items-center gap-2 px-2 py-1.5">
          <img src={navbarLogo} alt="" className="size-7 rounded-md" />
          <span className="text-base font-semibold tracking-tight text-sidebar-foreground">
            Project Pay
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {navGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={
                        <Link
                          to={item.to}
                          search={item.search}
                          activeOptions={item.exact ? { exact: true } : undefined}
                          activeProps={activeNavClassName}
                        />
                      }
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center justify-between gap-2 px-2 py-1">
          <span className="truncate text-xs text-sidebar-foreground/70">
            {auth.user?.email ?? auth.user?.phone}
          </span>
          <ThemeToggle />
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link to="/account" activeProps={activeNavClassName} />}
            >
              <SettingsIcon />
              <span>Account</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <Dialog>
          <DialogTrigger render={<SidebarMenuButton />}>
            <LogOutIcon />
            <span>Log out</span>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Log out?</DialogTitle>
              <DialogDescription>
                You will need to sign in again to manage projects.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
              <Button
                variant="destructive"
                disabled={logOutUserMutation.isPending}
                onClick={() => logOutUserMutation.mutate()}
              >
                {logOutUserMutation.isPending ? "Logging out…" : "Logout"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarFooter>
    </Sidebar>
  );
}
