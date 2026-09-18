import { createFileRoute } from "@tanstack/react-router";
import { SignUpForm } from "@/components/pages/auth/SignUpForm";

export const Route = createFileRoute("/_authentication/signUp")({
  component: SignUpForm,
});
