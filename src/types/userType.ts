export type UserType = {
  id?: string;
  name?: string;
  email: string;
  phone?: string;
  password: string;
  userType?: "client" | "admin" | "project manager";
};
