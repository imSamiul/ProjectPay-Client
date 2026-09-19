import { Link } from "@tanstack/react-router";
import { CheckIcon } from "lucide-react";
import AppNavbar from "@/components/layout/AppNavbar";
import { useAuth } from "@/hooks/use-auth";
import { useDocumentHead } from "@/hooks/use-document-head";
import { useMyProjects } from "@/lib/queries/project-hooks";
import { UserType } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import ProjectGrid from "@/components/pages/projects/overview/ProjectGrid";
import { ClientKeyDisplay } from "@/components/shared/ClientKeyDisplay";
import { formatCurrency } from "@/lib/format";

type HomePageProps = {
  user: UserType | null;
};

const PREVIEW_PROJECTS = [
  { name: "Orchard Storefront", budget: 180000, paid: 132000, status: true },
  { name: "Northwind CRM", budget: 420000, paid: 168000, status: false },
];

export function HomePage({ user }: HomePageProps) {
  const auth = useAuth();
  const resolvedUser = user ?? auth.user;
  const isLogged = auth.isLogged();
  const myProjects = useMyProjects(isLogged && resolvedUser?.userType === "client");

  useDocumentHead(
    isLogged
      ? { title: "Dashboard — Project Pay" }
      : {
          title: "Project Pay — Track Project Budgets, Advances & Payments",
          description:
            "Manage client projects, record advances and payments, and always know who owes what — in one calm place.",
        },
  );

  if (!isLogged) {
    return (
      <div className="min-h-svh bg-background">
        <AppNavbar />
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:py-24 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div className="flex max-w-xl flex-col gap-5">
            <p className="text-sm font-medium text-primary">Project Pay</p>
            <h1 className="text-display text-4xl leading-[1.05] md:text-5xl">
              Every project's budget, advance, and due amount, kept in one
              place.
            </h1>
            <p className="text-lg text-muted-foreground">
              Track client projects from kickoff to final payment — no more
              chasing spreadsheets to find out who owes what.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button render={<Link to="/login" />} size="lg">
                Sign in
              </Button>
              <Button
                render={<Link to="/signUp" />}
                variant="secondary"
                size="lg"
              >
                Create account
              </Button>
            </div>
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="absolute -right-3 -top-3 h-full w-full rounded-2xl bg-secondary lg:-right-4 lg:-top-4"
            />
            <Card className="shadow-brand relative border-border bg-card">
              <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
                <CardTitle className="text-base">Manager overview</CardTitle>
                <Badge variant="secondary">Live preview</Badge>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-muted px-3 py-2.5">
                    <p className="text-xs text-muted-foreground">Collected</p>
                    <p className="text-lg font-semibold text-foreground">
                      {formatCurrency(300000)}
                    </p>
                  </div>
                  <div className="rounded-lg bg-muted px-3 py-2.5">
                    <p className="text-xs text-muted-foreground">Outstanding due</p>
                    <p className="text-lg font-semibold text-foreground">
                      {formatCurrency(300000)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  {PREVIEW_PROJECTS.map((project) => (
                    <div
                      key={project.name}
                      className="flex flex-col gap-2 rounded-lg border border-border p-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-foreground">
                          {project.name}
                        </span>
                        <Badge variant={project.status ? "default" : "secondary"}>
                          {project.status ? (
                            <>
                              <CheckIcon data-icon="inline-start" />
                              Done
                            </>
                          ) : (
                            "Active"
                          )}
                        </Badge>
                      </div>
                      <Progress value={(project.paid / project.budget) * 100}>
                        <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
                          <span>{formatCurrency(project.paid)} paid</span>
                          <span>{formatCurrency(project.budget - project.paid)} due</span>
                        </div>
                      </Progress>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    );
  }

  const projects = myProjects.data ?? [];

  return (
    <div className="min-h-svh bg-background">
      <AppNavbar />
      <section className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10">
        <div className="flex flex-col gap-2">
          <h1>Welcome{resolvedUser?.name ? `, ${resolvedUser.name}` : ""}</h1>
          <p className="text-muted-foreground">
            Your project updates and payment status, all in one place.
          </p>
        </div>

        {resolvedUser?.clientKey ? (
          <Card className="border-border bg-card shadow-none">
            <CardHeader>
              <CardTitle className="text-base">Your client key</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <p className="text-sm text-muted-foreground">
                Share this key with your project manager so they can add you
                to a project.
              </p>
              <ClientKeyDisplay clientKey={resolvedUser.clientKey} />
            </CardContent>
          </Card>
        ) : null}

        {!myProjects.isLoading && projects.length === 0 ? (
          <Empty className="border border-dashed border-border py-16">
            <EmptyHeader>
              <EmptyTitle>No projects yet</EmptyTitle>
              <EmptyDescription>
                Once a project manager links you to a project using your
                client key above, it will show up here.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <ProjectGrid projects={projects} isLoading={myProjects.isLoading} />
        )}
      </section>
    </div>
  );
}
