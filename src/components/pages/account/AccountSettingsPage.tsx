import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import {
  useChangePassword,
  useUpdateProfile,
} from "@/services/mutations/use-user-mutations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";

export function AccountSettingsPage() {
  const auth = useAuth();
  const updateProfile = useUpdateProfile();
  const changePassword = useChangePassword();

  const [profile, setProfile] = useState({
    name: auth.user?.name ?? "",
    phone: auth.user?.phone ?? "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState<string | null>(null);

  function handleProfileSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateProfile.mutate(profile);
  }

  function handlePasswordSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPasswordError(null);

    if (passwordForm.newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters.");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New password and confirmation don't match.");
      return;
    }

    changePassword.mutate(
      {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      },
      {
        onSuccess: () =>
          setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" }),
      },
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h1>Account</h1>
        <p className="text-muted-foreground">
          Update your profile details and password.
        </p>
      </div>

      <Card className="border-border bg-card shadow-none">
        <CardHeader>
          <CardTitle className="text-lg">Profile</CardTitle>
          <CardDescription>Signed in as {auth.user?.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileSubmit}>
            <FieldGroup className="gap-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={(event) =>
                      setProfile((prev) => ({ ...prev, name: event.target.value }))
                    }
                    placeholder="Your name"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="phone">Phone</FieldLabel>
                  <Input
                    id="phone"
                    name="phone"
                    value={profile.phone}
                    onChange={(event) =>
                      setProfile((prev) => ({ ...prev, phone: event.target.value }))
                    }
                    placeholder="Phone number"
                  />
                </Field>
              </div>
              <Button type="submit" disabled={updateProfile.isPending} className="w-fit">
                {updateProfile.isPending ? "Saving…" : "Save profile"}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <Separator />

      <Card className="border-border bg-card shadow-none">
        <CardHeader>
          <CardTitle className="text-lg">Change password</CardTitle>
          <CardDescription>Use a password you don't use anywhere else.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordSubmit}>
            <FieldGroup className="gap-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Field data-invalid={Boolean(passwordError) || undefined}>
                  <FieldLabel htmlFor="currentPassword">Current password</FieldLabel>
                  <Input
                    id="currentPassword"
                    type="password"
                    autoComplete="current-password"
                    value={passwordForm.currentPassword}
                    onChange={(event) => {
                      setPasswordError(null);
                      setPasswordForm((prev) => ({
                        ...prev,
                        currentPassword: event.target.value,
                      }));
                    }}
                  />
                </Field>
                <Field data-invalid={Boolean(passwordError) || undefined}>
                  <FieldLabel htmlFor="newPassword">New password</FieldLabel>
                  <Input
                    id="newPassword"
                    type="password"
                    autoComplete="new-password"
                    value={passwordForm.newPassword}
                    onChange={(event) => {
                      setPasswordError(null);
                      setPasswordForm((prev) => ({
                        ...prev,
                        newPassword: event.target.value,
                      }));
                    }}
                  />
                </Field>
                <Field data-invalid={Boolean(passwordError) || undefined}>
                  <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
                  <Input
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    value={passwordForm.confirmPassword}
                    onChange={(event) => {
                      setPasswordError(null);
                      setPasswordForm((prev) => ({
                        ...prev,
                        confirmPassword: event.target.value,
                      }));
                    }}
                  />
                </Field>
              </div>
              {passwordError ? (
                <Field data-invalid>
                  <FieldDescription>{passwordError}</FieldDescription>
                </Field>
              ) : null}
              <Button type="submit" disabled={changePassword.isPending} className="w-fit">
                {changePassword.isPending ? "Updating…" : "Update password"}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
