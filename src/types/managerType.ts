export type ManagerType = {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  userType: "project manager";
  managerProjects?: string[];
};
