import { Link } from "@tanstack/react-router";
import navbarLogo from "@/assets/nav-logo.png";
import { useAuth } from "@/hooks/use-auth";
import { useLogOutUser } from "@/services/mutations/use-user-mutations";
import { Button } from "@/components/ui/button";
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
import ThemeToggle from "@/components/layout/ThemeToggle";

function AppNavbar() {
  const auth = useAuth();
  const logOutUserMutation = useLogOutUser();
  const isLogged = auth.isLogged();

  return (
    <header className="sticky top-0 z-40 border-b border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={navbarLogo} alt="" className="size-9 rounded-md" />
          <span className="text-lg font-semibold tracking-tight md:text-xl">
            Project Pay
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {isLogged ? (
            <Button
              render={<Link to="/account" />}
              variant="outline"
              size="sm"
              className="border-sidebar-border bg-transparent text-sidebar-foreground hover:bg-sidebar-accent"
            >
              Account
            </Button>
          ) : null}
          {isLogged ? (
            <Dialog>
              <DialogTrigger
                render={
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-sidebar-border bg-transparent text-sidebar-foreground hover:bg-sidebar-accent"
                  />
                }
              >
                Logout
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Log out?</DialogTitle>
                  <DialogDescription>
                    You will need to sign in again to manage projects.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose render={<Button variant="outline" />}>
                    Cancel
                  </DialogClose>
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
          ) : (
            <Button render={<Link to="/login" />} size="sm">
              Sign In
            </Button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default AppNavbar;
