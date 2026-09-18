import { queryOptions } from "@tanstack/react-query";
import { getManagerClients } from "@/services/api/managers";
import { clientKeys, PAGE_SIZE } from "@/lib/query-keys";

export const managerClientsQuery = (page: number, limit = PAGE_SIZE) =>
  queryOptions({
    queryKey: clientKeys.list(page, limit),
    queryFn: () => getManagerClients({ pageParam: page, limit }),
  });
