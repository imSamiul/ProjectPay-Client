import {
  AlertTriangleIcon,
  CircleCheckIcon,
  FolderKanbanIcon,
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
import { useManagerStats } from "@/lib/queries/project-hooks";
import { AnimatedNumber } from "@/components/shared/AnimatedNumber";
import { formatCurrency } from "@/lib/format";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const wholeNumber = (value: number) => Math.round(value).toLocaleString("en-US");

const STATUS_COLORS = ["#1d4ed8", "#0f766e", "#b45309"];
const MONEY_COLORS = {
  budget: "#1d4ed8",
  collected: "#0f766e",
  due: "#b45309",
};

export function ProjectStats() {
  const stats = useManagerStats();
  const projects = stats.data?.projects;
  const clients = stats.data?.clients;

  const statusChartData = [
    { name: "On track", value: projects?.active ?? 0 },
    { name: "Completed", value: projects?.completed ?? 0 },
    { name: "Overdue", value: projects?.overdue ?? 0 },
  ].filter((entry) => entry.value > 0);

  const financeChartData = [
    {
      name: "Workspace",
      Budget: projects?.totalBudget ?? 0,
      Collected: projects?.totalCollected ?? 0,
      Due: projects?.totalDue ?? 0,
    },
  ];

  const tiles = [
    {
      label: "Projects tracked",
      icon: FolderKanbanIcon,
      value: projects?.total ?? 0,
      format: wholeNumber,
      tone: "text-primary bg-primary/12",
    },
    {
      label: "Clients",
      icon: UsersIcon,
      value: clients?.total ?? 0,
      format: wholeNumber,
      tone: "text-primary bg-primary/12",
    },
    {
      label: "Outstanding due",
      icon: WalletIcon,
      value: projects?.totalDue ?? 0,
      format: formatCurrency,
      tone: "text-primary bg-primary/12",
    },
    {
      label: "Collected",
      icon: CircleCheckIcon,
      value: projects?.totalCollected ?? 0,
      format: formatCurrency,
      tone: "text-[color-mix(in_oklab,var(--chart-2)_85%,black)] bg-[color-mix(in_oklab,var(--chart-2)_16%,transparent)]",
    },
    {
      label: "Overdue",
      icon: AlertTriangleIcon,
      value: projects?.overdue ?? 0,
      format: wholeNumber,
      tone: "text-destructive bg-destructive/12",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-[70px] w-full rounded-xl" />
            ))
          : tiles.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5"
              >
                <span
                  className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${stat.tone}`}
                >
                  <stat.icon className="size-4.5" />
                </span>
                <div className="flex min-w-0 flex-col">
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                  <AnimatedNumber
                    value={stat.value}
                    format={stat.format}
                    className="text-display text-xl leading-tight md:text-2xl"
                  />
                </div>
              </div>
            ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="border-border bg-card shadow-none">
          <CardHeader>
            <CardTitle className="text-lg">Project status</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.isLoading ? (
              <Skeleton className="h-64 w-full" />
            ) : statusChartData.length === 0 ? (
              <p className="flex h-64 items-center justify-center text-sm text-muted-foreground">
                No projects yet to chart.
              </p>
            ) : (
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={90}
                      paddingAngle={2}
                    >
                      {statusChartData.map((entry, index) => (
                        <Cell
                          key={entry.name}
                          fill={STATUS_COLORS[index % STATUS_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => wholeNumber(Number(value ?? 0))} />
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
