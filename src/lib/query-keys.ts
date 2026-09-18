export const projectKeys = {
  all: ["projects"] as const,
  lists: () => [...projectKeys.all, "list"] as const,
  list: (page: number, limit: number) =>
    [...projectKeys.lists(), { page, limit }] as const,
  details: () => [...projectKeys.all, "detail"] as const,
  detail: (projectCode: string) =>
    [...projectKeys.details(), projectCode] as const,
  searches: () => [...projectKeys.all, "search"] as const,
  search: (query: string, page: number, limit: number) =>
    [...projectKeys.searches(), { query, page, limit }] as const,
  mine: () => [...projectKeys.all, "mine"] as const,
  managerStats: () => [...projectKeys.all, "manager-stats"] as const,
};

export const userKeys = {
  all: ["users"] as const,
  me: () => [...userKeys.all, "me"] as const,
};

export const clientKeys = {
  all: ["clients"] as const,
  lists: () => [...clientKeys.all, "list"] as const,
  list: (page: number, limit: number) =>
    [...clientKeys.lists(), { page, limit }] as const,
};

export const adminKeys = {
  all: ["admin"] as const,
  stats: () => [...adminKeys.all, "stats"] as const,
  users: () => [...adminKeys.all, "users"] as const,
  usersList: (page: number, limit: number, role?: string) =>
    [...adminKeys.users(), { page, limit, role }] as const,
  projects: () => [...adminKeys.all, "projects"] as const,
  projectsList: (page: number, limit: number) =>
    [...adminKeys.projects(), { page, limit }] as const,
};

export const PAGE_SIZE = 10;
