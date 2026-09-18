import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/components/pages/auth/LoginForm";

export const Route = createFileRoute("/_authentication/login")({
  component: LoginForm,
});
