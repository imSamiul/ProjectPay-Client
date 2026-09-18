export type UserType = {
  id?: string;
  name?: string;
  email: string;
  phone?: string;
  password: string;
  userType?: "client" | "admin" | "project manager";
};

export type UpdateProfilePayload = {
  name: string;
  phone: string;
};

export type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

export type ForgotPasswordPayload = {
  email: string;
};
