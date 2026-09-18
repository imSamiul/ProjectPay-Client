import { useState } from "react";
import { Link } from "@tanstack/react-router";
import * as EmailValidator from "email-validator";
import { useForgotPassword } from "@/services/mutations/use-user-mutations";
import { useDocumentHead } from "@/hooks/use-document-head";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const forgotPassword = useForgotPassword();

  useDocumentHead({ title: "Reset password — Project Pay" });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!EmailValidator.validate(email)) {
      setError("Enter a valid email address.");
      return;
    }

    forgotPassword.mutate(
      { email },
      { onSuccess: () => setSent(true) },
    );
  }

  return (
    <div className="w-full max-w-sm animate-in fade-in duration-500">
      <div className="mb-8 flex flex-col gap-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Reset password</h1>
        <p className="text-muted-foreground">
          Enter your email and we'll send you a reset link.
        </p>
      </div>

      {sent ? (
        <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-6 text-center">
          <p className="text-sm text-foreground">
            If an account exists for <span className="font-medium">{email}</span>,
            a reset link is on its way.
          </p>
          <Button render={<Link to="/login" />} variant="outline" size="sm">
            Back to sign in
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field data-invalid={Boolean(error) || undefined}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => {
                  setError(null);
                  setEmail(event.target.value);
                }}
                aria-invalid={Boolean(error) || undefined}
                autoComplete="email"
              />
              {error ? <FieldDescription>{error}</FieldDescription> : null}
            </Field>
            <Button type="submit" className="w-full" size="lg" disabled={forgotPassword.isPending}>
              {forgotPassword.isPending ? "Sending…" : "Send reset link"}
            </Button>
          </FieldGroup>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Link to="/login" className="font-medium text-primary hover:underline">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
