import { useMemo } from "react";
import { CalendarIcon, FlagIcon, ReceiptIcon } from "lucide-react";
import { ProjectType } from "@/types/project";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/format";

type ProjectActivityProps = {
  project: ProjectType;
};

type ActivityEntry = {
  id: string;
  date: Date;
  icon: typeof ReceiptIcon;
  title: string;
  description: string;
};

export function ProjectActivity({ project }: ProjectActivityProps) {
  const entries = useMemo(() => {
    const items: ActivityEntry[] = [];

    if (project.startDate) {
      items.push({
        id: "start",
        date: new Date(project.startDate),
        icon: FlagIcon,
        title: "Project started",
        description: `Kicked off for ${project.clientName}`,
      });
    }

    for (const payment of project.paymentList ?? []) {
      items.push({
        id: payment._id ?? `${payment.transactionId}-${payment.paymentDate}`,
        date: new Date(payment.paymentDate),
        icon: ReceiptIcon,
        title: `Payment received — ${formatCurrency(payment.paymentAmount)}`,
        description: `${payment.paymentMethod} · ${payment.transactionId}`,
      });
    }

    return items
      .filter((item) => !Number.isNaN(item.date.getTime()))
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [project]);

  if (entries.length === 0) {
    return null;
  }

  return (
    <Card className="border-border bg-card shadow-none">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="flex flex-col gap-5">
          {entries.map((entry, index) => (
            <li key={entry.id} className="relative flex gap-3 pl-1">
              {index < entries.length - 1 ? (
                <span
                  aria-hidden
                  className="absolute top-7 left-[15px] h-[calc(100%+0.75rem)] w-px bg-border"
                />
              ) : null}
              <span className="z-10 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
                <entry.icon className="size-3.5" />
              </span>
              <div className="flex min-w-0 flex-col gap-0.5 pt-0.5">
                <p className="text-sm font-medium text-foreground">{entry.title}</p>
                <p className="text-xs text-muted-foreground">{entry.description}</p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <CalendarIcon className="size-3" />
                  {formatDate(entry.date)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
