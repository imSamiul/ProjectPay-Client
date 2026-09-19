export type AdminStats = {
  users: {
    total: number;
    clients: number;
    projectManagers: number;
    admins: number;
  };
  projects: {
    total: number;
    totalBudget: number;
    totalDue: number;
    totalCollected: number;
  };
};

export type AdminUserRole = "client" | "project manager" | "admin";

export type AdminUserRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  userType: AdminUserRole;
  createdAt: string;
};

export type AdminProjectRow = {
  _id: string;
  projectCode: string;
  name: string;
  budget: number;
  due: number;
  totalPaid: number;
  status: boolean;
  projectManager: { _id: string; name: string; email: string } | null;
  createdAt: string;
};
