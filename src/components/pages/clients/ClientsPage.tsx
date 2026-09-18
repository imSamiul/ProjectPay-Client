import { useState } from "react";
import { ClientType } from "@/types/client";
import { useCreateManagerClient } from "@/services/mutations/use-client-mutations";
import { useManagerClients } from "@/lib/queries/project-hooks";
import Pagination from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { PAGE_SIZE } from "@/lib/query-keys";

const initialFormValues: ClientType = {
  id: "",
  clientName: "",
  clientPhone: "",
  clientEmail: "",
};

type ClientsPageProps = {
  page: number;
  onPageChange: (page: number) => void;
};

export function ClientsPage({ page, onPageChange }: ClientsPageProps) {
  const [formValues, setFormValues] = useState<ClientType>(initialFormValues);
  const createClientMutation = useCreateManagerClient();
  const clientsQuery = useManagerClients(page, PAGE_SIZE);

  const clients = clientsQuery.data?.clients ?? [];
  const totalPages = Math.max(
    clientsQuery.data?.pagination.totalPages ?? 1,
    1,
  );

  function handleFormValues(event: React.ChangeEvent<HTMLInputElement>) {
    setFormValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (
      !formValues.clientName.trim() ||
      !formValues.clientPhone.trim() ||
      !formValues.clientEmail.trim()
    ) {
      return;
    }

    createClientMutation.mutate(
      {
        clientName: formValues.clientName.trim(),
        clientPhone: formValues.clientPhone.trim(),
        clientEmail: formValues.clientEmail.trim(),
      },
      {
        onSuccess: () => {
          setFormValues(initialFormValues);
          onPageChange(1);
        },
      },
    );
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1>Clients</h1>
        <p className="text-muted-foreground">
          Browse saved clients and add new contact details for projects.
        </p>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-medium">Client list</h2>
        {clientsQuery.isLoading ? (
          <div className="flex flex-col gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-14 w-full rounded-lg" />
            ))}
          </div>
        ) : clients.length === 0 ? (
          <Empty className="border border-dashed border-border py-10">
            <EmptyHeader>
              <EmptyTitle>No clients yet</EmptyTitle>
              <EmptyDescription>
                Add your first client using the form below.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <ul className="divide-y divide-border rounded-xl border border-border">
            {clients.map((client) => (
              <li
                key={client.id}
                className="flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="font-medium text-foreground">
                  {client.clientName}
                </span>
                <span className="text-sm text-muted-foreground">
                  {client.clientEmail} · {client.clientPhone}
                </span>
              </li>
            ))}
          </ul>
        )}
        {totalPages > 1 ? (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={onPageChange}
          />
        ) : null}
      </section>

      <Separator />

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-medium">Add client</h2>
        <form onSubmit={handleFormSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="clientName">Client name</FieldLabel>
              <Input
                id="clientName"
                name="clientName"
                value={formValues.clientName}
                onChange={handleFormValues}
                placeholder="Full name"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="clientPhone">Client phone</FieldLabel>
              <Input
                id="clientPhone"
                name="clientPhone"
                value={formValues.clientPhone}
                onChange={handleFormValues}
                placeholder="Phone number"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="clientEmail">Client email</FieldLabel>
              <Input
                id="clientEmail"
                name="clientEmail"
                type="email"
                value={formValues.clientEmail}
                onChange={handleFormValues}
                placeholder="email@example.com"
                required
              />
              <FieldDescription>
                Use the same email the client will use to sign in later. A
                temporary password is generated if you do not set one.
              </FieldDescription>
            </Field>
            <Button
              type="submit"
              size="lg"
              disabled={createClientMutation.isPending}
            >
              {createClientMutation.isPending ? "Saving…" : "Save client"}
            </Button>
          </FieldGroup>
        </form>
      </section>
    </div>
  );
}
