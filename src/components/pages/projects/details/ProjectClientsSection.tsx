import { useState } from "react";
import { XIcon } from "lucide-react";
import { LinkedClientType } from "@/types/client";
import {
  useLinkClient,
  useUnlinkClient,
} from "@/services/mutations/use-client-mutations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";

type ProjectClientsSectionProps = {
  projectCode: string;
  clients: LinkedClientType[];
};

export function ProjectClientsSection({
  projectCode,
  clients,
}: ProjectClientsSectionProps) {
  const [clientKey, setClientKey] = useState("");
  const linkClient = useLinkClient(projectCode);
  const unlinkClient = useUnlinkClient();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = clientKey.trim();
    if (!trimmed) return;

    linkClient.mutate(trimmed, {
      onSuccess: () => setClientKey(""),
    });
  }

  return (
    <Card className="border-border bg-card shadow-none">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Clients</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {clients.length === 0 ? (
          <Empty className="border border-dashed border-border py-8">
            <EmptyHeader>
              <EmptyTitle>No client linked yet</EmptyTitle>
              <EmptyDescription>
                Ask your client for their client key and link them below.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <ul className="divide-y divide-border rounded-xl border border-border">
            {clients.map((client) => (
              <li
                key={client._id}
                className="flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium text-foreground">
                    {client.name || "Unnamed client"}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {[client.email, client.phone].filter(Boolean).join(" · ") ||
                      "—"}
                  </span>
                </div>
                <Button
                  type="button"
                  size="icon-sm"
                  variant="ghost"
                  aria-label={`Remove ${client.name ?? "client"}`}
                  disabled={unlinkClient.isPending}
                  onClick={() =>
                    unlinkClient.mutate({ projectCode, clientId: client._id })
                  }
                >
                  <XIcon />
                </Button>
              </li>
            ))}
          </ul>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <FieldGroup className="flex-1">
            <Field>
              <FieldLabel htmlFor="clientKey">Client key</FieldLabel>
              <Input
                id="clientKey"
                name="clientKey"
                value={clientKey}
                onChange={(event) => setClientKey(event.target.value)}
                placeholder="e.g. A1B2C3D4E5"
              />
            </Field>
          </FieldGroup>
          <Button type="submit" disabled={linkClient.isPending}>
            {linkClient.isPending ? "Linking…" : "Link client"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
