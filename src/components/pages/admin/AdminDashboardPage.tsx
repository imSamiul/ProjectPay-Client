import {
  BuildingIcon,
  CircleCheckIcon,
  FolderKanbanIcon,
  ShieldIcon,
  UsersIcon,
  WalletIcon,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useAdminStats } from "@/lib/queries/admin-hooks";
import { formatCurrency } from "@/lib/format";
import { AnimatedNumber } from "@/components/shared/AnimatedNumber";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const wholeNumber = (value: number) => Math.round(value).toLocaleString("en-US");

const ROLE_COLORS = ["#1d4ed8", "#0f766e", "#b45309"];
const MONEY_COLORS = {
  budget: "#1d4ed8",
  collected: "#0f766e",
  due: "#b45309",
};

export function AdminDashboardPage() {
  const stats = useAdminStats();

  const users = stats.data?.users;
  const projects = stats.data?.projects;

  const roleChartData = [
    { name: "Clients", value: users?.clients ?? 0 },
    { name: "Managers", value: users?.projectManagers ?? 0 },
    { name: "Admins", value: users?.admins ?? 0 },
  ];

  const financeChartData = [
    {
      name: "Platform",
      Budget: projects?.totalBudget ?? 0,
      Collected: projects?.totalCollected ?? 0,
      Due: projects?.totalDue ?? 0,
    },
  ];

  const statTiles = [
    { label: "Total users", icon: UsersIcon, value: users?.total ?? 0 },
    { label: "Clients", icon: BuildingIcon, value: users?.clients ?? 0 },
    {
      label: "Project managers",
      icon: ShieldIcon,
      value: users?.projectManagers ?? 0,
    },
    { label: "Projects", icon: FolderKanbanIcon, value: projects?.total ?? 0 },
    {
      label: "Collected",
      icon: CircleCheckIcon,
      value: projects?.totalCollected ?? 0,
      format: formatCurrency,
    },
    {
      label: "Outstanding due",
      icon: WalletIcon,
      value: projects?.totalDue ?? 0,
      format: formatCurrency,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h1>Dashboard</h1>
        <p className="text-muted-foreground">
          Platform-wide overview across every project manager and client.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-[70px] w-full rounded-xl" />
            ))
          : statTiles.map((tile) => (
              <div
                key={tile.label}
                className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary">
                  <tile.icon className="size-4.5" />
                </span>
                <div className="flex min-w-0 flex-col">
                  <span className="text-xs text-muted-foreground">{tile.label}</span>
                  <AnimatedNumber
                    value={tile.value}
                    format={tile.format ?? wholeNumber}
                    className="text-display text-lg leading-tight md:text-xl"
                  />
                </div>
              </div>
            ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="border-border bg-card shadow-none">
          <CardHeader>
            <CardTitle className="text-lg">Users by role</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.isLoading ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={roleChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={90}
                      paddingAngle={2}
                    >
                      {roleChartData.map((entry, index) => (
                        <Cell
                          key={entry.name}
                          fill={ROLE_COLORS[index % ROLE_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => wholeNumber(Number(value ?? 0))}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border bg-card shadow-none">
          <CardHeader>
            <CardTitle className="text-lg">Budget vs payments</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.isLoading ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={financeChartData} barGap={8}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) =>
                        value >= 1000 ? `${Math.round(value / 1000)}k` : String(value)
                      }
                    />
                    <Tooltip
                      formatter={(value) => formatCurrency(Number(value ?? 0))}
                    />
                    <Legend />
                    <Bar dataKey="Budget" fill={MONEY_COLORS.budget} radius={[6, 6, 0, 0]} />
                    <Bar
                      dataKey="Collected"
                      fill={MONEY_COLORS.collected}
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar dataKey="Due" fill={MONEY_COLORS.due} radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
