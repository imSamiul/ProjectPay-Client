export type UserType = {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  userType?: "client" | "admin" | "project manager";
  clientKey?: string;
};

export type SignUpPayload = {
  email?: string;
  phone?: string;
  password: string;
  userType: "client" | "project manager";
};

export type LoginPayload = {
  identifier: string;
  password: string;
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
