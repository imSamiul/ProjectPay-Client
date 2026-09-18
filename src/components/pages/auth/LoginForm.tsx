import { Link } from "@tanstack/react-router";
import { useLoginForm } from "@/hooks/use-login-form";
import { useDocumentHead } from "@/hooks/use-document-head";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

export function LoginForm() {
  const { formValues, error, handleFormValues, onSubmitHandler } =
    useLoginForm();

  useDocumentHead({
    title: "Sign in — Project Pay",
    description: "Sign in to Project Pay to manage your projects and payments.",
  });

  return (
    <div className="w-full max-w-sm animate-in fade-in duration-500">
      <div className="mb-8 flex flex-col gap-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-muted-foreground">
          Sign in to continue managing your projects.
        </p>
      </div>

      <form onSubmit={onSubmitHandler}>
        <FieldGroup>
          <Field data-invalid={Boolean(error) || undefined}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formValues.email}
              onChange={handleFormValues}
              aria-invalid={Boolean(error) || undefined}
              autoComplete="email"
            />
          </Field>
          <Field data-invalid={Boolean(error) || undefined}>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Link
                to="/forgotPassword"
                className="text-xs font-medium text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Your password"
              value={formValues.password}
              onChange={handleFormValues}
              aria-invalid={Boolean(error) || undefined}
              autoComplete="current-password"
            />
            {error ? <FieldDescription>{error}</FieldDescription> : null}
          </Field>
          <Button type="submit" className="w-full" size="lg">
            Login
          </Button>
        </FieldGroup>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link to="/signUp" className="font-medium text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
