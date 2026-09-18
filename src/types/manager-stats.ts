export type ManagerStats = {
  projects: {
    total: number;
    active: number;
    completed: number;
    overdue: number;
    totalBudget: number;
    totalDue: number;
    totalCollected: number;
  };
  clients: {
    total: number;
  };
};
