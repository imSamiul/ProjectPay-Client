import { createFileRoute } from "@tanstack/react-router";
import { ForgotPasswordForm } from "@/components/pages/auth/ForgotPasswordForm";

export const Route = createFileRoute("/_authentication/forgotPassword")({
  component: ForgotPasswordForm,
});
