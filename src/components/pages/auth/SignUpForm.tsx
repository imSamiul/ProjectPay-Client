import { Link } from "@tanstack/react-router";
import { useSignUpForm } from "@/hooks/use-sign-up-form";
import { useDocumentHead } from "@/hooks/use-document-head";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SignUpForm() {
  const { formValues, error, handleFormValues, setFieldValue, onSubmitHandler } =
    useSignUpForm();

  useDocumentHead({
    title: "Create account — Project Pay",
    description: "Create a free Project Pay account to manage projects and payments.",
  });

  return (
    <div className="w-full max-w-sm animate-in fade-in duration-500">
      <div className="mb-8 flex flex-col gap-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Get started</h1>
        <p className="text-muted-foreground">
          Create an account to manage projects and payments.
        </p>
      </div>

      <form onSubmit={onSubmitHandler}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              id="name"
              name="name"
              placeholder="Your name"
              value={formValues.name}
              onChange={handleFormValues}
              autoComplete="name"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formValues.email}
              onChange={handleFormValues}
              autoComplete="email"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="phone">Phone</FieldLabel>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">(+880)</span>
              <Input
                id="phone"
                name="phone"
                placeholder="1XXXXXXXXX"
                value={formValues.phone}
                minLength={10}
                maxLength={10}
                onChange={handleFormValues}
                autoComplete="tel"
              />
            </div>
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Create a password"
              value={formValues.password}
              onChange={handleFormValues}
              autoComplete="new-password"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="userType">Account type</FieldLabel>
            <Select
              value={formValues.userType}
              onValueChange={(value) =>
                setFieldValue("userType", value ?? "client")
              }
            >
              <SelectTrigger id="userType" className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="project manager">
                    Project manager
                  </SelectItem>
                  <SelectItem value="client">Client</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          {error ? (
            <Field data-invalid>
              <FieldDescription>{error}</FieldDescription>
            </Field>
          ) : null}
          <Button type="submit" className="w-full" size="lg">
            Sign up
          </Button>
        </FieldGroup>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-primary hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
