import { createFileRoute } from "@tanstack/react-router";
import { AccountSettingsPage } from "@/components/pages/account/AccountSettingsPage";

export const Route = createFileRoute("/_authenticated/account")({
  component: AccountSettingsPage,
});
